import GlobalStyles from "./components/styles/GlobalStyles";
import { Title } from "./components/styles/Typography";
import { Message } from "./components/Message";
import { Form } from "./components/Form";

export const App = () => {
  return (
    <>
      <GlobalStyles />
      <Title padding="48px">❤️ Happy Thoughts ❤️</Title>
      <form>
        Hello this is form <input type="text" /> <button>Send</button>
      </form>
      <Form />
      <Message />
    </>
  );
};
