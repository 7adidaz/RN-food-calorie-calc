import { Camera, CameraType } from 'expo-camera';
import { useState } from 'react';
import { Button, View } from 'react-native';
import { CameraProps } from '../types/navigatorTypes';
import styles from '../styles/cameraStyles'
import CameraPermissions from '../components/cameraPermission';

export default function CameraScreen ({navigation}: CameraProps) {
  const [camera, setCamera] = useState<Camera | null>(null);
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();

  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return <CameraPermissions/>
  }

  function toggleCameraType() {
    setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
  }

  async function capture () {
    if (!camera) return;
    const res = await camera.takePictureAsync({
      base64: true
    });
    navigation.navigate('Result', {
      image: res,
    });
  }

  return (
    <View style={styles.container}>
      <Camera
        ratio={'16:9'}
        style={styles.camera}
        type={type}
        ref={(ref) => setCamera(ref)}
      >
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <Button title="Flip Camera" onPress={toggleCameraType} />
            <Button title="take a picture" onPress={capture} />
          </View>
        </View>
      </Camera>
    </View>
  );
}
