import React from "react";
import { Router } from "@reach/router";
import { useNetlifyIdentity } from "react-netlify-identity";
import { IdentityContext } from "./Identity";
import Search from "./Search";
import Movie from "./Movie";

import "./App.css";
import Login from "./Login";

const domainToUse =
  new URL(window.location.origin).hostname === "localhost"
    ? "https://movie-track.netlify.com"
    : window.location.origin;

const App: React.FC = () => {
  const identity = useNetlifyIdentity(domainToUse);
  const { isLoggedIn } = identity;
  return (
    <IdentityContext.Provider value={identity}>
      <div className="App">
        {isLoggedIn ? (
          <Router>
            <Search path="/" />
            <Movie path="/movie/:movieId" />
          </Router>
        ) : (
          <Login />
        )}
      </div>
    </IdentityContext.Provider>
  );
};

export default App;
