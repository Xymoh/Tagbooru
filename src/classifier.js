import {
    ACTION_KEYWORDS,
    CHARACTER_IDENTITY_EXACT_TAGS,
    CHARACTER_IDENTITY_KEYWORDS,
    COMPOSITION_META_KEYWORDS,
    COPYRIGHT_EXACT_TAGS,
    LANDSCAPE_KEYWORDS,
    LOOKS_EXACT_TAGS,
    LOOKS_KEYWORDS,
    META_KEYWORDS,
    NSFW_KEYWORDS,
    NSFW_EXACT_TAGS,
    STYLE_EXACT_TAGS,
    STYLE_KEYWORDS,
    TAG_CATEGORY,
} from "./constants";
import { containsKeyword, danbooruToTagText } from "./utils";

export function categorizeTag(tagObj) {
    const text = danbooruToTagText(tagObj.name);
    const lower = text.toLowerCase();

    // Check explicit NSFW tags first (highest priority)
    if (NSFW_EXACT_TAGS.has(lower) || containsKeyword(lower, NSFW_KEYWORDS)) {
        return "nsfw";
    }

    // Check explicit LOOKS tags
    if (LOOKS_EXACT_TAGS.has(lower)) {
        return "looks";
    }

    // Style category (artist, style keywords)
    if (
        tagObj.category === TAG_CATEGORY.ARTIST ||
        STYLE_EXACT_TAGS.has(lower) ||
        containsKeyword(lower, STYLE_KEYWORDS)
    ) {
        return "style";
    }

    // LOOKS category
    if (containsKeyword(lower, LOOKS_KEYWORDS)) {
        return "looks";
    }

    // Copyright
    if (tagObj.category === TAG_CATEGORY.COPYRIGHT || COPYRIGHT_EXACT_TAGS.has(lower)) {
        return "copyright";
    }

    // Character identity
    if (
        tagObj.category === TAG_CATEGORY.CHARACTER ||
        CHARACTER_IDENTITY_EXACT_TAGS.has(lower) ||
        containsKeyword(lower, CHARACTER_IDENTITY_KEYWORDS)
    ) {
        return "character";
    }

    // Landscape/environment
    if (containsKeyword(lower, LANDSCAPE_KEYWORDS)) {
        return "landscape";
    }

    // Action/pose
    if (containsKeyword(lower, ACTION_KEYWORDS)) {
        return "action";
    }

    // Composition/framing/meta elements
    if (containsKeyword(lower, COMPOSITION_META_KEYWORDS)) {
        return "composition";
    }

    // Meta tags (orientations, ratings, etc.)
    if (containsKeyword(lower, META_KEYWORDS)) {
        return "other";
    }

    // Danbooru META category
    if (tagObj.category === TAG_CATEGORY.META || tagObj.category === TAG_CATEGORY.GENERAL) {
        return "other";
    }

    return "other";
}
