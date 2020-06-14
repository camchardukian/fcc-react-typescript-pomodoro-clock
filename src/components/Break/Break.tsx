import React from "react";
import "./styles.scss";

const Break = () => {
  return (
    <div className="break-container">
      <div id="break-label">Break Length</div>
      <div className="break-info-flex-container">
        <button type="button" id="break-decrement">
          Decrement
        </button>
        <div id="break-length">5</div>
        <button type="button" id="break-increment">
          Increment
        </button>
      </div>
    </div>
  );
};

export default Break;
