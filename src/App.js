import React, { useEffect } from "react";
import { Button } from "@livechat/design-system";
import useAuth from "./hooks/useAuth";

const App = () => {
  const {
    isLoggedIn,
    isLoggingIn,
    authorizeWithPopup,
    authorizeWithRedirect,
    data,
  } = useAuth();

  useEffect(() => {
    console.log("url", window.location.href);

    if (window.location.hash.indexOf("#access_token") === -1) {
      authorizeWithRedirect();
    }
  }, []);

  const authorize = async () => {
    await authorizeWithPopup();
  };

  if (isLoggingIn) {
    return "Loading...";
  }

  if (!isLoggedIn) {
    return (
      <Button onClick={authorize} kind="primary">
        Sign in with LiveChat
      </Button>
    );
  }

  console.log("data", data);

  return <div className="App">All good!</div>;
};

export default App;
