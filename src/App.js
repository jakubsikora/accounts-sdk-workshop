import React from "react";
import useAuth from "./hooks/useAuth";

const App = () => {
  const { isLoggedIn, isLoggingIn } = useAuth();

  if (isLoggingIn) {
    return "Loading...";
  }

  if (!isLoggedIn) {
    return "Log in";
  }

  return <div className="App">All good!</div>;
};

export default App;
