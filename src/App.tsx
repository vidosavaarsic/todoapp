import "./App.css";
import NavBar from "./components/NavBar";
import { ThemeProvider } from "./components/_contexts/ThemeContext";
import { BrowserRouter as Router } from "react-router-dom";
import { LogProvider } from "./components/_contexts/LogContext";
import Main from "./components/Main";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./queryClient";

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <LogProvider>
          <Router>
            <NavBar />
            <Main />
          </Router>
        </LogProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
