# Phase 1 — Project Scaffolding Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Bootstrap a working Expo/React Native project with 6 placeholder screens connected by a stack navigator, with a passing smoke test and the app launchable in the iOS Simulator.

**Architecture:** Follows V1 patterns — Expo entry point (`index.ts` → `App.tsx`) wires to a React Navigation stack navigator. All 6 screens are placeholder components. No business logic yet.

**Tech Stack:** Expo SDK 55, React Native 0.83.4, React 19.2.5, TypeScript 5.9.2, React Navigation (native stack), Jest + jest-expo + @testing-library/react-native.

---

## File Map

| Action | Path | Responsibility |
|---|---|---|
| Create | `package.json` | Dependencies and npm scripts |
| Create | `tsconfig.json` | TypeScript config |
| Create | `jest.config.js` | Jest preset config |
| Create | `app.json` | Expo app metadata |
| Create | `index.ts` | App entry point — registers root component |
| Create | `App.tsx` | Root component — renders AppNavigator |
| Create | `src/__tests__/smoke.test.ts` | Smoke test — verifies test runner works |
| Create | `src/navigation/AppNavigator.tsx` | Stack navigator wiring all 6 screens |
| Create | `src/screens/HomeScreen.tsx` | Placeholder |
| Create | `src/screens/CreateTimerScreen.tsx` | Placeholder |
| Create | `src/screens/TimerDetailScreen.tsx` | Placeholder |
| Create | `src/screens/AddSegmentScreen.tsx` | Placeholder |
| Create | `src/screens/RunningScreen.tsx` | Placeholder |
| Create | `src/screens/SegmentDoneScreen.tsx` | Placeholder |

---

## Task 1: Core Config Files

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `jest.config.js`

- [ ] **Step 1: Create `package.json`**

```json
{
  "name": "countdown-timer-app-v2",
  "version": "1.0.0",
  "main": "index.ts",
  "scripts": {
    "start": "expo start",
    "android": "expo start --android",
    "ios": "expo start --ios",
    "test": "jest",
    "test:watch": "jest --watch"
  },
  "dependencies": {
    "expo": "~55.0.14",
    "expo-status-bar": "~55.0.5",
    "expo-haptics": "~55.0.14",
    "expo-av": "~16.0.8",
    "react": "19.2.5",
    "react-native": "0.83.4"
  },
  "devDependencies": {
    "@testing-library/react-native": "^13.3.3",
    "@types/jest": "~29.5.14",
    "@types/react": "~19.2.2",
    "jest": "^29.7.0",
    "jest-expo": "~55.0.15",
    "react-test-renderer": "19.2.5",
    "typescript": "~5.9.2"
  },
  "private": true
}
```

- [ ] **Step 2: Create `tsconfig.json`**

```json
{
  "extends": "expo/tsconfig.base",
  "compilerOptions": {
    "strict": true,
    "types": ["jest"]
  }
}
```

- [ ] **Step 3: Create `jest.config.js`**

```js
module.exports = {
  preset: 'jest-expo',
};
```

---

## Task 2: Expo App Config

**Files:**
- Create: `app.json`

- [ ] **Step 1: Create `app.json`**

```json
{
  "expo": {
    "name": "Countdown Timer App",
    "slug": "countdown-timer-app-v2",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "light",
    "splash": {
      "image": "./assets/splash-icon.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "ios": {
      "supportsTablet": false
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#ffffff"
      }
    },
    "web": {
      "favicon": "./assets/favicon.png"
    }
  }
}
```

> Note: `assets/` folder will be auto-created by `npx expo install` / Expo defaults. If the simulator complains about missing asset files, copy the `assets/` folder from V1 (`../Countdown Timer App V1/assets/`) into the V2 root.

---

## Task 3: Smoke Test

**Files:**
- Create: `src/__tests__/smoke.test.ts`

- [ ] **Step 1: Create the test directory and smoke test**

```typescript
// src/__tests__/smoke.test.ts
describe('Test runner smoke test', () => {
  it('runs', () => {
    expect(true).toBe(true);
  });
});
```

> This test confirms the test runner is configured correctly. It should pass before any app code exists.

---

## Task 4: Install Dependencies

**Files:** (none created — installs node_modules)

- [ ] **Step 1: Install base dependencies**

Run from the `Countdown Timer App V2/` directory:

```bash
npm install
```

Expected: `node_modules/` created, no peer dependency errors.

- [ ] **Step 2: Install React Navigation packages via Expo (auto-resolves correct versions)**

```bash
npx expo install @react-navigation/native @react-navigation/native-stack react-native-screens react-native-safe-area-context
```

Expected: packages added to `package.json` dependencies with Expo-compatible versions.

- [ ] **Step 3: Run smoke test to confirm test runner works**

```bash
npm test
```

Expected output:
```
PASS src/__tests__/smoke.test.ts
  Test runner smoke test
    ✓ runs

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
```

- [ ] **Step 4: Commit**

```bash
git add package.json tsconfig.json jest.config.js app.json src/__tests__/smoke.test.ts
git commit -m "feat: bootstrap V2 project config and smoke test"
```

---

## Task 5: Entry Point Files

**Files:**
- Create: `index.ts`
- Create: `App.tsx`

- [ ] **Step 1: Create `index.ts`**

```typescript
// index.ts
import { registerRootComponent } from 'expo';
import App from './App';

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It ensures the environment is set up correctly for both Expo Go and native builds.
registerRootComponent(App);
```

- [ ] **Step 2: Create minimal `App.tsx`** (will be updated in Task 7)

```typescript
// App.tsx
import { StatusBar } from 'expo-status-bar';
import { View, Text } from 'react-native';

export default function App() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Countdown Timer App V2</Text>
      <StatusBar style="auto" />
    </View>
  );
}
```

- [ ] **Step 3: Run tests to confirm still passing**

```bash
npm test
```

Expected: 1 test passing, no errors.

---

## Task 6: Placeholder Screens

**Files:**
- Create: `src/screens/HomeScreen.tsx`
- Create: `src/screens/CreateTimerScreen.tsx`
- Create: `src/screens/TimerDetailScreen.tsx`
- Create: `src/screens/AddSegmentScreen.tsx`
- Create: `src/screens/RunningScreen.tsx`
- Create: `src/screens/SegmentDoneScreen.tsx`

- [ ] **Step 1: Create `src/screens/HomeScreen.tsx`**

```typescript
// src/screens/HomeScreen.tsx
import { View, Text, StyleSheet } from 'react-native';

export function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Home Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  text: { fontSize: 24 },
});
```

- [ ] **Step 2: Create `src/screens/CreateTimerScreen.tsx`**

```typescript
// src/screens/CreateTimerScreen.tsx
import { View, Text, StyleSheet } from 'react-native';

export function CreateTimerScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Create Timer Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  text: { fontSize: 24 },
});
```

- [ ] **Step 3: Create `src/screens/TimerDetailScreen.tsx`**

```typescript
// src/screens/TimerDetailScreen.tsx
import { View, Text, StyleSheet } from 'react-native';

export function TimerDetailScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Timer Detail Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  text: { fontSize: 24 },
});
```

- [ ] **Step 4: Create `src/screens/AddSegmentScreen.tsx`**

```typescript
// src/screens/AddSegmentScreen.tsx
import { View, Text, StyleSheet } from 'react-native';

export function AddSegmentScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Add Segment Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  text: { fontSize: 24 },
});
```

- [ ] **Step 5: Create `src/screens/RunningScreen.tsx`**

```typescript
// src/screens/RunningScreen.tsx
import { View, Text, StyleSheet } from 'react-native';

export function RunningScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Running Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  text: { fontSize: 24 },
});
```

- [ ] **Step 6: Create `src/screens/SegmentDoneScreen.tsx`**

```typescript
// src/screens/SegmentDoneScreen.tsx
import { View, Text, StyleSheet } from 'react-native';

export function SegmentDoneScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Segment Done Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  text: { fontSize: 24 },
});
```

- [ ] **Step 7: Run tests to confirm still passing**

```bash
npm test
```

Expected: 1 test passing.

---

## Task 7: Navigator + Wire App.tsx

**Files:**
- Create: `src/navigation/AppNavigator.tsx`
- Modify: `App.tsx`

- [ ] **Step 1: Create `src/navigation/AppNavigator.tsx`**

```typescript
// src/navigation/AppNavigator.tsx
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from '../screens/HomeScreen';
import { CreateTimerScreen } from '../screens/CreateTimerScreen';
import { TimerDetailScreen } from '../screens/TimerDetailScreen';
import { AddSegmentScreen } from '../screens/AddSegmentScreen';
import { RunningScreen } from '../screens/RunningScreen';
import { SegmentDoneScreen } from '../screens/SegmentDoneScreen';

export type RootStackParamList = {
  Home: undefined;
  CreateTimer: undefined;
  TimerDetail: { timerId: string };
  AddSegment: { timerId: string };
  Running: { timerId: string };
  SegmentDone: { timerId: string; segmentId: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'My Timers' }} />
        <Stack.Screen name="CreateTimer" component={CreateTimerScreen} options={{ title: 'New Timer' }} />
        <Stack.Screen name="TimerDetail" component={TimerDetailScreen} options={{ title: 'Timer Detail' }} />
        <Stack.Screen name="AddSegment" component={AddSegmentScreen} options={{ title: 'Add Segment' }} />
        <Stack.Screen name="Running" component={RunningScreen} options={{ title: 'Running', headerBackVisible: false }} />
        <Stack.Screen name="SegmentDone" component={SegmentDoneScreen} options={{ title: 'Segment Done', headerBackVisible: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
```

- [ ] **Step 2: Update `App.tsx` to render the navigator**

```typescript
// App.tsx
import { StatusBar } from 'expo-status-bar';
import { AppNavigator } from './src/navigation/AppNavigator';

export default function App() {
  return (
    <>
      <AppNavigator />
      <StatusBar style="auto" />
    </>
  );
}
```

- [ ] **Step 3: Run tests to confirm still passing**

```bash
npm test
```

Expected: 1 test passing.

- [ ] **Step 4: Commit all screens and navigator**

```bash
git add index.ts App.tsx src/screens/ src/navigation/
git commit -m "feat: add placeholder screens and stack navigator"
```

---

## Task 8: Launch in Simulator

- [ ] **Step 1: Start the Expo dev server**

```bash
expo start
```

- [ ] **Step 2: Open in iOS Simulator**

Press `i` in the terminal after Expo starts.

Expected: App opens showing "My Timers" header and "Home Screen" text. No red error screen.

- [ ] **Step 3: Verify navigator is wired (developer check)**

In the simulator, confirm the app loads without a crash. Navigation between screens will be tested fully once each screen has interactive buttons — for now, the goal is no crash on launch.

- [ ] **Step 4: Final commit if any adjustments were needed**

```bash
git add -p
git commit -m "fix: resolve any launch issues from simulator testing"
```

---

## Acceptance Criteria Checklist

- [ ] `npm test` runs and smoke test passes (1 test, 0 failures)
- [ ] `expo start` + `i` launches the app in the iOS Simulator without a red error screen
- [ ] Home screen visible with "My Timers" header
- [ ] All 6 screen files exist under `src/screens/`
- [ ] `AppNavigator.tsx` exists with `RootStackParamList` type exported
- [ ] No TypeScript errors (`npx tsc --noEmit`)

---

## Expo Go Manual Tests

Run these yourself in the simulator after the plan is complete:

1. Run `expo start`, press `i` — confirm app opens without crashing
2. Confirm "My Timers" appears as the screen header
3. Confirm "Home Screen" placeholder text is visible
4. Open the React Native dev menu (Cmd+D in simulator) — no errors shown
