import { createContext, ReactNode, use, useState } from "react";

type LogsType = {
  log: boolean;
  setLog: (log: boolean) => void;
};

const LogContext = createContext<LogsType | undefined>(undefined);

type LogProviderProps = {
  children: ReactNode;
};

export const LogProvider = ({ children }: LogProviderProps) => {
  const [log, setIsLoggedIn] = useState(false);
  const setLog = () => {
    setIsLoggedIn(!log);
  };
  return (
    <LogContext.Provider value={{ log, setLog }}>
      {children}
    </LogContext.Provider>
  );
};

export const useLogs = (): LogsType => {
  const context = use(LogContext);
  if (!context) {
    throw new Error("");
  }
  return context;
};
