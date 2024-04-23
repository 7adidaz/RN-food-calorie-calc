import type { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  History: undefined;
  Camera: undefined;
  Result: {
    image: string;
  };
};

export type HistoryProps = NativeStackScreenProps<RootStackParamList, 'History'>;
export type CameraProps = NativeStackScreenProps<RootStackParamList, 'Camera'>;
export type ResultProps = NativeStackScreenProps<RootStackParamList, 'Result'>;
