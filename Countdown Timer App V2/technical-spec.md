# Technical Specification — Countdown Timer App V2

## Tech Stack

| Package | Version | Purpose |
|---|---|---|
| expo | ~55.0.14 | App framework, build tooling |
| react | 19.2.5 | UI library |
| react-native | 0.83.4 | Native mobile rendering |
| expo-status-bar | ~55.0.5 | Status bar control |
| expo-haptics | ~55.0.14 | Vibration alerts |
| expo-av | ~16.0.8 | Sound alerts |
| @react-native-async-storage/async-storage | latest | Timer persistence |
| jest | ^29.7.0 | Test runner |
| jest-expo | ~55.0.15 | Expo-aware Jest preset |
| @testing-library/react-native | ^13.3.3 | Component testing |
| @types/jest | ~29.5.14 | Jest TypeScript types |
| @types/react | ~19.2.2 | React TypeScript types |
| react-test-renderer | 19.2.5 | React rendering for tests |
| typescript | ~5.9.2 | Type safety |

> Note: react-native is pinned to 0.83.4 to match Expo SDK 55's validated version. Do not upgrade without upgrading the Expo SDK.

---

## Folder Structure

```
Countdown Timer App V2/
├── App.tsx                        # Entry point
├── index.ts                       # Registers app
├── app.json                       # Expo config
├── package.json
├── tsconfig.json
├── CLAUDE.md
├── PRD.md
├── technical-spec.md
├── design-spec.md
├── TODO.md
└── src/
    ├── engine/
    │   ├── timer.ts               # Pure countdown logic (no React)
    │   └── __tests__/
    │       └── timer.test.ts
    ├── hooks/
    │   ├── useTimer.ts            # Wraps engine, exposes state + controls
    │   ├── useTimerSequence.ts    # Manages segment-to-segment sequencing
    │   └── __tests__/
    │       ├── useTimer.test.ts
    │       └── useTimerSequence.test.ts
    ├── context/
    │   ├── TimerContext.tsx       # Global saved timers list + AsyncStorage
    │   └── __tests__/
    │       └── TimerContext.test.tsx
    ├── screens/
    │   ├── HomeScreen.tsx
    │   ├── CreateTimerScreen.tsx
    │   ├── TimerDetailScreen.tsx
    │   ├── AddSegmentScreen.tsx
    │   ├── RunningScreen.tsx
    │   ├── SegmentDoneScreen.tsx
    │   └── __tests__/
    │       ├── HomeScreen.test.tsx
    │       ├── CreateTimerScreen.test.tsx
    │       ├── TimerDetailScreen.test.tsx
    │       ├── AddSegmentScreen.test.tsx
    │       ├── RunningScreen.test.tsx
    │       └── SegmentDoneScreen.test.tsx
    ├── navigation/
    │   └── AppNavigator.tsx       # React Navigation stack navigator
    └── __tests__/
        └── smoke.test.ts          # App renders without crashing
```

---

## Data Models

### Timer
```typescript
interface Timer {
  id: string          // uuid
  name: string        // e.g. "Slow Cooker Sunday"
  segments: Segment[] // ordered array
  createdAt: number   // timestamp
}
```

### Segment
```typescript
interface Segment {
  id: string          // uuid
  label: string       // e.g. "Brown meat" — defaults to "Timer0", "Timer1"...
  hours: number       // 0–99
  minutes: number     // 0–59
  seconds: number     // 0–59
}
```

### Derived: total duration in seconds
```typescript
function segmentDurationSeconds(segment: Segment): number {
  return segment.hours * 3600 + segment.minutes * 60 + segment.seconds
}
```

---

## Architecture

### Layer responsibilities

| Layer | File(s) | Responsibility |
|---|---|---|
| Engine | `engine/timer.ts` | Pure countdown logic — tick, start, pause, reset. No React, no side effects. |
| Hooks | `hooks/useTimer.ts` | Wraps engine in React state. Exposes `timeRemaining`, `isRunning`, `pause`, `resume`, `reset`. |
| Hooks | `hooks/useTimerSequence.ts` | Tracks which segment is active, which are completed, handles advance to next. |
| Context | `context/TimerContext.tsx` | Holds the list of saved Timers. Reads/writes AsyncStorage. Provides `addTimer`, `getTimers`. |
| Screens | `screens/*.tsx` | UI only. Reads from hooks/context, dispatches actions. No business logic. |
| Navigation | `navigation/AppNavigator.tsx` | Stack navigator wiring all 6 screens. |

### State flow

```
TimerContext (saved timers, AsyncStorage)
    ↓
HomeScreen → CreateTimerScreen → TimerDetailScreen → AddSegmentScreen
                                        ↓
                                  RunningScreen (useTimerSequence + useTimer)
                                        ↓
                                  SegmentDoneScreen → RunningScreen (next segment)
                                        ↓ (last segment done)
                                  HomeScreen
```

---

## Persistence

- Saved timers stored in AsyncStorage under the key `@timers`
- Format: JSON array of `Timer[]`
- Loaded on app start via `TimerContext`
- Updated on every `addTimer` call

---

## Alerts

When a segment completes:
- **Sound:** `expo-av` plays a short alert tone
- **Vibration:** `expo-haptics` fires `Haptics.notificationAsync(NotificationFeedbackType.Success)`

Both fire together on the transition to `SegmentDoneScreen`.

---

## Validation Rules

| Field | Rule |
|---|---|
| Segment label | Optional. If empty, auto-assigned `Timer0`, `Timer1`... (global counter across the timer) |
| Segment duration | Save button disabled if hours + minutes + seconds all equal 0 |
| Timer name | Required. Save button disabled if empty |

---

## Testing Strategy

- **Engine tests:** Pure unit tests. No mocks needed.
- **Hook tests:** Use `renderHook` from `@testing-library/react-native`. Mock `setInterval`/`clearInterval` with Jest fake timers.
- **Context tests:** Mock AsyncStorage. Test add, load, persist.
- **Screen tests:** Use `render` from `@testing-library/react-native`. Assert on visible text, button states, navigation calls.
- **Colour state tests:** Assert segment cards render with correct background colour based on state (completed/active/upcoming).
- All tests written before implementation code (TDD).
