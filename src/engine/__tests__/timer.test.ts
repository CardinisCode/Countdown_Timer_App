import { createTimer } from '../timer';

jest.useFakeTimers();

describe('createTimer', () => {
  afterEach(() => {
    jest.clearAllTimers();
  });

  it('initialises with the given duration', () => {
    const onTick = jest.fn();
    const onComplete = jest.fn();
    const timer = createTimer({ duration: 10, onTick, onComplete });

    expect(timer.getTimeRemaining()).toBe(10);
  });

  it('decrements by one each second after start', () => {
    const onTick = jest.fn();
    const onComplete = jest.fn();
    const timer = createTimer({ duration: 10, onTick, onComplete });

    timer.start();
    jest.advanceTimersByTime(3000);

    expect(timer.getTimeRemaining()).toBe(7);
    expect(onTick).toHaveBeenCalledTimes(3);
  });

  it('stops at zero and fires the completion callback', () => {
    const onTick = jest.fn();
    const onComplete = jest.fn();
    const timer = createTimer({ duration: 3, onTick, onComplete });

    timer.start();
    jest.advanceTimersByTime(3000);

    expect(timer.getTimeRemaining()).toBe(0);
    expect(onComplete).toHaveBeenCalledTimes(1);
  });

  it('does not decrement below zero', () => {
    const onTick = jest.fn();
    const onComplete = jest.fn();
    const timer = createTimer({ duration: 3, onTick, onComplete });

    timer.start();
    jest.advanceTimersByTime(10000);

    expect(timer.getTimeRemaining()).toBe(0);
  });

  it('pause freezes the countdown', () => {
    const onTick = jest.fn();
    const onComplete = jest.fn();
    const timer = createTimer({ duration: 10, onTick, onComplete });

    timer.start();
    jest.advanceTimersByTime(3000);
    timer.pause();
    jest.advanceTimersByTime(5000);

    expect(timer.getTimeRemaining()).toBe(7);
  });

  it('resumes counting down after pause', () => {
    const onTick = jest.fn();
    const onComplete = jest.fn();
    const timer = createTimer({ duration: 10, onTick, onComplete });

    timer.start();
    jest.advanceTimersByTime(3000);
    timer.pause();
    jest.advanceTimersByTime(5000);
    timer.start();
    jest.advanceTimersByTime(2000);

    expect(timer.getTimeRemaining()).toBe(5);
  });

  it('reset returns to the original duration and stops the timer', () => {
    const onTick = jest.fn();
    const onComplete = jest.fn();
    const timer = createTimer({ duration: 10, onTick, onComplete });

    timer.start();
    jest.advanceTimersByTime(4000);
    timer.reset();

    expect(timer.getTimeRemaining()).toBe(10);

    // Confirm timer is stopped after reset
    jest.advanceTimersByTime(3000);
    expect(timer.getTimeRemaining()).toBe(10);
  });

  it('does not fire completion callback again after reset and re-run', () => {
    const onTick = jest.fn();
    const onComplete = jest.fn();
    const timer = createTimer({ duration: 3, onTick, onComplete });

    timer.start();
    jest.advanceTimersByTime(3000);
    expect(onComplete).toHaveBeenCalledTimes(1);

    timer.reset();
    timer.start();
    jest.advanceTimersByTime(3000);
    expect(onComplete).toHaveBeenCalledTimes(2);
  });
});
