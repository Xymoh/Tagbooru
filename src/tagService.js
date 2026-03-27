import { tagToDanbooruQuery } from "./utils";

export async function fetchDanbooruTags(query) {
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
        return 100;
    }

    if (name.startsWith(normalizedInput)) {
        return 80;
    }

    if (name.includes(normalizedInput)) {
        return 60;
    }

    const inputTokens = normalizedInput.split("_");
    const nameTokens = name.split("_");
    const overlap = inputTokens.filter((token) => nameTokens.includes(token)).length;
    const overlapRatio = overlap / Math.max(inputTokens.length, 1);

    return Math.round(overlapRatio * 50);
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
