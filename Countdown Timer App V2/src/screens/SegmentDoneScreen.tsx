import { View, Text, StyleSheet } from 'react-native';

export function SegmentDoneScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Segment Done Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  text: { fontSize: 24 },
});
