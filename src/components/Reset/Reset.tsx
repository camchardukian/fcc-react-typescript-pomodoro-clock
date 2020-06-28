import React, { useContext } from "react";
import { ClockContext } from "../../providers/ClockProvider";
import "./styles.scss";

const Reset = () => {
  const { handleResetTimer } = useContext(ClockContext);
  return (
    <div className="reset-container">
      <button type="button" id="reset" onClick={handleResetTimer}>
        Reset
      </button>
    </div>
  );
};

export default Reset;
