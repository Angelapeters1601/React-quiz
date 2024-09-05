import React, { useReducer } from "react";

function DateCounter() {
  const initialState = { count: 0, step: 1 };

  const reducer = (state, action) => {
    switch (action.type) {
      case "inc": {
        return { ...state, count: state.count + state.step };
      }
      case "dec": {
        return { ...state, count: state.count - state.step };
      }
      case "setCount": {
        return { ...state, count: action.payload };
      }
      case "setStep": {
        return { ...state, step: action.payload };
      }
      case "reset": {
        return initialState;
      }
      default: {
        throw new Error("unknown action");
      }
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const { count, step } = state;

  const date = new Date("june 21 2027");
  date.setDate(date.getDate() + count);

  const inc = () => {
    dispatch({ type: "inc" });
  };

  const dec = () => {
    dispatch({ type: "dec" });
  };

  const defineCount = (e) => {
    dispatch({ type: "setCount", payload: Number(e.target.value) });
  };

  const defineStep = (e) => {
    dispatch({ type: "setStep", payload: Number(e.target.value) });
  };

  const reset = () => {
    dispatch({ type: "reset" });
  };

  return (
    <div className="counter">
      <div>
        <p>{step}</p>
        <input
          type="range"
          value={step}
          min="0"
          max="10"
          onChange={defineStep}
        />
      </div>
      <div>
        <button onClick={dec}>-</button>
        <input type="text" value={count} onChange={defineCount} />
        <button onClick={inc}>+</button>
      </div>
      <p>{date.toDateString()}</p>
      <button onClick={reset}>reset</button>
    </div>
  );
}

export default DateCounter;
