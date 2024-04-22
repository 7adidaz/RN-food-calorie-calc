import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import { HistoryProps } from './types/navigatorTypes';

export default function History ({navigation}: HistoryProps) {
    const goToCamera = () => {
      navigation.navigate('Camera');
    };
  return (
    <View style={styles.container}>
      <Text>THIS IS HISTORY PAGE</Text>
      <Button
        title="Go to Camera"
        onPress={goToCamera}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});