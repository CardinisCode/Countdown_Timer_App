# Product Requirements Document — Step Timer App

## Overview

A mobile app built with Expo and React Native that allows users to configure a countdown timer with named step alerts. The user sets an overall duration, then adds any number of named steps at specific times within that duration. When each step time is reached during the countdown, the app alerts the user via sound, vibration, and a visual notification. The timer ends with a final alert when the overall time expires.

---

## Core Features

### 1. Timer Setup
- The user sets an **overall duration** (e.g. 2 minutes) before starting
- Duration input supports hours, minutes, and seconds
- The configured duration is the hard upper bound — no step may be set at or beyond it

### 2. Step Management
- The user can add **as many steps as they want** within the overall duration
- Each step has:
  - A **name/label** (e.g. "Add salt", "Stir", "Remove from heat")
  - A **trigger time** — the point in the countdown at which it fires (e.g. 30 seconds)
  - **Note**: Trigger times represent **elapsed time** from the start. A step at "30 seconds" in a 2-minute timer fires after 30 seconds have elapsed (at 1:30 remaining). UI should include helper text to clarify this for users.
- Steps are displayed in chronological order
- Steps can be **edited or deleted** before the timer starts
- Validation prevents setting a step time at or beyond the overall duration

### 3. Timer Execution
- A **Start** button begins the countdown from the overall duration
- The timer displays the remaining time in `HH:MM:SS` format
- As each step time is reached, the app triggers:
  - **Sound** — a notification beep using `Expo.Audio.Sound.createAsync()` with a simple tone
  - **Vibration** — a haptic buzz (using `expo-haptics`)
  - **Visual** — an on-screen banner/flash showing the step name
    - Default display duration: **5 seconds**
    - Auto-dismisses after duration
    - Duration is customizable via settings toggle (future enhancement)
- When the overall time reaches zero:
  - A final alert fires (sound + vibration + visual)
  - The timer stops
- A **Pause / Resume** control is available during countdown
- A **Reset** button returns the timer to its configured state

### 4. Presets
- Users can **save** a timer configuration (overall duration + all steps) as a named preset
- Saved presets are listed on a dedicated screen and can be:
  - **Loaded** — populates the timer setup with that configuration
  - **Deleted** — removes the preset permanently
- Presets are stored locally on the device using `AsyncStorage`

---

## Screens

| Screen | Purpose |
|---|---|
| **Home / Timer Setup** | Set overall duration, manage steps, start timer. **Preset list displayed below** timer setup - tap preset to load configuration, swipe to delete. |
| **Timer Running** | Live countdown display, step alert banners, pause/reset controls |

---

## Tools & Frameworks

| Tool / Framework | Purpose |
|---|---|
| **Expo SDK 55** | Core mobile framework and build tooling |
| **React Native 0.83** | UI components and native APIs |
| **TypeScript 5.9** | Type safety throughout the codebase |
| **Expo Router** | File-based navigation between screens |
| **expo-av** | Audio playback for step and end-of-timer alerts |
| **expo-haptics** | Vibration/haptic feedback on step triggers |
| **AsyncStorage** | Local persistence for saved presets |
| **React Native Reanimated** | Smooth animations for visual step alert banners |

---

## Constraints & Validation Rules

- A step trigger time must be **greater than 0** and **less than** the overall duration
- Two steps **may not share the same trigger time**
- The overall duration must be **at least 1 second**
- A timer with **no steps** is valid — it will simply count down and alert at the end

---

## Design & Implementation Notes

### Visual Style
- **MVP**: Simple, clean color palette with good contrast
- **Future**: Dark mode support, customizable themes

### Build Priority (Incremental)
1. **Timer core** → Duration input, countdown display, start/pause/reset (with tests)
2. **Single step** → Add ability to create ONE step, test alert triggering (with tests)
3. **Multiple steps** → Extend to manage multiple steps, validation, chronological display (with tests)
4. **Visual alerts** → Animated banner system (with tests)
5. **Presets** → Save/load/delete functionality (with tests)
6. **Polish** → Settings for alert duration, UI refinements

### Testing Strategy
- Build incrementally with tests at each phase
- Tests must pass before moving to next phase
- Target platforms: **iOS** (primary) and **Android** (via emulator)
- Use Android Studio Emulator for Android testing on PC

---

## Out of Scope (v1)

- Cloud sync or user accounts
- Sharing timer configurations with other users
- Background execution when the app is fully closed (best-effort when minimised)
- Custom sounds per step (use system notification tone for MVP)
- Customizable alert duration (5s fixed for MVP, setting toggle for future)