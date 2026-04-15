# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

This is a static personal portfolio website for Thura Win Kyaw, an AI/ML Engineer. It is deployed via GitHub Pages at `thurawk.github.io`. There is no build system, bundler, package manager, or test suite — the site is plain HTML, CSS, and JavaScript, served as-is.

## Development

Open `index.html` directly in a browser, or serve it locally:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

There are no build, lint, or test commands.

## Architecture

The entire site is a single page (`index.html`) with three sections anchored by `id`: `#about`, `#skills`, and `#projects`. All styles live in `css/style.css` and all JavaScript in `js/main.js`.

**Theming (`css/style.css`):** Design tokens are defined as CSS custom properties on `:root` (light mode) and overridden under `[data-theme="dark"]`. The `data-theme` attribute is set on `<html>`. Icon visibility for sun/moon is handled purely in CSS via `[data-theme="dark"]` selectors — no JS class toggling needed.

**JavaScript (`js/main.js`):** Two responsibilities:
1. **Theme toggle** — reads `localStorage` (falling back to `prefers-color-scheme`), sets `data-theme` on `<html>`, and persists the choice on click.
2. **Active nav highlighting** — uses `IntersectionObserver` on all `<section>` elements to drive the `.active` class on `.nav-link` anchors. The observer picks the topmost visible section with a non-negative `boundingClientRect.top`; if none qualify it falls back to the section whose top is closest to the viewport edge.

**Responsive layout:** A hamburger menu (`.nav-toggle`) appears at ≤600 px. The mobile nav (`.site-nav.open`) is toggled by JS; clicks outside the nav or on a nav link close it. The profile header switches from a two-column grid to a single column at ≤600 px.

**Static assets** are in `data/` (`thura_profile.jpg`, `Thura_s_CV.pdf`). Social icons are loaded from CDN (`cdn.jsdelivr.net/gh/simple-icons`, `github.githubassets.com`).

## Deployment

Push to the `main` branch — GitHub Pages serves the repo root automatically.
