import React, { useContext } from "react";
import { ClockContext } from "../../providers/ClockProvider";
import "./styles.scss";

const Session = () => {
  const { handleSetSessionLength, sessionLength } = useContext(ClockContext);
  return (
    <div className="session-container">
      <div id="session-label">Session Length</div>
      <div className="session-info-flex-container">
        <button
          type="button"
          id="session-decrement"
          onClick={() => handleSetSessionLength("decrement")}
        >
          Decrement
        </button>
        <div id="session-length">{sessionLength}</div>
        <button
          type="button"
          id="session-increment"
          onClick={() => handleSetSessionLength("increment")}
        >
          Increment
        </button>
      </div>
    </div>
  );
};

export default Session;
