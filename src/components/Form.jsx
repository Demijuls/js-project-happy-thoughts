import { useState } from "react";
import styled from "styled-components";
import { BodyText } from "./styles/Typography";
import { SubmitButton } from "./SubmitButton";

const FormWrapper = styled.div`
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

export const Form = () => {
  return (
    <FormWrapper>
      <form action="">
        <input type="text" />
        <label htmlFor="">What's making you happy right now?</label>
        <SubmitButton />
      </form>
    </FormWrapper>
  );
};
