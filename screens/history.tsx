import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import { HistoryProps, userData } from '../types/types';
import styles from '../styles/historyStyles';
import DatePicker from '../components/datePicker';
import { useEffect, useMemo, useState } from 'react';
import Onboarding from './onboarding';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function History({ navigation }: HistoryProps) {
  const [date, setDate] = useState(new Date());
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const jsonValue = await AsyncStorage.getItem('userDaata');
      if (!jsonValue) {
        navigation.navigate('Onboarding');
      }
      setUserData(jsonValue != null ? JSON.parse(jsonValue) : null);
    };

    fetchUserData();
  }, []);

  const goToCamera = () => {
    navigation.navigate('Camera');
  };
  return (
    <View style={styles.container}>
      <DatePicker date={date} setDate={setDate} />
      <Text>THIS IS HISTORY PAGE</Text>
      <Button title="Go to Camera" onPress={goToCamera} />
      <StatusBar style="auto" />
    </View>
  );
}
