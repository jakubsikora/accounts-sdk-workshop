import { useState } from "react";
import AccountsSDK from "@livechat/accounts-sdk";
import lcApi from "../api/lc";

const options = {
  client_id: process.env.REACT_APP_CLIENT_ID,
};

const instance = new AccountsSDK(options);

const useAuth = () => {
  const [data, setData] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  let isOwner;

  const authorizeWithRedirect = async () => {
    try {
      setIsLoggingIn(true);
      const authData = await instance.redirect(options).authorizeData();
      lcApi.setToken(authData.access_token);
      setData(authData);
      setIsLoggingIn(false);
      setIsLoggedIn(true);
    } catch (error) {
      setData(null);
      setIsLoggingIn(false);
      setIsLoggedIn(false);
      await instance.redirect(options).authorize();
    }
  };

  if (data) {
    isOwner = data.scope.includes("organization--my:rw");
  }

  // const authorizeWithPopup = async () => {
  //     try {
  //       setIsLoggingIn(true);
  //       setIsLoggedIn(false);

  //       const authData = await instance.popup(options).authorize();
  //       setData(authData);
  //       setIsLoggedIn(true);
  //     } catch (error) {
  //       setData(null);
  //       setIsLoggedIn(false);
  //     } finally {
  //       setIsLoggingIn(false);
  //     }
  //   };

  return {
    authorizeWithRedirect,
    data,
    isLoggedIn,
    isLoggingIn,
    isOwner,
  };
};

export default useAuth;
