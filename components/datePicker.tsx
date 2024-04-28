import DateTimePicker from "@react-native-community/datetimepicker";
import { Calendar, Camera, Iconoir } from "iconoir-react-native";
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
import { useNavigation } from "@react-navigation/native";

interface PickDateProps {
  date: Date;
  setDate: (date: Date) => void;
  goToCamera: () => void;
}

export default function DatePicker({
  date,
  setDate,
  goToCamera,
}: PickDateProps) {
  const navigation = useNavigation();

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
      <View className="flex p-4 justify-between flex-row items-center w-screen ">
        <TouchableOpacity
          onPress={showDatepicker}
          className="   border-orange-600 border-2	  flex flex-row items-center p-2 rounded-full px-4"
        >
          <Calendar color="black" height={16} width={16} />
          <Text className="text-black">
            {" "}
            {date.toLocaleString("en-US", { month: "short", day: "numeric" })}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={goToCamera}
          className="  bg-orange-700  flex flex-row items-center p-2 rounded-full px-4"
        >
          <Camera color="white" height={16} width={16} />
          <Text className="text-white"> Add</Text>
        </TouchableOpacity>
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
