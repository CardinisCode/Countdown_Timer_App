# CLAUDE.md — Countdown Timer App V2

Guidelines for Claude when working on this project.

---

## Project Overview

React Native / Expo app. Two core entities: **Timers** (named routines) and **Segments** (individual countdown steps within a timer). See `PRD.md`, `technical-spec.md`, and `design-spec.md` for full details.

---

## Mandatory: Test-Driven Development

**Always write failing tests before writing implementation code.** No exceptions.

Order for every piece of work:
1. Write the test(s) — confirm they fail
2. Write the minimum code to make them pass
3. Confirm all tests pass before moving on

If asked to implement a feature, write the test file first. If asked to fix a bug, write a failing test that reproduces it first.

---

## Phase Structure

Work is broken into phases in `TODO.md`. Each phase has:
- **Write Tests** — failing tests written first
- **Write Code** — implementation to pass the tests
- **Acceptance Criteria** — automated checks that must pass
- **Expo Go Manual Tests** — tasks for the user to verify in the iOS/Android Simulator

Complete phases in order. Do not start Phase N+1 until all acceptance criteria for Phase N pass.

---

## Architecture Rules

- `src/engine/` — pure logic only. No React, no imports from react or react-native.
- `src/hooks/` — React hooks only. Wraps engine. No direct UI.
- `src/context/` — global state and AsyncStorage. No business logic.
- `src/screens/` — UI only. No business logic. Reads from hooks/context, renders UI.
- `src/navigation/` — navigator wiring only.

---

## Colour States (Running Screen)

| State | Colour | Hex |
|---|---|---|
| Completed | Green | `#c8f7c5` |
| Active | Yellow | `#fff9c4` |
| Upcoming | White / default | — |

All text on coloured backgrounds must be black (`#000000`).

---

## Validation Rules

| Field | Rule |
|---|---|
| Timer name | Required. Save disabled if empty. |
| Segment label | Optional. Auto-assign `Timer0`, `Timer1`... if empty. |
| Segment duration | Save disabled if hours + minutes + seconds all equal 0. |

---

## Dependency Versions

Do not upgrade dependencies without discussion. Pinned versions exist for a reason — react-native 0.83.4 must match Expo SDK 55. See `technical-spec.md` for the full version table.

---

## UX Principles

- Every decision must prioritise the user experience
- The user is often not watching the screen (cooking, brushing teeth) — alerts must be reliable
- Keyboard must appear automatically when the user taps any input field
- Colour states must be instantly readable at a glance
- Never disable a button without making it visually obvious why

---

## Running Tests

```bash
npm test          # run all tests
npm run test:watch  # watch mode
```

---

## Running the App

```bash
expo start        # start Metro bundler
# then press 'i' for iOS Simulator or 'a' for Android Emulator
```

---

## File Naming

- Screens: `PascalCase` + `Screen.tsx` suffix (e.g. `HomeScreen.tsx`)
- Tests: mirror source path under `__tests__/` with `.test.ts` or `.test.tsx`
- Hooks: `camelCase` with `use` prefix (e.g. `useTimer.ts`)
