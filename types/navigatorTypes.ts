import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CameraCapturedPicture, CameraPictureOptions } from 'expo-camera';

export type RootStackParamList = {
  History: undefined;
  Camera: undefined;
  Result: {
    image: CameraCapturedPicture;
  };
};

export type HistoryProps = NativeStackScreenProps<RootStackParamList, 'History'>;
export type CameraProps = NativeStackScreenProps<RootStackParamList, 'Camera'>;
export type ResultProps = NativeStackScreenProps<RootStackParamList, 'Result'>;
