import { useEffect, useState } from "react";
import AccountsSDK from "@livechat/accounts-sdk";

const options = {
  client_id: "xxx",
};

const useAuth = () => {
  const [data, setData] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  useEffect(() => {
    const fetchAccount = async () => {
      try {
        setIsLoggedIn(false);
        setIsLoggingIn(true);
        setData(null);

        const instance = new AccountsSDK(options);
        const data = await instance.iframe(options).authorize();

        setIsLoggedIn(true);
        setData(data);
      } catch (error) {
        console.log("error", error);
        setData(null);
      } finally {
        setIsLoggingIn(false);
      }
    };

    fetchAccount();
  }, []);

  return {
    data,
    isLoggedIn,
    isLoggingIn,
  };
};

export default useAuth;
