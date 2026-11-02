# PaperCache Website

The marketing website for [PaperCache](https://github.com/VariableThe/PaperCache),
a developer-focused knowledge manager. This repository contains the website's
React interface, static assets, and release-download UI; the PaperCache desktop
application is maintained in the main PaperCache repository.

## Stack

- React 19
- TypeScript
- Vite
- ESLint

The site fetches PaperCache release information from GitHub at runtime and
includes static product screenshots and metadata for `papercache.app`.

## Local development

Install dependencies with the lockfile, then start Vite's development server:

```sh
npm ci
npm run dev
```

Vite prints the local development URL after it starts.

## Checks and production build

```sh
npm run lint
npm run build
npm run preview
```

`npm run build` performs TypeScript project builds before producing the static
site in `dist/`. `npm run preview` serves that built output locally.

## Scope

This repository does not contain the PaperCache desktop application or a
deployment configuration for the website. Product source code, releases, and
issue tracking live in [VariableThe/PaperCache](https://github.com/VariableThe/PaperCache).
