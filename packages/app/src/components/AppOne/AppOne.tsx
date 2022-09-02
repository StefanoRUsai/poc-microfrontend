import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { Navigate, useNavigate } from "react-router-dom";

const theme = createTheme();

export default function AppOne(props: any) {
  let navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      product: data.get("product"),
      price: data.get("price"),
    });

    props.emitter.emit("payment", {
      product: data.get("product"),
      price: data.get("price"),
    });
    navigate("/home", { replace: true });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            name="product"
            label="product"
            type="product"
            id="product"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="price"
            label="price"
            type="text"
            id="price"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            PAGA
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
