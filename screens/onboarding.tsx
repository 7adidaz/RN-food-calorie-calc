import React, { Component, useEffect, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  View,
  TextField,
  Text,
  Button,
  Picker,
  NumberInput,
} from "react-native-ui-lib";
import { OnboardingProps, userData, userDefaultData } from "../types/types";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Onboarding({ navigation }: OnboardingProps) {
  const [userData, setUserData] = useState<userData>(userDefaultData);
  const MIN_AGE = 18;
  const MAX_AGE = 90;

  const ageItems = Array.from({ length: MAX_AGE - MIN_AGE + 1 }, (_, i) => (
    <Picker.Item key={i} value={i + MIN_AGE} label={`${i + MIN_AGE}`} />
  ));

  const MAX_HEIGHT = 250;
  const MIN_HEIGHT = 100;
  const heightItems = Array.from(
    { length: MAX_HEIGHT - MIN_HEIGHT + 1 },
    (_, i) => (
      <Picker.Item key={i} value={i + MAX_HEIGHT} label={`${i + MIN_HEIGHT}`} />
    )
  );

  const MAX_WEIGHT = 300;
  const MIN_WEIGHT = 30;
  const weightItems = Array.from(
    { length: MAX_WEIGHT - MIN_WEIGHT + 1 },
    (_, i) => (
      <Picker.Item key={i} value={i + MAX_WEIGHT} label={`${i + MIN_WEIGHT}`} />
    )
  );

  useEffect(() => {
    const fetchUserData = async () => {
      const jsonValue = await AsyncStorage.getItem("userData");
      if (jsonValue != null) {
        // console.log("USER DATA __", jsonValue);
        navigation.navigate("History");
      }
    };

    fetchUserData();
  }, []);

  const handleSaveUserData = async (data: userData) => {
    await AsyncStorage.setItem("userData", JSON.stringify(data));
    navigation.navigate("History");
  };

  return (
    <GestureHandlerRootView>
      <View className=" flex gap-2 mt-4 px-9 py-4 ">
        <TextField
          floatingPlaceholder
          $backgroundDark
          placeholder="name"
          className="mb-3"
          onChangeText={(v) => setUserData({ ...userData, name: v })}
        />

        <Picker
          floatingPlaceholder
          label="Age"
          placeholder="Age"
          useWheelPicker
          defaultValue=""
          value={userData.age}
          onChange={(v) => setUserData({ ...userData, age: Number(v) })}
          className="mb-3"
        >
          {ageItems}
        </Picker>

        <Picker
          floatingPlaceholder
          label="Height"
          placeholder="Height"
          useWheelPicker
          defaultValue=""
          value={userData.height}
          onChange={(v) => setUserData({ ...userData, height: Number(v) })}
          className="mb-3"
        >
          {heightItems}
        </Picker>

        <Picker
          floatingPlaceholder
          label="Weight"
          placeholder="Weight"
          useWheelPicker
          defaultValue=""
          value={userData.weight}
          onChange={(v) => setUserData({ ...userData, weight: Number(v) })}
          className="mb-3"
        >
          {heightItems}
        </Picker>

        <Picker
          floatingPlaceholder
          placeholder=" Activity Level"
          useWheelPicker
          value={userData.activityLevel}
          className="mb-3"
          onChange={(v) =>
            setUserData({
              ...userData,
              activityLevel: (v || "moderate") as
                | "light"
                | "moderate"
                | "active",
            })
          }
        >
          {[
            <Picker.Item key={0} value="light" label="Light" />,
            <Picker.Item key={1} value="moderate" label="Moderate" />,
            <Picker.Item key={2} value="active" label="Active" />,
          ]}
        </Picker>

        <Button
          text70
          white
          background-orange30
          label="Save"
          onPress={() => handleSaveUserData(userData)}
        />
      </View>
    </GestureHandlerRootView>
  );
}
