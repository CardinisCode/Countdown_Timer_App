# Countdown Timer App — Project TODO

Each section follows this structure:
1. Acceptance criteria
2. Write tests
3. Write code
4. Run tests (Jest + RNTL)
5. You test the feature (Maestro)

---

## Phase 0 — Project Setup

### Acceptance Criteria
- [x] `npm start` launches the Expo dev server without errors
- [x] Jest + React Native Testing Library are installed and configured
- [x] A sample smoke test runs and passes
- [x] Folder structure is in place: `src/engine/`, `src/hooks/`, `src/store/`, `src/screens/`

### Write Tests
- [x] Write a smoke test that asserts `true === true` (verifies the test runner works)

### Write Code
- [x] Install Jest, RNTL, and related Expo preset packages
- [x] Add `jest.config.js` and update `package.json` test script
- [x] Create the folder structure under `src/`

### Run Tests
- [x] `npm test` passes with zero failures

### You Test
- [x] Open the app in Expo Go or simulator and confirm it loads (using iOS Simulator via `npm run ios` — Expo Go on device incompatible with SDK 55)
- [X] Create an Expo account
- [F] Log into the Expo dev account in the mobile app
Note to self: As of 09 Apr '26, Expo-Go appears to have a known login issue. Will attempt to run the server without logging in. I can run the server directly from the terminal: 
npm run ios


---

## Phase 1 — Single Timer

### Acceptance Criteria
- [ ] User can set a duration (hours, minutes and seconds)
- [ ] Timer counts down to zero
- [ ] Timer can be started, paused, and reset
- [ ] When the timer reaches zero it stops and signals completion (no UI required yet — a console log or callback is sufficient)

### Write Tests
- [x] `engine/timer.test.ts` — unit tests for the countdown logic:
  - [x] starts from the given duration
  - [x] decrements correctly each second
  - [x] stops at zero and fires the completion callback
  - [x] does not decrement below zero
  - [x] pause freezes the countdown
  - [x] resumes correctly after pause
  - [x] reset returns to the original duration and stops the timer
  - [x] completion callback fires again after reset and re-run
- [x] `hooks/useTimer.test.ts` — hook tests:
  - [x] exposes correct initial state (timeRemaining, isRunning, isComplete)
  - [x] start triggers the countdown and sets isRunning to true
  - [x] pause freezes timeRemaining and sets isRunning to false
  - [x] reset restores original duration, isRunning, and isComplete
  - [x] isComplete becomes true when timer reaches zero
  - [x] isComplete resets to false after reset

### Write Code
- [ ] `src/engine/timer.ts` — pure countdown logic (no React, no UI)
- [ ] `src/hooks/useTimer.ts` — React hook wrapping the engine

### Run Tests
- [ ] All timer engine and hook tests pass

### You Test (Maestro)
- [ ] Can set a duration, start, pause, and reset the timer

---

## Phase 2 — Single Timer + 1 Step Time

### Acceptance Criteria
- [ ] User can optionally define one intermediate time (a "step") between start and end
- [ ] When the countdown reaches the step time, the app signals it (callback / console log)
- [ ] Timer continues counting down to zero after the step
- [ ] Step is optional — behaviour from Phase 1 is unchanged when no step is set

### Write Tests
- [ ] `engine/timer.test.ts` additions:
  - fires the step callback when the countdown reaches the step time
  - does not fire the step callback when no step is defined
  - fires completion callback at zero even when a step is set

### Write Code
- [ ] Extend `src/engine/timer.ts` to accept an optional array of step times and trigger callbacks at each

### Run Tests
- [ ] All Phase 1 and Phase 2 tests pass

### You Test (Maestro)
- [ ] Can add one step time, see it trigger mid-countdown, and see completion at zero

---

## Phase 3 — Single Timer + 2 Step Times

### Acceptance Criteria
- [ ] User can optionally define up to two intermediate step times
- [ ] Both steps trigger their callbacks in the correct order
- [ ] All Phase 2 behaviour is preserved

### Write Tests
- [ ] `engine/timer.test.ts` additions:
  - both step callbacks fire at the correct times
  - steps fire in descending order (first step is the larger time value)
  - no regression on single-step and no-step cases

### Write Code
- [ ] No engine changes expected — the step array already supports multiple entries; validate it handles two correctly

### Run Tests
- [ ] All Phase 1, 2, and 3 tests pass

### You Test (Maestro)
- [ ] Can add two step times and observe both trigger correctly

---

## Phase 4 — Single Timer + 3 Step Times

### Acceptance Criteria
- [ ] User can optionally define up to three intermediate step times
- [ ] All three steps trigger their callbacks in the correct order
- [ ] All prior behaviour is preserved

### Write Tests
- [ ] `engine/timer.test.ts` additions:
  - all three step callbacks fire at the correct times
  - no regression on one-step, two-step, and no-step cases

### Write Code
- [ ] Validate the engine handles three steps correctly; add any guards needed (e.g. steps must be in descending order, less than total duration)

### Run Tests
- [ ] All Phase 1–4 tests pass

### You Test (Maestro)
- [ ] Can add three step times and observe all three trigger correctly

---

## Phase 5 — Presets

### Acceptance Criteria
- [ ] When a timer completes, its configuration (duration + any steps) is automatically saved to device storage
- [ ] Saved timers appear in a "Presets" section on the home screen
- [ ] Tapping a preset loads that configuration into the timer
- [ ] Duplicate configurations are not saved (same duration + same steps = one preset)
- [ ] Presets persist across app restarts

### Write Tests
- [ ] `store/presets.test.ts`:
  - saving a completed timer adds it to the preset list
  - duplicate configurations are deduplicated
  - loading a preset populates the correct timer configuration
  - presets are read from and written to AsyncStorage correctly (mock AsyncStorage)

### Write Code
- [ ] Install `@react-native-async-storage/async-storage`
- [ ] `src/store/presets.ts` — load, save, and deduplicate presets
- [ ] `src/hooks/usePresets.ts` — React hook exposing the preset list and load action

### Run Tests
- [ ] All Phase 1–5 tests pass

### You Test (Maestro)
- [ ] Complete a timer, restart the app, confirm the preset appears and loads correctly

---

## Re-evaluation Point

After Phase 5 is complete and all tests pass:
- Review the full feature set with fresh eyes
- Identify any UX gaps, edge cases, or technical debt
- Agree on the next set of features before continuing
