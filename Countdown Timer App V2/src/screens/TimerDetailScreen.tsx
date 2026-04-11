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
