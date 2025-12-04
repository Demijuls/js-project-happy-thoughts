import styled from "styled-components";
import { useState } from "react";
import { BodyText } from "./styles/Typography";
import { CountText } from "./styles/Typography";

const ButtonLike = styled.button`
  background-color: #eaeaea;
  padding: 4px;
  width: 46px;
  height: 46px;
  border-radius: 25px;
  border: none;

  &:hover {
    background-color: #fc8486;
  }
  /* Pressed button */

  &:active {
    background-color: #f84f51;
  }

  /* Keyboard focus */
  &:focus-visible {
    outline: 3px solid #3618cd;
    outline-offset: 3px;
  }
`;

const CountWrapper = styled.div`
  display: flex;
  gap: 6px;
  align-items: center;
`;

export const LikeButton = () => {
  const [count, setCount] = useState(0);

  const handleOnClick = () => {
    setCount((count) => count + 1);

    console.log("count", count);
  };

  return (
    <CountWrapper>
      <ButtonLike type="button" onClick={handleOnClick}>
        <BodyText align="center">❤️</BodyText>
      </ButtonLike>
      <CountText color="#888888">x {count}</CountText>
    </CountWrapper>
  );
};
