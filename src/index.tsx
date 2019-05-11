import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { createGlobalStyle } from "styled-components";
import * as serviceWorker from "./serviceWorker";

const GlobalStyle = createGlobalStyle`
  body {
    color: #333;
  }
`;

const Root: React.FC = () => {
  return (
    <>
      <GlobalStyle />
      <App />
    </>
  );
};

ReactDOM.render(<Root />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
