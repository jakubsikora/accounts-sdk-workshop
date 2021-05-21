import React, { useEffect, useState } from "react";
import { css, jsx } from "@emotion/react";
import { NotificationProvider, ToastConsumer } from "@livechat/design-system";
/** @jsx jsx */
import useAuth from "./hooks/useAuth";
import lcApi from "./api/lc";
import AgentList from "./components/AgentList/AgentList";

const App = () => {
  const { isLoggedIn, isLoggingIn, authorizeWithRedirect, data, isOwner } =
    useAuth();
  const [agentsForApproval, setAgentsForApproval] = useState([]);
  const [approvedAgents, setApprovedAgents] = useState([]);

  useEffect(() => {
    const initData = async () => {
      try {
        const agents = await lcApi.getAgents();
        setAgentsForApproval(agents.filter((agent) => agent.awaiting_approval));
        setApprovedAgents(agents.filter((agent) => !agent.awaiting_approval));
      } catch (error) {
        console.log("initData error", error);
        setAgentsForApproval([]);
        setApprovedAgents([]);
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

  //console.log("data", data);
  //console.log(agentsForApproval)
  //console.log(approvedAgents)

  if (isLoggingIn) {
    return "Loading...";
  }

  if (!isLoggedIn) {
    return "Error";
  }

  return (
    <NotificationProvider>
      <ToastConsumer horizontalPosition="center" fixed verticalPosition="top" />

      <div className="App">
        {isOwner && (
          <AgentList
            agents={agentsForApproval}
            header={"Waiting for approval"}
            isOwner
          />
        )}

        <AgentList agents={approvedAgents} header={"All"} />

        {isOwner && <p>Logged in as owner</p>}
      </div>
    </NotificationProvider>
  );
};

export default App;
