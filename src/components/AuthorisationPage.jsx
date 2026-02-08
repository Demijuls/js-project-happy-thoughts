import { LoginForm } from "./LoginForm";
import { RegisterForm } from "./RegisterForm";
import styled from "styled-components";

import { useState } from "react";

const AuthForm = styled.div`
  max-width: 450px;
  margin: 0 auto;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const LoginButton = styled.button`
  margin-top: 12px;
  background: transparent;
  border: none;
  color: #3618cd;
  text-decoration: underline;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    color: #f84f51;
  }

  &:focus-visible {
    outline: 3px solid #3618cd;
    outline-offset: 2px;
  }
`;

export const AuthorisationPage = ({ onAuthSuccess }) => {
  const [showRegister, setShowRegister] = useState(true);

  return (
    <AuthForm>
      {showRegister ? (
        <RegisterForm onRegisterSuccess={onAuthSuccess} />
      ) : (
        <LoginForm onLoginSuccess={onAuthSuccess} />
      )}
      <LoginButton onClick={() => setShowRegister(!showRegister)}>
        {showRegister
          ? "Already have an account? Log in here"
          : "Create new account"}
      </LoginButton>
    </AuthForm>
  );
};
