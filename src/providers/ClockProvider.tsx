import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useState
} from "react";

type Context = {
  breakLength: number;
  sessionLength: number;
  timerLength: number;
  timerIsRunning: boolean;
  timerIsDecrementing: boolean;
  setBreakLength: Dispatch<SetStateAction<number>>;
  setSessionLength: Dispatch<SetStateAction<number>>;
  setTimerLength: Dispatch<SetStateAction<number>>;
  setTimerIsRunning: Dispatch<SetStateAction<boolean>>;
  setTimerIsDecrementing: Dispatch<SetStateAction<boolean>>;
  setContext: Dispatch<SetStateAction<Context>>;
  handleSetBreakLength: (opType: string) => void;
  handleSetSessionLength: (opType: string) => void;
  handleSetTimerIsRunning: () => void;
  handleIntervalDecrementingTimer: () => void;
};

type Props = {
  children: React.ReactNode;
};

const initialContext: Context = {
  breakLength: 5,
  sessionLength: 25,
  timerLength: 0,
  timerIsRunning: true,
  timerIsDecrementing: false,
  setBreakLength: (): void => {},
  setSessionLength: (): void => {},
  setTimerLength: (): void => {},
  setTimerIsRunning: (): void => {},
  setTimerIsDecrementing: (): void => {},
  setContext: (): void => {
    throw new Error("setContext function must be overridden.");
  },
  handleSetBreakLength: (): void => {},
  handleSetSessionLength: (): void => {},
  handleSetTimerIsRunning: (): void => {},
  handleIntervalDecrementingTimer: (): void => {}
};

const ClockContext = createContext<Context>(initialContext);

const ClockContextProvider = ({ children }: Props): JSX.Element => {
  const [contextState, setContext] = useState<Context>(initialContext);
  const [breakLength, setBreakLength] = useState<number>(5);
  const [sessionLength, setSessionLength] = useState<number>(25);
  const [timerIsRunning, setTimerIsRunning] = useState<boolean>(true);
  const [timerLength, setTimerLength] = useState<number>(0);
  const [intervalId, setIntervalId] = useState<any>();

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
    if (timerIsRunning) {
      const myInterval = setInterval(handleDecrementTimerLength, 1000);
      setIntervalId(myInterval);
      return myInterval;
    } else {
      clearInterval(intervalId);
    }
  };

  const handleDecrementTimerLength = () => {
    setTimerLength(timerLength => timerLength - 1);
  };

  return (
    <ClockContext.Provider
      value={{
        ...contextState,
        setContext,
        breakLength,
        sessionLength,
        timerIsRunning,
        timerLength,
        setBreakLength,
        setTimerIsRunning,
        setTimerLength,
        setSessionLength,
        handleSetBreakLength,
        handleSetSessionLength,
        handleSetTimerIsRunning
      }}
    >
      {children}
    </ClockContext.Provider>
  );
};

export { ClockContext, ClockContextProvider };
