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
