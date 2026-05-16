/**
 * Danbooru Tag API — batch resolution, caching, rate limiting.
 *
 * Resolves tag names to their official Danbooru entries with correct
 * category (0=general, 1=artist, 3=copyright, 4=character, 5=meta).
 *
 * Features:
 *   - In-memory cache with 24h TTL
 *   - localStorage persistence across page reloads
 *   - Concurrency-limited batch resolution (3 parallel, 350ms between chunks)
 *   - Tag normalization that strips meta qualifiers like (species), (artist)
 */

// --------------- Configuration ------------------------------------------------

/** How long cached entries are considered fresh (24 hours in ms). */
const CACHE_TTL_MS = 24 * 60 * 60 * 1000;

/** Maximum concurrent API requests. Danbooru allows ~1 req/sec; 3 is safe. */
const CONCURRENCY_LIMIT = 3;

/** Delay between chunks of requests to stay under rate limits. */
const REQUEST_DELAY_MS = 350;

/** localStorage key for persisting the cache. */
const STORAGE_KEY = "danbooru_tag_cache_v2";

// --------------- In-memory cache ----------------------------------------------

/**
 * @typedef {Object} ResolvedTagInfo
 * @property {string}  name        – canonical Danbooru tag name (underscore form)
 * @property {number}  category    – 0=general, 1=artist, 3=copyright, 4=character, 5=meta
 * @property {number}  post_count  – approximate post count
 * @property {number}  cachedAt    – Date.now() when cached
 * @property {number}  [expiresAt] – explicit expiry timestamp (overrides TTL if set)
 */

/** @type {Map<string, ResolvedTagInfo>} */
const tagCache = new Map();

// --------------- Tag normalization --------------------------------------------

/**
 * Parenthetical qualifiers that are NOT part of the canonical Danbooru tag name.
 * Stripping these before API lookup improves match accuracy.
 * e.g. "hilichurls (species)" → "hilichurls" → API finds "hilichurl"
 */
const META_QUALIFIER_PATTERNS = [
    /\s*\(species\)$/i,
    /\s*\(artist\)$/i,
    /\s*\(series\)$/i,
    /\s*\(lore\)$/i,
    /\s*\(cosplay\)$/i,
    /\s*\(medium\)$/i,
    /\s*\(style\)$/i,
    /\s*\(character\)$/i,
    /\s*\(organization\)$/i,
    /\s*\(group\)$/i,
    /\s*\(gender\)$/i,
    /\s*\(type\)$/i,
];

/**
 * Strip trailing parenthetical meta qualifiers that are not part of the
 * canonical Danbooru name. Preserves series/franchise qualifiers like
 * "(genshin impact)" or "(zenless zone zero)".
 *
 * @param {string} rawTag – raw user-provided tag string
 * @returns {string} cleaned tag ready for API lookup
 */
export function stripMetaQualifiers(rawTag) {
    let cleaned = rawTag.trim();

    for (const pattern of META_QUALIFIER_PATTERNS) {
        cleaned = cleaned.replace(pattern, "");
    }

    return cleaned.trim();
}

/**
 * Normalize a tag name for Danbooru API lookup.
 * Strips meta qualifiers, lowercases, replaces spaces with underscores,
 * and removes parentheses characters.
 *
 * @param {string} tagName – raw or display-form tag name
 * @returns {string} normalized query key
 */
export function normalizeForApi(tagName) {
    const withoutMeta = stripMetaQualifiers(tagName);
    return withoutMeta
        .toLowerCase()
        .replace(/\s+/g, "_")
        .replace(/[()]/g, "");
}

// --------------- Single tag resolution ----------------------------------------

/**
 * Resolve a single tag via the Danbooru API.
 * Checks the in-memory cache first; on cache miss, fetches from the API
 * and caches the result.
 *
 * @param {string} rawTagName – the raw tag as provided by the user
 * @returns {Promise<ResolvedTagInfo|null>} resolved info or null if not found
 */
export async function resolveSingleTag(rawTagName) {
    const normalized = normalizeForApi(rawTagName);

    // Check in-memory cache
    const cached = tagCache.get(normalized);
    if (cached) {
        const expiry = cached.expiresAt ?? (cached.cachedAt + CACHE_TTL_MS);
        if (Date.now() < expiry) return cached;
    }

    try {
        const response = await fetch(
            `https://danbooru.donmai.us/tags.json?search[name]=${encodeURIComponent(normalized)}&limit=1`,
        );

        if (!response.ok) {
            // Cache the miss briefly (1 min) so we don't hammer the API on repeated failures.
            tagCache.set(normalized, { name: normalized, category: -1, post_count: 0, cachedAt: Date.now(), expiresAt: Date.now() + 60_000 });
            return null;
        }

        const results = await response.json();
        if (!results || results.length === 0) {
            // Cache the miss with a shorter TTL (5 min) so retries work.
            tagCache.set(normalized, { name: normalized, category: -1, post_count: 0, cachedAt: Date.now(), expiresAt: Date.now() + 300_000 });
            return null;
        }

        const tag = results[0];
        const info = {
            name: tag.name,
            category: typeof tag.category === "number" ? tag.category : 0,
            post_count: tag.post_count || 0,
            cachedAt: Date.now(),
        };

        tagCache.set(normalized, info);
        return info;
    } catch {
        // Network error — cache a short-lived miss (1 min).
        tagCache.set(normalized, { name: normalized, category: -1, post_count: 0, cachedAt: Date.now(), expiresAt: Date.now() + 60_000 });
        return null;
    }
}

// --------------- Batch resolution ---------------------------------------------

/**
 * Resolve a batch of tag names concurrently with rate-limit throttling.
 *
 * @param {string[]} tagNames – array of raw tag name strings
 * @param {Object} [options]
 * @param {(completed: number, total: number) => void} [options.onProgress] – progress callback
 * @returns {Promise<Map<string, ResolvedTagInfo>>} map of normalized key → resolved info
 */
export async function resolveTagBatch(tagNames, { onProgress } = {}) {
    const results = new Map();

    if (!tagNames || tagNames.length === 0) {
        return results;
    }

    // Deduplicate and normalize
    const normalizedSet = new Map(); // normalized → first raw name
    for (const raw of tagNames) {
        const key = normalizeForApi(raw);
        if (!normalizedSet.has(key)) {
            normalizedSet.set(key, raw);
        }
    }

    const uniqueNormalized = [...normalizedSet.keys()];
    let completed = 0;

    for (let i = 0; i < uniqueNormalized.length; i += CONCURRENCY_LIMIT) {
        const chunk = uniqueNormalized.slice(i, i + CONCURRENCY_LIMIT);

        const chunkResults = await Promise.all(
            chunk.map(async (normalizedKey) => {
                const rawName = normalizedSet.get(normalizedKey);
                const info = await resolveSingleTag(rawName);
                return { normalizedKey, info };
            }),
        );

        for (const { normalizedKey, info } of chunkResults) {
            if (info && info.category >= 0) {
                results.set(normalizedKey, info);
            }
        }

        completed += chunk.length;
        if (onProgress) {
            onProgress(completed, uniqueNormalized.length);
        }

        // Delay between chunks to respect Danbooru rate limits
        if (i + CONCURRENCY_LIMIT < uniqueNormalized.length) {
            await new Promise((resolve) => setTimeout(resolve, REQUEST_DELAY_MS));
        }
    }

    return results;
}

// --------------- Cache management ---------------------------------------------

/** Get the number of cached entries. */
export function getCacheSize() {
    return tagCache.size;
}

/** Clear the in-memory cache and localStorage. */
export function clearCache() {
    tagCache.clear();
    try {
        localStorage.removeItem(STORAGE_KEY);
    } catch {
        /* localStorage not available */
    }
}

// --------------- localStorage persistence -------------------------------------

/**
 * Load cached entries from localStorage on module initialization.
 * Only restores entries that haven't expired.
 */
function loadPersistedCache() {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (!stored) return;

        const entries = JSON.parse(stored);
        const now = Date.now();

        for (const [key, value] of Object.entries(entries)) {
            if (value && typeof value.category === "number") {
                const expiry = value.expiresAt ?? (value.cachedAt + CACHE_TTL_MS);
                if (now < expiry) {
                    tagCache.set(key, value);
                }
            }
        }
    } catch {
        /* localStorage not available or corrupted */
    }
}

/** Persist the full cache to localStorage. */
function persistCache() {
    try {
        const obj = Object.fromEntries(tagCache);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(obj));
    } catch {
        /* localStorage full or unavailable — silently ignore */
    }
}

// Initialize on module load
loadPersistedCache();

// Persist on page unload
if (typeof window !== "undefined") {
    window.addEventListener("beforeunload", persistCache);
    // Also persist periodically (every 30 seconds)
    setInterval(persistCache, 30_000);
}
