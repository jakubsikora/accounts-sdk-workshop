import React from "react";
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import colors from "@livechat/design-system-colors";

const avatarStyles = css`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${colors.gray500};
  color: white;
`;

const Avatar = ({ imageUrl, name }) => {
  if (!imageUrl) {
    const initialsParts = name.split(" ");
    let initials = initialsParts[0][0];

    if (initialsParts.length > 1) {
      initials += initialsParts[1][0];
    }

    return <div css={avatarStyles}>{initials}</div>;
  }

  return (
    <div>
      <img src={imageUrl} alt={name} css={avatarStyles} />
    </div>
  );
};

export default Avatar;
