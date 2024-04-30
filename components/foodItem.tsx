import React, { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";

interface FoodItemProps {
  item: {
    calories: number;
    serving_size_g: number;
    name: string;
  };
  onUpdate: (itemName: string, updatedCalories: number) => void;
}

const FoodItem: React.FC<FoodItemProps> = ({ item, onUpdate }) => {
  const [servingSize, setServingSize] = useState(item.serving_size_g);
  const [totalCalories, setTotalCalories] = useState(item.calories);

  const handleUpdate = () => {
    const updatedCalories = (item.calories / item.serving_size_g) * servingSize;
    if (!updatedCalories) return;
    setTotalCalories(Number(updatedCalories.toFixed(1)));
    onUpdate(item.name, updatedCalories);
  };

  return (
    <View style={{ marginBottom: 20 }}>
      <Text>{item.name}</Text>
      <TextInput
        value={servingSize.toString()}
        onChangeText={(text) => setServingSize(parseInt(text) || 0)}
        keyboardType="numeric"
        placeholder="Enter serving size"
      />
      <Button title="Update" onPress={handleUpdate} />
      <Text>Total Calories: {totalCalories}</Text>
    </View>
  );
};

export default FoodItem;
