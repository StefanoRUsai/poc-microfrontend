import React from "react";
import ReactDOM from "react-dom/client";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { BrowserRouter } from 'react-router-dom';

import App from "./App";

const theme = createTheme({});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>

    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
    </BrowserRouter>

  </React.StrictMode>
);
