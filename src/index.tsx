import React from "react";
import ReactDOM  from "react-dom";
import { ThemeProvider } from "styled-components";
import App from "./App";

// 모드 변경 기능 추가 시 변수명이 같아야 함

const darkTheme = {
  textColor: "whitesmoke",
  backgroundColor: "#111",
}

const lightTheme = {
  textColor: "#111",
  backgroundColor: "whitesmoke",
}

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={darkTheme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);