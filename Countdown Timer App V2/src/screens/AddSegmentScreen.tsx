import { View, Text, StyleSheet } from 'react-native';

export function AddSegmentScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Add Segment Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  text: { fontSize: 24 },
});
