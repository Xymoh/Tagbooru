export const TAG_CATEGORY = {
    GENERAL: 0,
    ARTIST: 1,
    COPYRIGHT: 3,
    CHARACTER: 4,
    META: 5,
};

export const DANBOORU_TAG_CSV_PATH = "/danbooru_tags_post_count.csv";

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
    // Natural outdoor environments
    "sky", "cloud", "clouds", "sunset", "sunrise", "dusk", "dawn", "twilight", "night",
    "day", "daytime", "morning", "afternoon", "evening", "midnight", "noon",
    "forest", "woods", "woodland", "jungle", "rainforest", "deciduous forest", "coniferous forest",
    "meadow", "field", "grassland", "prairie", "savanna", "steppe",
    "mountain", "mountains", "mountain range", "hill", "hills", "rolling hills", "mountain peak",
    "valley", "canyon", "gorge", "ravine", "crevasse", "chasm",
    "river", "stream", "creek", "brook", "waterfall", "rapids", "whitewater",
    "lake", "pond", "lagoon", "marsh", "swamp", "wetland", "bog", "mire",
    "ocean", "sea", "beach", "shore", "coastline", "tidal flat", "mudflat", "reef",
    "island", "archipelago", "atoll", "peninsula", "delta", "estuary",
    "desert", "dunes", "sand dunes", "oasis", "salt flat", "salt lake",
    "volcano", "volcanic", "lava", "hot spring", "geyser", "thermal vent",
    "cave", "cavern", "grotto", "stalactite", "stalagmite", "underground",
    "cliff", "cliff face", "rock face", "escarpment", "overhang", "arch", "natural arch",
    "ice", "glacier", "iceberg", "frozen", "snowy", "snow", "snowfield", "avalanche",
    "weather", "rain", "raining", "stormy", "storm", "thunderstorm", "lightning", "thunder",
    "wind", "windy", "blizzard", "hail", "sleet", "frost", "dew", "mist", "fog", "foggy",
    "space", "outer space", "starry sky", "stars", "moon", "full moon", "crescent moon",
    "planet", "planets", "satellite", "orbit", "cosmic", "galactic", "nebula", "quasar",
    "alien planet", "alien landscape", "mars", "lunar surface", "moon surface",
    
    // Urban & human structures
    "city", "town", "village", "metropolis", "cityscape", "urban", "urbanscape",
    "street", "street scene", "alley", "alleyway", "lane", "pathway", "path", "road", "highway",
    "intersection", "crossing", "pedestrian crossing", "traffic", "traffic light",
    "sidewalk", "pavement", "asphalt", "concrete", "cobblestone", "brick pavement",
    "building", "office", "office building", "skyscraper", "tall building", "architecture",
    "house", "residential", "neighborhood", "suburb", "suburban", "suburban street",
    "apartment", "apartment building", "condo", "townhouse", "mansion", "estate",
    "cabin", "cottage", "shack", "hut", "pagoda", "pavilion", "gazebo",
    "church", "cathedral", "temple", "shrine", "mosque", "synagogue", "monastery",
    "castle", "palace", "fortress", "fort", "keep", "tower", "watchtower", "castle tower",
    "ruins", "ruins of", "ruin", "ancient ruins", "archaeological", "archaeological site",
    "wall", "stone wall", "brick wall", "defensive wall", "city wall", "castle wall",
    "gate", "city gate", "main gate", "temple gate", "archway", "arch", "tunnel", "underpass",
    "bridge", "arched bridge", "stone bridge", "wooden bridge", "suspension bridge",
    "building entrance", "doorway", "portal", "archway", "threshold",
    "plaza", "square", "courtyard", "open courtyard", "central courtyard", "pavilion",
    "marketplace", "market", "bazaar", "vendor stall", "shop", "store", "storefront",
    "restaurant", "cafe", "cafeteria", "bar", "pub", "tavern", "inn", "hotel",
    "hospital", "medical", "clinic", "pharmacy", "laboratory", "lab",
    "factory", "factory building", "warehouse", "warehouse district", "industrial", "industrial area",
    "school", "schoolhouse", "academy", "college", "university", "campus", "classroom",
    "library", "study", "archive", "museum", "gallery", "theater", "cinema", "auditorium",
    "park", "public park", "urban park", "national park", "state park", "park path",
    "garden", "garden path", "botanical garden", "zen garden", "japanese garden", "flower garden",
    "playground", "playground equipment", "jungle gym", "sandbox", "swing", "slide",
    "sports facility", "stadium", "arena", "coliseum", "amphitheater",
    "gymnasium", "gym", "fitness center", "tennis court", "basketball court", "volleyball court",
    "pool", "swimming pool", "indoor pool", "swimming hole", "pond", "fountain",
    "fountain", "water fountain", "decorative fountain", "public fountain",
    "monument", "memorial", "statue", "sculpture", "obelisk", "column",
    
    // Industrial & transportation
    "dock", "harbor", "port", "seaport", "marina", "pier", "wharf", "jetty",
    "airport", "airfield", "landing strip", "runway", "tarmac", "hangar",
    "train station", "train platform", "rail yard", "railway", "railroad", "train track",
    "bus station", "bus terminal", "bus stop", "transit station", "subway station",
    "highway", "expressway", "freeway", "motorway", "toll road", "winding road",
    "parking", "parking lot", "parking garage", "multi-story parking",
    "gas station", "service station", "fuel pumps", "fuel station",
    "toll booth", "checkpoint", "customs", "border crossing",
    "lighthouse", "light tower", "observation tower", "bell tower", "water tower",
    "power plant", "nuclear plant", "wind turbine", "solar panel", "power line",
    "antenna", "radio tower", "transmission tower", "broadcasting tower",
    
    // Room interiors & furniture
    "room", "interior", "indoors", "inside", "indoor environment",
    "bedroom", "master bedroom", "dorm room", "dormitory", "bedroom wall",
    "bathroom", "shower", "bathtub", "sink", "toilet", "mirror",
    "living room", "lounge", "parlor", "sitting room", "family room",
    "dining room", "dinner table", "dining table", "banquet hall",
    "kitchen", "kitchenette", "kitchen counter", "cooking area",
    "study", "study room", "office", "home office", "desk", "office desk",
    "library", "book shelf", "bookcase", "bookshelf", "book collection",
    "hallway", "hallway floor", "hallway wall", "corridor", "passage", "walkway",
    "staircase", "stairs", "steps", "escalator", "elevator", "lift",
    "basement", "cellar", "underground room", "dungeon", "crypt", "vault",
    "attic", "loft", "upper floor", "second story",
    "balcony", "terrace", "patio", "deck", "porch", "entryway", "foyer", "lobby",
    "wall", "ceiling", "floor", "flooring", "hardwood floor", "tile floor", "marble floor",
    "carpet", "rug", "area rug", "carpeted", "tile", "ceramic tile", "linoleum",
    "wall paneling", "wallpaper", "wall color", "painted wall", "white wall", "stone wall",
    "lighting", "light fixture", "lighting fixture", "lamp", "table lamp", "floor lamp",
    "chandelier", "pendant light", "spotlight", "flashlight", "candle", "fireplace", "fire",
    
    // Furniture & fixtures
    "bed", "double bed", "single bed", "queen bed", "king bed", "bunk bed", "bed frame",
    "sofa", "couch", "loveseat", "sectional", "ottoman", "chair", "armchair", "recliner",
    "bench", "park bench", "wooden bench", "church bench", "seating area",
    "table", "dining table", "coffee table", "side table", "end table", "desk", "workbench",
    "counter", "kitchen counter", "bar counter", "countertop", "checkout counter",
    "cabinet", "bookcase", "shelving", "shelf", "shelves", "storage cabinet", "wardrobe",
    "dresser", "nightstand", "nighttable", "vanity", "mirror stand",
    "closet", "closet door", "wardrobe", "coat rack", "hat rack", "hanger",
    "curtain", "curtains", "drapes", "blinds", "shades", "window covering", "window blind",
    "door", "wooden door", "glass door", "metal door", "sliding door", "double door",
    "window", "window pane", "windowsill", "window frame", "stained glass", "bay window",
    "picture", "picture frame", "painting", "portrait", "artwork", "framed art",
    "rug", "area rug", "throw rug", "floor rug", "wall hanging",
    "plant", "potted plant", "flower pot", "planter", "flowers", "decoration",
    "pottery", "vase", "urn", "pot", "pitcher", "bottle", "glass",
    "dishware", "dishes", "plate", "bowl", "cup", "mug", "spoon", "fork", "knife",
    "cutlery", "utensil", "cooking utensil", "pot", "pan", "kettle", "teapot",
    "appliance", "refrigerator", "stove", "oven", "microwave", "dishwasher",
    "television", "tv", "screen", "monitor", "computer", "desktop", "laptop",
    "telephone", "phone", "rotary phone", "mobile phone", "cellphone",
    "clock", "wall clock", "grandfather clock", "pendulum clock", "alarm clock",
    "decorative item", "ornament", "figurine", "statue", "sculpture",
    "rug", "floor covering", "carpet",
    
    // Outdoor furniture
    "bench", "park bench", "picnic table", "picnic area",
    "patio furniture", "lawn chair", "patio chair", "deck chair", "beach chair",
    "gazebo", "pavilion", "pergola", "arbor", "trellis", "fence", "fence post",
    "mailbox", "trash can", "garbage bin", "dumpster", "recycling bin",
    "street lamp", "street light", "lamp post", "light post", "traffic light",
    "traffic sign", "road sign", "sign", "street sign", "billboard", "poster",
    "bench", "outdoor bench", "park bench", "rest stop",
    "playground equipment", "jungle gym", "sandbox", "seesaw", "swing set", "teeter totter",
    "sports equipment", "bleachers", "press box", "broadcast booth",
    
    // Special environments
    "backstage", "stage", "stage area", "wings", "stage left", "stage right",
    "locker room", "player locker room", "changing room", "changing area",
    "green room", "waiting room", "reception", "reception room",
    "medical office", "doctor's office", "operating room", "surgery", "surgical theater",
    "dungeon", "prison", "jail cell", "cell", "dungeon cell", "holding cell",
    "tomb", "burial chamber", "mausoleum", "crypt", "catacomb",
    "circus tent", "big top", "carnival tent", "fair ground",
    "aquarium", "zoo", "wildlife habitat", "enclosure", "cage",
    "spaceship", "spacecraft", "alien ship", "futuristic interior", "sci-fi interior",
    "cockpit", "cabin", "bridge", "command center", "mission control",
    "lab", "research lab", "laboratory", "test chamber", "specimen chamber",
    "alternate dimension", "void", "abstract space", "surreal landscape",
];

export const CHARACTER_IDENTITY_KEYWORDS = [
    "girl", "boy", "woman", "man", "male", "female", "1girl", "1boy", "2girls", "2boys", "solo", "duo",
    "android", "cyborg", "elf", "demon", "angel", "catgirl", "fox girl", "schoolgirl",
    "policewoman", "zombie", "monster", "monster male", "monster female",
];

export const CHARACTER_IDENTITY_EXACT_TAGS = new Set(["police", "bangboo", "character name"]);

export const LOOKS_KEYWORDS = [
    // Hair styles & colors
    "hair", "very long hair", "long hair", "short hair", "medium hair", "half up half down", "thick hair",
    "straight hair", "wavy hair", "curly hair", "flowing hair", "hair over shoulder", "hair over one eye",
    "hair over shoulder", "hair pull", "hair tie", "hair ornament", "hair clip", "hair between eyes",
    "bangs", "arched bangs", "blunt bangs", "side bangs", "swept bangs", "hime cut", "twintails",
    "twin braids", "pigtails", "double bun", "bun", "ponytail", "high ponytail", "low ponytail",
    "half up ponytail", "side ponytail", "braid", "braids", "french braid", "side braid", "long braids",
    "beehive", "ringlets", "spiral curls", "wavy", "waves", "permed", "bob cut", "pixie cut", "choppy",
    "layered", "mullet", "shag", "deathhawk", "spiked hair", "mohawk", "updo", "top knot", "fringe",
    "fringes", "side tail", "streaks", "hair streaks", "highlighted", "highlights", "colored hair",
    "green hair", "blue hair", "red hair", "pink hair", "white hair", "black hair", "brown hair",
    "orange hair", "purple hair", "yellow hair", "silver hair", "golden hair", "blonde", "gray hair",
    "grey hair", "dyed hair", "shiny hair", "glossy hair", "twin tails", "absurdly long hair",
    
    // Facial features
    "eyes", "green eyes", "blue eyes", "red eyes", "purple eyes", "yellow eyes", "brown eyes", "black eyes",
    "amber eyes", "hazel eyes", "grey eyes", "gray eyes", "heterochromia", "different colored eyes",
    "cross-eyed", "eyes closed", "eye contact", "half-closed eyes", "heavy-lidded", "sleepy eyes",
    "wide eyes", "large eyes", "small eyes", "slanted eyes", "sharp eyes", "gentle eyes", "sad eyes",
    "happy eyes", "angry eyes", "scared eyes", "evil eyes", "kind eyes", "cold eyes", "warm eyes",
    "eyebrows", "thick eyebrows", "thin eyebrows", "connected eyebrows", "high eyebrows", "low eyebrows",
    "eyeshadow", "eyeliner", "eyelashes", "long eyelashes", "blush", "rosy cheeks", "cheek blush",
    "freckles", "mole", "beauty mark", "dimple", "smile", "smirk", "grin", "frown", "pout", "open mouth",
    "mouth", "lips", "red lips", "lipstick", "glossy lips", "full lips", "thin lips", "heart-shaped mouth",
    "tongue out", "fangs", "fang", "large fangs", "sharp teeth", "teeth", "buck teeth", "overbite",
    "expression", "blank expression", "cold expression", "gentle expression", "sad expression", "happy expression",
    
    // Body features & build
    "body", "torso", "chest", "breasts", "small breasts", "medium breasts", "large breasts", "very large breasts",
    "perky breasts", "sagging breasts", "breast focus", "swimsuit", "bikini", "one-piece swimsuit", "school swimsuit",
    "cleavage", "underboob", "sideboob", "abs", "six pack", "abdominal muscles", "muscular", "muscle definition",
    "toned", "fit", "athletic", "lean", "thin", "slim", "petite", "tiny", "skinny", "chubby", "curvy",
    "thick", "plump", "tall", "short", "stature", "hips", "wide hips", "thighs", "thick thighs", "thigh gap",
    "waist", "slim waist", "wide waist", "butt", "large butt", "flat butt", "legs", "long legs", "short legs",
    "calves", "ankles", "feet", "toes", "navel", "belly button", "midriff", "exposed midriff", "crop top",
    "stomach", "skin", "pale skin", "fair skin", "light skin", "light-skinned", "dark skin", "dark-skinned", "back",
    "tanned", "tan skin", "brown skin", "white skin", "golden skin", "greenish skin", "blue skin", "grey skin",
    "tone", "light tone", "dark tone", "ash tone", "warm tone", "cool tone", "veined", "veins", "veiny",
    
    // Accessories & adornments
    "accessory", "accesories", "jewelry", "earrings", "long earrings", "dangling earrings", "hoop earrings",
    "necklace", "pendant", "choker", "chain", "chain necklace", "beaded necklace", "gem necklace",
    "bracelet", "wrist cuff", "armband", "armlet", "gauntlet", "band", "cuff", "ring", "rings", "rings on fingers",
    "watch", "pocket watch", "headband", "hairband", "metal hairband", "bandeau", "headpiece", "crown", "tiara", "diadem", "circlet",
    "halo", "angelic halo", "hair ornament", "hair clip", "hair stick", "hair comb", "hair fork",
    "flower", "flowers", "lace", "feather", "feathers", "ribbons", "ribbon", "bow", "bowtie",
    "bells", "bell", "bells on clothing", "beads", "beaded", "pearls", "gemstones", "gem",
    "studs", "studs on clothing", "spikes", "spikes on clothing", "spike", "chains", "chain link",
    
    // Clothing - Upper body
    "shirt", "white shirt", "black shirt", "colored shirt", "blouse", "top", "tank top", "tube top",
    "halter top", "sleeveless", "sleeveless shirt", "t-shirt", "long-sleeved", "long sleeves", "short sleeves",
    "puffy sleeves", "puffed sleeves", "bell sleeves", "flutter sleeves", "elbow length sleeves", "wrist cuffs",
    "shirt collar", "turtleneck", "high collar", "mock neck", "peter pan collar", "sailor collar",
    "chinese collar", "mandarin collar", "strapless", "backless", "cropped", "crop top", "fitted",
    "oversized", "loose", "baggy", "pleated", "ruched", "ruffled", "frilly", "frills", "ruffles",
    "lace", "lace trim", "lace sleeves", "cross-laced", "laced", "tied", "bow", "button-up", "buttons",
    "zipper", "zip-up", "front-zip", "back-zip", "cut-out", "cutout", "asymmetrical", "asymmetric",
    "transparent", "see-through", "sheer", "opaque", "patterned", "striped", "checkered", "plaid",
    "polka dot", "print", "solid", "leather", "silk", "satin", "cotton", "wool", "mesh",
    "jacket", "gakuran", "blazer", "cardigan", "sweater", "hoodie", "sweatshirt", "vest", "waistcoat",
    "coat", "coat tails", "trench coat", "overcoat", "denim jacket", "leather jacket", "bomber jacket",
    "cape", "cloak", "robe", "kimono", "half-open kimono", "yukata", "happi", "hanfu", "cheongsam",
    "qipao", "school uniform", "sailor uniform", "gakuran", "academy uniform", "military uniform",
    "combat uniform", "police uniform", "maid outfit", "maid uniform", "apron", "pinafore", "bib apron",
    "dress", "gown", "ball gown", "evening gown", "cocktail dress", "mini dress", "short dress",
    "knee-length dress", "long dress", "maxi dress", "sunburst skirt", "asymmetrical dress",
    
    // Clothing - Lower body
    "skirt", "short skirt", "miniskirt", "mini skirt", "knee-length skirt", "long skirt", "maxi skirt",
    "puffed skirt", "puffed out skirt", "layered skirt", "ruched skirt", "split skirt", "overskirt",
    "pleated skirt", "pleat skirt", "accordion pleats", "knife pleats", "box pleats", "plaid skirt",
    "school skirt", "sailor skirt", "flared skirt", "a-line skirt", "tight skirt", "pencil skirt",
    "tulle skirt", "tutu", "frilly skirt", "frills", "ruffled skirt", "ruffles", "lace skirt",
    "mesh skirt", "see-through skirt", "sheer skirt", "translucent", "no panties", "pantyless",
    "pants", "trousers", "slacks", "dress pants", "leggings", "tights", "pantyhose", "stockings",
    "thigh highsocks", "thigh highs", "kneehighs", "knee highs", "ankle socks", "socks",
    "over-kneesocks", "zettai ryouiki", "absolute territory", "shorts", "short shorts", "daisy dukes",
    "hotpants", "boyshorts", "running shorts", "sweatpants", "joggers", "yoga pants", "leggings",
    "gloves", "blue gloves", "white gloves", "black gloves", "thighhighs", "brown thighhighs",
    "capris", "capri pants", "cropped pants", "skinny jeans", "jeans", "denim", "cargo pants",
    "camo pants", "leather pants", "vinyl pants", "latex pants", "mesh pants", "see-through pants",
    "bermuda shorts", "overall shorts", "romper", "jumpsuit", "onesie",
    
    // Footwear
    "shoes", "boots", "ankle boots", "knee boots", "knee-high boots", "over-the-knee boots", "thigh boots",
    "thigh-high boots", "combat boots", "platform boots", "cowboy boots", "go-go boots", "saddle shoes",
    "mary janes", "ballet flats", "oxfords", "loafers", "slip-ons", "sneakers", "athletic shoes",
    "converse", "canvas shoes", "high heels", "high-heeled boots", "heeled boots", "stilettos", "pumps",
    "wedges", "platform shoes", "platform heels", "strappy heels", "sandals", "flip-flops", "slippers",
    "barefoot", "bare feet", "tabi socks", "ninja tabi", "socks", "stockings", "hosiery",
    
    // Legwear details
    "stockings", "thigh stockings", "thigh-highs", "knee-high", "knee highs", "tube socks", "crew socks",
    "animal socks", "striped socks", "patterned socks", "lace stockings", "mesh stockings", "fishnets",
    "fishnet stockings", "pantyhose", "tights", "opaque tights", "patterned tights", "striped tights", "polka dot tights",
    "stocking seams", "torn stockings", "ripped stockings", "holes in stockings",
    
    // Head & Ear features
    "ears", "elf ears", "pointed ears", "long ears", "floppy ears", "cat ears", "fox ears", "dog ears",
    "animal ears", "animal ear fluff", "halo", "halo of light", "angel halo", "devil horns",
    "horns", "curved horns", "long horns", "spiral horns", "exaggerated facial features",
    
    // Other body modifications
    "tail", "tails", "fox tail", "cat tail", "dog tail", "wolf tail", "multiple tails", "fluffy tail",
    "wings", "angel wings", "demon wings", "fairy wings", "dragon wings", "big wings", "large wings",
    "small wings", "wings open", "feathers", "feathered wings", "bat wings", "halo",
    "tattoo", "tattoos", "tattoo on arm", "tattoo on back", "tattoo on chest", "sleeve tattoo",
    "scar", "scar on face", "scar over eye", "scar on cheek", "scar on arm", "bandages", "bandage",
    "bandaged", "eye patch", "monocle", "glasses", "eyeglasses", "spectacles", "round glasses",
    "cat eye glasses", "heart-shaped glasses", "sunglasses", "dark glasses", "goggles", "lab goggles",
    "contacts", "contact lenses", "mask", "masquerade mask", "face mask", "medical mask",
    "piercing", "ear piercing", "nose piercing", "lip piercing", "tongue piercing", "navel piercing",
    "body piercing", "animal ear piercing", "chain piercing",
    
    // Makeup & beauty
    "makeup", "eyeliner", "winged eyeliner", "eyeshadow", "eye makeup", "lipstick", "lip gloss",
    "glossy lips", "red lipstick", "red lips", "matte lipstick", "foundation", "concealer", "blush",
    "rouge", "highlight", "contour", "mascara", "eyebrow pencil", "eyebrow makeup", "beauty mark",
    "mole", "beauty spot", "nail polish", "nails", "red nails", "nail art", "manicure", "pedicure",
    "nail color", "long nails", "short nails", "painted nails", "french tips",
    
    // Condition descriptors
    "wet", "wet hair", "wet clothes", "dripping", "dripping water", "dripping wet",
    "sweat", "sweating", "sweat drops", "sweat trail", "sweaty", "glistening", "shiny",
    "torn", "torn clothes", "ripped", "ripped clothes", "damaged", "battle damaged", "clothing damage",
    "covered", "covered in", "covered in mud", "dirty", "muddy", "stained", "blood stained",
    "scratchy", "rough", "weathered", "worn", "worn clothes", "tattered",
];

export const LOOKS_EXACT_TAGS = new Set([
    "v", "open mouth", "underwear", "cross-laced clothes", "cross-laced top",
    "condom", "animal ear fluff", "frills", "hetero",
]);

export const STYLE_EXACT_TAGS = new Set(["zenless zone zero"]);

export const ACTION_KEYWORDS = [
    // Movement & locomotion
    "walking", "running", "sprinting", "jogging", "creeping", "crawling", "dragging",
    "jumping", "leaping", "hopping", "bouncing", "flying", "floating", "hovering", "gliding",
    "falling", "tumbling", "rolling", "sliding", "skidding", "spinning", "twirling", "dancing",
    "waltzing", "swaying", "shimmying", "shaking", "vibrating", "trembling", "shivering", "quivering",
    "swinging", "swung", "lunging", "charging", "rushing", "charging in", "diving", "diving down",
    "swimming", "wading", "surfing", "skateboarding", "roller skating", "ice skating", "cycling",
    "riding", "galloping", "trotting", "climbing", "clambering", "scrambling", "scaling",
    "descending", "going down", "going up", "ascending", "sinking", "submerging", "emerging",
    
    // Gestures & hand positions
    "reaching", "reaching out", "reaching for", "touching", "grabbing", "holding", "grasping",
    "gripping", "clasping", "clutching", "clenching", "releasing", "dropping", "letting go",
    "throwing", "tossing", "hurling", "catching", "intercepting", "blocking", "parrying",
    "punch", "punching", "striking", "hitting", "slapping", "smacking", "swatting", "whipping",
    "kicking", "kicking up", "stomping", "stepping", "treading", "walking on", "stomping on",
    "pointing", "pointing at", "waving", "waving hand", "beckoning", "gesturing", "signaling",
    "placing hand", "placing hands", "resting hand", "hands on hips", "hands behind head",
    "hand on chest", "hands on face", "hands holding", "hands together", "hands clasped",
    "hands on another's shoulders", "hands on another's legs", "touching chest", "touching head",
    "arms crossed", "arms folded", "arms up", "arms raised", "arms outstretched", "arms extended",
    "arm around", "arm over", "arm between", "leg over", "leg between", "feet together", "feet apart",
    "standing on", "standing in", "sitting on", "sitting in", "lying on", "lying down", "kneeling",
    "crouching", "squatting", "bending", "bending forward", "bending over", "leaning", "leaning back",
    "leaning forward", "arching back", "stretching", "yawning", "sleeping", "napping", "resting",
    
    // Combat & conflict
    "fighting", "battle", "combat", "sparring", "dueling", "confronting", "attacking", "assaulting",
    "charging at", "lunging at", "slashing", "striking", "smashing", "breaking", "destroying",
    "defeating", "flying", "evading", "retreating", "fleeing", "escaping", "hurting", "wounding",
    "aiming", "aiming at", "shooting", "shooting at", "firing", "casting", "casting spell",
    "summoning", "magic", "spell casting", "using magic", "enchantment",
    
    // Emotional expressions & reactions
    "smiling", "grinning", "laughing", "chuckling", "snickering", "giggling", "cackling",
    "crying", "weeping", "sobbing", "wailing", "whimpering", "shedding tears", "tears",
    "frowning", "pouting", "grimacing", "scowling", "glaring", "staring", "gazing", "looking",
    "glancing", "peeking", "peering", "observing", "watching", "seeing", "witnessing",
    "yawning", "sighing", "gasping", "catching breath", "breathless", "surprised", "shocked",
    "amazed", "delighted", "pleased", "angry", "furious", "enraged", "annoyed", "irritated",
    "sad", "melancholy", "lonely", "depressed", "happy", "cheerful", "excited", "thrilled",
    "afraid", "scared", "frightened", "terrified", "panicked", "worried", "confused", "bewildered",
    "determined", "focused", "concentrating", "thinking", "pondering", "contemplating", "meditating",
    
    // Physical states & conditions
    "standing", "standing still", "standing up", "sitting", "sitting down", "lying", "lying down",
    "on back", "on stomach", "on side", "on all fours", "on knees", "kneeling down", "crouching down",
    "bent over", "leaning back", "leaning forward", "leaning on", "supported by", "held by",
    "hugging", "hugging someone", "embracing", "cuddling", "snuggling", "spooning", "kissing",
    "kissing someone", "kissing hand", "licking", "nibbling", "biting", "sucking",
    "pinned", "bound", "tied", "restrained", "held down", "pushed", "pinned against",
    "on another's lap", "on another's shoulders", "on another's legs", "straddling", "mounted",
    
    // Actions with objects
    "holding", "holding hands", "holding sword", "holding gun", "holding weapon", "wielding",
    "carrying", "carrying over shoulder", "carrying bridal style", "on foot", "on horseback",
    "holding shield", "holding staff", "holding book", "reading", "holding pen", "writing",
    "holding drink", "drinking", "holding food", "eating", "holding cigarette", "smoking",
    "holding phone", "using phone", "holding camera", "taking photo", "holding jewel",
    "picking up", "picking", "collecting", "gathering", "grabbing", "snatching", "stealing",
    
    // Speech & communication
    "talking", "speaking", "chatting", "saying", "shouting", "yelling", "screaming", "shrieking",
    "calling", "calling out", "beckoning", "instructing", "ordering", "commanding", "requesting",
    "asking", "whispering", "muttering", "mumbling", "stuttering", "speaking softly",
    "speech bubble", "talking to", "listening", "hearing", "silent", "quiet", "keeping quiet",
    
    // Complex actions
    "trembling", "under table", "zombification", "transformation", "magic circle", "spell",
    "summoning", "materializing", "vanishing", "disappearing", "teleporting", "dimension shift",
    "time stop", "slow motion", "frozen", "petrified", "corrupted", "possessed",
    
    // Sports & activities
    "playing sports", "playing soccer", "playing basketball", "playing volleyball", "playing tennis",
    "practicing", "training", "exercising", "working out", "running laps", "doing pushups",
    "doing situps", "boxing", "wrestling", "yoga", "pilates", "stretching",
];

export const NSFW_KEYWORDS = [
    // Nudity & exposure
    "nsfw", "explicit", "uncensored", "censored", "bar censor", "mosaic censor", "pixelated censor",
    "nude", "naked", "full nude", "partial nude", "topless", "bottomless", "completely nude",
    "nipples", "nude nipples", "exposed nipples", "areola", "areolae", "areolas",
    "breast", "breasts", "boobs", "booby", "breast focus", "breast emphasis",
    "cleavage", "deep cleavage", "underboob", "underboob emphasis", "sideboob", "side boob",
    
    // Genitalia & sexual anatomy
    "pussy", "vagina", "vulva", "labia", "genital", "genitalia", "cunnilingus",
    "penis", "cock", "dick", "phallus", "erect", "erection", "hard", "bulge",
    "testicle", "testicles", "balls", "scrotum", "ballsack", "testes",
    "ass", "asshole", "anus", "anal", "butt", "butthole",
    
    // Sexual acts & situations
    "sex", "sexual", "fucking", "fuck", "sexual intercourse", "intercourse", "69", "groping", "handjob",
    "penetration", "penetrating", "inserted", "insertion", "cock insertion",
    "cum", "cumshot", "ejaculation", "semen", "jizz", "spunk",
    "cum on face", "facial", "facial cumshot", "cum on cheek", "cum on breast", "cum on pussy",
    "cum on ass", "cum on body", "cumjob", "facial",
    "internal cumshot", "creampie", "cum inflation", "impregnation", "pregnancy",
    "bukkake", "multiple cumshot", "spunk overlapping",
    "impregnation", "creampie", "pregnancy", "pregnant", "pregnant belly",
    "lactation", "lactate", "milk", "suckling", "breast milk",
    "orgasm", "climax", "orgasmic", "cumming", "moaning", "pleasure",
    "arousal", "aroused", "lusty", "lecherous", "horny", "sexual desire", "sexual attraction",
    
    // Oral sex
    "blowjob", "blow job", "oral sex", "fellatio", "felatio", "sucking", "sucking penis", "sucking cock",
    "licking", "tongue", "mouth", "oral", "oral penetration",
    "tongue in mouth", "french kiss", "deep kiss", "passionate kiss",
    "irrumatio", "facefucking", "face fucking", "throat deep", "deep throat",
    
    // Anal sex
    "anal", "anal sex", "anal intercourse", "anal penetration", "anal insertion",
    "anal orgasm", "anal pleasure", "anal pain", "receiving anal", "giving anal",
    
    // BDSM & domination
    "bdsm", "bondage", "bound", "binding", "tied", "tied up", "restrained", "restraint",
    "rope", "rope bondage", "shibari", "kinbaku", "hogtied", "hog tied",
    "chains", "chained", "shackles", "handcuffs", "cuffs", "manacles", "fetters",
    "collar", "slave collar", "dog collar", "collar and leash",
    "leash", "leashed", "led around", "dominance", "submission", "submissive",
    "master", "master and slave", "dominant", "dom", "sub", "slave",
    "spanking", "whipping", "flogging", "paddle", "flogger", "caning", "beating",
    "humiliation", "humiliated", "public", "public sex", "public humiliation",
    "gagging", "gagged", "gag", "ball gag", "mouth gag", "silenced",
    "blindfold", "blindfolded", "sensory deprivation", "blindfold bondage",
    
    // Fetish content
    "fetish", "fetish content", "foot fetish", "feet", "foot worship", "footjob",
    "stockings", "pantyhose", "hosiery", "lingerie", "underwear", "panties", "bra",
    "thong", "transparent clothes", "see-through", "wet clothes", "clothing damage",
    "cumstain", "stained", "stain", "dirty", "soiled", "mess", "messy",
    "sweat", "sweating", "drool", "drooling", "saliva", "spit", "spitting",
    "tears", "crying", "crying tears", "painful", "pain", "hurting",
    "ahegao", "ahegao face", "cum face", "contorted face", "pleasure face", "ecstasy",
    "excessive cum", "cum pool", "cum puddle", "overfilled", "overflow",
    "tentacle", "tentacles", "tentacle sex", "tentacle penetration",
    "monster", "monster sex", "creature", "beast", "bestial", "zoophilia",
    "latex", "latex clothing", "rubber", "rubber suit", "catsuit", "bodysuit",
    "leather", "leather clothing", "leather outfit", "leather fetish",
    "high heels", "heeled", "platform heels", "stilettos", "heel fetish",
    "selfcest", "cloneji", "twin", "sibling", "siblings",
    
    // Unusual sexual situations
    "rape", "nonconsent", "non-consensual", "forced", "forcing", "unwilling",
    "drugged", "drugging", "incest", "father", "mother", "sibling", "family",
    "public sex", "public", "exhibitionism", "voyeurism", "voyeur", "peeping",
    "glory hole", "anonymous", "gloryhole",
    "necrophilia", "corpse", "dead body", "undead", "zombie sex",
    "age progression", "gender transformation", "tf", "transformation",
    
    // Body fluids & reactions
    "piss", "urinating", "urination", "golden shower", "watersports", "precum", "pussy juice",
    "queef", "queefing", "squirt", "squirting", "female ejaculation",
    "drool", "drooling", "saliva", "spittle", "spit", "spitting",
    "blood", "bloody", "bleeding", "blood play", "menstruation", "period",
    "sweat", "sweating", "perspiration", "shiny", "glistening", "wet",
    "excess bodily fluids", "excessive", "overflow", "leaking", "seeping",
    
    // Clothing & removal
    "pantsu", "crotch seam", "seamstress", "no panties", "pantyless", "panty pull",
    "undressing", "undress", "stripping", "strip tease", "toplessness", "partial undress",
    "loose shirt", "loose clothing", "slipping out", "slipping",
    "dress lift", "dress up", "skirt lift", "lifted skirt", "raised skirt",
    "shorts pulled down", "pants down", "zipper open", "zipper", "unbuttoned", "unbuckled",
    "bulge", "visible penis", "visible arousal", "shorts bulge", "pants bulge",
    "condom", "condom wrapper", "protection", "birth control", "safe sex",
    "bareback", "no condom", "raw", "creampie", "internal cumshot",
    "vibrator", "dildo", "sex toy", "sex toys", "vibrating", "pleasure toy",
    "horngasm", "pleasure", "ecstasy", "bliss", "satisfied", "content",
    
    // Sexual orientations & attraction
    "hetero", "heterosexual", "heterosexuality", "straight", "straight couple",
    "homo", "homosexual", "homosexuality", "gay", "gay sex", "gay couple", "yuri",
    "lesbian", "lesbian sex", "lesbian couple", "sapphic", "wlw", "women loving women",
    "yaoi", "boys love", "bl", "gay sex", "gay couple", "mlm", "men loving men",
    "bisexual", "bisexuality", "bi", "pansexual", "pansexuality",
    "interracial", "interspecies", "human and animal", "human and object",
    "loli", "lolita", "underage", "minor", "child", "childlike body",
    "shotacon", "shota", "young boy", "underage boy", "childlike",
    
    // Degradation & humiliation
    "slutty", "slut", "whore", "prostitute", "pay", "payment", "money",
    "humiliation", "degrading", "degradation", "embarrassing", "embarrassed",
    "public display", "displayed", "on display", "shame", "ashamed", "shamed",
    "ownership", "marked", "branded", "tattooed", "carved", "inscribed",
];

export const NSFW_EXACT_TAGS = new Set([
    "hetero", "bulge", "condom", "erection", "underwear", "open mouth",
]);

export const COPYRIGHT_EXACT_TAGS = new Set([
    "copyright", "copyrights", "franchise", "series", "crossover", "parody"
]);

export const META_KEYWORDS = [
    "hetero", "homosexual", "yuri", "yaoi", "bisexual", "asexual",
    "official alternate costume", "alternate costume", "costume", "alternate",
    "official art", "fanart", "comic", "doujin", "manga", "artbook",
    "rating", "rating poor", "rating questionable", "rating safe", "rating explicit",
    "series", "franchise", "crossover", "parody", "exaggerated", "exaggeration",
    "screenshot", "scan", "scan artifact", "compressed", "watermark", "signature",
    "metadata", "title", "caption", "description", "tag", "tags", "danbooru",
];



export const COMPOSITION_META_KEYWORDS = [
    // Framing & angles
    "looking at viewer", "looking at camera", "direct eye contact", "looking over shoulder", "from behind",
    "from below", "from above", "low angle", "high angle", "side view", "profile", "3/4 view",
    "front view", "back view", "rear view", "top-down view", "top-down bottom-up", "pov", "first person", "first-person view",
    "dutch angle", "tilted", "dynamic angle", "foreshortening", "extreme foreshortening",
    "fisheye", "wide angle", "telephoto", "birds-eye view", "bird's eye view", "overhead shot",
    "aerial view", "drone view", "worm's eye view", "corner view", "edge of frame",
    
    // Shot composition
    "close-up", "close up", "extreme close-up", "face close-up", "head close-up", "portrait",
    "headshot", "head portrait", "bust shot", "upper body", "upper torso", "torso", "lower body",
    "full body", "full body shot", "full figure", "cowboy shot", "knee-up", "from waist up",
    "from waist down", "from knees down", "from chest up", "from shoulders up", "waist-up",
    "half-body", "half body", "quarter body", "three-quarter view", "side-by-side",
    "wide shot", "wide angle shot", "long shot", "establishing shot", "scenic shot", "landscape shot",
    "master shot", "two shot", "two-shot", "three shot", "group shot", "crowd shot",
    
    // Spatial positioning
    "centered", "centered on", "center of frame", "off-center", "off center", "left side", "right side",
    "left of frame", "right of frame", "top of frame", "bottom of frame", "edge of frame",
    "against wall", "by window", "at doorway", "on couch", "on bed", "on chair", "on table",
    "on ground", "on floor", "against wall", "in corner", "in center", "on stage",
    "in foreground", "in background", "in midground", "mid ground", "shallow depth",
    "deep depth", "depth of field", "bokeh", "sharp focus", "soft focus", "out of focus",
    "blurred background", "focus on", "focused on", "framed by", "frame within frame",
    
    // Object & element positioning
    "on another's lap", "on another's shoulders", "on another's legs", "on another's back",
    "straddling", "seated on", "sitting on", "standing on", "leaning against", "leaning on",
    "supported by", "held by", "carried by", "embraced by", "surrounded by", "enclosed by",
    "arms around", "arms over", "hand on", "hands on", "hands on hips", "hands behind head",
    "hand on chest", "arm over shoulder", "arm around waist", "legs around", "feet together",
    "touching", "pressing against", "pinned against", "pinned to", "bound to", "tied to",
    
    // Decorative elements
    "bloom", "sparkle", "sparkles", "sparkling", "glitter", "glittering", "shimmer", "shimmering",
    "glow", "glowing", "aura", "light effect", "light rays", "god rays", "lens flare", "flare",
    "halo", "halo effect", "glow effect", "bloom effect", "chromatic aberration", "aberration",
    "vignette", "vignetting", "edge fade", "film grain", "grain", "scanlines", "interlace",
    "reflection", "reflection in water", "reflection in mirror", "mirror", "window reflection",
    "shadow", "shadows", "cast shadow", "self shadow", "ambient occlusion", "ao",
    "particle effect", "particles", "dust", "dust particles", "flower petals", "falling petals",
    "snow", "snowflakes", "rain", "rain drops", "water droplets", "wet", "water splash",
    "smoke", "smoke effect", "smoke clouds", "fog", "mist", "haze", "explosion", "explosion effect",
    "fire", "explosion", "magical aura", "magical effect", "magical circle", "runic circle",
    "spell effect", "energy", "energy aura", "plasma", "lightning", "electricity", "storm",
    "heart", "hearts", "floating hearts", "heart shapes", "love", "love heart", "cupid",
    "star", "stars", "starlight", "starry", "moon", "moon light", "moonlight", "moonlit",
    "sun", "sunlight", "sunlit", "sunrise", "sunset", "dusk", "dawn", "twilight",
    "decorations", "banners", "flags", "bunting", "streamers", "confetti", "confetti falling",
    "ribbons", "bows", "flowers", "floral", "ivy", "vines", "plants", "foliage",
    "ornaments", "ornamental", "decorative", "elaborate", "fancy", "intricate", "detailed",
    
    // Scene elements  
    "looking at another", "looking at person", "looking at viewer", "looking away", "eyes closed",
    "vision lines", "focus lines", "emphasis", "silhouette", "silhouette shot",
    "symmetry", "symmetrical", "asymmetry", "asymmetrical", "balanced", "unbalanced",
    "rule of thirds", "golden ratio", "leading lines", "diagonal", "horizontal", "vertical",
    "triangular composition", "circular composition", "spiral composition",
    "empty space", "negative space", "positive space", "crowded", "sparse",
    "triptych", "diptych", "polyptych", "multi-panel", "comic panel", "panel",
    "scenic", "scenery", "environment", "setting", "background", "foreground",
    "still life", "nature study", "landscape", "seascape", "cloudscape", "cityscape",
    "interior", "exterior", "indoors", "outdoors", "inside building", "outside building",
    
    // Special composition
    "x-ray", "transparent", "see-through", "cutaway", "cross-section", "diagram",
    "split screen", "side by side", "comparison", "before after", "time lapse", "sequence",
    "montage", "collage", "layered", "overlay", "blend", "merge", "fusion",
];

export const OUTPUT_KEYS = ["all", "style", "character", "looks", "composition", "landscape", "action", "nsfw", "copyright", "other"];
