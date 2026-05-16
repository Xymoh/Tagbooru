/**
 * Shared utility helpers used across the tag pipeline.
 *
 * Re-exports tag-normalization primitives from danbooruApi so every
 * consumer can strip meta qualifiers and normalise for API lookups
 * through one import path.
 */

export { stripMetaQualifiers, normalizeForApi } from "./danbooruApi";

/**
 * Check whether `text` contains any of the `keywords`.
 *
 * For single-word keywords (no spaces, underscores, or special chars),
 * matches use word-boundary anchors to avoid false positives like
 * "hair" matching "chair". Multi-word keywords use substring matching.
 */
export function containsKeyword(text, keywords) {
    return keywords.some((keyword) => {
        const normalizedKeyword = keyword.toLowerCase();

        // Multi-word or special-character keywords: use substring match.
        if (
            normalizedKeyword.includes(" ") ||
            normalizedKeyword.includes("_") ||
            /[^a-z0-9]/.test(normalizedKeyword)
        ) {
            return text.includes(normalizedKeyword);
        }

        // Single-word keywords: use word-boundary check to avoid false
        // positives such as "hair" matching inside "chair" or "hairy".
        const escaped = normalizedKeyword.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        const pattern = new RegExp(`(^|[^a-z0-9])${escaped}([^a-z0-9]|$)`);
        return pattern.test(text);
    });
}

export function normalizeTagName(tag) {
    return tag.trim().toLowerCase().replace(/\s+/g, " ");
}

export function tagToDanbooruQuery(token) {
    return normalizeTagName(token).replace(/\s+/g, "_");
}

export function danbooruToTagText(tag) {
    return tag.replace(/_/g, " ");
}

export function toPromptLine(tags) {
    if (!tags.length) {
        return "";
    }
    return `${tags.join(", ")},`;
}
