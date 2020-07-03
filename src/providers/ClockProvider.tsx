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
  resetTimerSoundCount: number;
  formattedTimerLength: string;
  timerIsStopped: boolean;
  typeOfTimerCurrentlyRunning: string;
  setBreakLength: Dispatch<SetStateAction<number>>;
  setSessionLength: Dispatch<SetStateAction<number>>;
  setTimerLength: Dispatch<SetStateAction<number>>;
  setResetTimerSoundCount: Dispatch<SetStateAction<number>>;
  setFormattedTimerLength: Dispatch<SetStateAction<string>>;
  setTimerIsStopped: Dispatch<SetStateAction<boolean>>;
  setTypeOfTimerCurrentlyRunning: Dispatch<SetStateAction<string>>;
  setContext: Dispatch<SetStateAction<Context>>;
  handleSetBreakLength: (opType: string) => void;
  handleSetSessionLength: (opType: string) => void;
  handleSetTimerIsStopped: () => void;
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
  resetTimerSoundCount: 0,
  formattedTimerLength: "25:00",
  timerIsStopped: true,
  typeOfTimerCurrentlyRunning: "",
  setBreakLength: (): void => {},
  setSessionLength: (): void => {},
  setTimerLength: (): void => {},
  setFormattedTimerLength: (): void => {},
  setTimerIsStopped: (): void => {},
  setResetTimerSoundCount: (): void => {},
  setTypeOfTimerCurrentlyRunning: (): void => {},
  setContext: (): void => {
    throw new Error("setContext function must be overridden.");
  },
  handleSetBreakLength: (): void => {},
  handleSetSessionLength: (): void => {},
  handleSetTimerIsStopped: (): void => {},
  handleIntervals: (): void => {},
  handleResetTimer: (): void => {}
};
const ClockContext = createContext<Context>(initialContext);
const ClockContextProvider = ({ children }: Props): JSX.Element => {
  const [contextState, setContext] = useState<Context>(initialContext);
  const [breakLength, setBreakLength] = useState<number>(5);
  const [sessionLength, setSessionLength] = useState<number>(25);
  const [timerIsStopped, setTimerIsStopped] = useState<boolean>(true);
  const [timerLength, setTimerLength] = useState<number>(25);
  const [formattedTimerLength, setFormattedTimerLength] = useState<string>(
    "25:00"
  );
  const [intervalId, setIntervalId] = useState<any>();
  const [
    typeOfTimerCurrentlyRunning,
    setTypeOfTimerCurrentlyRunning
  ] = useState<string>("session");
  const [resetTimerSoundCount, setResetTimerSoundCount] = useState<number>(0);
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
    } else if (opType === "decrement" && sessionLength >= 2) {
      setSessionLength(sessionLength - 1);
    }
    if (timerIsStopped) {
      if (opType === "increment" && sessionLength <= 59) {
        setTimerLength(sessionLength + 1);
        handleSetFormattedTimerLength(sessionLength + 1);
      } else if (opType === "decrement" && sessionLength >= 2) {
        setTimerLength(sessionLength - 1);
        handleSetFormattedTimerLength(sessionLength - 1);
      }
    }
  };
  const handleSetFormattedTimerLength = (duration: number) => {
    let formattedTime = "";
    const roundedDuration = Math.round(duration);
    if (roundedDuration === 3600) {
      formattedTime = "60:00";
    } else {
      const mins = Math.floor((roundedDuration % 3600) / 60);
      const secs = Math.floor(roundedDuration % 60);
      formattedTime +=
        (mins < 10 ? "0" : "") + mins + ":" + (secs < 10 ? "0" : "");
      formattedTime += "" + secs;
    }
    setFormattedTimerLength(formattedTime);
  };
  const handleSetTimerIsStopped = () => {
    setTimerIsStopped(!timerIsStopped);
    handleSetTimerInitialValue();
    handleIntervals();
  };
  const handleIntervals = () => {
    if (timerIsStopped) {
      var myInterval = setInterval(handleDecrementTimerLength, 1000);
      setIntervalId(myInterval);
      return myInterval;
    } else {
      clearInterval(intervalId);
    }
  };
  const handleSetTimerInitialValue = () => {
    if (timerIsStopped && timerLength === 0) {
      setTimerLength(sessionLength * 60);
    }
  };
  const handleDecrementTimerLength = () => {
    setTimerLength(prevState => prevState - Math.round((1 / 60) * 1000) / 1000);
    handleSetFormattedTimerLength(timerLength * 60 - 1);
  };
  useEffect(() => {
    if (timerLength <= 0 && !timerIsStopped) {
      if (typeOfTimerCurrentlyRunning === "session") {
        setTimerLength(breakLength);
        setTypeOfTimerCurrentlyRunning("break");
      } else if (typeOfTimerCurrentlyRunning === "break") {
        setTimerLength(sessionLength);
        setTypeOfTimerCurrentlyRunning("session");
      }
    }
  }, [
    intervalId,
    timerLength,
    breakLength,
    timerIsStopped,
    sessionLength,
    typeOfTimerCurrentlyRunning
  ]);
  useEffect(() => {
    handleSetFormattedTimerLength(timerLength * 60);
  }, [timerLength]);
  const handleResetTimer = () => {
    setBreakLength(5);
    setSessionLength(25);
    setTimerLength(25);
    setFormattedTimerLength("25:00");
    setTypeOfTimerCurrentlyRunning("session");
    setTimerIsStopped(true);
    clearInterval(intervalId);
    setResetTimerSoundCount(resetTimerSoundCount + 1);
  };
  return (
    <ClockContext.Provider
      value={{
        ...contextState,
        setContext,
        breakLength,
        sessionLength,
        timerIsStopped,
        typeOfTimerCurrentlyRunning,
        timerLength,
        resetTimerSoundCount,
        setBreakLength,
        setTimerIsStopped,
        setTimerLength,
        setSessionLength,
        handleSetBreakLength,
        handleSetSessionLength,
        handleSetTimerIsStopped,
        handleResetTimer,
        formattedTimerLength
      }}
    >
      {children}
    </ClockContext.Provider>
  );
};
export { ClockContext, ClockContextProvider };
