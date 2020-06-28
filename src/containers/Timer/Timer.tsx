import React, { useContext } from "react";
import { ClockContext } from "../../providers/ClockProvider";

import "./styles.scss";

const Timer = () => {
  const { typeOfTimerCurrentlyRunning, formattedTimerLength } = useContext(
    ClockContext
  );
  return (
    <div className="timer-container">
      <div id="timer-label">{typeOfTimerCurrentlyRunning}</div>
      <div id="time-left">{formattedTimerLength}</div>
    </div>
  );
};

export default Timer;
