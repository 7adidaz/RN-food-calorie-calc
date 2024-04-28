import DateTimePicker from "@react-native-community/datetimepicker";
import { Calendar, Iconoir } from "iconoir-react-native";
import React, { useState } from "react";
import {
  SafeAreaView,
  Button,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import styles from "../styles/onBoardingStyles";
import { red } from "@cloudinary/url-gen/actions/adjust";

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
      <View className="flex flex-row justify-between p-4 align-top content-start items-center">
        <TouchableOpacity
          onPress={showDatepicker}
          className=" w-fit bg-orange-700 flex flex-row items-center p-2 rounded-full px-4"
        >
          <Calendar color="white" height={16} width={16} />
          <Text className="text-white">
            {" "}
            {date.toLocaleString("en-US", { month: "short", day: "numeric" })}
          </Text>
        </TouchableOpacity>

        <Text>dsds</Text>
      </View>

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
