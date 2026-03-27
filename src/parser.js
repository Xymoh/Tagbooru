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

        // Unwrap dangling wrapper parentheses from list fragments like
        // "(qingyi (zenless zone zero)" or "green cum on face)" while keeping
        // valid inner parentheses in canonical Danbooru tags.
        const parenCount = (value, ch) => (value.match(new RegExp(`\\${ch}`, "g")) || []).length;
        while (stripped.startsWith("(") && parenCount(stripped, "(") > parenCount(stripped, ")")) {
            stripped = stripped.slice(1).trim();
        }
        while (stripped.endsWith(")") && parenCount(stripped, ")") > parenCount(stripped, "(")) {
            stripped = stripped.slice(0, -1).trim();
        }

        // Unwrap common copy/paste wrappers around whole fragments.
        // This keeps inner content intact while removing surrounding noise.
        const wrapperPairs = [
            ['"', '"'],
            ["'", "'"],
            ["`", "`"],
            ["[", "]"],
            ["{", "}"],
        ];
        let unwrapped = true;
        while (unwrapped) {
            unwrapped = false;
            for (const [open, close] of wrapperPairs) {
                if (stripped.length > 1 && stripped.startsWith(open) && stripped.endsWith(close)) {
                    stripped = stripped.slice(1, -1).trim();
                    unwrapped = true;
                }
            }
        }

        if (!stripped || stripped === "?") {
            continue;
        }

        // Ignore divider artifacts such as "---------------".
        if (/^[-_=]{3,}$/.test(stripped)) {
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
