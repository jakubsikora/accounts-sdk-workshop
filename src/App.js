import React, { useEffect, useState } from "react";
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
  const [authData, setAuthData] = useState(null);

  useEffect(() => {
    const authorize = async () => {
      const data = await authorizeWithRedirect();
      console.log("data", data);
    };

    authorize();
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
