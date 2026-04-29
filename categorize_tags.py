#!/usr/bin/env python3
"""
Categorize all Danbooru tags into prompt-formatter categories:
- style, character, looks, landscape, action, composition, nsfw, copyright, other
"""

import csv
import json
import re

# Define categorization keywords (mirrors constants.js)
STYLE_KEYWORDS = [
    "masterpiece", "best quality", "high quality", "8k", "4k", "cinematic", "photorealistic",
    "anime coloring", "dramatic lighting", "volumetric lighting", "depth of field", "lineart",
    "shaded", "cel shading", "render", "illustration", "ultra detailed", "detailed",
    "pixelated", "pixel art", "realistic", "painting", "watercolor", "sketch", "concept art",
    "cyberpunk", "steampunk", "synthwave", "vaporwave", "surreal", "abstract", "retro",
    "bloom", "bokeh", "lens flare", "motion blur", "silhouette", "dithering", "posterize",
    "monochrome", "greyscale", "sepia", "pastel", "saturated", "vibrant", "colorful",
    "3d", "comic", "manga", "official art", "scan", "promo", "illustration",
    "flat color", "vector", "oil painting", "digital painting", "hand drawn",
]

LANDSCAPE_KEYWORDS = [
    "sky", "cloud", "sunset", "sunrise", "forest", "mountain", "river", "ocean", "beach",
    "city", "street", "building", "room", "indoors", "outdoors", "background", "landscape",
    "night", "day", "rain", "snow", "storm", "garden", "field", "park", "castle",
    "space", "moon", "stars", "window", "balcony", "room", "bedroom", "bathroom",
    "couch", "sofa", "chair", "table", "desk", "bed", "kitchen", "living room",
    "hallway", "corridor", "staircase", "basement", "attic", "porch", "patio",
    "highway", "road", "bridge", "tunnel", "cave", "cliff", "valley", "volcano",
    "dock", "harbor", "port", "airport", "train", "station", "parking",
    "school", "library", "hospital", "office", "factory", "warehouse",
    "house", "apartment", "mansion", "cottage", "cabin", "church", "temple",
]

LOOKS_KEYWORDS = [
    "hair", "eyes", "face", "smile", "dress", "shirt", "skirt", "jacket",
    "gloves", "boots", "stockings", "ears", "tail", "horns", "wings",
    "braids", "bangs", "ponytail", "braid", "bun", "freckles", "blush",
    "lipstick", "eyeliner", "makeup", "necklace", "bracelet", "ring",
    "uniform", "costume", "kimono", "bikini", "swimsuit", "armor",
    "open mouth", "underwear", "cross-laced", "frills", "animal ear",
    "collar", "ribbon", "bow", "halo", "crown", "tiara", "flower",
    "wet", "sweat", "tears", "tattoo", "scar", "piercing", "glasses",
    "torn", "ripped", "short hair", "long hair", "blonde", "black",
    "suit", "vest", "tie", "shoes", "socks", "tights", "leggings",
]

ACTION_KEYWORDS = [
    "walking", "running", "jumping", "falling", "flying", "sitting",
    "standing", "dancing", "fighting", "attacking", "shooting", "aiming",
    "holding", "pointing", "waving", "reaching", "grabbing", "throwing",
    "kissing", "hugging", "laughing", "crying", "smiling", "looking",
    "eating", "drinking", "sleeping", "playing", "reading", "writing",
    "kneeling", "crouching", "stretching", "bending", "leaning",
    "swimming", "climbing", "riding", "driving", "sailing",
    "trembling", "under table", "hands on", "on couch", "on bed",
]

COMPOSITION_KEYWORDS = [
    "looking at viewer", "looking over shoulder", "from below", "from above",
    "side view", "profile", "upper body", "full body", "close-up", "dutch angle",
    "dynamic angle", "back view", "pov", "from behind", "lower body",
    "portrait", "headshot", "bust", "cowboy shot", "zoom", "center", "framing",
    "heart", "sparkle", "from distance", "on another", "centered", "symmetry",
    "on couch", "on bed", "sitting", "standing", "kneeling",
]

NSFW_KEYWORDS = [
    "nsfw", "nude", "naked", "nipples", "breasts", "pussy", "vagina",
    "penis", "cock", "sex", "cum", "erotic", "lewd", "explicit",
    "panties", "lingerie", "uncensored", "censored", "bulge", "erection",
    "condom", "topless", "bottomless", "oral", "anal", "creampie",
    "fetish", "bdsm", "bondage", "rape", "incest", "tentacle",
]

CHARACTER_KEYWORDS = [
    "girl", "boy", "woman", "man", "1girl", "1boy", "2girls", "2boys",
    "android", "cyborg", "elf", "demon", "angel", "maid", "police",
    "schoolgirl", "soldier", "zombie", "monster", "character",
]

META_KEYWORDS = [
    "hetero", "yaoi", "yuri", "bisexual", "lesbian", "gay",
    "official", "fanart", "comic", "manga", "doujin",
    "rating", "screenshot", "scan", "watermark", "signature",
]

# Exact matches (highest priority)
EXACT_TAGS = {
    "open mouth": "looks",
    "underwear": "nsfw",
    "condom": "nsfw",
    "bulge": "nsfw",
    "erection": "nsfw",
    "animal ear fluff": "looks",
    "frills": "looks",
    "cross-laced clothes": "looks",
    "cross-laced top": "looks",
    "hetero": "other",  # Sexual orientation meta
    "official alternate costume": "other",
    "on couch": "landscape",
    "on another's legs": "composition",
    "hands on another's shoulders": "composition",
    "hands on another's legs": "composition",
    "!": "composition",  # Punctuation
}


def contains_keyword(text, keywords):
    """Check if text contains any keyword"""
    for keyword in keywords:
        if keyword in text:
            return True
    return False


def categorize_tag(tag_text):
    """Categorize a single tag"""
    lower = tag_text.lower().replace("_", " ")

    # 1. Check exact matches (highest priority)
    if lower in EXACT_TAGS:
        return EXACT_TAGS[lower]

    # 2. NSFW (highest general priority)
    if contains_keyword(lower, NSFW_KEYWORDS):
        return "nsfw"

    # 3. META tags (orientations, ratings, etc.)
    if contains_keyword(lower, META_KEYWORDS):
        return "other"

    # 4. STYLE
    if contains_keyword(lower, STYLE_KEYWORDS):
        return "style"

    # 5. CHARACTER (must be before looks for specificity)
    if contains_keyword(lower, CHARACTER_KEYWORDS):
        return "character"

    # 6. LOOKS
    if contains_keyword(lower, LOOKS_KEYWORDS):
        return "looks"

    # 7. LANDSCAPE
    if contains_keyword(lower, LANDSCAPE_KEYWORDS):
        return "landscape"

    # 8. ACTION
    if contains_keyword(lower, ACTION_KEYWORDS):
        return "action"

    # 9. COMPOSITION
    if contains_keyword(lower, COMPOSITION_KEYWORDS):
        return "composition"

    # Default
    return "other"


def main():
    input_file = "danbooru_tags_post_count.csv"
    output_file = "danbooru_tags_categorized.json"
    
    categorized = {
        "style": {},
        "character": {},
        "looks": {},
        "landscape": {},
        "action": {},
        "composition": {},
        "nsfw": {},
        "copyright": {},
        "other": {},
    }
    
    uncategorized_stats = {}
    total_tags = 0
    
    try:
        with open(input_file, "r", encoding="utf-8") as f:
            reader = csv.DictReader(f)
            for row in reader:
                tag_name = row["name"]
                post_count = int(row["post_count"])
                
                category = categorize_tag(tag_name)
                total_tags += post_count
                
                if category not in categorized:
                    categorized[category] = {}
                
                categorized[category][tag_name] = post_count
        
        # Save categorized tags
        with open(output_file, "w", encoding="utf-8") as f:
            json.dump(categorized, f, indent=2, ensure_ascii=False)
        
        # Print stats
        print(f"\n✅ Categorization complete!")
        print(f"Total posts counted: {total_tags:,}")
        print(f"\nBreakdown by category:")
        for category in ["style", "character", "looks", "landscape", "action", "composition", "nsfw", "copyright", "other"]:
            if category in categorized:
                count = len(categorized[category])
                posts = sum(categorized[category].values())
                print(f"  {category:12} - {count:6,} tags, {posts:12,} posts")
        
        print(f"\n✅ Results saved to {output_file}")
        
    except FileNotFoundError:
        print(f"❌ Error: {input_file} not found. Run the scraper first.")


if __name__ == "__main__":
    main()
