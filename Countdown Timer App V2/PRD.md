# Product Requirements Document — Countdown Timer App V2

## Overview

Countdown Timer App V2 is a mobile app (iOS and Android) that lets users build named sequences of countdown timers — called **Timers** — made up of individual **segments**. Each segment is a labelled countdown step. Once built, a Timer can be saved and reused from the Home screen.

Primary use cases:
- **Cooking** — e.g. "Slow Cooker Sunday": Brown meat (10 min) → Add veg (5 min) → Slow cook (4 hrs)
- **Dental hygiene** — e.g. "Morning Toothbrush": Top teeth (2 min) → Bottom teeth (2 min)

---

## Target Users

People who regularly follow multi-step timed routines and need their hands free while the timer runs. They are not always watching the screen, so the app must alert them audibly and with vibration when a segment completes.

---

## User Stories

- As a user, I want to create a named timer with multiple timed segments, so I can track a multi-step routine.
- As a user, I want to add as many segments as I need to a timer, so I can cover all steps in my routine.
- As a user, I want to start a timer and see the current segment counting down, so I know how long is left.
- As a user, I want to be alerted (sound + vibration) when a segment finishes, so I don't have to watch the screen.
- As a user, I want to manually advance to the next segment, so I stay in control of the pace.
- As a user, I want to pause and resume the active segment, so I can handle interruptions.
- As a user, I want to reset the active segment back to its full duration, so I can restart a step if needed.
- As a user, I want to see my progress through all segments (completed, active, upcoming), so I know where I am.
- As a user, I want my timers saved so I can reuse them without rebuilding them each time.

---

## MVP Features

| Feature | Description |
|---|---|
| Create Timer | Name a timer and add a first segment |
| Add Segments | Add unlimited segments (label + hours/minutes/seconds) |
| Timer Detail | View all segments and total duration before starting |
| Running Screen | Countdown display, colour-coded segment states |
| Segment Done | Alert (sound + vibration) + manual "Start Next" advance |
| Colour states | Completed=green, Active=yellow, Upcoming=white |
| Pause / Resume | Pause the active segment and resume it |
| Reset Segment | Reset active segment to its full duration |
| Persistence | Saved timers appear on Home screen across app restarts |
| Default label | No label entered → auto-assigns Timer0, Timer1, Timer2... |
| Input validation | Save disabled if duration is 0:00:00 |

---

## Out of Scope (MVP)

- Custom colours per segment (future paid feature)
- Push notifications when app is in background
- Cloud sync / account system
- Timer sharing

---

## Success Criteria

- User can create a timer with multiple segments and run it end-to-end without errors
- Sound and vibration alert fires reliably when a segment ends
- Saved timers persist and are accessible from the Home screen on next app open
- App works correctly on both iOS Simulator and Android Emulator
- All automated tests pass
