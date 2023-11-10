import React from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../../store/slices/userSlice";
import { useNavigate } from "react-router-dom";
import { Grid } from "@mui/material";
import Item from "@mui/material/Grid";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const [message, setMessage] = useState("");

  const handleLoginClick = async () => {
    dispatch(login({ email, password }))
      .then(() => {
        Navigate("/Products");
      })
      .catch((error) => {
        const Message = error.response.data.error;
        if (Message === "Wrong email") {
          setMessage("Wrong email");
        } else if (Message === "Wrong password") {
          setMessage("Wrong password");
        }
      });
  };
  return (
    <Box>
      <Grid container justify="center" paddingBottom={"100px"} spacing={2}>
        <Grid item xs={12} md={12} lg={12}>
          <Item>
            <Typography variant="h4" sx={{ textAlign: "center", mb: 4 }} />
            <img
              src="tbd-icon-logo.png"
              alt="Your Logo"
              style={{ maxHeight: "80px", margin: "auto", display: "block" }}
            />
          </Item>
        </Grid>
        <Grid item xs={1} md={2} lg={4} />
        <Grid item xs={10} md={8} lg={4}>
          <Item>
            <TextField
              required
              id="email-input"
              label="Email"
              type="email"
              autoComplete="current-email"
              variant="outlined"
              fullWidth
              value={email || ""}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Item>
        </Grid>
        <Grid item xs={1} md={2} lg={4} />

        <Grid item xs={1} md={2} lg={4} />
        <Grid item xs={10} md={8} lg={4}>
          <Item>
            <TextField
              required
              id="password-input"
              label="Password"
              type="password"
              autoComplete="current-password"
              variant="outlined"
              fullWidth
              value={password || ""}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Item>
        </Grid>
        <Grid item xs={1} md={2} lg={4} />

        <Grid item xs={12}>
          <Typography
            variant="body1"
            sx={{ mt: 2, textAlign: "center", color: "red" }}
          >
            {message}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            sx={{
              mt: 2,
              display: "block",
              marginLeft: "auto",
              marginRight: "auto",
            }}
            onClick={handleLoginClick}
          >
            Me Connecter
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default LoginForm;
