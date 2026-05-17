# Contributing to Tagbooru Toolkit

Thank you for your interest in contributing! This document outlines the process for contributing to the Tagbooru Toolkit web application.

## Project Overview

Tagbooru Toolkit is a React-based web app that parses messy prompt text and matches it against the Danbooru tag database. It runs entirely in the browser with no backend — built with React 18, Vite 5, and vanilla CSS.

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) 18 or later
- npm (included with Node.js)

### Setup

```bash
# Clone the repository
git clone https://github.com/Xymoh/Tagbooru.git
cd Tagbooru

# Install dependencies
npm install

# Start development server
npm run dev
```

The dev server runs at `http://localhost:5173/Tagbooru/`.

## Development Workflow

### Branching
- Create feature branches from `main`: `git checkout -b feature/my-feature`
- Use descriptive branch names (e.g., `fix/image-tagger-link`, `feat/aria-labels`)
- Keep branches focused on a single change

### Code Style
This project uses ESLint and Prettier for consistent code formatting.

```bash
# Check for lint errors
npm run lint

# Auto-format code
npm run format
```

**Guidelines:**
- Use `const` by default, `let` only when reassignment is needed
- Prefer arrow functions for callbacks, `function` declarations for top-level utilities
- Add JSDoc comments for non-obvious logic (see [`tagService.js`](src/tagService.js) for examples)
- Keep components small and focused — extract reusable logic into the `src/` root as plain modules

### Project Structure

```
src/
├── main.jsx               # Entry point + error boundary
├── App.jsx                # Tab navigation shell
├── TextFormatter.jsx      # Main text parsing/tagging UI
├── parser.js              # Input text parsing + cleaning
├── tagService.js          # Danbooru API + CSV index loading
├── classifier.js          # Heuristic tag category assignment
├── constants.js           # Category keywords + score thresholds
├── utils.js               # Shared utility functions
├── styles.css             # All styles (single CSS file)
├── hooks/
│   └── useBorderTrace.js  # SVG animated border-trace hook
└── components/
    ├── Home.jsx           # Landing page content
    └── ImageTagger.jsx    # Desktop app download page
```

### Before Submitting

1. Run `npm run lint` and fix all warnings
2. Run `npm run format` to ensure consistent formatting
3. Run `npm run build` to verify the project compiles without errors
4. Test your changes in the dev server at `http://localhost:5173/Tagbooru/`
5. Test with keyboard navigation and a screen reader where applicable

## Reporting Bugs

When filing an issue, please include:
- Browser and version (e.g., Chrome 125, Firefox 128)
- Steps to reproduce
- Expected behavior vs. actual behavior
- Any console errors (F12 → Console tab)
- The input text that triggered the issue (if applicable)

## Feature Requests

Feature requests are welcome! Please describe:
- The problem you're trying to solve
- How you currently work around it
- Your ideal solution

## Accessibility

This project aims to meet WCAG 2.1 AA standards. When contributing UI changes:
- Use semantic HTML elements (`<nav>`, `<main>`, `<article>`, `<section>`)
- Add `aria-label` to interactive elements without visible text
- Ensure `:focus-visible` styles are present for all interactive elements
- Test with `prefers-reduced-motion: reduce` enabled in your OS settings
- Verify keyboard-only navigation works: Tab through all controls, Enter/Space to activate

## License

By contributing, you agree that your contributions will be licensed under the same license as the project.
