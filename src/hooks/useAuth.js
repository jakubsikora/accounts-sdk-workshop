import { useState } from "react";
import AccountsSDK from "@livechat/accounts-sdk";

const options = {
  client_id: "9541d38e7c9f97bc4876933c319c057c",
  prompt: "consent",
};

const instance = new AccountsSDK(options);

const useAuth = () => {
  const [data, setData] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const authorizeWithRedirect = async () => {
    const authData = await instance.redirect(options).authorize();
    console.log("authData", authData);
  };

  const authorizeWithPopup = async () => {
    try {
      setIsLoggingIn(true);
      setIsLoggedIn(false);

      const authData = await instance.popup(options).authorize();
      setData(authData);
      setIsLoggedIn(true);
    } catch (error) {
      setData(null);
      setIsLoggedIn(false);
    } finally {
      setIsLoggingIn(false);
    }
  };

  return {
    authorizeWithPopup,
    authorizeWithRedirect,
    data,
    isLoggedIn,
    isLoggingIn,
  };
};

export default useAuth;
