import { normalizeTagName } from "./utils";

export function splitAndCleanCandidates(rawText) {
    const pieces = rawText
        .split(/[\n,;|]+/)
        .map((line) => line.trim())
        .filter(Boolean);

    const candidates = [];

    for (const piece of pieces) {
        if (piece === "?") {
            continue;
        }

        const withoutLeadingMarker = piece.replace(/^[\s?*\-•]+/, "").trim();
        if (!withoutLeadingMarker) {
            continue;
        }

        const unescaped = withoutLeadingMarker
            .replace(/\\\(/g, "(")
            .replace(/\\\)/g, ")")
            .replace(/\\_/g, "_")
            .replace(/\\/g, "");

        const withoutCount = unescaped.replace(/\s+\d+(?:\.\d+)?[kmb]?$/i, "").trim();
        const stripped = withoutCount
            .replace(/[\[\]{}"']/g, " ")
            .replace(/[.,:]+$/g, "")
            .replace(/\s+/g, " ")
            .trim();

        if (!stripped || stripped === "?") {
            continue;
        }

        if (/^\([^()]+\)$/.test(stripped)) {
            continue;
        }

        const words = stripped.split(" ").filter(Boolean);
        if (words.length > 3 && !(stripped.includes("(") && stripped.includes(")"))) {
            candidates.push(words.slice(0, 3).join(" "));
            candidates.push(words.slice(-3).join(" "));
        }

        candidates.push(stripped);
    }

    return [...new Set(candidates.map(normalizeTagName))];
}
