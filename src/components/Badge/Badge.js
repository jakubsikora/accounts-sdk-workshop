import React from "react";
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import colors from "@livechat/design-system-colors";

const badgeStyles = css`
  display: flex;
  align-items: center;
  border: solid ${colors.gray200} 1px;
  border-radius: 10px 10px 10px 10px;
  text-transform: capitalize;
  font-size: 13px;
  padding-right: 10px;
  padding-left: 10px;
`;

const productLogoStyles = css`
  margin: 5px 5px 4px 0px;
  height: 12px;
  width: 12px;
`;

const Badge = ({ imageUrl, name, children }) => {
  return (
    <div css={badgeStyles}>
      <img src={imageUrl} alt={name} css={productLogoStyles} />
      {children}
    </div>
  );
};

export default Badge;
