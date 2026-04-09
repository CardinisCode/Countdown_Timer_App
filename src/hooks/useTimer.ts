import { useEffect, useRef, useState } from 'react';
import { createTimer, Timer } from '../engine/timer';

export interface UseTimerResult {
  timeRemaining: number;
  isRunning: boolean;
  isComplete: boolean;
  start: () => void;
  pause: () => void;
  reset: () => void;
}

export function useTimer(duration: number): UseTimerResult {
  const [timeRemaining, setTimeRemaining] = useState(duration);
  const [isRunning, setIsRunning] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const timerRef = useRef<Timer | null>(null);

  useEffect(() => {
    if (!isRunning && !isComplete) {
      timerRef.current = null;
      setTimeRemaining(duration);
    }
  }, [duration]);

  function getTimer(): Timer {
    if (!timerRef.current) {
      timerRef.current = createTimer({
        duration,
        onTick: (remaining) => {
          setTimeRemaining(remaining);
        },
        onComplete: () => {
          setIsRunning(false);
          setIsComplete(true);
        },
      });
    }
    return timerRef.current;
  }

  function start() {
    setIsRunning(true);
    getTimer().start();
  }

  function pause() {
    setIsRunning(false);
    getTimer().pause();
  }

  function reset() {
    if (timerRef.current) {
      timerRef.current.pause();
      timerRef.current = null;
    }
    setTimeRemaining(duration);
    setIsRunning(false);
    setIsComplete(false);
  }

  return { timeRemaining, isRunning, isComplete, start, pause, reset };
}
