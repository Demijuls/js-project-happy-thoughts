import styled, { keyframes } from "styled-components";
import { useState, useEffect } from "react";
import { BodyText } from "./styles/Typography";
import { CountText } from "./styles/Typography";
import { LikeButton } from "./LikeButton";
import { EditButton } from "./EditButton";
import { DeleteButton } from "./DeleteButton";
import { media } from "./styles/media";
import { apiUrl } from "../api";

// ---- Styling ----
const slideIn = keyframes`
  0% {
    transform: translateY(-20px);
    opacity: 0;
  }

  100% {
    transform: translateY(0);
    opacity: 1;
  }
`;

const MessageWrapper = styled.div`
  background-color: #fff;
  border: 2px solid #7d7d7d;
  box-shadow: 10px 10px 0 0 #000;
  width: 60vw;
  min-width: 320px;
  max-width: 720px;
  padding: 20px;
  margin: 32px auto;
  display: flex;
  flex-direction: column;
  gap: 4px;

  //Slide in animation for new card with a message
  animation: ${(props) => (props.isNew ? slideIn : "none")} 0.6s ease-out;
`;

const EditWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 8px;
`;

const ActionWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

/* For editing state: */

const InputStyled = styled.textarea`
  display: flex;
  height: 60px;
  border-radius: 0px;
  border: 2px solid ${(props) => (props.$error ? "red" : "#c5c5c5")};
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

const SaveButton = styled.button`
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

const ErrorText = styled.div`
  font-size: 14px;
  color: red;
  font-weight: 500;
`;

// ---- / Styling ----

// ---- Time Stamp for message ----

const getTimeStamp = (timeStamp) => {
  const seconds = Math.floor((Date.now() - timeStamp) / 1000);
  if (seconds < 60) return `${seconds} sec ago`;

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} min ago`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hours${hours === 1 ? "" : "s"} ago`;

  const days = Math.floor(hours / 24);
  return `${days} day${days === 1 ? "" : "s"} ago`;
};

// ---- Edit a thought -----

/* const handleEdit = (id) => {
  fetch(apiUrl + `/thoughts/${id}`, {
    method: "PUT",
  }).then(() => {
    return setThought(thought.filter((thought) => (thought.id = id)));
  });
}; */

// ---- Add a thought ----

export const Message = ({
  id,
  message,
  addedAt,
  hearts,
  onLike,
  /*  onEdit, */
  onDelete,
  setMessage,
  isNew,
  authToken,
}) => {
  const [, setTick] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTick((x) => x + 1);
    }, 30 * 1000);

    return () => clearInterval(interval);
  }, []);

  //Editing existing thought
  const [isEditing, setIsEditing] = useState(false);
  const [newMessage, setNewMessage] = useState(message);
  const [error, setError] = useState("");

  const overCharacterCount = newMessage?.length > 140;

  const onEditedMessage = (e) => {
    setNewMessage(e.target.value);
    if (error) setError("");
  };

  const isAuthorized = Object.keys(authToken()).length > 0;

  //Saving edited thought
  const handleSave = ({ id }) => {
    /* console.log("saved"); */

    const extraCharacters = newMessage.length > 140;

    if (newMessage.trim() === "") {
      setError(
        "Looks like you deleted your thought instead of updating it. Please add another or use delete button instead",
      );
      return;
    }

    if (extraCharacters) {
      setError(
        "Ooops, you have so many characters to be happy about but we only have space for 140 of them!",
      );
      return;
    }

    if (newMessage.length < 5) {
      setError(
        "Please give us a bit more details, and use more at least 5 characters!",
      );
      return;
    }

    fetch(apiUrl + `/thoughts/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", ...authToken() },
      body: JSON.stringify({ message: newMessage }),
    })
      .then((res) => {
        if (!res.ok)
          throw new Error("Smth went wrong, couldn't save this message");
        return res.json();
      })
      .then(() => {
        setMessage(newMessage);
        setIsEditing(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Oops, couldn't save message, zanen!");
      });
  };

  return (
    <MessageWrapper isNew={isNew}>
      {isAuthorized && (
        <EditWrapper className="editActionsWrapper">
          <EditButton onClick={() => setIsEditing((isEditing) => !isEditing)} />
          <DeleteButton onClick={onDelete} />
        </EditWrapper>
      )}

      {isEditing ? (
        <>
          <InputStyled
            as="textarea"
            id="thoughtInput"
            name="thought"
            value={newMessage}
            onChange={onEditedMessage}
            $error={overCharacterCount}
          />
          <LetterCounter error={overCharacterCount}>
            Characters left:{Math.max(140 - newMessage.length, 0)} / 140
          </LetterCounter>
          {error && <ErrorText>{error}</ErrorText>}
          <SaveButton type="button" onClick={() => handleSave({ id })}>
            Save
          </SaveButton>
        </>
      ) : (
        <BodyText>{message}</BodyText>
      )}

      <ActionWrapper>
        <LikeButton count={hearts} onClick={onLike} />
        <CountText>{getTimeStamp(addedAt)}</CountText>
      </ActionWrapper>
    </MessageWrapper>
  );
};
