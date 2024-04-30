import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { NewItemsProps, userData } from "../types/types";
import styles from "../styles/historyStyles";
import DatePicker from "../components/datePicker";
import { useEffect, useState } from "react";
import Onboarding from "./onboarding";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Iconoir } from "iconoir-react-native";

export default function NewItems({ navigation, route }: NewItemsProps) {
  const data = route.params.data;
  console.log("data_uirems_", data);
  return (
    <View>
      <Text>THIS IS NEW ITEMS PAGE</Text>
      {data?.items?.map((item: any) => {
        return (
          <View key={item.name}>
            <Text>{item.name}</Text>
            <Text>{item.calories}</Text>
            <Text>{item.protein_g}</Text>
            <Text>{item.sodium_mg}</Text>
            {/* <Text>{item.nf_calories}</Text> */}
          </View>
        );
      })}
    </View>
  );
}
