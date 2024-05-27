import DateTimePicker from "@react-native-community/datetimepicker";
import { Calendar, Camera } from "iconoir-react-native";
import React, { useState } from "react";
import { SafeAreaView, Text, View, TouchableOpacity } from "react-native";

interface PickDateProps {
  date: Date;
  setDate: (date: Date) => void;
  goToCamera: () => void;
  goToSensores: () => void;
}

export default function DatePicker({
  date,
  setDate,
  goToCamera,
  goToSensores,
}: PickDateProps) {
  const [show, setShow] = useState(false);

  const onChange = (_: any, selectedDate: any) => {
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

        <TouchableOpacity
          onPress={goToSensores}
          className="  bg-orange-700  flex flex-row items-center p-2 rounded-full px-4"
        >
          <Camera color="white" height={16} width={16} />
          <Text className="text-white"> sensors</Text>
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
