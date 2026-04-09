import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react-native';
import { TimerScreen } from '../TimerScreen';

jest.useFakeTimers();

describe('TimerScreen', () => {
  afterEach(() => {
    jest.clearAllTimers();
  });

  describe('initial render', () => {
    it('shows 00:00:00 with no initial duration', () => {
      render(<TimerScreen />);
      expect(screen.getByTestId('time-display')).toHaveTextContent('00:00:00');
    });

    it('shows the correct time for a given initialDuration', () => {
      render(<TimerScreen initialDuration={3661} />); // 1h 1m 1s
      expect(screen.getByTestId('time-display')).toHaveTextContent('01:01:01');
    });

    it('does not show completion message on load', () => {
      render(<TimerScreen />);
      expect(screen.queryByTestId('completion-message')).toBeNull();
    });

    it('does not show pause button before timer starts', () => {
      render(<TimerScreen />);
      expect(screen.queryByTestId('pause-button')).toBeNull();
    });

    it('shows start and reset buttons on load', () => {
      render(<TimerScreen />);
      expect(screen.getByTestId('start-button')).toBeTruthy();
      expect(screen.getByTestId('reset-button')).toBeTruthy();
    });
  });

  describe('duration inputs', () => {
    it('all three inputs are visible before the timer starts', () => {
      render(<TimerScreen />);
      expect(screen.getByTestId('input-hours')).toBeTruthy();
      expect(screen.getByTestId('input-minutes')).toBeTruthy();
      expect(screen.getByTestId('input-seconds')).toBeTruthy();
    });

    it('typing into the hours input updates the time display', () => {
      render(<TimerScreen />);
      fireEvent.changeText(screen.getByTestId('input-hours'), '2');
      expect(screen.getByTestId('time-display')).toHaveTextContent('02:00:00');
    });

    it('typing into the minutes input updates the time display', () => {
      render(<TimerScreen />);
      fireEvent.changeText(screen.getByTestId('input-minutes'), '30');
      expect(screen.getByTestId('time-display')).toHaveTextContent('00:30:00');
    });

    it('typing into the seconds input updates the time display', () => {
      render(<TimerScreen />);
      fireEvent.changeText(screen.getByTestId('input-seconds'), '45');
      expect(screen.getByTestId('time-display')).toHaveTextContent('00:00:45');
    });

    it('all three inputs together update the time display correctly', () => {
      render(<TimerScreen />);
      fireEvent.changeText(screen.getByTestId('input-hours'), '1');
      fireEvent.changeText(screen.getByTestId('input-minutes'), '30');
      fireEvent.changeText(screen.getByTestId('input-seconds'), '45');
      expect(screen.getByTestId('time-display')).toHaveTextContent('01:30:45');
    });

    it('empty input is treated as zero', () => {
      render(<TimerScreen />);
      fireEvent.changeText(screen.getByTestId('input-minutes'), '5');
      fireEvent.changeText(screen.getByTestId('input-minutes'), '');
      expect(screen.getByTestId('time-display')).toHaveTextContent('00:00:00');
    });

    it('non-numeric input is ignored', () => {
      render(<TimerScreen />);
      fireEvent.changeText(screen.getByTestId('input-minutes'), 'abc');
      expect(screen.getByTestId('time-display')).toHaveTextContent('00:00:00');
    });

    it('inputs are hidden once the timer has started', () => {
      render(<TimerScreen initialDuration={60} />);
      fireEvent.press(screen.getByTestId('start-button'));
      expect(screen.queryByTestId('input-hours')).toBeNull();
      expect(screen.queryByTestId('input-minutes')).toBeNull();
      expect(screen.queryByTestId('input-seconds')).toBeNull();
    });

    it('inputs reappear after pausing', () => {
      render(<TimerScreen initialDuration={60} />);
      fireEvent.press(screen.getByTestId('start-button'));
      fireEvent.press(screen.getByTestId('pause-button'));
      expect(screen.getByTestId('input-hours')).toBeTruthy();
      expect(screen.getByTestId('input-minutes')).toBeTruthy();
      expect(screen.getByTestId('input-seconds')).toBeTruthy();
    });

    it('reset restores inputs and time display to the user-set values', () => {
      render(<TimerScreen />);
      fireEvent.changeText(screen.getByTestId('input-minutes'), '2');
      fireEvent.press(screen.getByTestId('start-button'));
      act(() => { jest.advanceTimersByTime(5000); });
      fireEvent.press(screen.getByTestId('reset-button'));
      expect(screen.getByTestId('time-display')).toHaveTextContent('00:02:00');
      expect(screen.getByTestId('input-minutes')).toBeTruthy();
    });
  });

  describe('timer controls', () => {
    it('start begins the countdown from the set duration', () => {
      render(<TimerScreen />);
      fireEvent.changeText(screen.getByTestId('input-seconds'), '10');
      fireEvent.press(screen.getByTestId('start-button'));
      act(() => { jest.advanceTimersByTime(3000); });
      expect(screen.getByTestId('time-display')).toHaveTextContent('00:00:07');
    });

    it('start button is replaced by pause button once running', () => {
      render(<TimerScreen initialDuration={10} />);
      fireEvent.press(screen.getByTestId('start-button'));
      expect(screen.queryByTestId('start-button')).toBeNull();
      expect(screen.getByTestId('pause-button')).toBeTruthy();
    });

    it('pause freezes the countdown', () => {
      render(<TimerScreen initialDuration={10} />);
      fireEvent.press(screen.getByTestId('start-button'));
      act(() => { jest.advanceTimersByTime(3000); });
      fireEvent.press(screen.getByTestId('pause-button'));
      act(() => { jest.advanceTimersByTime(5000); });
      expect(screen.getByTestId('time-display')).toHaveTextContent('00:00:07');
    });

    it('timer resumes from where it paused', () => {
      render(<TimerScreen initialDuration={10} />);
      fireEvent.press(screen.getByTestId('start-button'));
      act(() => { jest.advanceTimersByTime(3000); });
      fireEvent.press(screen.getByTestId('pause-button'));
      fireEvent.press(screen.getByTestId('start-button'));
      act(() => { jest.advanceTimersByTime(2000); });
      expect(screen.getByTestId('time-display')).toHaveTextContent('00:00:05');
    });

    it('reset while running stops the timer and restores the duration', () => {
      render(<TimerScreen initialDuration={10} />);
      fireEvent.press(screen.getByTestId('start-button'));
      act(() => { jest.advanceTimersByTime(4000); });
      fireEvent.press(screen.getByTestId('reset-button'));
      expect(screen.getByTestId('time-display')).toHaveTextContent('00:00:10');
      act(() => { jest.advanceTimersByTime(3000); });
      expect(screen.getByTestId('time-display')).toHaveTextContent('00:00:10');
    });

    it('cannot start a timer with zero duration', () => {
      render(<TimerScreen />);
      fireEvent.press(screen.getByTestId('start-button'));
      act(() => { jest.advanceTimersByTime(1000); });
      // Timer with 0 duration should complete immediately — inputs should not be locked in a broken state
      expect(screen.queryByTestId('start-button')).toBeNull();
      expect(screen.getByTestId('completion-message')).toBeTruthy();
    });
  });

  describe('completion', () => {
    it('shows completion message when timer reaches zero', () => {
      render(<TimerScreen initialDuration={3} />);
      fireEvent.press(screen.getByTestId('start-button'));
      act(() => { jest.advanceTimersByTime(3000); });
      expect(screen.getByTestId('completion-message')).toBeTruthy();
    });

    it('hides start and pause buttons on completion', () => {
      render(<TimerScreen initialDuration={3} />);
      fireEvent.press(screen.getByTestId('start-button'));
      act(() => { jest.advanceTimersByTime(3000); });
      expect(screen.queryByTestId('start-button')).toBeNull();
      expect(screen.queryByTestId('pause-button')).toBeNull();
    });

    it('reset clears the completion message', () => {
      render(<TimerScreen initialDuration={3} />);
      fireEvent.press(screen.getByTestId('start-button'));
      act(() => { jest.advanceTimersByTime(3000); });
      fireEvent.press(screen.getByTestId('reset-button'));
      expect(screen.queryByTestId('completion-message')).toBeNull();
    });

    it('can run the same timer again after reset', () => {
      render(<TimerScreen initialDuration={3} />);
      fireEvent.press(screen.getByTestId('start-button'));
      act(() => { jest.advanceTimersByTime(3000); });
      fireEvent.press(screen.getByTestId('reset-button'));
      fireEvent.press(screen.getByTestId('start-button'));
      act(() => { jest.advanceTimersByTime(3000); });
      expect(screen.getByTestId('completion-message')).toBeTruthy();
    });
  });
});
