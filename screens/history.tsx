import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { HistoryProps, userData } from "../types/types";
import styles from "../styles/historyStyles";
import DatePicker from "../components/datePicker";
import { useEffect, useState } from "react";
import Onboarding from "./onboarding";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Iconoir } from "iconoir-react-native";

export default function History({ navigation }: HistoryProps) {
  const [date, setDate] = useState(new Date());
  const [userData, setUserData] = useState(null);

  const fetchUserData = async () => {
    const jsonValue = await AsyncStorage.getItem("userData");
    if (!jsonValue) {
      navigation.navigate("Onboarding");
    }

    if (jsonValue != null) {
      setUserData(JSON.parse(jsonValue));
      console.log("USER DATA hererrer", jsonValue);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const goToCamera = () => {
    navigation.navigate("Camera");
  };

  const goToonboarding = () => {
    navigation.navigate("Onboarding");
  };

  return (
    <View className="flex">
      <View className="flex  p-5 bg-slate-50 h-full">
        <View className="flex flex-row justify-between">
          <DatePicker date={date} setDate={setDate} />
        </View>
        <Text onPress={goToonboarding}>THIS IS HISTORY PAGE</Text>
        <Button title="Go to Camera" onPress={goToCamera} />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}
