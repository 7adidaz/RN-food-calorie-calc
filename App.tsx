import "react-native-gesture-handler";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CameraScreen from "./screens/camera";
import History from "./screens/history";
import Result from "./screens/result";
import { RootStackParamList } from "./types/types";
import Onboarding from "./screens/onboarding";
const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="History" component={History} />
        <Stack.Screen name="Camera" component={CameraScreen} />
        <Stack.Screen name="Result" component={Result} />
        <Stack.Screen name="Onboarding" component={Onboarding} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
