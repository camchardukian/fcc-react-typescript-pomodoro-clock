import React, { useContext } from "react";
import { ClockContext } from "../../providers/ClockProvider";

import "./styles.scss";

const Timer = () => {
  const { typeOfTimerCurrentlyRunning, timerLength } = useContext(ClockContext);
  return (
    <div className="timer-container">
      <div id="timer-label">{typeOfTimerCurrentlyRunning || "Session"}</div>
      <div id="time-left">{timerLength}</div>
    </div>
  );
};

export default Timer;
