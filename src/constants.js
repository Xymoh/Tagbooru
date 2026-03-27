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
    "anime screenshot", "pixelated", "pixel art", "realistic", "amazing", "amazing quality",
    // Visual Aesthetics & Art Movements
    "cyberpunk", "steampunk", "synthwave", "vaporwave", "surreal", "abstract", "impressionism", "cubism",
    "art deco", "art nouveau", "glitch art", "glitch", "low poly", "retro",
    // Techniques & Effects
    "bloom", "bokeh", "lens flare", "motion blur", "silhouette", "chiaroscuro", "chromatic aberration",
    "film grain", "gradient", "halftone", "scanlines", "dithering", "posterize",
    // Color & Tone
    "monochrome", "greyscale", "sepia", "pastel colors", "pastel", "saturated", "saturated colors",
    "muted color", "dark", "moody", "vibrant", "colorful", "limited palette", "neon palette",
    // Media Format
    "3d", "comic", "manga", "official art", "scan", "promo", "promo art", "advertisement",
    // Drawing Style
    "flat color", "vector", "vector art", "oil painting", "watercolor painting", "digital painting",
    "traditional media", "hand drawn", "sketch style", "comic book style", "comic style",
];

export const LANDSCAPE_KEYWORDS = [
    "sky", "cloud", "sunset", "sunrise", "forest", "mountain", "river", "ocean", "beach",
    "city", "street", "building", "room", "indoors", "outdoors", "background", "landscape",
    "night", "day", "rain", "snow", "storm", "garden", "field", "park", "castle", "temple",
    "space", "moon", "stars", "window", "balcony", "court", "volleyball court", "basketball court",
    "stadium", "arena", "gymnasium", "gym",
    // Additional locations from Danbooru
    "highway", "road", "pathway", "bridge", "tunnel", "cave", "cliff", "valley",
    "volcano", "desert", "savanna", "jungle", "swamp", "wetland", "meadow", "grassland",
    "waterfall", "lake", "pond", "creek", "stream", "canal", "dock", "harbor",
    "lighthouse", "tower", "ruins", "tomb", "dungeon", "fortress", "wall",
    "school", "classroom", "library", "cafeteria", "hallway", "dormitory",
    "hospital", "office", "factory", "warehouse", "store", "restaurant", "bar",
    "house", "apartment", "mansion", "cottage", "cabin", "tent", "caravan",
    "bedroom", "bathroom", "living room", "dining room", "kitchen", "basement",
    "rooftop", "balcony", "porch", "garden", "courtyard", "alley", "plaza",
    "marketplace", "village", "town", "countryside", "suburb", "metropolis",
    "train station", "bus stop", "airport", "port", "parking lot", "gas station",
    "movie theater", "amusement park", "carnival", "fair", "festival", "concert",
    "spaceship", "spacecraft", "futuristic city", "cyberpunk city", "alien planet",
];

export const CHARACTER_IDENTITY_KEYWORDS = [
    "girl", "boy", "woman", "man", "1girl", "1boy", "2girls", "2boys", "solo", "duo",
    "android", "cyborg", "elf", "demon", "angel", "catgirl", "fox girl", "schoolgirl",
    "policewoman", "zombie", "monster", "monster male", "monster female",
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
    "staff", "badge", "necktie", "holster", "streaks", "torn clothes",
    "ribbon", "vest", "collar", "metal collar", "neck ribbon", "blue ribbon", "blue vest",
    "veins", "green veins", "corruption", "corrupted",
    // Additional body parts & clothing
    "coat", "cape", "cloak", "robe", "dress", "gown", "pants", "shorts", "leggings",
    "hoodie", "sweater", "cardigan", "tank top", "tube top", "strapless", "backless",
    "apron", "bow", "bowtie", "tie", "scarf", "necklace", "choker", "pendant", "earrings",
    "bracelet", "ring", "watch", "armband", "armlet", "gauntlet", "knee high boots",
    "thigh boots", "over the knee", "zettai ryouiki", "sailor uniform", "school uniform",
    "maid outfit", "bunny ears", "halo", "crown", "tiara", "hair ornament", "hair clip",
    "headband", "bandage", "tattoo", "tattoos", "scar", "scar across eye", "muscular male",
    "crossdressing", "dress lift", "panties", "bra", "bikini", "swimsuit", "leotard",
    "white shirt", "black shirt", "colored hair", "shiny hair", "wet", "sweat", "crying",
        "dark-skinned", "dark skin", "light-skinned", "pale skin", "asian", "tanned", "dark tone",
        "veiny", "veiny penis", "large penis", "muscular male", "thick thighs", "perky breasts",
        "sagging breasts", "lactation", "milk", "drool", "spit", "sweat", "aroused", "lusty",
        "muscle definition", "toned", "fit", "chubby", "obese", "athletic", "lean",
];

export const ACTION_KEYWORDS = [
    "trembling", "under table", "speech bubble", "running", "walking", "jumping", "falling",
    "attacking", "fighting", "kicking", "punching", "pointing", "waving", "holding",
    "aiming", "shooting", "dancing", "hugging", "kissing", "crying", "laughing",
    "sitting", "standing", "lying", "kneeling", "crouching", "leaning", "posing", "defeat",
    // Additional actions & verbs
    "swimming", "flying", "riding", "driving", "climbing", "sliding", "stretching",
    "reaching", "touching", "grabbing", "throwing", "catching", "swinging", "spinning",
    "bending", "stretching", "looking", "gazing", "staring", "glancing", "peeking",
    "smiling", "frowning", "grimacing", "grinning", "yawning", "sleeping", "waking",
    "talking", "speaking", "shouting", "screaming", "singing", "playing", "eating",
    "drinking", "smoking", "writing", "drawing", "painting", "reading", "thinking",
    "praying", "meditating", "exercising", "training", "practicing", "performing",
    "jumping jacks", "push ups", "pull ups", "stretch", "yoga", "pilates", "boxing",
    "zombification", "transformation", "magic circle", "spell", "summoning",
];

export const NSFW_KEYWORDS = [
    "nsfw", "nude", "naked", "nipples", "areola", "breasts", "boobs", "cleavage", "underboob",
    "sideboob", "pussy", "vagina", "penis", "ass", "anus", "butt", "sex", "cum", "orgasm",
    "erotic", "explicit", "uncensored", "lewd", "suggestive", "lingerie", "panties", "thong",
    "cameltoe", "topless", "bottomless", "fellatio", "testicles", "scrotum", "oral",
    "censored", "bar censor", "rape", "interracial", "interspecies", "spitroast", "irrumatio",
    "cock", "cum on face", "cum on cheek", "cum on body", "internal cumshot", "facialcumshot",
];


export const LOOKS_EXACT_TAGS = new Set(["v"]);
export const STYLE_EXACT_TAGS = new Set(["zenless zone zero"]);

export const COMPOSITION_META_KEYWORDS = [
    "looking at viewer", "looking over shoulder", "from below", "from above", "side view",
    "profile", "upper body", "full body", "cowboy shot", "close-up", "close up", "dutch angle",
    "dynamic angle", "foreshortening", "head tilt", "back view", "rear view", "pov",
    "from behind", "from side", "lower body", "portrait", "head portrait", "bust shot",
    "symmetry", "panorama", "scenic", "scenery", "still life", "landscape shot", "wide shot",
    "extreme closeup", "extreme close-up", "fisheye", "bird's-eye view", "low angle", "high angle",
    "triptych", "silhouette shot", "overhead shot", "aerial view", "first person view",
    "on back", "on side", "on stomach", "on knees", "bent over", "leaning back", "arched back",
];

export const OUTPUT_KEYS = ["all", "style", "character", "looks", "composition", "landscape", "action", "nsfw", "copyright", "other"];
