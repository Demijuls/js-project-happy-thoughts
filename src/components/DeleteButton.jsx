import styled from "styled-components";
import { DeleteIcon } from "../icons/DeleteIcon";

const ButtonDelete = styled.button`
  background-color: #eaeaea;
  padding: 4px;
  width: 32px;
  height: 32px;
  border-radius: 25px;
  border: none;

  &:hover {
    background-color: #ff4f27;
  }

  /* Pressed button */
  &:active {
    background-color: #b71301;
  }

  /* Keyboard focus */
  &:focus-visible {
    outline: 3px solid #3618cd;
    outline-offset: 3px;
  }
`;

export const DeleteButton = ({ onClick }) => {
  return (
    <ButtonDelete type="button" onClick={onClick}>
      <DeleteIcon />
    </ButtonDelete>
  );
};
