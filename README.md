# Danbooru Smart Prompt Formatter

A modular web app hosted on GitHub Pages that:

- Parses messy raw text from many formats.
- Tries to match probable Danbooru tags via API.
- Builds prompt outputs in separate categories:
  - Style / Quality
  - Character
  - Looks / Appearance
  - Landscape / Scene
  - Action
  - NSFW Detected
  - Other / Meta
- Lets you copy each output box with one click.

## Features

- Flexible parsing: line-based input, mixed separators, trailing counts (`29k`, `7.6M`, `665`) removed.
- Danbooru integration: fetches likely tags from `https://danbooru.donmai.us/tags.json`.
- Heuristic categorization for prompt-building workflow.
- Component-based React UI and split logic modules for parser, API, and classifier.
- No backend needed; runs entirely in the browser.

## Usage

This app is hosted live on GitHub Pages at:  
`https://<YOUR_USERNAME>.github.io/prompt-formatter/`

To use the app:
1. Paste your raw, messy prompt text into the input area.
2. The app will parse the text, match relevant Danbooru tags, and categorize them into the sections listed above.
3. Click the copy button on any category box to copy the formatted prompt for that section.

## Notes

- Danbooru API rate limits can apply if you run many lookups rapidly.
- Tag category bucketing is heuristic and can be tuned over time.
