import { FireFlame, Running } from "iconoir-react-native";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";

const TotalCard = ({
  totalCal,
  totalCarbs,
  totalProtein,
  totalFat,
  steps,
  userData,
}: {
  totalCal: Number;
  totalCarbs: Number;
  totalProtein: Number;
  totalFat: Number;
  steps?: Number;
  userData?: any;
}) => {
  const [caloriesBurned, setCaloriesBurned] = useState<string | null>(null);
  const calculateCalories = () => {
    if (userData?.weight && userData?.height && steps) {
      console.log("CALCULATING CALORIES", userData, steps);
      const stride = (userData.height / 100) * 0.414;
      const distance = stride * parseFloat(steps.toString());
      // const speed = parseFloat(3.5);

      const time = distance / 1.34;
      const avgMET = 3.5;

      const calculatedCalories =
        (time * avgMET * 3.5 * parseFloat(userData.height)) / (200 * 60);

      setCaloriesBurned(calculatedCalories.toFixed(2));
    } else {
      setCaloriesBurned(null);
    }
  };

  useEffect(() => {
    calculateCalories();
  }, [steps]);

  return (
    <View className="px-4">
      <View className="flex flex-row justify-between">
        <Text className="text-lg font-bold">Total Calories</Text>
        <Text className="text-lg font-bold"> {totalCal.toString()} Kcal</Text>
      </View>
      <View className="  justify-between border border-zinc-200 bg-slate-50 px-4 rounded-xl py-3">
        <View style={styles.specsContainer}>
          <SpecsBars
            size={Number(totalProtein)}
            name="Protein"
            color="#2F855A"
          />
          <SpecsBars size={Number(totalCarbs)} name="Carbs" color="#ED8936" />
          <SpecsBars size={Number(totalFat)} name="Fat" color="#4299E1" />
        </View>
        <View className=" flex flex-row items-center bg-gradient-to-br from-lime-600 to-slate-50 p-3 rounded-lg border border-slate-300">
          <Running
            className=" text-green-600 bg-lime-50  rounded-full mr-2 "
            width={24}
            height={24}
          />
          <View>
            <Text className=" uppercase text-xs text-slate-400">Walked</Text>
            <Text className=" text-green-700 text-base font-bold">
              {steps ? steps.toString() : " "} steps
            </Text>
          </View>

          {/* <Text className=" flex flex-row items-center ml-auto text-green-700 text-base font-bold"> */}
          <FireFlame
            className=" ml-auto text-red-600 bg-red-50 rounded-full mr-2 "
            width={24}
            height={24}
          />

          <View>
            <Text className=" uppercase text-xs text-slate-400">Burned</Text>
            <Text className=" text-red-700 text-base font-bold">
              {Math.round(
                caloriesBurned ? Number(caloriesBurned) : parseInt("0")
              )}{" "}
              kCal
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

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

export default TotalCard;

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
