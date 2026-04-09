import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react-native';
import { TimerScreen } from '../TimerScreen';

jest.useFakeTimers();

describe('TimerScreen', () => {
  afterEach(() => {
    jest.clearAllTimers();
  });

  it('renders the initial time display', () => {
    render(<TimerScreen initialDuration={10} />);
    expect(screen.getByTestId('time-display')).toHaveTextContent('00:00:10');
  });

  it('start button begins the countdown', () => {
    render(<TimerScreen initialDuration={10} />);

    fireEvent.press(screen.getByTestId('start-button'));

    act(() => {
      jest.advanceTimersByTime(3000);
    });

    expect(screen.getByTestId('time-display')).toHaveTextContent('00:00:07');
  });

  it('pause button freezes the countdown', () => {
    render(<TimerScreen initialDuration={10} />);

    fireEvent.press(screen.getByTestId('start-button'));
    act(() => { jest.advanceTimersByTime(3000); });

    fireEvent.press(screen.getByTestId('pause-button'));
    act(() => { jest.advanceTimersByTime(5000); });

    expect(screen.getByTestId('time-display')).toHaveTextContent('00:00:07');
  });

  it('reset button restores the original time', () => {
    render(<TimerScreen initialDuration={10} />);

    fireEvent.press(screen.getByTestId('start-button'));
    act(() => { jest.advanceTimersByTime(4000); });

    fireEvent.press(screen.getByTestId('reset-button'));

    expect(screen.getByTestId('time-display')).toHaveTextContent('00:00:10');
  });

  it('shows completion state when timer reaches zero', () => {
    render(<TimerScreen initialDuration={3} />);

    fireEvent.press(screen.getByTestId('start-button'));
    act(() => { jest.advanceTimersByTime(3000); });

    expect(screen.getByTestId('completion-message')).toBeTruthy();
  });

  it('completion state is cleared after reset', () => {
    render(<TimerScreen initialDuration={3} />);

    fireEvent.press(screen.getByTestId('start-button'));
    act(() => { jest.advanceTimersByTime(3000); });
    fireEvent.press(screen.getByTestId('reset-button'));

    expect(screen.queryByTestId('completion-message')).toBeNull();
  });
});