# Tagbooru Toolkit

An all-in-one tagging and prompt formatting tool for anime generative AI workflows. Runs entirely in the browser — no backend required.

**Live:** https://xymoh.github.io/Tagbooru/

## Features

### Text Formatter

Paste noisy, unformatted text from any source and get clean, categorized Danbooru tag prompts.

- Parses messy input: line-based, mixed separators, trailing counts (`29k`, `7.6M`, `665`) stripped automatically
- Matches probable Danbooru tags via the Danbooru API and a local offline index of 1M+ tags
- Categorizes matched tags into organized prompt blocks:
  - Character
  - Series / Franchise (Source Material)
  - Copyright
  - Artist
  - General
  - Style / Quality
  - Looks / Appearance
  - Landscape / Scene
  - Action
  - Composition
  - NSFW
  - Meta
- One-click copy per category or copy all at once
- Source Material toggle to include/exclude franchise labels

### Image Tagger (Standalone Desktop App)

A separate downloadable Windows application for local AI-powered image captioning. Available at [img-tagboru-ai](https://github.com/Xymoh/img-tagboru-ai).

- Powered by WD14/SwinV2 models running locally on your GPU
- Batch processing of entire image folders
- Exports `.txt` caption files alongside images (LoRA training ready)
- Configurable thresholds, blacklists, and whitelists
- 100% offline — images never leave your machine

## Privacy

- **Text Formatter:** Uses a pre-downloaded CSV index for offline tag lookup. Online Danbooru API calls are made only for tag matching (no images or personal data sent).
- **Image Tagger:** Runs entirely on your local machine via the standalone desktop app.

## Tech Stack

- React + Vite
- No backend — static site hosted on GitHub Pages
- Danbooru API integration for tag matching
- SVG-based animated UI interactions

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

Output goes to `dist/`.

## Notes

- Danbooru API rate limits may apply with rapid successive lookups.
- Tag categorization is heuristic-based and continuously improved.
- The Image Tagger desktop app is a separate project: [img-tagboru-ai](https://github.com/Xymoh/img-tagboru-ai).
