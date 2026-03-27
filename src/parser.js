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

        const withoutLeadingMarker = piece.replace(/^[\s?*\-•#]+/, "").trim();
        if (!withoutLeadingMarker) {
            continue;
        }

        const unescaped = withoutLeadingMarker
            .replace(/\\\(/g, "(")
            .replace(/\\\)/g, ")")
            .replace(/\\_/g, "_")
            .replace(/\\/g, "");

        const withoutCount = unescaped.replace(/\s+\d+(?:\.\d+)?[kmb]?$/i, "").trim();
        
        // Only replace brackets with spaces if they're not balanced parentheses
        let stripped = withoutCount;
        const hasBalancedParens = (stripped.match(/\(/g) || []).length === (stripped.match(/\)/g) || []).length;
        if (!hasBalancedParens) {
            stripped = stripped.replace(/[\[\]{}]/g, " ");
        }
        
        stripped = stripped
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
