# Danbooru Smart Prompt Formatter

A modular Vite + React web app that:

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
- No backend needed. Deploys to GitHub Pages.

## Local Run

Install dependencies and start the dev server:

```powershell
cd c:\Users\Szymon\My-codes\prompt-formatter
npm install
npm run dev
```

Build production bundle:

```powershell
cd c:\Users\Szymon\My-codes\prompt-formatter
npm run build
```

Preview production bundle locally:

```powershell
npm run preview
```

## Push To GitHub

1. Create a new empty GitHub repo, for example `prompt-formatter`.
2. Run these commands:

```powershell
cd c:\Users\Szymon\My-codes\prompt-formatter
git init
git add .
git commit -m "Initial Danbooru smart formatter"
git branch -M main
git remote add origin https://github.com/<YOUR_USERNAME>/prompt-formatter.git
git push -u origin main
```

If this folder already has git initialized, skip `git init` and only set/update remote:

```powershell
git remote remove origin
git remote add origin https://github.com/<YOUR_USERNAME>/prompt-formatter.git
git push -u origin main
```

## Host On GitHub Pages

Deployment is handled by GitHub Actions workflow in `.github/workflows/deploy-pages.yml`.

1. Open repository `Settings` -> `Pages`.
2. Set Source to `Deploy from a branch`.
3. Choose branch `gh-pages` and folder `/ (root)`.
4. Push to `main` branch to trigger deployment.

After deploy, your app will be live at:

`https://<YOUR_USERNAME>.github.io/prompt-formatter/`

## Notes

- Danbooru API rate limits can apply if you run many lookups rapidly.
- Tag category bucketing is heuristic and can be tuned over time.
