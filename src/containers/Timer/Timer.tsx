import React from "react";
import "./styles.scss";

const Timer = () => {
  return (
    <div className="timer-container">
      <div id="timer-label">Session</div>
      <div id="time-left">25:00</div>
    </div>
  );
};

export default Timer;
