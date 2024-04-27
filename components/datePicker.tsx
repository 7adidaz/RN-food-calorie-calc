import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { useState } from 'react';
import { SafeAreaView, Button, Text } from 'react-native';

interface PickDateProps {
  date: Date;
  setDate: (date: Date) => void;
}

export default function DatePicker({ date, setDate }: PickDateProps) {
  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate;
    setDate(currentDate);
  };

  const showDatePicker = () => {
    DateTimePickerAndroid.open({
      value: date,
      onChange,
      mode: 'date',
    });
  };

  return (
    <SafeAreaView>
      <Button onPress={showDatePicker} title="Show date picker!" />
      <Text>selected: {date.toLocaleString()}</Text>
    </SafeAreaView>
  );
}
