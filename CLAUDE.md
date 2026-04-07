# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Countdown Timer App — a React Native / Expo app targeting iOS, Android, and web.

## Commands

```bash
# Start Expo dev server (opens platform picker)
npm start

# Run on specific platform
npm run ios
npm run android
npm run web
```

No test runner or linter is configured yet.

## Architecture

This is a fresh Expo SDK 55 scaffold using React 19 and React Native 0.83.

- **Entry point:** [index.ts](index.ts) — registers the root component via `registerRootComponent`
- **Root component:** [App.tsx](App.tsx) — currently the default placeholder; all app logic will live here or be imported from here
- **App config:** [app.json](app.json) — Expo configuration (name, icons, splash, platform-specific settings)
- **TypeScript:** strict mode enabled, extending `expo/tsconfig.base`

The app has no navigation library, state management, or component structure yet — everything is in a single `App.tsx`.
