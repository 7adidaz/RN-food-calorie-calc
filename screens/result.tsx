import { StatusBar } from "expo-status-bar";
import { Image, StyleSheet, Text, View } from "react-native";
import { ResultProps } from "../types/types";
import styles from "../styles/resultStyles";
import model from "../cloud/model";
import { useEffect, useState } from "react";
import calories from "../cloud/calorieNinjas";
import { Button } from "react-native-ui-lib";

export default function Result({ navigation, route }: ResultProps) {
  const { image } = route.params;
  const [url, setUrl] = useState<string | null>("");
  const [items, setItems] = useState<string[]>([]);
  const [cal, setcal] = useState([]);

  const handleModel = async () => {
    if (!image.base64) return;
    const res = await model(image.base64);
    if (!res) return;
    setItems(res);
    // if (res) {
    //   console.log(res);
    //   navigation.navigate("NewItems", {
    //     data: cal,
    //   });
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

  const goToItems = async () => {
    if (!items) return;
    // await handleUpload();
    await handleModel();
  };

  const handleTakeAnotherPicture = () => {
    navigation.navigate("Camera");
  };

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{ uri: image.uri }} />
      <View style={styles.buttonContainer}>
        <Button label={"Use"} onPress={goToItems} />
        <Button
          label={"Take Another Picture"}
          onPress={handleTakeAnotherPicture}
        />
        <StatusBar style="auto" />
      </View>
    </View>
  );
}
