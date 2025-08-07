import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
  ${reset}

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Noto Sans KR', sans-serif;
  }

  li {
    list-style: none;
  }

  a {
    text-decoration: none;
  }

  button {
    cursor: pointer;
  }

  body {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #D8CDB9; 
    font-family: 'Noto Sans KR', sans-serif;
  }

  .app-container {
    display: flex;
    flex-direction: column;
    width: 100vw;
    height: 100vh;
    justify-content: center;
    align-items: center;
    background-color: #D8CDB9;
  }

  .damion {
  font-family: "Damion", cursive;
  font-weight: 400;
  font-style: normal;
}

  .noto-sans-kr {
  font-family: "Noto Sans KR", sans-serif;
  font-optical-sizing: auto;
  font-style: normal;
} 
`;

export default GlobalStyle;
