# Countdown Timer App V2 — Project TODO

Each phase follows this order:
1. Write failing tests
2. Write code to make tests pass
3. Testing (agent) — automated: `npm test`, TypeScript, spec compliance, code quality
4. Expo Go manual tests — you verify in the simulator
5. Acceptance criteria — checked last, after both above pass; reflects user story outcomes

---

## Phase 1 — Project Scaffolding ✅ COMPLETE

### Write Tests ✅
- [x] Smoke test: app renders without crashing (`src/__tests__/smoke.test.ts`)

### Write Code ✅
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

### Expo Go Manual Tests ✅
- [x] Run `npm run ios`
- [x] Confirm the app opens without a crash and shows "My Timers" header
- [x] Confirm "Home Screen" placeholder text is visible

### Acceptance Criteria ✅
- [x] The app launches on the simulator without crashing
- [x] The user sees a screen titled "My Timers"

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

### Testing (Agent)
- [ ] All engine tests pass
- [ ] No TypeScript errors

### Expo Go Manual Tests
N/A — engine is not yet wired to UI

### Acceptance Criteria
- [ ] A timer started at a given duration counts down correctly each second
- [ ] A timer that reaches zero does not continue below zero
- [ ] A paused timer does not continue counting down
- [ ] A resumed timer continues from where it was paused
- [ ] A reset timer returns to its original starting duration

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

### Testing (Agent)
- [ ] All hook tests pass
- [ ] No TypeScript errors

### Expo Go Manual Tests
N/A — hook not yet wired to UI

### Acceptance Criteria
- [ ] A timer started via the hook counts down correctly in a React component
- [ ] A paused timer holds its remaining time until resumed
- [ ] A reset timer displays its original duration again

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

### Testing (Agent)
- [ ] All HomeScreen tests pass
- [ ] No TypeScript errors

### Expo Go Manual Tests
- [ ] Open app — confirm empty state message is shown when no timers exist
- [ ] Confirm "Add Timer" button is visible and tappable
- [ ] Confirm tapping "Add Timer" navigates to Create Timer screen

### Acceptance Criteria
- [ ] When no timers have been created, the user sees a helpful empty state message
- [ ] The user can see an "Add Timer" button to start creating a timer
- [ ] When timers exist, the user sees each timer listed with its name and total duration
- [ ] The user can tap a saved timer to view its details

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

### Testing (Agent)
- [ ] All CreateTimerScreen tests pass
- [ ] No TypeScript errors

### Expo Go Manual Tests
- [ ] Tap "Add Timer" on Home → confirm Create Timer screen opens
- [ ] Tap the timer name field → confirm keyboard appears
- [ ] Tap a duration field → confirm numeric keyboard appears
- [ ] Leave label empty, enter duration, tap Save → confirm label defaults to "Timer0"
- [ ] Leave duration at 0:00:00 → confirm Save button is disabled
- [ ] Fill in name + duration → confirm Save navigates to Timer Detail

### Acceptance Criteria
- [ ] The user can give their timer a name
- [ ] The user can set a label and duration for their first segment
- [ ] If the user leaves the segment label blank, a default label is assigned automatically
- [ ] The user cannot save a segment with a duration of zero
- [ ] After saving, the user is taken to the Timer Detail screen showing their new timer

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

### Testing (Agent)
- [ ] All TimerDetailScreen and AddSegmentScreen tests pass
- [ ] No TypeScript errors

### Expo Go Manual Tests
- [ ] From Timer Detail, tap "+ Add" → confirm Add Segment screen opens
- [ ] Tap label field → confirm keyboard appears
- [ ] Tap duration fields → confirm numeric keyboard appears
- [ ] Leave label empty → confirm label defaults to next in sequence (e.g. "Timer1")
- [ ] Add segment → confirm return to Timer Detail with new segment in list
- [ ] Confirm total duration updates after adding segment
- [ ] Tap "Start" → confirm navigation to Running screen

### Acceptance Criteria
- [ ] The user can see their timer's name and all segments listed with durations
- [ ] The user can see the total combined duration of all segments
- [ ] The user can add as many segments as they need
- [ ] Each new segment appears in the list immediately after saving
- [ ] The user can start the timer from this screen

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

### Testing (Agent)
- [ ] All useTimerSequence and RunningScreen tests pass
- [ ] No TypeScript errors

### Expo Go Manual Tests
- [ ] Start a timer with 3 segments → confirm first segment is yellow (active)
- [ ] Confirm other segments are white (upcoming)
- [ ] Confirm total running time counts up from 0
- [ ] Tap Pause → confirm countdown freezes and button changes to Resume
- [ ] Tap Resume → confirm countdown continues
- [ ] Tap Reset → confirm active segment duration resets to original
- [ ] Let active segment reach 0:00:00 → confirm navigation to Segment Done screen

### Acceptance Criteria
- [ ] The user can see their timer's name and how long the session has been running
- [ ] The user can clearly see which segment is currently active (yellow background)
- [ ] The user can see which segments have been completed (green background)
- [ ] The user can see which segments are still to come (white background)
- [ ] The user can pause the active segment and resume it from where it left off
- [ ] The user can reset the active segment back to its full duration
- [ ] When a segment finishes, the user is taken to the Segment Done screen automatically

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

### Testing (Agent)
- [ ] All SegmentDoneScreen tests pass
- [ ] No TypeScript errors

### Expo Go Manual Tests
- [ ] Let a segment finish → confirm Segment Done screen appears
- [ ] Confirm sound plays (turn simulator sound on)
- [ ] Confirm vibration fires (physical device recommended)
- [ ] Tap "Start Next" → confirm return to Running screen with next segment active (yellow)
- [ ] Complete all segments → confirm "Finish" button appears instead of "Start Next"
- [ ] Tap "Finish" → confirm return to Home screen

### Acceptance Criteria
- [ ] The user is alerted with sound and vibration when a segment finishes
- [ ] The user can see which segment just completed
- [ ] The user can manually start the next segment at their own pace
- [ ] When the last segment finishes, the user sees a "Finish" button instead of "Start Next"
- [ ] After finishing, the user is returned to the Home screen

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

### Testing (Agent)
- [ ] All TimerContext persistence tests pass
- [ ] No TypeScript errors

### Expo Go Manual Tests
- [ ] Create a timer with 2 segments
- [ ] Close the app completely in the simulator
- [ ] Reopen the app → confirm the timer appears on the Home screen
- [ ] Tap the saved timer → confirm Timer Detail shows all segments intact

### Acceptance Criteria
- [ ] The user's saved timers are still available the next time they open the app
- [ ] The user can tap a previously saved timer and see all its segments as they left them

---

## Phase 10 — Final QA & Polish

- [ ] Run full test suite — all tests pass
- [ ] Test full user flow: Create timer → Add segments → Run → Complete → Return home
- [ ] Test toothbrush scenario: 2 segments × 2 min each
- [ ] Test slow cooker scenario: 3 segments including a 4hr segment
- [ ] Confirm colour transitions work end-to-end (white → yellow → green)
- [ ] Confirm sound + vibration fires on all segment completions
- [ ] Confirm saved timers persist across multiple app restarts
- [ ] Confirm keyboard appears on all input fields in simulator
- [ ] Review all screen layouts for clarity and readability
