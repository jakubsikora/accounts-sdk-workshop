import React from "react";
import { css, jsx } from "@emotion/react";
/** @jsx jsx */
import { Button, Divider, notificationConnect } from "@livechat/design-system";
import colors from "@livechat/design-system-colors";
import LCLogo from "../../assets/lc.png";
import { formatNotification } from "../../utils";
import lcApi from "../../api/lc";
import Avatar from "../Avatar/Avatar";
import Badge from "../Badge/Badge";

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

const headerStyles = css`
  margin: 8px;
  font-weight: 600;
  line-height: 20px;
  font-size: 16px;
`;

const AgentList = ({ notificationSystem, agents, header, isOwner }) => {
  const handleApprove = async (agentId) => {
    try {
      await lcApi.approveAgent(agentId);
      notificationSystem.add(formatNotification("Invitation has been sent"));
    } catch (error) {
      notificationSystem.add(formatNotification("An error occured", "error"));
    }
  };

  const handleOnAgentDenied = (agentId) => {
    lcApi.deleteAgent(agentId);
  };

  return (
    <div>
      <div css={headerStyles}>{header}</div>
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

            {isOwner && (
              <div css={actionsStyles}>
                <Button onClick={() => handleApprove(agent.id)}>Approve</Button>

                <Button
                  kind="text"
                  css={denyButtonStyles}
                  onClick={() => handleOnAgentDenied(agent.id)}
                >
                  Deny
                </Button>
              </div>
            )}
          </div>

          <Divider css={dividerStyles} />
        </>
      ))}
    </div>
  );
};

export default notificationConnect(AgentList);
