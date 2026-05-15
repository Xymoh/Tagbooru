/**
 * Tag classifier — Danbooru-category-first with keyword sub-categorization.
 *
 * The primary classification uses the official Danbooru category number
 * resolved via the API (see ../danbooruApi.js). For tags whose real
 * category is GENERAL (0), keyword-based heuristics provide finer-grained
 * sub-categorization (nsfw, looks, style, landscape, action, composition).
 *
 * Category slugs returned:
 *   "character"  – TAG_CATEGORY.CHARACTER (4)
 *   "copyright"  – TAG_CATEGORY.COPYRIGHT (3)
 *   "artist"     – TAG_CATEGORY.ARTIST (1)
 *   "meta"       – TAG_CATEGORY.META (5)
 *   "nsfw"       – GENERAL keyword match (highest sub-priority)
 *   "style"      – GENERAL keyword match (style/quality/artist name)
 *   "looks"      – GENERAL keyword match (appearance/clothing)
 *   "landscape"  – GENERAL keyword match (scene/environment)
 *   "action"     – GENERAL keyword match (pose/movement)
 *   "composition"– GENERAL keyword match (framing/camera)
 *   "general"    – everything else (GENERAL=0, no keyword match)
 *   "unknown"    – tag not resolved on Danbooru (category=-1)
 */

import {
    ACTION_KEYWORDS,
    COMPOSITION_META_KEYWORDS,
    LANDSCAPE_KEYWORDS,
    LOOKS_EXACT_TAGS,
    LOOKS_KEYWORDS,
    NSFW_EXACT_TAGS,
    NSFW_KEYWORDS,
    STYLE_KEYWORDS,
    TAG_CATEGORY,
} from "./constants";
import { containsKeyword, danbooruToTagText } from "./utils";

/**
 * Classify a single tag object into a category slug.
 *
 * @param {{ name: string, category?: number }} tagObj
 *        tagObj.name     – canonical Danbooru tag name (underscore form)
 *        tagObj.category – Danbooru category number (0-5), or -1 if unresolved
 * @returns {string} category slug
 */
export function categorizeTag(tagObj) {
    const cat = typeof tagObj.category === "number" ? tagObj.category : TAG_CATEGORY.GENERAL;

    // Unresolved tags
    if (cat < 0) {
        return "unknown";
    }

    // API-level categories — authoritative, no keyword fallback needed
    if (cat === TAG_CATEGORY.ARTIST) return "artist";
    if (cat === TAG_CATEGORY.COPYRIGHT) return "copyright";
    if (cat === TAG_CATEGORY.CHARACTER) return "character";
    if (cat === TAG_CATEGORY.META) return "meta";

    // GENERAL (0): use keyword sub-categorization
    const text = danbooruToTagText(tagObj.name);
    const lower = text.toLowerCase();

    // NSFW first (highest priority within GENERAL)
    if (NSFW_EXACT_TAGS.has(lower) || containsKeyword(lower, NSFW_KEYWORDS)) {
        return "nsfw";
    }

    // Explicit LOOKS exact tags
    if (LOOKS_EXACT_TAGS.has(lower)) {
        return "looks";
    }

    // Style/quality keywords
    if (containsKeyword(lower, STYLE_KEYWORDS)) {
        return "style";
    }

    // Looks/appearance keywords (clothing, body features, hair, accessories)
    if (containsKeyword(lower, LOOKS_KEYWORDS)) {
        return "looks";
    }

    // Landscape/scene
    if (containsKeyword(lower, LANDSCAPE_KEYWORDS)) {
        return "landscape";
    }

    // Action/pose
    if (containsKeyword(lower, ACTION_KEYWORDS)) {
        return "action";
    }

    // Composition/framing
    if (containsKeyword(lower, COMPOSITION_META_KEYWORDS)) {
        return "composition";
    }

    // Plain general — no keyword match
    return "general";
}

/**
 * Map a category slug to a human-readable display title.
 * Used by the UI layer (TextFormatter.jsx).
 */
export const CATEGORY_TITLES = {
    character: "Character",
    copyright: "Series / Franchise",
    artist: "Artist",
    meta: "Meta",
    nsfw: "NSFW",
    style: "Style / Quality",
    looks: "Looks / Appearance",
    landscape: "Landscape / Scene",
    action: "Action / Pose",
    composition: "Composition / Framing",
    general: "General",
    unknown: "Unknown / Unresolved",
};

/**
 * Display order for categories in the output grid.
 * Earlier entries appear first.
 */
export const CATEGORY_ORDER = [
    "character",
    "copyright",
    "artist",
    "general",
    "style",
    "looks",
    "landscape",
    "action",
    "composition",
    "nsfw",
    "meta",
    "unknown",
];
