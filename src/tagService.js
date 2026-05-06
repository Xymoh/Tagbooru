import { tagToDanbooruQuery } from "./utils";
import { DANBOORU_TAG_CSV_PATH, TAG_CATEGORY, SCORE_EXACT, SCORE_PREFIX, SCORE_CONTAINS, SCORE_OVERLAP_MAX } from "./constants";

let localTagMapPromise = null;
let localTagMap = null;

/**
 * Parse a CSV line into { name, post_count }.
 * Uses the LAST comma as delimiter so that tag names containing commas
 * are handled correctly (Danbooru tag names can contain commas).
 * The post count is always the last field.
 */
function parseCsvLine(line) {
    const trimmed = line.trim();
    if (!trimmed) {
        return null;
    }

    const commaIndex = trimmed.lastIndexOf(",");
    if (commaIndex <= 0) {
        return null;
    }

    const name = trimmed.slice(0, commaIndex).trim();
    const postCountRaw = trimmed.slice(commaIndex + 1).trim();
    const postCount = Number.parseInt(postCountRaw, 10);

    if (!name || Number.isNaN(postCount)) {
        return null;
    }

    return { name, post_count: postCount };
}

async function loadLocalTagMap() {
    if (localTagMap) {
        return localTagMap;
    }

    if (!localTagMapPromise) {
        localTagMapPromise = (async () => {
            const response = await fetch(DANBOORU_TAG_CSV_PATH, { method: "GET" });
            if (!response.ok) {
                throw new Error(`Local tag CSV request failed: ${response.status}`);
            }

            const csvText = await response.text();
            const rows = csvText.split(/\r?\n/);
            const map = new Map();

            for (let i = 1; i < rows.length; i += 1) {
                const parsed = parseCsvLine(rows[i]);
                if (!parsed) {
                    continue;
                }

                map.set(parsed.name.toLowerCase(), {
                    name: parsed.name,
                    post_count: parsed.post_count,
                    // Category is unknown from this CSV, so treat as GENERAL.
                    category: TAG_CATEGORY.GENERAL,
                });
            }

            localTagMap = map;
            return map;
        })();
    }

    return localTagMapPromise;
}

export async function ensureLocalTagIndexLoaded() {
    return loadLocalTagMap();
}

function getExactLocalTag(query, map) {
    const normalized = query.toLowerCase();
    const exact = map.get(normalized);
    if (exact) {
        return exact;
    }

    return null;
}

export async function fetchDanbooruTags(query) {
    try {
        const map = await loadLocalTagMap();
        const localExact = getExactLocalTag(query, map);
        if (localExact) {
            return [localExact];
        }
    } catch {
        // Fallback to remote API when local index is unavailable.
    }

    // Try exact match on remote API first to avoid wildcard false positives
    // (e.g. "blowjob" matching "blowjob (drink)", "male" matching "male focus").
    const exactEndpoint = `https://danbooru.donmai.us/tags.json?search[name_matches]=${encodeURIComponent(query)}&search[order]=count&limit=1`;
    const exactResponse = await fetch(exactEndpoint, { method: "GET" });
    if (exactResponse.ok) {
        const exactResults = await exactResponse.json();
        if (exactResults.length > 0) {
            return exactResults;
        }
    }

    const endpoint = `https://danbooru.donmai.us/tags.json?search[name_matches]=${encodeURIComponent(query)}*&search[order]=count&limit=8`;
    const response = await fetch(endpoint, { method: "GET" });
    if (!response.ok) {
        throw new Error(`Danbooru request failed: ${response.status}`);
    }
    return response.json();
}

function scoreCandidateMatch(inputTag, apiTag) {
    const normalizedInput = tagToDanbooruQuery(inputTag);
    const name = apiTag.name.toLowerCase();

    if (name === normalizedInput) {
        return SCORE_EXACT;
    }

    if (name.startsWith(normalizedInput)) {
        return SCORE_PREFIX;
    }

    if (name.includes(normalizedInput)) {
        return SCORE_CONTAINS;
    }

    const inputTokens = normalizedInput.split("_");
    const nameTokens = name.split("_");
    const overlap = inputTokens.filter((token) => nameTokens.includes(token)).length;
    const overlapRatio = overlap / Math.max(inputTokens.length, 1);

    return Math.round(overlapRatio * SCORE_OVERLAP_MAX);
}

export function pickBestTag(inputTag, apiTags) {
    if (!apiTags || apiTags.length === 0) {
        return null;
    }

    const scored = apiTags
        .map((tag) => ({
            tag,
            score: scoreCandidateMatch(inputTag, tag),
        }))
        .sort((a, b) => {
            if (b.score !== a.score) {
                return b.score - a.score;
            }
            return (b.tag.post_count || 0) - (a.tag.post_count || 0);
        });

    return scored[0];
}
