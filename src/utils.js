export function containsKeyword(text, keywords) {
    return keywords.some((key) => text.includes(key));
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
