# Countdown Timer App

A countdown timer that notifies you at key moments mid-countdown — not just when time is up.

---

## Why I built this

Most timer apps only alert you at the end. But a lot of real-world tasks need a nudge *during* the countdown too.

I couldn't find an app that supported mid-timer step notifications, so I was stuck running several alarms simultaneously to get the same effect. This app solves that.

A simple example: my daughter brushing her teeth. A 2-minute timer with steps at 30s, 1m, and 1m 30s gives her a visual and audio cue to move to the next area of her mouth — four sections, covered evenly, without any nagging from me.

---

## What it does

- Set a countdown timer with hours, minutes, and seconds
- Optionally add up to 3 **step times** — intermediate points within the countdown that each trigger their own notification
- Timers can be started, paused, and reset
- Completed timers are automatically saved as **presets**, so you can re-run a favourite timer in one tap

---

## Status

Currently in active development. See [TODO.md](TODO.md) for the full build plan.

---

## Tech stack

- [React Native](https://reactnative.dev/) + [Expo](https://expo.dev/) (SDK 55)
- TypeScript (strict mode)
- Jest + React Native Testing Library (unit and integration tests)
- Maestro (end-to-end testing)

---

## Running the app locally

**Prerequisites:** Node.js, and either the Expo Go app on your phone or an iOS/Android simulator.

```bash
# Install dependencies
npm install

# Start the development server
npm start

# Or target a specific platform
npm run ios
npm run android
npm run web
```

---

## Running the tests

```bash
npm test
```
