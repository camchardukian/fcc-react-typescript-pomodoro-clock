import React, { useContext } from "react";
import { ClockContext } from "../../providers/ClockProvider";
import "./styles.scss";

const StartStop = () => {
  const { handleSetTimerIsStopped } = useContext(ClockContext);
  return (
    <div className="start-stop-container">
      <button id="start_stop" onClick={handleSetTimerIsStopped}>
        Start/Stop
      </button>
    </div>
  );
};

export default StartStop;
