import styled from "styled-components";
import { useState } from "react";
import { BodyText } from "./styles/Typography";

const ButtonSubmit = styled.button`
  background-color: #ffa9ab;
  padding: 4px 16px;
  width: fit-content;
  height: 46px;
  border-radius: 24px;
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

export const SubmitButton = () => {
  return (
    <ButtonSubmit type="submit">
      <BodyText>❤️ Send happy thought ❤️</BodyText>
    </ButtonSubmit>
  );
};
