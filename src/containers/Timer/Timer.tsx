import React, { useContext, useEffect } from "react";
import { ClockContext } from "../../providers/ClockProvider";
// @ts-ignore
import bell from "../../assets/audio/bell.mp3";
import "./styles.scss";

const Timer = () => {
  const {
    typeOfTimerCurrentlyRunning,
    formattedTimerLength,
    timerIsStopped
  } = useContext(ClockContext);
  useEffect(() => {
    if (formattedTimerLength === "0:00") {
      if (document.getElementById("beep")) {
        const beepAudio: any = document.getElementById("beep");
        beepAudio.play();
      }
    }
    if (timerIsStopped && formattedTimerLength === "25:00") {
      if (document.getElementById("beep")) {
        const beepAudio: any = document.getElementById("beep");
        beepAudio.pause();
        beepAudio.currentTime = 0;
      }
    }
  }, [formattedTimerLength, timerIsStopped]);
  return (
    <div className="timer-container">
      <div id="timer-label">{typeOfTimerCurrentlyRunning}</div>
      <div id="time-left">{formattedTimerLength}</div>
      <audio className="clip" id="beep" src={bell}></audio>
    </div>
  );
};

export default Timer;
