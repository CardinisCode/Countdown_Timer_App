# Countdown Timer App V2 — Brainstorm Design Spec

Date: 2026-04-11

This spec captures all decisions made during the V2 brainstorming session. Full detail is in the project documents:

- Product requirements → `PRD.md`
- Technical architecture → `technical-spec.md`
- Screen designs + UX decisions → `design-spec.md`
- Phased work breakdown → `TODO.md`
- Claude working instructions → `CLAUDE.md`

---

## Key Decisions Log

| Topic | Decision |
|---|---|
| Platform | Expo SDK 55, React Native 0.83.4 (iOS + Android) |
| State management | React Context + useReducer |
| Persistence | AsyncStorage |
| Navigation | React Navigation stack, 6 screens |
| Segment advance | Manual (user taps "Start Next") |
| Colour states | Completed=green, Active=yellow, Upcoming=white |
| Duration input | Hours + minutes + seconds, TextInput with numeric keyboard |
| Empty segment label | Auto-assign Timer0, Timer1... |
| Zero duration | Save button disabled |
| Alerts | expo-av (sound) + expo-haptics (vibration) |
| Testing | Jest + jest-expo + @testing-library/react-native, strict TDD |
| Work structure | Phases in TODO.md, TDD per phase, acceptance criteria, Expo Go tasks |
| Custom colours | Out of scope for MVP (future paid feature) |
