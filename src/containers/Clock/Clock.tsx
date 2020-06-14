import React from "react";
import "./styles.scss";
import Credits from "../../components/Credits";
import Controls from "../../components/Controls";
import Session from "../../components/Session";
import Break from "../../components/Break";
import Timer from "../Timer";

const Clock = () => {
  return (
    <div className="clock-container">
      <div className="title-text">Pomodoro Clock</div>
      <div className="break-session-flex-container">
        <Break />
        <Session />
      </div>
      <Timer />
      <Controls />
      <Credits />
    </div>
  );
};

export default Clock;
