import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { CameraCapturedPicture, CameraPictureOptions } from "expo-camera";

export type CameraResult = {
  uri: string;
  base64: string;
};

export type RootStackParamList = {
  History: undefined;
  Camera: undefined;
  Sensors: undefined;
  Result: {
    image: CameraResult;
  };
  Onboarding: undefined;
  NewItems: {
    data: any;
  };
};

export type HistoryProps = NativeStackScreenProps<
  RootStackParamList,
  "History"
>;
export type CameraProps = NativeStackScreenProps<RootStackParamList, "Camera">;
export type SensorsProps = NativeStackScreenProps<
  RootStackParamList,
  "Sensors"
>;

export type ResultProps = NativeStackScreenProps<RootStackParamList, "Result">;
export type NewItemsProps = NativeStackScreenProps<
  RootStackParamList,
  "NewItems"
>;
export type OnboardingProps = NativeStackScreenProps<
  RootStackParamList,
  "Onboarding"
>;

export type userData = {
  name: string;
  age: number;
  height: number;
  weight: number;
  activityLevel: "light" | "moderate" | "active" | "";
};

export const userDefaultData: userData = {
  name: "",
  age: 0,
  height: 0,
  weight: 0,
  activityLevel: "",
};
