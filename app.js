const DOM = {
    inputText: document.getElementById("inputText"),
    analyzeBtn: document.getElementById("analyzeBtn"),
    clearBtn: document.getElementById("clearBtn"),
    statusText: document.getElementById("statusText"),
    allTagsOutput: document.getElementById("allTagsOutput"),
    styleOutput: document.getElementById("styleOutput"),
    characterOutput: document.getElementById("characterOutput"),
    looksOutput: document.getElementById("looksOutput"),
    landscapeOutput: document.getElementById("landscapeOutput"),
    nsfwOutput: document.getElementById("nsfwOutput"),
    otherOutput: document.getElementById("otherOutput"),
    copyButtons: document.querySelectorAll(".copy-btn"),
};

const TAG_CATEGORY = {
    GENERAL: 0,
    ARTIST: 1,
    COPYRIGHT: 3,
    CHARACTER: 4,
    META: 5,
};

const STYLE_KEYWORDS = [
    "masterpiece", "best quality", "high quality", "8k", "4k", "cinematic", "photorealistic",
    "anime coloring", "dramatic lighting", "volumetric lighting", "depth of field", "lineart",
    "shaded", "cel shading", "render", "illustration", "ultra detailed", "detailed",
    "score_", "quality", "stylized", "painting", "watercolor", "sketch", "concept art",
];

const LANDSCAPE_KEYWORDS = [
    "sky", "cloud", "sunset", "sunrise", "forest", "mountain", "river", "ocean", "beach",
    "city", "street", "building", "room", "indoors", "outdoors", "background", "landscape",
    "night", "day", "rain", "snow", "storm", "garden", "field", "park", "castle", "temple",
    "space", "moon", "stars", "window", "balcony", "court", "volleyball court", "basketball court",
    "stadium", "arena", "gymnasium", "gym",
];

const CHARACTER_IDENTITY_KEYWORDS = [
    "girl", "boy", "woman", "man", "1girl", "1boy", "2girls", "2boys", "solo", "duo",
    "android", "cyborg", "elf", "demon", "angel", "catgirl", "fox girl", "schoolgirl",
];

const LOOKS_KEYWORDS = [
    "hair", "eyes", "face", "smile", "expression", "dress", "shirt", "skirt", "jacket",
    "gloves", "boots", "stockings", "ears", "tail", "horns", "wings", "weapon", "sword", "gun",
    "hips", "thigh", "thighs", "waist", "navel", "midriff", "skin", "braid", "braids", "crop top",
    "uniform", "elbow gloves", "twintails", "very long hair", "long hair", "green hair", "green eyes",
    "bangs", "arched bangs", "sleeveless", "sleeveless shirt", "piercing", "animal ear piercing",
    "ear piercing", "fringe", "ponytail", "bob cut", "blush", "lipstick", "eyeliner", "eyeshadow",
    "freckles", "fang", "fangs", "body", "torso", "chest", "abs", "muscular", "curvy", "petite",
    "skinny", "plump", "lips", "makeup", "nail polish", "red lips", "red nails", "nails",
];

const NSFW_KEYWORDS = [
    "nsfw", "nude", "naked", "nipples", "areola", "breasts", "boobs", "cleavage", "underboob",
    "sideboob", "pussy", "vagina", "penis", "ass", "anus", "butt", "sex", "cum", "orgasm",
    "erotic", "explicit", "uncensored", "lewd", "suggestive", "lingerie", "panties", "thong",
    "cameltoe", "topless", "bottomless", "fellatio", "testicles", "scrotum", "oral",
];

const LOOKS_EXACT_TAGS = new Set(["v"]);

const COMPOSITION_META_KEYWORDS = [
    "looking at viewer", "looking over shoulder", "from below", "from above", "side view",
    "profile", "upper body", "full body", "cowboy shot", "close-up", "close up", "dutch angle",
    "dynamic angle", "foreshortening", "head tilt", "back view", "rear view", "pov",
];

function containsKeyword(text, keywords) {
    return keywords.some((key) => text.includes(key));
}

function normalizeTagName(tag) {
    return tag.trim().toLowerCase().replace(/\s+/g, " ");
}

function tagToDanbooruQuery(token) {
    return normalizeTagName(token).replace(/\s+/g, "_");
}

function danbooruToTagText(tag) {
    return tag.replace(/_/g, " ");
}

function splitAndCleanCandidates(rawText) {
    const pieces = rawText
        .split(/[\n,;|]+/)
        .map((line) => line.trim())
        .filter(Boolean);

    const candidates = [];

    for (const piece of pieces) {
        if (piece === "?") {
            continue;
        }

        // Remove escaping used in copied tag syntax like \( and \).
        const unescaped = piece
            .replace(/\\\(/g, "(")
            .replace(/\\\)/g, ")")
            .replace(/\\_/g, "_")
            .replace(/\\/g, "");

        // Remove trailing popularity counts like 7.6M, 29k, 665
        const withoutCount = unescaped.replace(/\s+\d+(?:\.\d+)?[kmb]?$/i, "").trim();
        // Keep parentheses because Danbooru character disambiguation uses them.
        const stripped = withoutCount.replace(/[\[\]{}"']/g, " ").replace(/\s+/g, " ").trim();

        if (!stripped || stripped === "?") {
            continue;
        }

        // If we still have a long phrase, keep full phrase and key n-grams to increase hit chance.
        const words = stripped.split(" ").filter(Boolean);
        if (words.length > 3) {
            candidates.push(words.slice(0, 3).join(" "));
            candidates.push(words.slice(-3).join(" "));
        }

        candidates.push(stripped);
    }

    return [...new Set(candidates.map(normalizeTagName))];
}

async function fetchDanbooruTags(query) {
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

function pickBestTag(inputTag, apiTags) {
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

function categorizeTag(tagObj) {
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
        containsKeyword(lower, STYLE_KEYWORDS)
    ) {
        return "style";
    }

    if (containsKeyword(lower, COMPOSITION_META_KEYWORDS)) {
        return "other";
    }

    if (containsKeyword(lower, LANDSCAPE_KEYWORDS)) {
        return "landscape";
    }

    if (
        tagObj.category === TAG_CATEGORY.CHARACTER ||
        tagObj.category === TAG_CATEGORY.COPYRIGHT ||
        containsKeyword(lower, CHARACTER_IDENTITY_KEYWORDS)
    ) {
        return "character";
    }

    if (containsKeyword(lower, LOOKS_KEYWORDS)) {
        return "looks";
    }

    if (tagObj.category === TAG_CATEGORY.META) {
        return "other";
    }

    if (tagObj.category === TAG_CATEGORY.GENERAL) {
        // Fall back for general tags that do not strongly match other groups.
        return "other";
    }

    return "other";
}

function toPromptLine(tags) {
    if (!tags.length) {
        return "";
    }
    return `${tags.join(", ")},`;
}

function setStatus(message, isError = false) {
    DOM.statusText.textContent = message;
    DOM.statusText.classList.toggle("error", isError);
}

async function analyzeInput() {
    const rawText = DOM.inputText.value;
    if (!rawText.trim()) {
        setStatus("Paste text first.", true);
        return;
    }

    setStatus("Analyzing and matching tags...");
    DOM.analyzeBtn.disabled = true;

    try {
        const candidates = splitAndCleanCandidates(rawText);
        if (!candidates.length) {
            setStatus("No valid candidates found.", true);
            DOM.analyzeBtn.disabled = false;
            return;
        }

        const allMatchedMap = new Map();
        const lowConfidenceOther = [];

        for (const candidate of candidates) {
            const query = tagToDanbooruQuery(candidate);
            const matches = await fetchDanbooruTags(query);
            const best = pickBestTag(candidate, matches);

            if (!best) {
                lowConfidenceOther.push(candidate);
                continue;
            }

            if (best.score < 35) {
                lowConfidenceOther.push(candidate);
                continue;
            }

            if (best.score < 55) {
                lowConfidenceOther.push(danbooruToTagText(best.tag.name));
            }

            allMatchedMap.set(best.tag.name, best.tag);
        }

        const allMatched = [...allMatchedMap.values()];
        const buckets = {
            style: [],
            character: [],
            looks: [],
            landscape: [],
            nsfw: [],
            other: [],
        };

        for (const tag of allMatched) {
            const category = categorizeTag(tag);
            const text = danbooruToTagText(tag.name);
            buckets[category].push(text);
        }

        DOM.allTagsOutput.value = toPromptLine(allMatched.map((t) => danbooruToTagText(t.name)));
        DOM.styleOutput.value = toPromptLine([...new Set(buckets.style)]);
        DOM.characterOutput.value = toPromptLine([...new Set(buckets.character)]);
        DOM.looksOutput.value = toPromptLine([...new Set(buckets.looks)]);
        DOM.landscapeOutput.value = toPromptLine([...new Set(buckets.landscape)]);
        DOM.nsfwOutput.value = toPromptLine([...new Set(buckets.nsfw)]);
        DOM.otherOutput.value = toPromptLine([...new Set([...buckets.other, ...lowConfidenceOther])]);

        if (allMatched.length === 0) {
            setStatus("No Danbooru tags matched confidently. Try cleaner words or shorter phrases.", true);
        } else {
            setStatus(`Done. Matched ${allMatched.length} tag${allMatched.length === 1 ? "" : "s"}.`);
        }
    } catch (error) {
        console.error(error);
        setStatus("Error while reaching Danbooru. Check internet connection and try again.", true);
    } finally {
        DOM.analyzeBtn.disabled = false;
    }
}

function clearAll() {
    DOM.inputText.value = "";
    DOM.allTagsOutput.value = "";
    DOM.styleOutput.value = "";
    DOM.characterOutput.value = "";
    DOM.looksOutput.value = "";
    DOM.landscapeOutput.value = "";
    DOM.nsfwOutput.value = "";
    DOM.otherOutput.value = "";
    setStatus("Ready.");
}

async function copyFromTarget(targetId) {
    const field = document.getElementById(targetId);
    if (!field || !field.value.trim()) {
        setStatus("Nothing to copy from this field.", true);
        return;
    }

    try {
        await navigator.clipboard.writeText(field.value);
        setStatus("Copied to clipboard.");
    } catch (_error) {
        setStatus("Clipboard blocked by browser. Copy manually.", true);
    }
}

DOM.analyzeBtn.addEventListener("click", analyzeInput);
DOM.clearBtn.addEventListener("click", clearAll);
DOM.copyButtons.forEach((btn) => {
    btn.addEventListener("click", () => copyFromTarget(btn.dataset.copyTarget));
});
