export const TAG_CATEGORY = {
    GENERAL: 0,
    ARTIST: 1,
    COPYRIGHT: 3,
    CHARACTER: 4,
    META: 5,
};

export const STYLE_KEYWORDS = [
    "masterpiece", "best quality", "high quality", "8k", "4k", "cinematic", "photorealistic",
    "anime coloring", "dramatic lighting", "volumetric lighting", "depth of field", "lineart",
    "shaded", "cel shading", "render", "illustration", "ultra detailed", "detailed",
    "score_", "quality", "stylized", "painting", "watercolor", "sketch", "concept art",
];

export const LANDSCAPE_KEYWORDS = [
    "sky", "cloud", "sunset", "sunrise", "forest", "mountain", "river", "ocean", "beach",
    "city", "street", "building", "room", "indoors", "outdoors", "background", "landscape",
    "night", "day", "rain", "snow", "storm", "garden", "field", "park", "castle", "temple",
    "space", "moon", "stars", "window", "balcony", "court", "volleyball court", "basketball court",
    "stadium", "arena", "gymnasium", "gym",
];

export const CHARACTER_IDENTITY_KEYWORDS = [
    "girl", "boy", "woman", "man", "1girl", "1boy", "2girls", "2boys", "solo", "duo",
    "android", "cyborg", "elf", "demon", "angel", "catgirl", "fox girl", "schoolgirl",
    "policewoman",
];

export const CHARACTER_IDENTITY_EXACT_TAGS = new Set(["police", "bangboo"]);

export const LOOKS_KEYWORDS = [
    "hair", "eyes", "face", "smile", "expression", "dress", "shirt", "skirt", "jacket",
    "gloves", "boots", "stockings", "ears", "tail", "horns", "wings", "weapon", "sword", "gun",
    "hips", "thigh", "thighs", "waist", "navel", "midriff", "skin", "braid", "braids", "crop top",
    "uniform", "elbow gloves", "twintails", "very long hair", "long hair", "green hair", "green eyes",
    "bangs", "arched bangs", "sleeveless", "sleeveless shirt", "piercing", "animal ear piercing",
    "ear piercing", "fringe", "ponytail", "bob cut", "blush", "lipstick", "eyeliner", "eyeshadow",
    "freckles", "fang", "fangs", "body", "torso", "chest", "abs", "muscular", "curvy", "petite",
    "skinny", "plump", "lips", "makeup", "nail polish", "red lips", "red nails", "nails",
    "staff", "badge", "necktie", "holster", "streaks",
    "ribbon", "vest", "collar", "metal collar", "neck ribbon", "blue ribbon", "blue vest",
];

export const ACTION_KEYWORDS = [
    "trembling", "under table", "speech bubble", "running", "walking", "jumping", "falling",
    "attacking", "fighting", "kicking", "punching", "pointing", "waving", "holding",
    "aiming", "shooting", "dancing", "hugging", "kissing", "crying", "laughing",
    "sitting", "standing", "lying", "kneeling", "crouching", "leaning", "posing",
];

export const NSFW_KEYWORDS = [
    "nsfw", "nude", "naked", "nipples", "areola", "breasts", "boobs", "cleavage", "underboob",
    "sideboob", "pussy", "vagina", "penis", "ass", "anus", "butt", "sex", "cum", "orgasm",
    "erotic", "explicit", "uncensored", "lewd", "suggestive", "lingerie", "panties", "thong",
    "cameltoe", "topless", "bottomless", "fellatio", "testicles", "scrotum", "oral",
    "censored", "bar censor",
];

export const LOOKS_EXACT_TAGS = new Set(["v"]);
export const STYLE_EXACT_TAGS = new Set(["zenless zone zero"]);

export const COMPOSITION_META_KEYWORDS = [
    "looking at viewer", "looking over shoulder", "from below", "from above", "side view",
    "profile", "upper body", "full body", "cowboy shot", "close-up", "close up", "dutch angle",
    "dynamic angle", "foreshortening", "head tilt", "back view", "rear view", "pov",
];

export const OUTPUT_KEYS = ["all", "style", "character", "looks", "landscape", "action", "nsfw", "other"];
