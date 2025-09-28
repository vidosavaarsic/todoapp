import "./App.css";
import NavBar from "./components/NavBar";
import { ThemeProvider } from "./components/_contexts/ThemeContext";
import { BrowserRouter as Router } from "react-router-dom";
import { LogProvider } from "./components/_contexts/LogContext";
import Main from "./components/Main";

const App = () => {
  return (
    <ThemeProvider>
      <LogProvider>
        <Router>
          <NavBar />
          <Main />
        </Router>
      </LogProvider>
    </ThemeProvider>
  );
};

export default App;
