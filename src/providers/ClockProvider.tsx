import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useState,
  useEffect
} from "react";

type Context = {
  breakLength: number;
  sessionLength: number;
  timerLength: number;
  timerIsRunning: boolean;
  typeOfTimerCurrentlyRunning: string;
  setBreakLength: Dispatch<SetStateAction<number>>;
  setSessionLength: Dispatch<SetStateAction<number>>;
  setTimerLength: Dispatch<SetStateAction<number>>;
  setTimerIsRunning: Dispatch<SetStateAction<boolean>>;
  setTypeOfTimerCurrentlyRunning: Dispatch<SetStateAction<string>>;
  setContext: Dispatch<SetStateAction<Context>>;
  handleSetBreakLength: (opType: string) => void;
  handleSetSessionLength: (opType: string) => void;
  handleSetTimerIsRunning: () => void;
  handleIntervals: () => void;
  handleResetTimer: () => void;
};

type Props = {
  children: React.ReactNode;
};

const initialContext: Context = {
  breakLength: 5,
  sessionLength: 25,
  timerLength: 0,
  timerIsRunning: true,
  typeOfTimerCurrentlyRunning: "",
  setBreakLength: (): void => {},
  setSessionLength: (): void => {},
  setTimerLength: (): void => {},
  setTimerIsRunning: (): void => {},
  setTypeOfTimerCurrentlyRunning: (): void => {},
  setContext: (): void => {
    throw new Error("setContext function must be overridden.");
  },

  handleSetBreakLength: (): void => {},
  handleSetSessionLength: (): void => {},
  handleSetTimerIsRunning: (): void => {},
  handleIntervals: (): void => {},
  handleResetTimer: (): void => {}
};

const ClockContext = createContext<Context>(initialContext);

const ClockContextProvider = ({ children }: Props): JSX.Element => {
  const [contextState, setContext] = useState<Context>(initialContext);
  const [breakLength, setBreakLength] = useState<number>(5);
  const [sessionLength, setSessionLength] = useState<number>(25);
  const [timerIsRunning, setTimerIsRunning] = useState<boolean>(true);
  const [timerLength, setTimerLength] = useState<number>(0);
  const [intervalId, setIntervalId] = useState<any>();
  const [
    typeOfTimerCurrentlyRunning,
    setTypeOfTimerCurrentlyRunning
  ] = useState<string>("");

  const handleSetBreakLength = (opType: string) => {
    if (opType === "increment" && breakLength <= 59) {
      setBreakLength(breakLength + 1);
    }
    if (opType === "decrement" && breakLength >= 2) {
      setBreakLength(breakLength - 1);
    }
  };

  const handleSetSessionLength = (opType: string) => {
    if (opType === "increment" && sessionLength <= 59) {
      setSessionLength(sessionLength + 1);
    }
    if (opType === "decrement" && sessionLength >= 2) {
      setSessionLength(sessionLength - 1);
    }
  };

  const handleSetTimerIsRunning = () => {
    setTimerIsRunning(!timerIsRunning);
    setTimerInitialValue();
    handleIntervals();
  };

  const handleIntervals = () => {
    if (timerIsRunning) {
      var myInterval = setInterval(handleDecrementTimerLength, 80);
      setIntervalId(myInterval);
      return myInterval;
    } else {
      clearInterval(intervalId);
    }
  };

  const setTimerInitialValue = () => {
    if (timerIsRunning && timerLength === 0) {
      setTimerLength(sessionLength);
      setTypeOfTimerCurrentlyRunning("Session");
    }
  };

  const handleDecrementTimerLength = () => {
    setTimerLength(prevState => prevState - 1);
  };
  useEffect(() => {
    if (timerLength <= 0) {
      if (typeOfTimerCurrentlyRunning === "Session") {
        setTimerLength(breakLength);
        setTypeOfTimerCurrentlyRunning("Break");
      } else if (typeOfTimerCurrentlyRunning === "Break") {
        setTimerLength(sessionLength);
        setTypeOfTimerCurrentlyRunning("Session");
      }
    }
  }, [
    intervalId,
    timerLength,
    breakLength,
    sessionLength,
    typeOfTimerCurrentlyRunning
  ]);

  const handleResetTimer = () => {
    setBreakLength(5);
    setSessionLength(25);
    setTimerLength(25);
    setTypeOfTimerCurrentlyRunning("Session");
    setTimerIsRunning(true);
    clearInterval(intervalId);
  };

  return (
    <ClockContext.Provider
      value={{
        ...contextState,
        setContext,
        breakLength,
        sessionLength,
        timerIsRunning,
        typeOfTimerCurrentlyRunning,
        timerLength,
        setBreakLength,
        setTimerIsRunning,
        setTimerLength,
        setSessionLength,
        handleSetBreakLength,
        handleSetSessionLength,
        handleSetTimerIsRunning,
        handleResetTimer
      }}
    >
      {children}
    </ClockContext.Provider>
  );
};

export { ClockContext, ClockContextProvider };
