import logo from "./assets/Icon.png";
import { useEffect } from "react";
import axios from "axios";
import "./App.css";
import Home from "./pages/Home";
function App() {
  useEffect(() => {
    const apiKey = process.env.REACT_APP_URL;

    axios.get(apiKey).then((response) => {
      console.log("api 1 :- ", response);
    });

    console.log("====>", apiKey);
  }, []);

  return (
    <div className="App">
      <Home />
    </div>
  );
}

export default App;
