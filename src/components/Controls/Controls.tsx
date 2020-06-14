import React from "react";
import StartStop from "../StartStop";
import Reset from "../Reset";

import "./styles.scss";

const Controls = () => {
  return (
    <div className="controls-container">
      <StartStop />
      <Reset />
    </div>
  );
};

export default Controls;
