import { StatusBar } from 'expo-status-bar';
import { Button, Image, StyleSheet, Text, View } from 'react-native';
import { ResultProps } from '../types/navigatorTypes';
import { upload } from 'cloudinary-react-native';
import { options, cloud } from '../cloud/cloudinary';
import styles from '../styles/resultStyles';
import model from '../cloud/model';
import { useEffect, useState } from 'react';
import calories from '../cloud/calorieNinjas';

export default function Result({ navigation, route }: ResultProps) {
  const { image } = route.params;
  const [url, setUrl] = useState<string | null>('');
  const [items, setItems] = useState<string[] | null>([]);

  const handleModel = async () => {
    if (!image.base64) return;
    const res = await model(image.base64);
    setItems(res);
  };

  const handleCalories = async () => {
    if (!items) return;
    
    await calories(items);
  };

  useEffect(() => {
    const fetch = async () => { 
      await handleCalories();
    };
    fetch();
  }, [items]);

  const goToHistory = async () => {
    if (!items) return;
    // await handleUpload();
    await handleModel();
    await handleCalories();

    navigation.navigate('History');
  };

  const handleTakeAnotherPicture = () => {
    navigation.navigate('Camera');
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
