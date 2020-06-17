import React from "react";
import "./App.css";
import Clock from "../src/containers/Clock";
import { ClockContextProvider } from "../src/providers/ClockProvider";

function App() {
  return (
    <div className="App">
      <ClockContextProvider>
        <header className="App-header">
          <Clock />
        </header>
      </ClockContextProvider>
    </div>
  );
}

export default App;
