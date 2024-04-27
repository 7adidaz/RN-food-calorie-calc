import React, { Component, useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {
  View,
  TextField,
  Text,
  Button,
  Picker,
  NumberInput,
} from 'react-native-ui-lib';
import { OnboardingProps, userData, userDefaultData } from '../types/types';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Onboarding({ navigation }: OnboardingProps) {
  const [userData, setUserData] = useState<userData>(userDefaultData);
  const MIN_AGE = 18;
  const MAX_AGE = 90;

  const items = Array.from({ length: MAX_AGE - MIN_AGE + 1 }, (_, i) => (
    <Picker.Item key={i} value={i + MIN_AGE} label={`${i + MIN_AGE}`} />
  ));

  const handleSaveUserData = async (data: userData) => {
    await AsyncStorage.setItem('userData', JSON.stringify(data));
    console.log('saved');
    navigation.navigate('History');
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View marginT-100 center>
        <TextField text50 placeholder="name" grey10 />

        <Picker
          label="Age"
          placeholder="choose your age"
          useWheelPicker
          value={userData.age}
          onChange={(v) => setUserData({ ...userData, age: Number(v) || 18 })}
        >
          {items}
        </Picker>

        <NumberInput
          initialNumber={170}
          onChangeNumber={(v) =>
            setUserData({ ...userData, height: Number(v.userInput) })
          }
          fractionDigits={1}
          leadingText="Height: "
        />
        <NumberInput
          initialNumber={170}
          onChangeNumber={(v) =>
            setUserData({ ...userData, weight: Number(v.userInput) })
          }
          fractionDigits={1}
          leadingText="Weight: "
        />
        <Picker
          label="Activity Level"
          placeholder="choose your Activity Level"
          useWheelPicker
          value={userData.age}
          onChange={(v) =>
            setUserData({
              ...userData,
              activityLevel: (v?.toString() || 'moderate') as
                | 'light'
                | 'moderate'
                | 'active',
            })
          }
        >
          {[
            <Picker.Item key={0} value="light" label="Light" />,
            <Picker.Item key={1} value="moderate" label="Moderate" />,
            <Picker.Item key={2} value="active" label="Active" />,
          ]}
        </Picker>

        <Button
          text70
          white
          background-orange30
          label="Save"
          onPress={() => handleSaveUserData(userData)}
        />
      </View>
    </GestureHandlerRootView>
  );
}
