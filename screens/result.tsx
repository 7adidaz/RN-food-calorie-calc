import { StatusBar } from 'expo-status-bar';
import { Button, Image, StyleSheet, Text, View } from 'react-native';
import { ResultProps } from './types/navigatorTypes';
import { Dimensions } from 'react-native';
import { Cloudinary } from '@cloudinary/url-gen';
import {upload} from 'cloudinary-react-native';

export default function Result({ navigation, route }: ResultProps) {
  const { image } = route.params;

  const cloud = new Cloudinary({
    cloud: {
      cloudName: process.env.EXPO_PUBLIC_CLOUD_NAME,
    },
    url: {
      secure: true,
    },
  });
  const options = {
    upload_preset: process.env.EXPO_PUBLIC_UPLOAD_PRESET,
    unsigned: true,
  };

  const handleUpload = async () => {
    await upload(cloud, {
      file: image,
      options: options,
      callback: (error, result) => {
        if (error) {
          console.log('error__:', error);
          return;
        }
        console.log('res__:', result);
      },
    });
  };

  const goToHistory = () => {
    navigation.navigate('History');
  };

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{ uri: image }} />
      <Button title="save" onPress={goToHistory} />
      <Button title="upload" onPress={handleUpload} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: Dimensions.get('window').width - 100,
    height: Dimensions.get('window').height - 100,
  },
});
