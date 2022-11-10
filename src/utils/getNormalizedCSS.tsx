import { createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';

const GlobalStyle = createGlobalStyle`
  ${normalize};

  * {
    --sidebar-width: 256px;
    --search-height: 82px;
    --primary-dark-color: rgb(17, 24, 39);
    --primary-grey-color: #374151;
    --primary-blue-color: rgb(36, 99, 235);
    --primary-green-color: #27A376;
    --primary-green-hover-color: rgba(39, 163, 118, 0.8);
    --primary-green-background-color: rgba(39, 163, 118, 0.1);

    box-sizing: border-box;
    font-family: sans-serif;
    color: var(--primary-dark-color);

    ::after, ::before {
      box-sizing: border-box;
    }

    :focus {
      outline: none;
    }
  }

  body {
    margin: 0;
    max-height: 100vh;
    height: 100%;
    font-size: 16px;
    background-color: #F1EFE9;
  }

  img {
    width: 100%;
    height: auto;
    user-select: none;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }

  svg, input, label, a {
    user-select: none;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }

  p, span, h1, h2, h3, h4, h5, h6 {
    margin: 0;
  }

  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  button {
    cursor: pointer;
  }

  a {
    text-decoration: none;
  }
`;

export default GlobalStyle;
