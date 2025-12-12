import styled from "styled-components";
import { BodyText } from "./styles/Typography";
import { LikeIcon } from "../icons/LikeIcon";
import { media } from "./styles/media";

const ButtonSubmit = styled.button`
  background-color: #ffa9ab;
  padding: 4px 16px;
  width: fit-content;
  height: 46px;
  border-radius: 24px;
  border: none;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: row;
  align-items: center;

  @media (${media.xs}) and (${media.xsm}) {
    max-width: 100%;
  }

  &:hover {
    background-color: #fc8486;
    cursor: pointer;
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

export const SubmitButton = () => {
  /*   const [textDef, addText] = useState{''}; */

  return (
    <ButtonSubmit type="submit">
      <LikeIcon /> <BodyText> Send happy thought</BodyText> <LikeIcon />
    </ButtonSubmit>
  );
};
