import { useState, useEffect } from "react";
import GlobalStyles from "./components/styles/GlobalStyles";
import { Title } from "./components/styles/Typography";
import { Message } from "./components/Message";
import { Form } from "./components/Form";
import { LikeIcon } from "./icons/LikeIcon";
import Lottie from "lottie-react";
import AnimationLoading from "./assets/animationData.json";

export const App = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

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
            text={msg.text}
            addedAt={msg.addedAt}
            hearts={msg.hearts}
            onLike={() => addLike(msg.id)}
            isNew={msg.isNew}
          />
        ))
      )}
    </>
  );
};
