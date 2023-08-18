import logo from "./assets/Icon.png";
import react, { useEffect, useState } from "react";

import "./App.css";

function App() {
  useEffect(() => {
    const apiKey = process.env.REACT_URL;
    console.log(apiKey);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          RDL Results is under Construction
        </a>
      </header>
    </div>
  );
}

export default App;
