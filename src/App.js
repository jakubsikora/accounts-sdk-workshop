import React, { useEffect, useState } from "react";
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
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

  const handleButtonClick = (agentId) => {
    lcApi.approveAgent(agentId);
  };

  return (
    <div className="App">
      {agents.map((agent) => (
        <div
          css={css`
            display: flex;
          `}
        >
          <img src={agent.avatar_path} /> <span>{agent.id}</span>{" "}
          <span>{agent.name}</span> <span>{agent.role}</span>
          <button type="button" onClick={() => handleButtonClick(agent.id)}>
            Approve
          </button>
        </div>
      ))}
    </div>
  );
};

export default App;
