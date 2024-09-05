import React, { useEffect, useReducer } from "react";
import "./App.css";
import Header from "./Header";
import MainBody from "./MainBody";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";

const initialState = {
  questions: [],
  //   "loading", "error","ready","active","finished"
  status: "loading",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "dataRecieved":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    case "start":
      return { ...state, status: "active" };
    default:
      throw newError("Action unknown");
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { questions, status } = state;

  const numQuestions = questions.length;

  useEffect(() => {
    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataRecieved", payload: data }))
      .catch((error) => dispatch({ type: "dataFailed", payload: error }));
  }, []);

  return (
    <div className="app">
      <Header />
      <MainBody>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === "active" && <Question />}
      </MainBody>
    </div>
  );
}

export default App;
