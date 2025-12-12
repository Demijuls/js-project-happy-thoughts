import { useState } from "react";
import styled from "styled-components";
import { SubmitButton } from "./SubmitButton";
import { media } from "./styles/media";

const FormStyled = styled.form`
  background-color: #f2f0f0;
  border: 2px solid #7d7d7d;
  box-shadow: 10px 10px 0 0 #000;
  width: 60vw;
  min-width: 320px;
  max-width: 720px;
  padding: 20px;
  margin: 32px auto;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const LabelStyled = styled.label`
  font-size: 18px;
  font-weight: 400;
`;

const InputStyled = styled.textarea`
  display: flex;
  height: 60px;
  border-radius: 0px;
  border: 2px solid ${(props) => (props.error ? "red" : "#c5c5c5")};
  font-size: 18px;
  font-family: "Roboto+Mono", monospace, sans-serif;
  resize: none;
  padding: 12px;

  &:focus-visible {
    outline: 3px solid rgb(69, 143, 255);
    outline-offset: -1px;
  }
`;

const LetterCounter = styled.div`
  font-size: 14px;
  color: ${(props) => (props.error ? "red" : "#7D7D7D")};
`;

const ErrorText = styled.div`
  font-size: 14px;
  color: red;
  font-weight: 500;
`;

export const Form = ({ addThought }) => {
  const [message, setMessage] = useState({ thought: "" });
  /*  const [posted, setPosted] = useState([]); */
  const [error, setError] = useState("");

  const maxCharachters = 140;
  const charactersUsed = message.thought.length;
  const extraCharacters = charactersUsed > maxCharachters;

  const handleInputChange = (event) => {
    const name = event.target.name;
    const val = event.target.value;

    setMessage((prev) => ({
      ...prev,
      [name]: val,
    }));

    if (error) setError(""); //empty error while user is typing
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!message.thought.trim()) {
      setError("Add your happy thought before submitting!");
      return;
    }

    if (extraCharacters) {
      setError(
        "Ooops, you have so many characters to be happy about but we only have space for 140 of them!"
      );
      return;
    }

    if (message.thought.length < 5) {
      setError(
        "Please give us a bit more details, and use more at least 5 characters!"
      );
      return;
    }

    fetch("https://happy-thoughts-api-4ful.onrender.com/thoughts", {
      method: "POST",
      body: JSON.stringify({ message: message.thought }),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((newThought) => {
        addThought({
          id: newThought._id,
          text: newThought.message,
          addedAt: new Date(newThought.createdAt).getTime(),
        });
      });

    setMessage({ thought: "" });
  };

  return (
    <FormStyled onSubmit={handleSubmit}>
      <LabelStyled htmlFor="thoughtInput">
        What's making you happy right now?
      </LabelStyled>
      <InputStyled
        as="textarea"
        id="thoughtInput"
        name="thought"
        placeholder="What makes you happy today?"
        value={message.thought}
        onChange={handleInputChange}
        error={extraCharacters}
      />
      <LetterCounter error={extraCharacters}>
        Characters left:{Math.max(maxCharachters - charactersUsed, 0)} /{" "}
        {maxCharachters}
      </LetterCounter>
      {error && <ErrorText>{error}</ErrorText>}

      <SubmitButton />
    </FormStyled>
  );
};
