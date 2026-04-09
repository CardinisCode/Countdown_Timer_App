import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { useTimer } from '../hooks/useTimer';

interface TimerScreenProps {
  initialDuration?: number; // in seconds, used for testing
}

function formatTime(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return [h, m, s].map((v) => String(v).padStart(2, '0')).join(':');
}

function toSeconds(h: number, m: number, s: number): number {
  return h * 3600 + m * 60 + s;
}

export function TimerScreen({ initialDuration }: TimerScreenProps) {
  const [inputHours, setInputHours] = useState(
    initialDuration !== undefined ? Math.floor(initialDuration / 3600) : 0
  );
  const [inputMinutes, setInputMinutes] = useState(
    initialDuration !== undefined ? Math.floor((initialDuration % 3600) / 60) : 0
  );
  const [inputSeconds, setInputSeconds] = useState(
    initialDuration !== undefined ? initialDuration % 60 : 0
  );

  const duration = toSeconds(inputHours, inputMinutes, inputSeconds);
  const { timeRemaining, isRunning, isComplete, start, pause, reset } = useTimer(duration);

  function handleReset() {
    reset();
  }

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

      {!isRunning && !isComplete && (
        <View style={styles.inputs}>
          <View style={styles.inputGroup}>
            <TextInput
              testID="input-hours"
              style={styles.input}
              keyboardType="number-pad"
              maxLength={2}
              value={String(inputHours).padStart(2, '0')}
              onChangeText={(v) => setInputHours(Math.min(99, parseInt(v) || 0))}
            />
            <Text style={styles.inputLabel}>h</Text>
          </View>
          <View style={styles.inputGroup}>
            <TextInput
              testID="input-minutes"
              style={styles.input}
              keyboardType="number-pad"
              maxLength={2}
              value={String(inputMinutes).padStart(2, '0')}
              onChangeText={(v) => setInputMinutes(Math.min(59, parseInt(v) || 0))}
            />
            <Text style={styles.inputLabel}>m</Text>
          </View>
          <View style={styles.inputGroup}>
            <TextInput
              testID="input-seconds"
              style={styles.input}
              keyboardType="number-pad"
              maxLength={2}
              value={String(inputSeconds).padStart(2, '0')}
              onChangeText={(v) => setInputSeconds(Math.min(59, parseInt(v) || 0))}
            />
            <Text style={styles.inputLabel}>s</Text>
          </View>
        </View>
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
        <Pressable testID="reset-button" style={[styles.button, styles.resetButton]} onPress={handleReset}>
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
    marginBottom: 24,
  },
  complete: {
    fontSize: 24,
    color: '#4CAF50',
    marginBottom: 24,
  },
  inputs: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 32,
  },
  inputGroup: {
    alignItems: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    fontSize: 28,
    width: 64,
    textAlign: 'center',
    padding: 8,
  },
  inputLabel: {
    fontSize: 14,
    color: '#888',
    marginTop: 4,
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
