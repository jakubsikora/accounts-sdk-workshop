import React from "react";
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import colors from "@livechat/design-system-colors";

const badgeStyles = css`
  display: flex;
  align-items: center;
  border: solid ${colors.gray300} 1px;
  border-radius: 10px 10px 10px 10px;
  text-transform: capitalize;
  font-size: 13px;
  padding-right: 10px;
  padding-left: 10px;
`;

const Badge = ({ imageUrl, name }) => {
  return (
    <div>
      <img src={imageUrl} alt={name} css={badgeStyles} />
    </div>
  );
};

export default Badge;
