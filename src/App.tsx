import React from "react";
import { Router, Link } from "@reach/router";
import "./App.css";
import Search from "./Search";
import Movie from "./Movie";

const App: React.FC = () => {
  return (
    <div className="App">
      <Router>
        <Search path="/" />
        <Movie path="/movie/:movieId" />
      </Router>
    </div>
  );
};

export default App;
