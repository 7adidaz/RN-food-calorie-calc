import { StatusBar } from "expo-status-bar";
import { Button, Image, View } from "react-native";
import { ResultProps } from "../types/types";
import styles from "../styles/resultStyles";
import model from "../cloud/model";
import { useEffect, useState } from "react";
import calories from "../cloud/calorieNinjas";

export default function Result({ navigation, route }: ResultProps) {
  const { image } = route.params;
  const [items, setItems] = useState<string[]>([]);
  const [cal, setcal] = useState([]);

  const handleModel = async () => {
    if (!image.base64) return;
    const res = await model(image.base64);
    if (!res) return;
    setItems(res);
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await calories(items);
        console.log("data_inside useeffect_", data);
        if (!data) return;
        if (data.items && data.items.length > 0) {
          setcal(data);
          navigation.navigate("NewItems", {
            data,
          });
        }
        console.log("cal__", cal);
      } catch (error) {
        console.log("error__", error);
      }
    };

    fetch();
  }, [items]);

  const goToHistory = async () => {
    if (!items) return;
    // await handleUpload();
    await handleModel();
    navigation.navigate("NewItems", {
      data: {
        items: [
          // {
          //   calories: 53,
          //   carbohydrates_total_g: 13,
          //   cholesterol_mg: 0,
          //   fat_saturated_g: 0,
          //   fat_total_g: 0.1,
          //   fiber_g: 1.4,
          //   name: "pineapple",
          //   potassium_mg: 8,
          //   protein_g: 0.5,
          //   serving_size_g: 103,
          //   sodium_mg: 0,
          //   sugar_g: 9.9,
          // },
          // {
          //   calories: 84.2,
          //   carbohydrates_total_g: 18.5,
          //   cholesterol_mg: 0,
          //   fat_saturated_g: 0.1,
          //   fat_total_g: 1.2,
          //   fiber_g: 4.1,
          //   name: "pomegranate",
          //   potassium_mg: 35,
          //   protein_g: 1.7,
          //   serving_size_g: 100,
          //   sodium_mg: 2,
          //   sugar_g: 13.7,
          // },
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
          }, {
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
          }
        ],
      },
    });
  };

  const handleTakeAnotherPicture = () => {
    navigation.navigate("Camera");
  };

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{ uri: image.uri }} />
      <View style={styles.buttonContainer}>
        <Button title="Use" onPress={goToHistory} />
        <Button
          title="Take Another Picture"
          onPress={handleTakeAnotherPicture}
        />
        <StatusBar style="auto" />
      </View>
    </View>
  );
}
