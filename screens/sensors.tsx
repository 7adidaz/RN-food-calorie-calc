import React, { useState, useEffect } from "react";
import { StyleSheet, Button, View, Text, ScrollView } from "react-native";
import {
  Accelerometer,
  Gyroscope,
  AccelerometerMeasurement,
  GyroscopeMeasurement,
} from "expo-sensors";
import { StatusBar } from "expo-status-bar";
import { SensorsProps } from "~/types/types";

export default function Sensors({ navigation, route }: SensorsProps) {
  const [accReadings, setAccReadings] = useState<
    Array<AccelerometerMeasurement>
  >(Array.from({ length: 150 }, () => ({ x: 0, y: 0, z: 0 })));
  const [gyroReadings, setGyroReadings] = useState<Array<GyroscopeMeasurement>>(
    Array.from({ length: 150 }, () => ({ x: 0, y: 0, z: 0 }))
  );
  const [prediction, setPrediction] = useState<string>("");
  const [predictions, setPredictions] = useState<
    Array<{ activity: string; time: number }>
  >([]);

  useEffect(() => {
    const subscription = Accelerometer.addListener((accelerometerData) => {
      setAccReadings((prevReadings) => [...prevReadings, accelerometerData]);
    });
    return () => subscription.remove();
  }, []);

  useEffect(() => {
    const subscription = Gyroscope.addListener((gyroscopeData) => {
      setGyroReadings((prevReadings) => [...prevReadings, gyroscopeData]);
    });
    return () => subscription.remove();
  }, []);

  const sendDataToServer = async () => {
    const activities = [
      "downstairs",
      "upstairs",
      "sitting",
      "standing",
      "walking",
      "jogging",
    ];

    // Send the last 150 readings
    const last150AccReadings = accReadings.slice(-150);
    const last150GyroReadings = gyroReadings.slice(-150);
    const data = { gyroData: last150GyroReadings, accData: last150AccReadings };

    const handlePrediction = (activity: string) => {
      const newPredictions = predictions.map((pred) => {
        if (pred.activity === activity) {
          return { ...pred, time: pred.time + 5 };
        }
        return pred;
      });

      if (!predictions.some((pred) => pred.activity === activity)) {
        setPredictions([...newPredictions, { activity, time: 5 }]);
      } else {
        setPredictions(newPredictions);
      }
    };
    try {
      console.log("start predicting");
      // console.log(data)
      const response = await fetch("http://192.168.1.3:3006", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const prediction = await response.json();
      setPrediction(prediction.prediction);
      if (prediction) {
        await new Promise((resolve) => setTimeout(resolve, 5000));
        handlePrediction(prediction.prediction);
        // setPredictions([...predictions, prediction.prediction]);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    sendDataToServer();
  }, [predictions]); // Empty dependency array means this effect runs once when the component mounts

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Gyroscope</Text>
        <View style={styles.readingsContainer}>
          <Text style={styles.reading}>
            x:{" "}
            {gyroReadings.length > 0
              ? gyroReadings[gyroReadings.length - 1].x
              : 0}
          </Text>
          <Text style={styles.reading}>
            y:{" "}
            {gyroReadings.length > 0
              ? gyroReadings[gyroReadings.length - 1].y
              : 0}
          </Text>
          <Text style={styles.reading}>
            z:{" "}
            {gyroReadings.length > 0
              ? gyroReadings[gyroReadings.length - 1].z
              : 0}
          </Text>
        </View>

        <Text style={styles.title}>Accelerometer</Text>
        <View style={styles.readingsContainer}>
          <Text style={styles.reading}>
            x:{" "}
            {accReadings.length > 0 ? accReadings[accReadings.length - 1].x : 0}
          </Text>
          <Text style={styles.reading}>
            y:{" "}
            {accReadings.length > 0 ? accReadings[accReadings.length - 1].y : 0}
          </Text>
          <Text style={styles.reading}>
            z:{" "}
            {accReadings.length > 0 ? accReadings[accReadings.length - 1].z : 0}
          </Text>
        </View>

        {/* <Button title="Send Data" onPress={sendDataToServer} /> */}
        {prediction !== "" && (
          <Text style={styles.prediction}>{prediction}</Text>
        )}

        {predictions.length > 0 && (
          <View>
            <Text style={styles.prediction}>Predictions</Text>
            {predictions.map((prediction, index) => (
              <Text
                className="text-center"
                key={index}
                style={styles.prediction}
              >
                {prediction.activity} -{" "}
                {prediction.time < 60
                  ? `${prediction.time} seconds`
                  : `${Math.floor(prediction.time / 60)} minutes`}
              </Text>
            ))}
          </View>
        )}
        <StatusBar style="auto" />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  readingsContainer: {
    marginBottom: 20,
  },
  reading: {
    fontSize: 16,
    marginBottom: 5,
  },
  prediction: {
    fontSize: 18,
    marginTop: 20,
    fontWeight: "bold",
  },
});
