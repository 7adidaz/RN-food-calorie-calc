import React, { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

interface FoodItemProps {
  item: {
    calories: number;
    protein_g: number;
    serving_size_g: number;
    fat_total_g: number;
    carbohydrates_total_g: number;
    name: string;
  };
  onUpdate?: (itemName: string, servingSize: number) => void;
  isViewOnly?: boolean;
}

const FoodItem: React.FC<FoodItemProps> = ({ item, onUpdate, isViewOnly }) => {
  const [servingSize, setServingSize] = useState(item.serving_size_g);

  useEffect(() => {
    console.log("servingSize inside", servingSize);
    onUpdate ?? (item.name, servingSize);
  }, [servingSize]);

  return (
    <View style={styles.container}>
      <View style={styles.itemInfo}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text>
          {item.calories} | {item.serving_size_g} g
        </Text>
      </View>
      <View style={styles.specsContainer}>
        <SpecsBars size={item.protein_g} name="Protein" color="#2F855A" />
        <SpecsBars
          size={item.carbohydrates_total_g}
          name="Carbs"
          color="#ED8936"
        />
        <SpecsBars size={item.fat_total_g} name="Fat" color="#4299E1" />
      </View>
      <View style={styles.servingContainer}>
        <Text style={styles.servingLabel}>Serving size</Text>
        {!isViewOnly ? (
          <TextInput
            value={servingSize.toString()}
            onChangeText={(text) => setServingSize(parseInt(text) || 0)}
            keyboardType="numeric"
            style={styles.servingInput}
            placeholder="Enter serving size"
            className="ml-auto mr-2 max-w-xs w-32"
          />) : <Text style={{ padding: 1 }}>{servingSize}</Text>}
        <Text>g</Text>
      </View>
    </View>
  );
};

export default FoodItem;

const SpecsBars = ({
  size,
  name,
  color,
}: {
  size: number;
  name: string;
  color: string;
}) => {
  return (
    <View style={styles.specsBarContainer}>
      <View style={[styles.specsBar, { backgroundColor: color }]}></View>
      <View style={styles.specsTextContainer}>
        <Text style={styles.specsSize}>{size} g</Text>
        <Text style={styles.specsName}>{name}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: "#FFF",
    padding: 10,
  },
  itemInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 5,
  },
  itemName: {
    fontSize: 18,
    fontWeight: "bold",
    textTransform: "capitalize",
  },
  specsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingRight: 10,
    paddingHorizontal: 5,
    marginVertical: 10,
  },
  specsBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 5,
  },
  specsBar: {
    width: 10,
    height: "100%",
    marginRight: 5,
    borderRadius: 5,
  },
  specsTextContainer: {
    flexDirection: "column",
  },
  specsSize: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  specsName: {
    fontSize: 12,
    color: "#666",
  },
  servingContainer: {
    borderTopWidth: 1,
    borderTopColor: "#e2e8f0",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  servingLabel: {
    fontSize: 16,
    fontWeight: "normal",
    textTransform: "capitalize",
    flex: 2
  },
  servingInput: {
    maxWidth: 80,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 5,
    padding: 5,
    height: 30,
  },
});
