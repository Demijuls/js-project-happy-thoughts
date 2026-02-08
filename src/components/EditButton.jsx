import styled from "styled-components";
import { EditIcon } from "../icons/EditIcon";

const ButtonEdit = styled.button`
  background-color: #eaeaea;
  padding: 4px;
  width: 32px;
  height: 32px;
  border-radius: 25px;
  border: none;

  &:hover {
    background-color: #5cb0ff;
  }

  /* Pressed button */
  &:active {
    background-color: #0077e7;
  }

  /* Keyboard focus */
  &:focus-visible {
    outline: 3px solid #3618cd;
    outline-offset: 3px;
  }
`;

export const EditButton = ({ onClick }) => {
  return (
    <ButtonEdit type="button" onClick={onClick}>
      <EditIcon />
    </ButtonEdit>
  );
};
