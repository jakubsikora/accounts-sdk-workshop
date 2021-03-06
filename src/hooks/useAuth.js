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

  return {
    authorizeWithRedirect,
    data,
    isLoggedIn,
    isLoggingIn,
    isOwner: data && data.scope.includes("organization--my:rw") ? true : false,
  };
};

export default useAuth;
