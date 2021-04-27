import React, { useEffect, useState } from "react";
import { Button } from "@livechat/design-system";
import useAuth from "./hooks/useAuth";
import lcApi from "./api/lc";

const App = () => {
  const { isLoggedIn, isLoggingIn, authorizeWithRedirect, data } = useAuth();
  const [agents, setAgents] = useState([]);

  useEffect(() => {
    const initData = async () => {
      try {
        const agents = await lcApi.getAgents();
        setAgents(agents);
      } catch (error) {
        console.log("initData error", error);
        setAgents([]);
      }
    };

    const authorize = async () => {
      try {
        await authorizeWithRedirect();
        await initData();
      } catch (error) {
        console.log("authorize error", error);
      }
    };

    authorize();
  }, []);

  console.log("data", data);

  if (isLoggingIn) {
    return "Loading...";
  }

  if (!isLoggedIn) {
    return "Error";
  }

  return (
    <div className="App">
      {agents.map((agent) => (
        <div>
          <img src={agent.avatar_path} /> <span>{agent.id}</span>{" "}
          <span>{agent.name}</span> <span>{agent.role}</span>
          <button type="button">Approve</button>
        </div>
      ))}
    </div>
  );
};

export default App;
