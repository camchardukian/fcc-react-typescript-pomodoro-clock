import React, { useContext } from "react";
import { ClockContext } from "../../providers/ClockProvider";
import "./styles.scss";

const Break = () => {
  const { handleSetBreakLength, breakLength } = useContext(ClockContext);
  return (
    <div className="break-container">
      <div id="break-label">Break Length</div>
      <div className="break-info-flex-container">
        <button
          className="br"
          type="button"
          id="break-decrement"
          onClick={() => handleSetBreakLength("decrement")}
        >
          Decrement
        </button>
        <div id="break-length">{breakLength}</div>
        <button
          type="button"
          id="break-increment"
          onClick={() => handleSetBreakLength("increment")}
        >
          Increment
        </button>
      </div>
    </div>
  );
};

export default Break;
