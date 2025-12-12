import { useState, useEffect } from "react";
import GlobalStyles from "./components/styles/GlobalStyles";
import { Title } from "./components/styles/Typography";
import { Message } from "./components/Message";
import { Form } from "./components/Form";
import { LikeIcon } from "./icons/LikeIcon";

export const App = () => {
  const [messages, setMessages] = useState([]);

  /* useEffect(() => {
    const savedMsg = localStorage.getItem("newThoughts");
    if (savedMsg) {
      setMessages(JSON.parse(savedMsg));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("newThoughts", JSON.stringify(messages));
  }, [messages]);

  const postMessage = (messageObj) => {
    const newMessage = {
      id: Date.now(),
      text: messageObj.thought,
      addedAt: Date.now(),
    };

    setMessages((prev) => [newMessage, ...prev]);
  }; */

  useEffect(() => {
    fetch("https://happy-thoughts-api-4ful.onrender.com/thoughts")
      .then((response) => response.json())
      .then((data) => {
        const formatData = data.map((item) => ({
          id: item._id,
          text: item.message,
          hearts: item.hearts,
          addedAt: new Date(item.createdAt).getTime(),
        }));
        setMessages(formatData);
        /*  localStorage.setItem("newThoughts", JSON.stringify(data)); */
      });

    /* .catch((errors) => console.error("Fetch error:", errors)); */
  }, []);

  const postMessage = (newMessage) => {
    setMessages((prev) => [newMessage, ...prev]);
  };

  const addLike = (id) => {
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === id ? { ...msg, hearts: msg.hearts + 1 } : msg
      )
    );

    fetch(`https://happy-thoughts-api-4ful.onrender.com/thoughts/${id}/like`, {
      method: "POST",
    })
      .then((response) => response.json())
      .then((updatedMsg) => {
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === id ? { ...msg, hearts: updatedMsg.hearts } : msg
          )
        );
      });
  };

  return (
    <>
      <GlobalStyles />
      <Title padding="48px">
        <LikeIcon />
        Happy Thoughts
        <LikeIcon />
      </Title>
      <Form addThought={postMessage} />
      {messages.map((msg) => (
        <Message
          key={msg.id}
          text={msg.text}
          addedAt={msg.addedAt}
          hearts={msg.hearts}
          onLike={() => addLike(msg.id)}
        />
      ))}
    </>
  );
};
