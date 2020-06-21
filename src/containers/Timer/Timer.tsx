import React, { useContext, useEffect } from "react";
import { ClockContext } from "../../providers/ClockProvider";

import "./styles.scss";

const Timer = () => {
  const { timerIsRunning, timerLength } = useContext(ClockContext);

  // user clicks start
  // timerIsRunning becomes true
  // if TimerIsRunning equals true
  // start decrementing timerLength
  // user clicks stop
  // timerIsRunning equals false
  // stop decrementing
  return (
    <div className="timer-container">
      <div id="timer-label">Session</div>
      <div id="time-left">{timerLength}</div>
    </div>
  );
};

export default Timer;
