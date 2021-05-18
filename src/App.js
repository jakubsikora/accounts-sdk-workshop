import React, { useEffect, useState } from "react";
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import { Button, Divider } from "@livechat/design-system";
import colors from "@livechat/design-system-colors";
import useAuth from "./hooks/useAuth";
import lcApi from "./api/lc";
import Avatar from "./components/Avatar/Avatar";
import Badge from "./components/Badge/Badge";
import LCLogo from "./assets/lc.png";

const rowStyles = css`
  display: flex;
  padding: 16px 25px;
  background-color: white;
`;

const dividerStyles = css`
  margin: 0;
`;

const baseCellStyles = css`
  display: flex;
  align-items: center;
`;

const nameCellStyles = css`
  ${baseCellStyles};
  width: 21%;
`;

const emailStyles = css`
  ${baseCellStyles};
  width: 24%;
  color: ${colors.gray600};
`;

const rolesStyles = css`
  ${baseCellStyles};
  width: 40%;
`;

const ownershipStyles = css`
  ${baseCellStyles};
  width: 40%;
`;

const actionsStyles = css`
  ${baseCellStyles};
  width: 15%;
`;

const nameStyles = css`
  margin-left: 24px;
`;

const denyButtonStyles = css`
  margin-left: 20px;
`;

const App = () => {
  const {
    isLoggedIn,
    isLoggingIn,
    authorizeWithRedirect,
    data,
    isOwner,
  } = useAuth();
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

  //console.log("data", data);

  if (isLoggingIn) {
    return "Loading...";
  }

  if (!isLoggedIn) {
    return "Error";
  }

  const handleButtonClick = (agentId) => {
    lcApi.approveAgent(agentId);
  };

  const handleOnAgentDenied = (agentId) => {
    lcApi.deleteAgent(agentId);
  };

  return (
    <div className="App">
      <div css={rowStyles}>
        <div css={nameCellStyles}>NAME</div>
        <div css={emailStyles}>EMAIL</div>
        <div css={rolesStyles}>PRODUCT ROLES</div>
        <div css={actionsStyles}></div>
      </div>
      <Divider css={dividerStyles} />

      {agents.map((agent) => (
        <>
          <div css={rowStyles}>
            <div css={nameCellStyles}>
              <Avatar imageUrl={agent.avatar_path} name={agent.name} />

              <span css={nameStyles}>{agent.name}</span>
            </div>

            <div css={emailStyles}>{agent.id}</div>

            <div css={rolesStyles}>
              <Badge imageUrl={LCLogo} name="LiveChat Logo">
                {agent.role}
              </Badge>
            </div>

            <div css={actionsStyles}>
              <Button onClick={() => handleButtonClick(agent.id)}>
                Approve
              </Button>

              <Button
                kind="text"
                css={denyButtonStyles}
                onClick={() => handleOnAgentDenied(agent.id)}
              >
                Deny
              </Button>
            </div>
          </div>

          <Divider css={dividerStyles} />
        </>
      ))}
      {isOwner && <p>Logged in as owner</p>}
    </div>
  );
};

export default App;
