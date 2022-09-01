import React from "react";
import ReactDOM from "react-dom/client";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import App from "./App";
import { BrowserRouter } from 'react-router-dom';
const theme = createTheme({});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
        <ThemeProvider theme={theme}>
    <BrowserRouter >
      <App />
      </BrowserRouter>
      </ThemeProvider>
  </React.StrictMode>
);
