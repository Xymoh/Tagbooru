# Danbooru Smart Prompt Formatter

A fast static web app that:

- Parses messy raw text from many formats.
- Tries to match probable Danbooru tags via API.
- Builds prompt outputs in separate categories:
- Style / Quality
- Character / Looks
- Landscape / Scene
- Other / Meta
- Lets you copy each output box with one click.

## Features

- Flexible parsing: line-based input, mixed separators, trailing counts (`29k`, `7.6M`, `665`) removed.
- Danbooru integration: fetches likely tags from `https://danbooru.donmai.us/tags.json`.
- Heuristic categorization for prompt-building workflow.
- No backend needed. Works on GitHub Pages.

## Local Run

Open `index.html` directly in browser.

Optional local server:

```powershell
cd c:\Users\Szymon\My-codes\prompt-formatter
python -m http.server 8080
```

Then open `http://localhost:8080`.

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

1. Open your GitHub repository.
2. Go to `Settings` -> `Pages`.
3. Under `Build and deployment`:
- Source: `Deploy from a branch`
- Branch: `main`
- Folder: `/ (root)`
4. Save.

After deploy, your app will be live at:

`https://<YOUR_USERNAME>.github.io/prompt-formatter/`

## Notes

- Danbooru API rate limits can apply if you run many lookups rapidly.
- Tag category bucketing is heuristic and can be tuned over time.
