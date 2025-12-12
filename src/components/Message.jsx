import styled from "styled-components";
import { useState, useEffect } from "react";
import { BodyText } from "./styles/Typography";
import { CountText } from "./styles/Typography";
import { LikeButton } from "./LikeButton";
import { media } from "./styles/media";

const MessageWrapper = styled.div`
  background-color: #fff;
  border: 2px solid #7d7d7d;
  box-shadow: 10px 10px 0 0 #000;
  width: 60vw;
  min-width: 320px;
  max-width: 720px;
  padding: 20px;
  margin: 32px auto;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const ActionWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const getTimeStamp = (timeStamp) => {
  const seconds = Math.floor((Date.now() - timeStamp) / 1000);
  if (seconds < 60) return `${seconds} sec ago`;

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} min ago`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hours${hours === 1 ? "" : "s"} ago`;

  const days = Math.floor(hours / 24);
  return `${days} day${days === 1 ? "" : "s"} ago`;
};

export const Message = ({ text, addedAt, hearts, onLike }) => {
  const [, setTick] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTick((x) => x + 1);
    }, 30 * 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <MessageWrapper>
      <BodyText>{text}</BodyText>
      <ActionWrapper>
        <LikeButton count={hearts} onClick={onLike} />
        <CountText>{getTimeStamp(addedAt)}</CountText>
      </ActionWrapper>
    </MessageWrapper>
  );
};
