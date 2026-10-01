# NORMA CLASS — Project Guidelines

React 19 + TypeScript + Vite + Tailwind CSS v4 project.

## Development

- Start dev server: `npm run dev`
- Build production bundle: `npm run build`
- Type checking: `npx tsc --noEmit`

## Project Structure

- `src/main.tsx` - React entrypoint; imports `src/index.css` and mounts `src/App.tsx` into `#root`
- `src/App.tsx` - Primary application component handling screen state
- `src/game/` - Game screens, data models, and shared UI components
  - `Home.tsx` - Landing page & mode selection
  - `Mode1.tsx` - Mode 1: Khởi Nghiệp Giáo Dục
  - `Mode2.tsx` - Mode 2: Mô Phỏng Lớp Học
  - `Certificate.tsx` - Certificate generator & printable view
  - `data.ts` - Data, rubric, and game simulation content
  - `ui.tsx` - Shared reusable design components (Shell, Btn, Heading, Label, Stars)
- `src/index.css` - Global CSS entrypoint and Tailwind CSS v4 import
- `docs/NORMA_CLASS_GDD.md` - Complete Game Design Document
- `index.html` - HTML shell
- `package.json` - Project dependencies and scripts
- `vite.config.ts` - Vite configuration with React, Tailwind CSS v4, and `@` alias

## Styling & Tech Stack

- Runtime: React 19 and React DOM 19
- Styling: Tailwind CSS v4 with `@tailwindcss/vite` plugin
- Typography: Playfair Display, Be Vietnam Pro, JetBrains Mono
- Color palette: Vintage paper, ink, moss, stamp red, and ochre gold defined in `src/index.css`
