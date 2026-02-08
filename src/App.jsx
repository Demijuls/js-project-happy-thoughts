import { useState, useEffect } from "react";
import styled from "styled-components";
import GlobalStyles from "./components/styles/GlobalStyles";
import { Title } from "./components/styles/Typography";
import { Message } from "./components/Message";
import { Form } from "./components/Form";
import { LikeIcon } from "./icons/LikeIcon";
import { media } from "./components/styles/media";
import Lottie from "lottie-react";
import AnimationLoading from "./assets/animationData.json";
import { apiUrl } from "./api";
import { AuthorisationPage } from "./components/AuthorisationPage";

const LogoutButton = styled.button`
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
  justify-self: flex-end;

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

export const App = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  const authToken = () => (user ? { Authorization: user.accessToken } : {});

  const handleAuthSuccess = (data) => {
    localStorage.setItem("user", JSON.stringify(data));
    setUser(data);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  useEffect(() => {
    setLoading(true);

    fetch(apiUrl + "/thoughts")
      .then((response) => response.json())
      .then((data) => {
        const formatData = data.map((item) => ({
          id: item._id,
          message: item.message,
          hearts: item.hearts,
          addedAt: new Date(item.createdAt).getTime(),
        }));
        setMessages(formatData);
      })
      .finally(() => setLoading(false));
  }, []);

  const postMessage = (newMessage) => {
    setMessages((prev) => [
      { ...newMessage, isNew: true },
      ...prev.map((msg) => ({ ...msg, isNew: false })),
    ]);
  };

  const addLike = (id) => {
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === id ? { ...msg, hearts: msg.hearts + 1 } : msg,
      ),
    );

    fetch(apiUrl + `/thoughts/${id}/like`, {
      method: "POST",
    })
      .then((response) => response.json())
      .then((updatedMsg) => {
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === id ? { ...msg, hearts: updatedMsg.hearts } : msg,
          ),
        );
      });
  };

  const handleDelete = (id) => {
    fetch(apiUrl + `/thoughts/${id}`, {
      method: "DELETE",
      headers: {
        ...authToken(user),
      },
    })
      .then(() => {
        return setMessages(messages.filter((msg) => msg.id !== id));
      })
      .catch((error) => {
        console.log(error);
        alert(
          error,
          "Oh no, something didn't work and the thought wasn't deleted or never existed in the first place",
        );
      });
  };

  /*   const [testState, setTestState] = useState({});

  useEffect(() => {
    fetch(apiUrl + "/thoughts")
      .then((response) => response.json())
      .then((data) => {
        setTestState(data);
      });
  }, []); */

  /* console.log(import.meta.env.VITE_API_URL); */

  const updateMessageText = (id, newMessage) => {
    setMessages((prevMessages) =>
      prevMessages.map((msg) =>
        msg.id === id ? { ...msg, message: newMessage } : msg,
      ),
    );
  };

  return (
    <>
      <GlobalStyles />{" "}
      <Title padding="48px">
        <LikeIcon />
        Happy Thoughts
        <LikeIcon />
      </Title>{" "}
      {!user ? (
        <AuthorisationPage onAuthSuccess={handleAuthSuccess} />
      ) : (
        <>
          <LogoutButton onClick={handleLogout}>Log out</LogoutButton>
        </>
      )}
      {user && <Form addThought={postMessage} authToken={authToken} />}
      {loading ? (
        <Lottie
          animationData={AnimationLoading}
          loop={true}
          style={{ height: 200, width: 200, margin: "0 auto" }}
        />
      ) : (
        messages.map((msg) => (
          <Message
            key={`${msg.id}-${msg.isNew ? "new" : "old"}`}
            id={msg.id}
            message={msg.message}
            addedAt={msg.addedAt}
            hearts={msg.hearts}
            onLike={() => addLike(msg.id)}
            onDelete={() => handleDelete(msg.id)}
            isNew={msg.isNew}
            setMessage={(newMessage) => updateMessageText(msg.id, newMessage)}
            authToken={authToken}
          />
        ))
      )}
    </>
  );
};
