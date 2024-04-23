import { StatusBar } from 'expo-status-bar';
import { Button, Image, StyleSheet, Text, View } from 'react-native';
import { ResultProps } from '../types/navigatorTypes';
import {upload} from 'cloudinary-react-native';
import { options, cloud } from '../cloud/cloudinary';
import styles from '../styles/resultStyles';
import model from '../cloud/model';
import { useState } from 'react';
import calories from '../cloud/calorieNinjas';

export default function Result({ navigation, route }: ResultProps) {
  const { image } = route.params;
  const [url, setUrl] = useState<string | null>('');
  const [items, setItems] = useState<string[] | null>([]);

  const handleUpload = async () => {
    await upload(cloud, {
      file: image,
      options: options,
      callback: async(error, result) => {
        if (error) {
          console.log('error__:', error);
          return;
        }
        if (!result) { return; }
        console.log('res__:', result);
        setUrl(result.url);
      },
    });
  };

  const handleModel = async () => {
    if (!url) { return; }
    const res = await model(url);
    setItems(res);
  }
  const handleCalories = async () => {
    if (!items) { return; }
    await calories(items);
  };
  const goToHistory = () => {
    navigation.navigate('History');
  };

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{ uri: image }} />
      <View style={styles.buttonContainer}>
        <Button title="save" onPress={goToHistory} />
        <Button title="upload" onPress={handleUpload} />
        <Button title="model" onPress={handleModel} />
        <Button title="calories" onPress={handleCalories} />
        <StatusBar style="auto" />
      </View>
    </View>
  );
}
