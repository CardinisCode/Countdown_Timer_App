import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useTimer } from '../hooks/useTimer';

interface TimerScreenProps {
  initialDuration: number; // in seconds
}

function formatTime(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return [h, m, s].map((v) => String(v).padStart(2, '0')).join(':');
}

export function TimerScreen({ initialDuration }: TimerScreenProps) {
  const { timeRemaining, isRunning, isComplete, start, pause, reset } = useTimer(initialDuration);

  return (
    <View style={styles.container}>
      <Text testID="time-display" style={styles.display}>
        {formatTime(timeRemaining)}
      </Text>

      {isComplete && (
        <Text testID="completion-message" style={styles.complete}>
          Time's up!
        </Text>
      )}

      <View style={styles.controls}>
        {!isRunning && !isComplete && (
          <Pressable testID="start-button" style={styles.button} onPress={start}>
            <Text style={styles.buttonText}>Start</Text>
          </Pressable>
        )}
        {isRunning && (
          <Pressable testID="pause-button" style={styles.button} onPress={pause}>
            <Text style={styles.buttonText}>Pause</Text>
          </Pressable>
        )}
        <Pressable testID="reset-button" style={[styles.button, styles.resetButton]} onPress={reset}>
          <Text style={styles.buttonText}>Reset</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  display: {
    fontSize: 64,
    fontVariant: ['tabular-nums'],
    letterSpacing: 2,
    marginBottom: 32,
  },
  complete: {
    fontSize: 24,
    color: '#4CAF50',
    marginBottom: 24,
  },
  controls: {
    flexDirection: 'row',
    gap: 16,
  },
  button: {
    backgroundColor: '#333',
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 8,
  },
  resetButton: {
    backgroundColor: '#888',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});
