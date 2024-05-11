import { Camera, CameraView, useCameraPermissions } from "expo-camera";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { CameraProps } from "../types/types";
import styles from "../styles/cameraStyles";
import CameraPermissions from "../components/cameraPermission";
import { deleteAsync, getInfoAsync } from "expo-file-system";
import * as ImageManipulator from "expo-image-manipulator";
import { Button } from "react-native-ui-lib";

export default function CameraScreen({ navigation }: CameraProps) {
  const [camera, setCamera] = useState<any | null>(null);
  const [facing, setFacing] = useState("back");
  const [permission, _requestPermission] = useCameraPermissions();

  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return <CameraPermissions />;
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  async function capture() {
    if (!camera) return;
    const res = await camera.takePictureAsync({
      base64: true,
      quality: 1,
    });

    console.log("before: ", await getInfoAsync(res.uri));
    const manipResult = await ImageManipulator.manipulateAsync(
      res.uri,
      [{ flip: ImageManipulator.FlipType.Vertical }],
      { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG, base64: true }
    );
    deleteAsync(res.uri, { idempotent: true });

    console.log("before: ", await getInfoAsync(manipResult.uri));
    navigation.navigate("Result", {
      image: {
        uri: manipResult.uri,
        base64: manipResult?.base64 || "",
      },
    });
  }

  return (
    <View style={styles.container}>
      <CameraView
        style={styles.camera}
        facing={"back"}
        ref={(ref) => setCamera(ref)}
      >
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <Button
              label={"Flip Camera"}
              onPress={toggleCameraFacing}
              className="mb-3"
            />
            <Button label={"Take a picture"} onPress={capture} />
          </View>
        </View>
      </CameraView>
    </View>
  );
}
