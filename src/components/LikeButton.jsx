import styled from "styled-components";
import { CountText } from "./styles/Typography";
import { LikeIcon } from "../icons/LikeIcon";

const ButtonLike = styled.button`
  background-color: #eaeaea;
  padding: 4px;
  width: 48px;
  height: 48px;
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

export const LikeButton = ({ count, onClick }) => {
  /*   const [count, setCount] = useState(0);

  const handleOnClick = () => {
    setCount((count) => count + 1);
  }; */

  return (
    <CountWrapper>
      <ButtonLike type="button" onClick={onClick}>
        <LikeIcon />
      </ButtonLike>
      <CountText color="#888888">x {count}</CountText>
    </CountWrapper>
  );
};
