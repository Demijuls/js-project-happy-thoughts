import styled from "styled-components";
import { useState } from "react";

import { apiUrl } from "../api";

import { H2 } from "./styles/Typography";
import { media } from "./styles/media";

// ---- Styling ----

const FormStyled = styled.form`
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-width: 400px;
  align-items: center;
  margin: 0 auto;
  padding: 24px;
  border: 2px solid #7d7d7d;
  box-shadow: 8px 8px 0 #000;
  background-color: #f2f0f0;
`;

const InputStyled = styled.input`
  padding: 10px;
  font-size: 16px;
  width: 100%;
  border: 2px solid #c5c5c5;
  &:focus-visible {
    outline: 3px solid rgb(69, 143, 255);
  }
`;

const ErrorText = `
  color: red;
  font-size: 14px;
 `;

const LoginButton = styled.button`
  background-color: #a9adff;
  padding: 4px 16px;
  width: fit-content;
  height: 32px;
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

// ---- / Styling ----

// ---- Login form ----

export const LoginForm = ({ onLoginSuccess }) => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleLoginChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      setError("Email and password required!");
      return;
    }
    try {
      const res = await fetch(apiUrl + "/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok)
        throw new Error(data.message || "Login failed, please try again");
      localStorage.setItem("accessToken", data.accessToken);
      onLoginSuccess(data); //storing user info
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <FormStyled onSubmit={handleSubmit}>
      <H2>Log in to your account</H2>
      <InputStyled
        type="email"
        name="email"
        placeholder="Enter your email"
        value={form.email}
        onChange={handleLoginChange}
      />
      <InputStyled
        type="password"
        name="password"
        placeholder="Enter your password"
        value={form.password}
        onChange={handleLoginChange}
      />
      {error && <ErrorText>{error}</ErrorText>}
      <LoginButton>Log in</LoginButton>
    </FormStyled>
  );
};
