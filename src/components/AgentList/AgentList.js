import React from 'react';
import { css, jsx } from "@emotion/react";
/** @jsx jsx */
import { Button, Divider } from "@livechat/design-system";
import colors from "@livechat/design-system-colors";
import Avatar from "./../Avatar/Avatar"
import Badge from "./../Badge/Badge";
import LCLogo from "./../../assets/lc.png"

const AgentList = ({agents, header, onApprove, onDelete, isOwner}) => {

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

            <div css={actionsStyles}>
              <Button onClick={() => onApprove(agent.id)}>
                Approve
              </Button>

              <Button
                kind="text"
                css={denyButtonStyles}
                onClick={() => onDelete(agent.id)}
              >
                Deny
              </Button>
            </div>
          </div>

          <Divider css={dividerStyles} />
        </>
      ))}
      </div>
  )

}

export default AgentList;
