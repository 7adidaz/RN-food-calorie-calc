import { Camera, CameraType } from 'expo-camera';
import { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { CameraProps } from './types/navigatorTypes';

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
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraType() {
    setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
  }

  async function capture () {
    if (!camera) return;
    const res = await camera.takePictureAsync();
    navigation.navigate('Result', {
      image: res.uri,
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  camera: {
    flex: 1
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});
