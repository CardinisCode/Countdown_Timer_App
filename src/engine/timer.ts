export interface TimerOptions {
  duration: number; // in seconds
  onTick: (timeRemaining: number) => void;
  onComplete: () => void;
}

export interface Timer {
  start: () => void;
  pause: () => void;
  reset: () => void;
  getTimeRemaining: () => number;
}

export function createTimer({ duration, onTick, onComplete }: TimerOptions): Timer {
  let timeRemaining = duration;
  let intervalId: ReturnType<typeof setInterval> | null = null;

  function start() {
    if (intervalId !== null) return;

    intervalId = setInterval(() => {
      timeRemaining -= 1;
      onTick(timeRemaining);

      if (timeRemaining <= 0) {
        clearInterval(intervalId!);
        intervalId = null;
        onComplete();
      }
    }, 1000);
  }

  function pause() {
    if (intervalId !== null) {
      clearInterval(intervalId);
      intervalId = null;
    }
  }

  function reset() {
    pause();
    timeRemaining = duration;
  }

  function getTimeRemaining() {
    return timeRemaining;
  }

  return { start, pause, reset, getTimeRemaining };
}
