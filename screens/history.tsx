import { StatusBar } from "expo-status-bar";
import { ScrollView, View } from "react-native";
import { HistoryProps } from "../types/types";
import DatePicker from "../components/datePicker";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FoodItem from "../components/foodItem";

export default function History({ navigation }: HistoryProps) {
  AsyncStorage.clear();
  const [date, setDate] = useState(new Date());
  const [_userData, setUserData] = useState({});
  const [history, setHistory] = useState([]);

  const fetchUserData = async () => {
    const jsonValue = await AsyncStorage.getItem("userData");
    if (!jsonValue) {
      navigation.navigate("Onboarding");
    } else {
      setUserData(JSON.parse(jsonValue));
    }

    const todayDate = new Date().toLocaleString().split(',')[0];
    const historyData = await AsyncStorage.getItem(todayDate);
    setHistory(JSON.parse(historyData || "[]"));
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const goToCamera = () => {
    navigation.navigate("Camera");
  };

  return (
    <View className="flex">
      <View className="flex bg-slate-50">
        <View className="flex flex-row justify-between w-full">
          <DatePicker goToCamera={goToCamera} date={date} setDate={setDate} />
        </View>
      </View>

      <ScrollView className="p-3 h-full pb-4">
        {history.map((item: any, index: number) => {
          return <FoodItem key={index} item={item} isViewOnly={true} />;
        })}
      </ScrollView>
      <StatusBar style="auto" />
    </View>
  );
}

