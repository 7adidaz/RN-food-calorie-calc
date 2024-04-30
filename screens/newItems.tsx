import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { NewItemsProps } from "../types/types";
import { useEffect, useState } from "react";
import { Picker } from "react-native-ui-lib";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import FoodItem from "../components/foodItem";

export default function NewItems({ navigation, route }: NewItemsProps) {
  const [items, setItems] = useState(route.params.data.items);

  const [updatedItems, setUpdatedItems] = useState<
    { name: string; calories: number }[]
  >([]);

  const handleUpdateItem = (itemName: string, updatedCalories: number) => {
    const updatedItemsCopy = [...updatedItems];
    const index = updatedItemsCopy.findIndex((item) => item.name === itemName);
    if (index !== -1) {
      updatedItemsCopy[index].calories = updatedCalories;
    } else {
      updatedItemsCopy.push({ name: itemName, calories: updatedCalories });
    }
    setUpdatedItems(updatedItemsCopy);
  };

  return (
    <View style={{ padding: 20 }}>
      {items?.map((item, index) => (
        <FoodItem key={index} item={item} onUpdate={handleUpdateItem} />
      ))}
      <Text style={{ marginTop: 20, fontSize: 18 }}>Updated Items:</Text>
      {updatedItems.map((item, index) => (
        <Text key={index}>{`${item.name}: ${item.calories} Calories`}</Text>
      ))}
    </View>
  );
}
