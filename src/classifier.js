import {
    ACTION_KEYWORDS,
    CHARACTER_IDENTITY_EXACT_TAGS,
    CHARACTER_IDENTITY_KEYWORDS,
    COMPOSITION_META_KEYWORDS,
    LANDSCAPE_KEYWORDS,
    LOOKS_EXACT_TAGS,
    LOOKS_KEYWORDS,
    NSFW_KEYWORDS,
    STYLE_EXACT_TAGS,
    STYLE_KEYWORDS,
    TAG_CATEGORY,
} from "./constants";
import { containsKeyword, danbooruToTagText } from "./utils";

export function categorizeTag(tagObj) {
    const text = danbooruToTagText(tagObj.name);
    const lower = text.toLowerCase();

    if (containsKeyword(lower, NSFW_KEYWORDS)) {
        return "nsfw";
    }

    if (LOOKS_EXACT_TAGS.has(lower)) {
        return "looks";
    }

    if (
        tagObj.category === TAG_CATEGORY.ARTIST ||
        STYLE_EXACT_TAGS.has(lower) ||
        containsKeyword(lower, STYLE_KEYWORDS)
    ) {
        return "style";
    }

    if (containsKeyword(lower, LOOKS_KEYWORDS) || lower.includes("handlebar") || lower.includes("battery")) {
        return "looks";
    }

    if (tagObj.category === TAG_CATEGORY.COPYRIGHT) {
        return "copyright";
    }

    if (
        tagObj.category === TAG_CATEGORY.CHARACTER ||
        CHARACTER_IDENTITY_EXACT_TAGS.has(lower) ||
        containsKeyword(lower, CHARACTER_IDENTITY_KEYWORDS)
    ) {
        return "character";
    }

    if (containsKeyword(lower, LANDSCAPE_KEYWORDS)) {
        return "landscape";
    }

    if (containsKeyword(lower, ACTION_KEYWORDS)) {
        return "action";
    }

    if (containsKeyword(lower, COMPOSITION_META_KEYWORDS)) {
        return "composition";
    }

    if (tagObj.category === TAG_CATEGORY.META || tagObj.category === TAG_CATEGORY.GENERAL) {
        return "other";
    }

    return "other";
}
