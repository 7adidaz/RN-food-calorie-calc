import { StatusBar } from "expo-status-bar";
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { HistoryProps, userData } from "../types/types";
import styles from "../styles/historyStyles";
import DatePicker from "../components/datePicker";
import { useEffect, useState } from "react";
import Onboarding from "./onboarding";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Iconoir } from "iconoir-react-native";
import PrevFoodItem from "../components/previewItems";
import { useIsFocused, useNavigation } from "@react-navigation/native";

export default function History({ navigation }: HistoryProps) {
  const isFocused = useIsFocused();
  const [date, setDate] = useState(new Date());
  const [userData, setUserData] = useState(null);
  const [history, setHistory] = useState([]);

  const fetchUserData = async () => {
    const jsonValue = await AsyncStorage.getItem("userData");
    if (!jsonValue) {
      navigation.navigate("Onboarding");
    }

    if (jsonValue != null) {
      setUserData(JSON.parse(jsonValue));
      console.log("USER DATA hererrer", jsonValue);
    }

    const todayDate = date.toLocaleString().split(",")[0];
    const historyData = await AsyncStorage.getItem(todayDate);
    setHistory(JSON.parse(historyData || "[]"));
  };

  useEffect(() => {
    fetchUserData();
    console.log("history Data updated");
  }, [isFocused, date]);

  const goToCamera = () => {
    navigation.navigate("Camera");
  };

  const goToonboarding = () => {
    navigation.navigate("NewItems", {
      data: {
        items: [
          {
            calories: 53,
            carbohydrates_total_g: 13,
            cholesterol_mg: 0,
            fat_saturated_g: 0,
            fat_total_g: 0.1,
            fiber_g: 1.4,
            name: "pineapple",
            potassium_mg: 8,
            protein_g: 0.5,
            serving_size_g: 103,
            sodium_mg: 0,
            sugar_g: 9.9,
          },
          {
            calories: 84.2,
            carbohydrates_total_g: 18.5,
            cholesterol_mg: 0,
            fat_saturated_g: 0.1,
            fat_total_g: 1.2,
            fiber_g: 4.1,
            name: "pomegranate",
            potassium_mg: 35,
            protein_g: 1.7,
            serving_size_g: 100,
            sodium_mg: 2,
            sugar_g: 13.7,
          },
        ],
      },
    });
  };

  return (
    <View>
      <View className="flex bg-slate-50 h-full w-full">
        <View className="flex flex-row justify-between w-full">
          <DatePicker goToCamera={goToCamera} date={date} setDate={setDate} />
        </View>
        <Text>
          {Math.round(
            history.reduce(
              (acc: number, currentItem: { total_calories: number }) =>
                acc + currentItem.total_calories,
              0
            )
          )}{" "}
          kcal
        </Text>
        <Text onPress={goToonboarding}>THIS IS HISTORY PAGE</Text>
        <ScrollView className="p-3 h-full pb-4">
          {history.map((item: any, index: number) => {
            return <PrevFoodItem key={index} item={item} />;
          })}
        </ScrollView>
        <Button title="Go to Camera" onPress={goToCamera} />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}
