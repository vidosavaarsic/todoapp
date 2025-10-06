import NavBar from "./components/NavBar/NavBar";
import { ThemeProvider } from "./context/ThemeContext";
import { BrowserRouter as Router } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./queryClient";
import { LogProvider } from "./context/LogContext";
import Main from "./Main";

import "./App.css";

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
