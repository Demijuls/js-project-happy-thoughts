import React from "react";
import styled from "styled-components";
import { useState } from "react";
import { BodyText } from "./styles/Typography";
import { CountText } from "./styles/Typography";
import { LikeButton } from "./LikeButton";

const MessageWrapper = styled.div`
  background-color: #fff;
  border: 2px solid #000;
  box-shadow: 10px 10px 0 0 #000;
  max-width: 50vw;
  padding: 20px;
  margin: 32px auto;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const ActionWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const Message = () => {
  return (
    <MessageWrapper>
      <BodyText>I'm happy because I just moved in to a new apartment!</BodyText>
      <ActionWrapper>
        <LikeButton />
        <CountText>30 sec ago</CountText>
      </ActionWrapper>
    </MessageWrapper>
  );
};
