
// RunningExercise.js
import React, { useState, useEffect } from "react";
import runningImg from "../components/Running-12.png";
import "./RunningExercise.css";

function RunningExercise() {
  const [seconds, setSeconds] = useState(0); // this is the timer time starts at 0 
  const [isRunning, setIsRunning] = useState(false); // this is the state to track if the timer is running or not 
  const [laps, setLaps] = useState([]); // the laps state to store the lap times 

  // Timer effect
  useEffect(() => {
    let interval;

    if (isRunning) {
      interval = setInterval(() => {
        setSeconds(prev => prev + 1); // increment seconds every scond 
      }, 1000);
    }

    return () => clearInterval(interval); // cleanup the interval on comonent unmount or when isRunning changes 
  }, [isRunning]);

  // function to record the lap time  when the user clicks the "Record lap" button
  const recordLap = () => {
    setLaps(prevLaps => [...prevLaps, seconds]);
  };

  // helpter function to format the tiem in minutes and seconds for display 
  const formatTime = totalSeconds => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div className="running-exercise" style={{ border: "1px solid #ccc", padding: "16px", width: "300px" }}>
      <h2>Running Exercise</h2>
      <div>
        <img src={runningImg} alt = "Running" style={{width: "100px" }}/>
      </div>

      <p>Time: {formatTime(seconds)}</p>


      <button className="running-button" onClick={() => setIsRunning(!isRunning)}>
        {isRunning ? "Pause" : "Start"}
      </button>


      <button onClick={recordLap}>
        Record Lap
      </button>

      <h3>Laps:</h3>
      {laps.length === 0 ? (
        <p>No laps recorded yet.</p>
      ) : (
        laps.map((lapTime, index) => (
          <p key={index}>
            Lap {index + 1}: {formatTime(lapTime)}
          </p>
        ))
      )}
    </div>
  );

}

export default RunningExercise;

