import { createGlobalStyle } from "styled-components"

export const vars = {
  'darkGray': '#333333',
  'gray': '#4F4F4F',
  'lightGray': '#828282',
  'veryLightGray': '#BDBDBD',
  'paleRed': '#EB5757',
  'desktopWidth': '1250px'
}

export const GlobalStyles = createGlobalStyle`
* {
  margin: 0;
  padding: 0;
  box-sizing: 0;
}

html {
  min-height: 100%;
}

body {
  height: 100%;
  font-family: 'Montserrat';
  display: flex;
  justify-content: center;
}
`