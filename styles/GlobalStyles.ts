import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    background-color: #f5f5f5;
  }

  h1 {
    font-size: 2rem;
    color: #333;
  }

  h2 {
    font-size: 1.5rem;
    color: #555;
  }
`;

export default GlobalStyle;
