import React, { useState, useEffect } from "react";
import { View, Text, Button } from "react-native";

const RunningExercise = () => {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState([]);

  useEffect(() => {
    let interval;

    if (isRunning) {
      interval = setInterval(() => {
        setSeconds(prev => prev + 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning]);

  const recordLap = () => {
    setLaps(prevLaps => [...prevLaps, seconds]);
  };

  return (
    <View>
      <Text>Time: {seconds} seconds</Text>

      <Button
        title={isRunning ? "Pause" : "Start"}
        onPress={() => setIsRunning(!isRunning)}
      />

      <Button
        title="Record Lap"
        onPress={recordLap}
      />

      <Text>Lap Times:</Text>

      {laps.map((lapTime, index) => (
        <Text key={index}>
          Lap {index + 1}: {lapTime} seconds
        </Text>
      ))}
    </View>
  );
};

export default RunningExercise;
