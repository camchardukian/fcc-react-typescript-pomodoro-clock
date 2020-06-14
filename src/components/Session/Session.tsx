import React from "react";
import "./styles.scss";

const Session = () => {
  return (
    <div className="session-container">
      <div id="session-label">Session Length</div>
      <div className="session-info-flex-container">
        <button type="button" id="session-decrement">
          Decrement
        </button>
        <div id="session-length">25</div>
        <button type="button" id="session-increment">
          Increment
        </button>
      </div>
    </div>
  );
};

export default Session;
