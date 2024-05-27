import { StatusBar } from "expo-status-bar";
import { ScrollView, Text, View } from "react-native";
import { HistoryProps } from "../types/types";
import DatePicker from "../components/datePicker";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import PrevFoodItem from "../components/previewItems";
import { useIsFocused } from "@react-navigation/native";
import TotalCard from "../components/totalCard";
import { Pedometer } from "expo-sensors";
import { Subscription } from "expo-modules-core";
export default function History({ navigation }: HistoryProps) {
  const isFocused = useIsFocused();
  const [date, setDate] = useState(new Date());
  const [userData, setUserData] = useState(null);
  const [history, setHistory] = useState([]);
  //  PEDO
  const [pastStepCount, setPastStepCount] = useState(0);
  const [isPedometerAvailable, setIsPedometerAvailable] = useState("checking");
  const [currentStepCount, setCurrentStepCount] = useState(0);

  const subscribe = async () => {
    const isAvailable = await Pedometer.isAvailableAsync();
    setIsPedometerAvailable(String(isAvailable));

    if (isAvailable) {
      const end = date;
      const start = new Date();
      start.setHours(0, 0, 0, 0); // Set start to the beginning of the day

      const pastStepCountResult = await Pedometer.getStepCountAsync(start, end);
      if (pastStepCountResult) {
        setPastStepCount(pastStepCountResult.steps);
      }

      // Create a Subscription object
      const subscription = Pedometer.watchStepCount((result) => {
        setCurrentStepCount(result.steps);
      });

      return subscription; // Return the subscription
    }
  };

  useEffect(() => {
    let subscription: Subscription | undefined;

    const initSubscription = async () => {
      subscription = await subscribe();
    };

    initSubscription();

    return () => subscription && subscription.remove();
  }, []);

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
  }, [isFocused, date]);

  const goToCamera = () => {
    navigation.navigate("Camera");
  };

  const goToSensores = () => {
    navigation.navigate("Sensors");
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

  const totalCal = Math.round(
    history.reduce(
      (acc: number, currentItem: { total_calories: number }) =>
        acc + currentItem.total_calories,
      0
    )
  );

  const totalFat = Math.round(
    history.reduce(
      (acc: number, currentItem: { totalFat: number }) =>
        acc + currentItem.totalFat,
      0
    )
  );

  const totalProtein = Math.round(
    history.reduce(
      (acc: number, currentItem: { totalProtein: number }) =>
        acc + currentItem.totalProtein,
      0
    )
  );

  const totalCarbs = Math.round(
    history.reduce(
      (acc: number, currentItem: { totalCarbs: number }) =>
        acc + currentItem.totalCarbs,
      0
    )
  );

  return (
    <View>
      <View className="flex bg-slate-50 h-full w-full">
        <View className="flex flex-row justify-between w-full">
          <DatePicker
            goToCamera={goToCamera}
            date={date}
            setDate={setDate}
            goToSensores={goToSensores}
          />
        </View>
        <TotalCard
          totalCal={Number(totalCal)}
          totalCarbs={Number(totalCarbs)}
          totalProtein={totalProtein}
          totalFat={totalFat}
          steps={pastStepCount ? pastStepCount + currentStepCount : 0}
          userData={userData}
        />
        {/* <Text onPress={goToonboarding}>THIS IS HISTORY PAGE</Text> */}
        <Text className="mt-4 pl-3 text-lg">Items</Text>
        <ScrollView className="p-3 h-full pb-4">
          {history.map((item: any, index: number) => {
            return <PrevFoodItem key={index} item={item} />;
          })}
          {history.length === 0 && (
            <Text className="text-center mt-5">No items to display</Text>
          )}
        </ScrollView>
        {/* <Button title="Go to Camera" onPress={goToCamera} /> */}
      </View>
      <StatusBar style="auto" />
    </View>
  );
}
