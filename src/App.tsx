import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import { ThemeProvider } from "./context/ThemeContext";
import { BrowserRouter as Router } from "react-router-dom";
import { LogProvider } from "./context/LogContext";
import Main from "./Main";

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
