import { renderHook, act } from '@testing-library/react-native';
import { useTimer } from '../useTimer';

jest.useFakeTimers();

describe('useTimer', () => {
  afterEach(() => {
    jest.clearAllTimers();
  });

  it('exposes initial state correctly', () => {
    const { result } = renderHook(() => useTimer(60));

    expect(result.current.timeRemaining).toBe(60);
    expect(result.current.isRunning).toBe(false);
    expect(result.current.isComplete).toBe(false);
  });

  it('start sets isRunning to true and begins countdown', () => {
    const { result } = renderHook(() => useTimer(10));

    act(() => {
      result.current.start();
      jest.advanceTimersByTime(3000);
    });

    expect(result.current.isRunning).toBe(true);
    expect(result.current.timeRemaining).toBe(7);
  });

  it('pause sets isRunning to false and freezes timeRemaining', () => {
    const { result } = renderHook(() => useTimer(10));

    act(() => {
      result.current.start();
      jest.advanceTimersByTime(3000);
    });

    act(() => {
      result.current.pause();
      jest.advanceTimersByTime(5000);
    });

    expect(result.current.isRunning).toBe(false);
    expect(result.current.timeRemaining).toBe(7);
  });

  it('reset returns timeRemaining to the original duration and stops the timer', () => {
    const { result } = renderHook(() => useTimer(10));

    act(() => {
      result.current.start();
      jest.advanceTimersByTime(4000);
    });

    act(() => {
      result.current.reset();
    });

    expect(result.current.timeRemaining).toBe(10);
    expect(result.current.isRunning).toBe(false);
    expect(result.current.isComplete).toBe(false);
  });

  it('sets isComplete to true when timer reaches zero', () => {
    const { result } = renderHook(() => useTimer(3));

    act(() => {
      result.current.start();
      jest.advanceTimersByTime(3000);
    });

    expect(result.current.timeRemaining).toBe(0);
    expect(result.current.isComplete).toBe(true);
    expect(result.current.isRunning).toBe(false);
  });

  it('isComplete resets to false after reset', () => {
    const { result } = renderHook(() => useTimer(3));

    act(() => {
      result.current.start();
      jest.advanceTimersByTime(3000);
    });

    expect(result.current.isComplete).toBe(true);

    act(() => {
      result.current.reset();
    });

    expect(result.current.isComplete).toBe(false);
  });
});
