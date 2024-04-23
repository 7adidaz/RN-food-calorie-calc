import { Camera } from "expo-camera";
import { Button, Text, View } from "react-native";
import cameraStyles from "../styles/cameraStyles";

export default function CameraPermissions() {
    const [permission, requestPermission] = Camera.useCameraPermissions();

    return (
      <View style={cameraStyles.container}>
        <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
}