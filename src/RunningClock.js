import React, { useState, useEffect } from "react";

export default function RunningClock() {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isStarted, setIsStarted] = useState(false);

  function handleStart() {
    setIsRunning(true);
    setIsStarted(true);
  }

  function handlePauseResume() {
    setIsRunning(!isRunning);
  }

  function handleReset() {
    setMinutes(0);
    setSeconds(0);
    setIsRunning(false);
    setIsStarted(false);
  }

  //implement setInterval every 1 second
  useEffect(() => {
    let intervalId;
    if (isRunning) {
      intervalId = setInterval(() => {
        if (minutes === 0 && seconds === 0) {
          setIsRunning(false);
        } else if (seconds === 0) {
          setMinutes((minutes) => minutes - 1);
          setSeconds(59);
        } else {
          setSeconds((seconds) => seconds - 1);
        }
      }, 1000);
    }
    return () => clearInterval(intervalId);
  }, [isRunning, minutes, seconds]);

  function handleMinuteChange(e) {
    setMinutes(e.target.value);
  }

  function handleSecondChange(e) {
    setSeconds(e.target.value);
  }

  function formatTime(time) {
    return time < 10 ? `0${time}` : time;
  }

  return (
    <div>
      <label>
        <input type="number" value={minutes} onChange={handleMinuteChange} />
        Minutes
      </label>
      <label>
        <input type="number" value={seconds} onChange={handleSecondChange} />
        Seconds
      </label>
      <button onClick={handleStart}>START</button>
      <button onClick={handlePauseResume}>PAUSE/RESUME</button>
      <button onClick={handleReset}>RESET</button>
      <h1 data-testid="running-clock">
        {isStarted ? `${formatTime(minutes)}:${formatTime(seconds)}` : "00:00"}
      </h1>
    </div>
  );
}
