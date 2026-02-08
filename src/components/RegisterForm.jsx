import styled from "styled-components";
import { useState } from "react";

import { H2 } from "./styles/Typography";

import { apiUrl } from "../api";
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

const ErrorText = styled.div`
  color: red;
  font-size: 14px;
  font-weight: 500;
`;
const RegisterButton = styled.button`
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

// --- / Styling ---

// --- Registration form ---
export const RegisterForm = ({ onRegisterSuccess }) => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const handleRegisterChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (error) setError(""); //empty error while user is typing
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) {
      setError("Please fill in all fields");
      return;
    }
    try {
      const res = await fetch(apiUrl + "/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok)
        throw new Error(
          data.message || "Registration failed, please try again",
        );

      localStorage.setItem("accessToken", data.accessToken);
      onRegisterSuccess(data);
    } catch (err) {
      setError(err.message);
    }
  };
  return (
    <FormStyled onSubmit={handleSubmit}>
      <H2>Register if you want to add your thoughts</H2>
      <InputStyled
        type="text"
        name="name"
        placeholder="Your username"
        value={form.name}
        onChange={handleRegisterChange}
      />
      <InputStyled
        type="email"
        name="email"
        placeholder="Your email"
        value={form.email}
        onChange={handleRegisterChange}
      />
      <InputStyled
        type="password"
        name="password"
        placeholder="Create a password between 8-32 signs"
        value={form.password}
        onChange={handleRegisterChange}
      />
      {error && <ErrorText>{error}</ErrorText>}
      <RegisterButton>Register user</RegisterButton>
    </FormStyled>
  );
};
