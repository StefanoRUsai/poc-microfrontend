import { Box } from "@mui/material";
import React, { Component } from "react";
import { Routes, Route } from "react-router-dom";
import { createNanoEvents } from "nanoevents";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";

const HomePage = React.lazy(() => import("homepage/HomePage"));
const NavBar = React.lazy(() => import("navbar/NavBar"));
const Login = React.lazy(() => import("login/Login"));
const AppOne = React.lazy(() => import("appone/AppOne"));

const Vue = React.lazy(() => import("./components/Vue"));

interface Events {
  set: (name: string, count: number) => void;
  token: () => void;
  payment: (product: string, price: number) => void;
}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const version = process.env.BUILD_DATE;

const emitter = createNanoEvents();

function App() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [data, setData] = React.useState();

  emitter.on("payment", (data) => {
    setData(data);
    setOpen(true);
  });

  const render = (Element) => {
    return (
      <React.Suspense fallback="Loading...">
        <Element emitter={emitter} />
      </React.Suspense>
    );
  };

  return (
    <>
      <React.Suspense fallback="Loading...">
        <NavBar emitter={emitter} />
      </React.Suspense>
      <Box>
        <Routes>
          <Route
            path="/"
            element={
              <React.Suspense fallback="Loading...">
                <Login emitter={emitter} />
              </React.Suspense>
            }
          />
          <Route
            path="/home"
            exact
            element={
              <React.Suspense fallback="Loading...">
                <HomePage emitter={emitter} />
              </React.Suspense>
            }
          />
          <Route
            path="/appone"
            exact
            element={
              <React.Suspense fallback="Loading...">
                <AppOne emitter={emitter} />
              </React.Suspense>
            }
          />
          <Route
            path="/vue"
            exact
            element={
              <React.Suspense fallback="Loading...">
                <Vue emitter={emitter} />
              </React.Suspense>
            }
          />
        </Routes>
      </Box>

      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style}>
          <Typography id="keep-mounted-modal-description" sx={{ mt: 2 }}>
            product: {data?.product}
          </Typography>
          <Typography id="keep-mounted-modal-description" sx={{ mt: 2 }}>
            price: {data?.price}
          </Typography>
        </Box>
      </Modal>
    </>
  );
}

export default React.memo(App);
