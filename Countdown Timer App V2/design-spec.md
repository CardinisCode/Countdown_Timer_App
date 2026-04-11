# Design Specification — Countdown Timer App V2

## Design Principles

- **User-first:** Every decision prioritises what feels natural and effortless for the user
- **Hands-free friendly:** Alerts (sound + vibration) ensure the user doesn't need to watch the screen
- **Progress visibility:** Colour states let the user instantly see where they are in their routine
- **Manual control:** The user advances segments at their own pace — nothing happens automatically

---

## Colour States

All segments are visible at all times during a running session. Colour indicates state:

| State | Colour | Meaning |
|---|---|---|
| Completed | Green (`#c8f7c5`) | This segment has finished |
| Active | Yellow (`#fff9c4`) | This segment is currently counting down |
| Upcoming | White / light grey border | This segment hasn't started yet |

Text on all coloured backgrounds is **black** (`#000000`) for readability.

---

## Screens

### Screen 1 — Home

**Purpose:** Landing screen and saved timers list.

**Content:**
- Title: "My Timers"
- List of saved timers (name + segment count + total duration)
- "Add Timer" CTA button (always visible, bottom of screen)

**Behaviour:**
- Tap a saved timer → navigate to Timer Detail (screen 3)
- Tap "Add Timer" → navigate to Create Timer (screen 2)
- Empty state: friendly message "No timers yet. Tap Add Timer to begin."

---

### Screen 2 — Create Timer

**Purpose:** Name a new timer and add its first segment.

**Content:**
- Section: Timer name (`TextInput`, default keyboard)
- Section: First segment
  - Label (`TextInput`, default keyboard)
  - Duration: three `TextInput` fields — hours / minutes / seconds (numeric keyboard)
- "Save" CTA button

**Behaviour:**
- Timer name: required. Save disabled if empty.
- Segment label: optional. If empty, defaults to `Timer0` (auto-incrementing).
- Duration: Save disabled if all three fields are 0.
- Tapping any input field opens the device keyboard automatically.
- "Save" → navigates to Timer Detail (screen 3).

---

### Screen 3 — Timer Detail

**Purpose:** View and manage all segments in a timer before starting.

**Content:**
- Timer name (heading)
- Total duration (sub-heading, e.g. "Total: 4:15:00")
- Scrollable list of segments (label + duration each)
- "+ Add" button
- "Start" button

**Behaviour:**
- "+ Add" → navigates to Add Segment (screen 4), returns here on save.
- "Start" → navigates to Running (screen 5).
- "Start" is always active (there is always at least one segment from Create Timer).

---

### Screen 4 — Add Segment

**Purpose:** Add a new segment to an existing timer.

**Content:**
- Label (`TextInput`, default keyboard)
- Duration: hours / minutes / seconds (`TextInput`, numeric keyboard)
- "Save & Continue" CTA button

**Behaviour:**
- Label: optional. If empty, defaults to next auto-increment label (e.g. `Timer2`).
- Duration: Save disabled if all three fields are 0.
- "Save & Continue" → saves segment and returns to Timer Detail (screen 3).

---

### Screen 5 — Running

**Purpose:** Active timer session view.

**Content:**
- Timer name (heading)
- "Total running: HH:MM:SS" (elapsed time across all segments, counting up)
- Scrollable list of all segments with colour-coded state:
  - Completed segments: green background, black text, label + original duration
  - Active segment: yellow background, black text, label + **live countdown** (large font)
  - Upcoming segments: white background, label + original duration (muted)
- "Pause / Resume" button
- "Reset" button (resets active segment to full duration)

**Behaviour:**
- When active segment reaches 0:00:00 → sound + vibration alert fires → navigate to Segment Done (screen 6).
- Pause: freezes countdown. Button label changes to "Resume".
- Reset: restores active segment to its original duration, keeps running.

---

### Screen 6 — Segment Done

**Purpose:** Notify the user a segment has finished and let them advance manually.

**Content:**
- Checkmark icon
- "[Segment label] complete!" message
- Sound + vibration alert fires on screen load
- "Start Next" CTA button

**Behaviour:**
- "Start Next" → navigates back to Running (screen 5), next segment becomes active (yellow).
- If this was the last segment → "Start Next" is replaced by "Finish" → navigates back to Home (screen 1).

---

## Navigation Flow

```
Home (1)
  └── Add Timer → Create Timer (2)
                      └── Save → Timer Detail (3)
                                    ├── + Add → Add Segment (4) → back to Timer Detail (3)
                                    └── Start → Running (5)
                                                    └── [segment ends] → Segment Done (6)
                                                                            ├── Start Next → Running (5) [next segment]
                                                                            └── Finish (last segment) → Home (1)
  └── Tap saved timer → Timer Detail (3)
```

---

## Input & Keyboard Behaviour

- All `TextInput` fields trigger the device keyboard automatically on tap (works in simulator and on device).
- Duration fields use `keyboardType="numeric"`.
- Label fields use `keyboardType="default"`.
- Duration fields accept 2-digit input; values are validated as integers.

---

## Validation Summary

| Scenario | Behaviour |
|---|---|
| Timer name empty | Save button disabled |
| Segment label empty | Auto-assigns `Timer0`, `Timer1`... |
| Duration all zeros | Save / Save & Continue button disabled |
| Timer has no segments | Cannot happen — Create Timer always adds first segment |

---

## Alerts

Fires when a segment countdown reaches zero:
- Sound: short alert tone via `expo-av`
- Vibration: success haptic via `expo-haptics`
- Both trigger simultaneously on transition to Segment Done screen
