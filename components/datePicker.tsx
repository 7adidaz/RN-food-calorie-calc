import DateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";
import { SafeAreaView, Button, Text } from "react-native";

interface PickDateProps {
  date: Date;
  setDate: (date: Date) => void;
}

export default function DatePicker({ date, setDate }: PickDateProps) {
  const [show, setShow] = useState(false);

  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate;
    setShow(false);

    setDate(currentDate);
  };

  const showDatepicker = () => {
    setShow(true);
  };

  return (
    <SafeAreaView>
      <Button onPress={showDatepicker} title="Show date picker!" />
      <Text>selected: {date.toLocaleString()}</Text>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          is24Hour={true}
          onChange={onChange}
        />
      )}
    </SafeAreaView>
  );
}
