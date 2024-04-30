import { ScrollView, Text, View } from "react-native";
import { NewItemsProps } from "../types/types";
import { useState, useEffect } from "react";
import FoodItem from "../components/foodItem";
import { Button } from "react-native-ui-lib";

export default function NewItems({ navigation, route }: NewItemsProps) {
  const [items, setItems] = useState(route.params.data.items);
  console.log("items_out_", items);
  const [totalCalories, setTotalCalories] = useState<number>(0);

  const [updatedItems, setUpdatedItems] = useState<
    {
      name: string;
      calories: number;
      protein_g: number;
      serving_size_g: number;
      fat_total_g: number;
      carbohydrates_total_g: number;
      total_serving_size: number;
      total_calories: number;
      totalProtein: number;
      totalFat: number;
      totalCarbs: number;
    }[]
  >([]);

  const calculateTotalValues = (item: any, servingSize: number) => {
    const totalCalories = (item.calories / item.serving_size_g) * servingSize;
    const totalProtein = (item.protein_g / item.serving_size_g) * servingSize;
    const totalFat = (item.fat_total_g / item.serving_size_g) * servingSize;
    const totalCarbs =
      (item.carbohydrates_total_g / item.serving_size_g) * servingSize;
    const total_serving_size = servingSize;
    return {
      total_calories: Number(totalCalories.toFixed(1)),
      totalProtein: Number(totalProtein.toFixed(1)),
      totalFat: Number(totalFat.toFixed(1)),
      totalCarbs: Number(totalCarbs.toFixed(1)),
      total_serving_size,
    };
  };

  const handleUpdateItem = (itemName: string, servingSize: number) => {
    const updatedItemsCopy = [...updatedItems];
    const itemToUpdate = items.find((item) => item.name === itemName);
    if (!itemToUpdate) return;
    const calculatedValues = calculateTotalValues(itemToUpdate, servingSize);
    const index = updatedItemsCopy.findIndex((item) => item.name === itemName);
    if (index !== -1) {
      updatedItemsCopy[index] = {
        ...updatedItemsCopy[index],
        ...calculatedValues,
      };
    } else {
      updatedItemsCopy.push({
        name: itemName,
        calories: Number(itemToUpdate.calories),
        protein_g: Number(itemToUpdate.protein_g),
        serving_size_g: Number(itemToUpdate.serving_size_g),
        fat_total_g: Number(itemToUpdate.fat_total_g),
        carbohydrates_total_g: Number(itemToUpdate.carbohydrates_total_g),
        total_calories: Number(calculatedValues.total_calories),
        totalProtein: Number(calculatedValues.totalProtein), // Update the type to number
        totalFat: Number(calculatedValues.totalFat),
        totalCarbs: Number(calculatedValues.totalCarbs),
        total_serving_size: calculatedValues.total_serving_size,
      });
    }
    setUpdatedItems(updatedItemsCopy);
    console.log("updatedItems__", updatedItems);
  };

  // Initialize updated items with default values
  useEffect(() => {
    const updateItems = async () => {
      const updatedItemsCopy: typeof updatedItems = [];
      await Promise.all(
        items.map(async (item) => {
          const calculatedValues = calculateTotalValues(
            item,
            item.serving_size_g
          );
          updatedItemsCopy.push({
            name: item.name,
            calories: Number(item.calories),
            protein_g: Number(item.protein_g),
            serving_size_g: Number(item.serving_size_g),
            fat_total_g: Number(item.fat_total_g),
            carbohydrates_total_g: Number(item.carbohydrates_total_g),
            total_calories: Number(calculatedValues.total_calories),
            totalProtein: Number(calculatedValues.totalProtein),
            totalFat: Number(calculatedValues.totalFat),
            totalCarbs: Number(calculatedValues.totalCarbs),
            total_serving_size: calculatedValues.total_serving_size,
          });
        })
      );
      setUpdatedItems(updatedItemsCopy);
    };

    updateItems();
  }, [items]);

  return (
    <View className="flex h-full">
      <ScrollView className="p-3">
        {items?.map((item, index) => (
          <FoodItem key={index} item={item} onUpdate={handleUpdateItem} />
        ))}
      </ScrollView>
      <View className=" border-t border-slate-300 pb-3 px-5">
        <View className="flex justify-between flex-row items-center font-medium pt-4 mb-4 ">
          <Text className="text-lg">Total calories </Text>
          <Text className="text-lg">
            {updatedItems.reduce(
              (acc, currentItem) => acc + currentItem.total_calories,
              0
            )}{" "}
            kcal
          </Text>
        </View>
        <Button
          text70
          white
          background-orange30
          label="Add"
          className="mt-auto"
        />
      </View>
    </View>
  );
}
