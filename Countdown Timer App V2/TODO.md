# Countdown Timer App V2 — Project TODO

Each phase follows TDD:
1. Write failing tests
2. Write code to make tests pass
3. Testing (agent)
4. Acceptance criteria (agent)
5. Expo Go manual test tasks (run via simulator)

---

## Phase 1 — Project Scaffolding ✅ COMPLETE

### Write Tests
- [x] Smoke test: app renders without crashing (`src/__tests__/smoke.test.ts`)

### Write Code
- [x] Create `package.json` with correct dependency versions (see `technical-spec.md`)
- [x] Create `tsconfig.json`, `app.json`, `index.ts`, `App.tsx`
- [x] Create folder structure: `src/engine`, `src/hooks`, `src/context`, `src/screens`, `src/navigation`
- [x] Create placeholder screen components for all 6 screens
- [x] Create `AppNavigator.tsx` wiring all 6 screens in a stack navigator
- [x] Run `npm install` and install React Navigation packages
- [x] Add `SafeAreaProvider` wrapper in `App.tsx`
- [x] Add typed `NativeStackScreenProps` props to all 6 screen components

### Testing (Agent) ✅
- [x] All tests pass (`npm test` — 1/1)
- [x] No TypeScript errors (`npx tsc --noEmit`)
- [x] Spec compliance verified
- [x] Code quality review passed

### Acceptance Criteria ✅
- [x] `npm test` runs and smoke test passes
- [x] All 6 screen files exist under `src/screens/` with correct named exports
- [x] `AppNavigator.tsx` exists with `RootStackParamList` exported
- [x] `@react-native-async-storage/async-storage` present in `package.json`
- [x] `App.tsx` wraps navigator in `SafeAreaProvider`

### Expo Go Manual Tests
- [x] Run `npm run ios`
- [x] Confirm the app opens without a crash and shows "My Timers" header
- [x] Confirm "Home Screen" placeholder text is visible

---

## Phase 2 — Timer Engine

### Write Tests (`src/engine/__tests__/timer.test.ts`)
- [ ] Timer starts from a given duration (in seconds)
- [ ] Timer ticks down by 1 each second
- [ ] Timer reaches 0 and does not go negative
- [ ] Timer can be paused (tick has no effect while paused)
- [ ] Timer can be resumed after pause
- [ ] Timer can be reset to its original duration
- [ ] `isComplete` returns true when timeRemaining === 0

### Write Code (`src/engine/timer.ts`)
- [ ] Implement `createTimer(durationSeconds: number)`
- [ ] Implement `tick(timer)`
- [ ] Implement `pause(timer)`
- [ ] Implement `resume(timer)`
- [ ] Implement `reset(timer)`
- [ ] Implement `isComplete(timer)`

### Acceptance Criteria
- [ ] All engine tests pass
- [ ] Engine has no React imports — pure logic only
- [ ] Timer never goes below 0

### Expo Go Manual Tests
- [ ] N/A — engine is not yet wired to UI

---

## Phase 3 — useTimer Hook

### Write Tests (`src/hooks/__tests__/useTimer.test.ts`)
- [ ] Hook exposes `timeRemaining`, `isRunning`, `isComplete`
- [ ] `start()` begins countdown using fake timers
- [ ] `pause()` freezes countdown
- [ ] `resume()` continues countdown from where it paused
- [ ] `reset()` restores `timeRemaining` to original duration
- [ ] `isComplete` is true when `timeRemaining` reaches 0

### Write Code (`src/hooks/useTimer.ts`)
- [ ] Implement `useTimer(durationSeconds: number)`
- [ ] Wire `setInterval` to engine `tick`
- [ ] Expose controls: `start`, `pause`, `resume`, `reset`

### Acceptance Criteria
- [ ] All hook tests pass
- [ ] Hook uses Jest fake timers in tests (no real waiting)

### Expo Go Manual Tests
- [ ] N/A — hook not yet wired to UI

---

## Phase 4 — Home Screen

### Write Tests (`src/screens/__tests__/HomeScreen.test.tsx`)
- [ ] Renders "My Timers" heading
- [ ] Renders empty state message when no timers saved
- [ ] Renders list of saved timers when timers exist
- [ ] Each saved timer shows name, segment count, total duration
- [ ] "Add Timer" button is visible
- [ ] Tapping "Add Timer" navigates to CreateTimerScreen
- [ ] Tapping a saved timer navigates to TimerDetailScreen

### Write Code
- [ ] `src/screens/HomeScreen.tsx` — full implementation
- [ ] `src/context/TimerContext.tsx` — provides saved timers list (in-memory for now)

### Acceptance Criteria
- [ ] All HomeScreen tests pass
- [ ] Empty state visible when no timers exist
- [ ] Saved timers list visible when timers exist
- [ ] Navigation to CreateTimerScreen works
- [ ] Navigation to TimerDetailScreen works

### Expo Go Manual Tests
- [ ] Open app — confirm Home screen loads with empty state message
- [ ] Confirm "Add Timer" button is visible and tappable
- [ ] Confirm tapping "Add Timer" navigates to Create Timer screen

---

## Phase 5 — Create Timer Screen

### Write Tests (`src/screens/__tests__/CreateTimerScreen.test.tsx`)
- [ ] Renders timer name input field
- [ ] Renders segment label input field
- [ ] Renders hours, minutes, seconds input fields
- [ ] "Save" button is disabled when timer name is empty
- [ ] "Save" button is disabled when duration is 0:00:00
- [ ] "Save" button is enabled when name and valid duration are entered
- [ ] Empty label defaults to "Timer0" on save
- [ ] Saving navigates to TimerDetailScreen
- [ ] Saved timer appears in TimerContext

### Write Code
- [ ] `src/screens/CreateTimerScreen.tsx`
- [ ] Auto-increment label logic (Timer0, Timer1...)
- [ ] Wire to TimerContext `addTimer`

### Acceptance Criteria
- [ ] All CreateTimerScreen tests pass
- [ ] Save button correctly disabled/enabled
- [ ] Default label applied when label is empty
- [ ] Timer saved and visible on return to Home

### Expo Go Manual Tests
- [ ] Tap "Add Timer" on Home → confirm Create Timer screen opens
- [ ] Tap the timer name field → confirm keyboard appears
- [ ] Tap a duration field → confirm numeric keyboard appears
- [ ] Leave label empty, enter duration, tap Save → confirm label defaults to "Timer0"
- [ ] Leave duration at 0:00:00 → confirm Save button is disabled
- [ ] Fill in name + duration → confirm Save navigates to Timer Detail

---

## Phase 6 — Timer Detail + Add Segment Screens

### Write Tests
#### TimerDetailScreen (`src/screens/__tests__/TimerDetailScreen.test.tsx`)
- [ ] Renders timer name as heading
- [ ] Renders total duration
- [ ] Renders all segments with label and duration
- [ ] "+ Add" button navigates to AddSegmentScreen
- [ ] "Start" button navigates to RunningScreen

#### AddSegmentScreen (`src/screens/__tests__/AddSegmentScreen.test.tsx`)
- [ ] Renders label and duration input fields
- [ ] "Save & Continue" disabled when duration is 0:00:00
- [ ] "Save & Continue" enabled when valid duration entered
- [ ] Empty label defaults to next auto-increment label
- [ ] Saving adds segment to timer and returns to TimerDetailScreen
- [ ] New segment appears in TimerDetailScreen list

### Write Code
- [ ] `src/screens/TimerDetailScreen.tsx`
- [ ] `src/screens/AddSegmentScreen.tsx`
- [ ] Update TimerContext to support adding segments to existing timer

### Acceptance Criteria
- [ ] All TimerDetailScreen and AddSegmentScreen tests pass
- [ ] Total duration updates correctly as segments are added
- [ ] Auto-increment label continues from where Create Timer left off

### Expo Go Manual Tests
- [ ] From Timer Detail, tap "+ Add" → confirm Add Segment screen opens
- [ ] Tap label field → confirm keyboard appears
- [ ] Tap duration fields → confirm numeric keyboard appears
- [ ] Leave label empty → confirm label defaults to "Timer1" (or next in sequence)
- [ ] Add segment → confirm return to Timer Detail with new segment in list
- [ ] Confirm total duration updates after adding segment
- [ ] Tap "Start" → confirm navigation to Running screen

---

## Phase 7 — Running Screen & Segment Sequencing

### Write Tests
#### useTimerSequence (`src/hooks/__tests__/useTimerSequence.test.ts`)
- [ ] First segment starts as active (yellow)
- [ ] All other segments start as upcoming (white)
- [ ] When active segment completes, it becomes completed (green)
- [ ] Next segment becomes active (yellow) after advance
- [ ] `advanceToNext()` moves to the correct next segment
- [ ] `isLastSegment` is true when on the final segment
- [ ] Colour state: completed = 'completed', active = 'active', upcoming = 'upcoming'

#### RunningScreen (`src/screens/__tests__/RunningScreen.test.tsx`)
- [ ] Renders timer name
- [ ] Renders "Total running: 0:00:00" on start
- [ ] Active segment shows countdown in large font
- [ ] Active segment card has yellow background
- [ ] Completed segment cards have green background
- [ ] Upcoming segment cards have white/default background
- [ ] "Pause" button visible and functional
- [ ] "Resume" button shown when paused
- [ ] "Reset" button resets active segment to full duration
- [ ] When active segment reaches 0 → navigates to SegmentDoneScreen

### Write Code
- [ ] `src/hooks/useTimerSequence.ts`
- [ ] `src/screens/RunningScreen.tsx`
- [ ] Colour state logic (completed / active / upcoming)
- [ ] Total elapsed time counter (counts up)

### Acceptance Criteria
- [ ] All useTimerSequence and RunningScreen tests pass
- [ ] Colour states change correctly as segments complete
- [ ] Pause/Resume works correctly
- [ ] Reset restores active segment duration
- [ ] Navigation to SegmentDoneScreen fires when countdown hits 0

### Expo Go Manual Tests
- [ ] Start a timer with 3 segments → confirm first segment is yellow (active)
- [ ] Confirm other segments are white (upcoming)
- [ ] Confirm total running time counts up from 0
- [ ] Tap Pause → confirm countdown freezes and button changes to Resume
- [ ] Tap Resume → confirm countdown continues
- [ ] Tap Reset → confirm active segment duration resets to original
- [ ] Let active segment reach 0:00:00 → confirm navigation to Segment Done screen

---

## Phase 8 — Segment Done Screen & Alerts

### Write Tests (`src/screens/__tests__/SegmentDoneScreen.test.tsx`)
- [ ] Renders "[segment label] complete!" message
- [ ] "Start Next" button visible
- [ ] Tapping "Start Next" navigates back to RunningScreen
- [ ] On last segment, "Start Next" is replaced by "Finish"
- [ ] Tapping "Finish" navigates to HomeScreen
- [ ] Sound alert is triggered on screen load (mock expo-av)
- [ ] Vibration is triggered on screen load (mock expo-haptics)

### Write Code
- [ ] `src/screens/SegmentDoneScreen.tsx`
- [ ] Integrate `expo-av` sound alert
- [ ] Integrate `expo-haptics` vibration
- [ ] "Finish" vs "Start Next" logic based on whether last segment

### Acceptance Criteria
- [ ] All SegmentDoneScreen tests pass
- [ ] Sound and vibration mocks called on screen load
- [ ] Correct CTA shown ("Start Next" vs "Finish")
- [ ] Navigation back to Running or Home works correctly

### Expo Go Manual Tests
- [ ] Let a segment finish → confirm Segment Done screen appears
- [ ] Confirm sound plays (may need physical device or simulator sound on)
- [ ] Confirm vibration fires (physical device recommended)
- [ ] Tap "Start Next" → confirm return to Running screen with next segment active (yellow)
- [ ] Complete all segments → confirm "Finish" button appears
- [ ] Tap "Finish" → confirm return to Home screen

---

## Phase 9 — Persistence (AsyncStorage)

### Write Tests (`src/context/__tests__/TimerContext.test.tsx`)
- [ ] Saved timers are written to AsyncStorage on add
- [ ] Timers are loaded from AsyncStorage on app start
- [ ] Empty AsyncStorage returns empty timers list
- [ ] Adding multiple timers persists all of them
- [ ] AsyncStorage mock used (no real storage in tests)

### Write Code
- [ ] Update `TimerContext.tsx` to read/write AsyncStorage
- [ ] Load timers on context mount (`useEffect`)
- [ ] Save timers on every `addTimer` call

### Acceptance Criteria
- [ ] All TimerContext persistence tests pass
- [ ] Timers survive app restart (close and reopen in simulator)
- [ ] Home screen shows saved timers on fresh app open

### Expo Go Manual Tests
- [ ] Create a timer with 2 segments
- [ ] Close the app completely in the simulator
- [ ] Reopen the app → confirm the timer appears on the Home screen
- [ ] Tap the saved timer → confirm Timer Detail shows all segments intact

---

## Phase 10 — Final QA & Polish

- [ ] Run full test suite — all tests pass
- [ ] Test full user flow: Create timer → Add segments → Run → Complete → Return home
- [ ] Test toothbrush scenario: 2 segments × 2 min each
- [ ] Test slow cooker scenario: 3 segments including 4hr segment
- [ ] Confirm colour transitions work end-to-end (white → yellow → green)
- [ ] Confirm sound + vibration on all segment completions
- [ ] Confirm saved timers persist across multiple app restarts
- [ ] Confirm keyboard appears on all input fields in simulator
- [ ] Review all screen layouts for clarity and readability
