import React, { useEffect, useState } from "react";
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import { Button, Divider } from "@livechat/design-system";
import colors from "@livechat/design-system-colors";
import useAuth from "./hooks/useAuth";
import lcApi from "./api/lc";
import Avatar from "./components/Avatar/Avatar";
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

const rolesBadge = css`
${baseCellStyles};
background: #FFFFFF;
border: 1px solid #E2E2E4;
border-radius: 10px;
height: 20px;
width: 94px;
font-family: Source Sans Pro;
font-style: normal;
font-weight: normal;
font-size: 13px;
line-height: 16px;
text-align: center;
justify-content: center;
`;

const rolesLogo = css`
width: 11.72px;
height: 11.91px;
padding: 3px
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

  const handleButtonClickApprove = (agentId) => {
    lcApi.approveAgent(agentId);
  };

  const handleButtonClickDeny = (agentId) => {
    lcApi.denyAgent(agentId);
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
              <div css={rolesBadge}>
                <img css={rolesLogo} src={LCLogo} alt="LiveChat Logo" />
                {agent.role}
              </div>
            </div>

            <div css={actionsStyles}>
              <Button onClick={() => handleButtonClickApprove(agent.id)}>
                Approve
              </Button>

              <Button kind="text" css={denyButtonStyles} onClick={() => handleButtonClickDeny(agent.id)}>
                Deny
              </Button>
            </div>
          </div>

          <Divider css={dividerStyles} />
        </>
      ))}
    </div>
  );
};

export default App;
