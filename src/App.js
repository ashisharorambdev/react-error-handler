import logo from './logo.svg';
import './App.css';
import { ComponentThatThrowsError } from "./ComponentThatThrowsError";
import { ComponentWithSyntaxError } from "./ComponentWithSyntaxError";
import { ComponentWithFetchError } from "./ComponentWithFetchError";
import { useState } from "react";

function App() {
  const [counter, setCounter] = useState(0);

  const handleClick = () => {
    setCounter(counter + 1);
    if (counter >= 5) {
      throw new Error("Counter exceeded maximum value");
    }
  };

  return (
    <div>
      <p>Counter: {counter}</p>
      <button onClick={handleClick}>Increment Counter</button>
      <ComponentThatThrowsError />
      <ComponentWithSyntaxError />
      <ComponentWithFetchError />
    </div>
  );
}

export default App;
