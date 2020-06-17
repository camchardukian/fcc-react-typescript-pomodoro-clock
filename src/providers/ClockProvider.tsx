import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useState
} from "react";

type Context = {
  breakLength: number;
  sessionLength: number;
  setBreakLength: Dispatch<SetStateAction<number>>;
  setSessionLength: Dispatch<SetStateAction<number>>;
  setContext: Dispatch<SetStateAction<Context>>;
  handleSetBreakLength: (opType: string) => void;
  handleSetSessionLength: (opType: string) => void;
};

type Props = {
  children: React.ReactNode;
};

const initialContext: Context = {
  breakLength: 5,
  sessionLength: 25,
  setBreakLength: (): void => {},
  setSessionLength: (): void => {},
  setContext: (): void => {
    throw new Error("setContext function must be overridden.");
  },
  handleSetBreakLength: (): void => {},
  handleSetSessionLength: (): void => {}
};

const ClockContext = createContext<Context>(initialContext);

const ClockContextProvider = ({ children }: Props): JSX.Element => {
  const [contextState, setContext] = useState<Context>(initialContext);
  const [breakLength, setBreakLength] = useState<number>(5);
  const [sessionLength, setSessionLength] = useState<number>(25);

  const handleSetBreakLength = (opType: string) => {
    console.log("rrrrrr");
    if (opType === "increment" && breakLength <= 59) {
      setBreakLength(breakLength + 1);
    }
    if (opType === "decrement" && breakLength >= 2) {
      setBreakLength(breakLength - 1);
    }
  };

  const handleSetSessionLength = (opType: string) => {
    console.log("rrrrrr");
    if (opType === "increment" && sessionLength <= 59) {
      setSessionLength(sessionLength + 1);
    }
    if (opType === "decrement" && sessionLength >= 2) {
      setSessionLength(sessionLength - 1);
    }
  };

  return (
    <ClockContext.Provider
      value={{
        ...contextState,
        setContext,
        breakLength,
        sessionLength,
        setBreakLength,
        setSessionLength,
        handleSetBreakLength,
        handleSetSessionLength
      }}
    >
      {children}
    </ClockContext.Provider>
  );
};

export { ClockContext, ClockContextProvider };
