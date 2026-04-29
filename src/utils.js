export function containsKeyword(text, keywords) {
    return keywords.some((keyword) => {
        const normalizedKeyword = keyword.toLowerCase();

        if (normalizedKeyword.includes(" ") || normalizedKeyword.includes("_") || /[^a-z0-9]/.test(normalizedKeyword)) {
            return text.includes(normalizedKeyword);
        }

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
