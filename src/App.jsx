import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./Header";
import MainBody from "./MainBody";

function App() {
  useEffect(() => {
    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((data) => console.log("Data:", data))
      .catch((error) => console.error("Error:", error));
  }, []);

  return (
    <div className="app">
      <Header />
      <MainBody>
        <p>1/15</p>
        <p>question?</p>
      </MainBody>
    </div>
  );
}

export default App;
