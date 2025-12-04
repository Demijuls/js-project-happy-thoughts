import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  scroll-behavior: smooth;
  background-color: #fff;
  display: flex;
  justify-content: center;
}
  

@media (prefers-reduced-motion: reduce) {
  animation: none !important;
  transition: none !important;
  transform: none !important;
}
`;

export default GlobalStyles;
