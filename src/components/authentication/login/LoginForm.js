import React from "react";
import { TextField, Button, Box, Typography, Link } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../../store/slices/userSlice";
import { useNavigate } from "react-router-dom";

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
    <Box
      sx={{
        maxWidth: "400px",
        display: "flex",
        flexDirection: "column",
        margin: "auto",
        "& .MuiTextField-root": { margin: "10px 0" },
        paddingTop: "100px",
        paddingBottom: "227px",
      }}
    >
      <Typography variant="h4" sx={{ textAlign: "center", mb: 4 }}></Typography>
      <img
        src="tbd-icon-logo.png"
        alt="Your Logo"
        style={{ maxHeight: "80px", margin: "auto" }}
      />
      <TextField
        required
        id="email-input"
        label="Email"
        type="email"
        autoComplete="current-email"
        variant="outlined"
        value={email || ""}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        required
        id="password-input"
        label="Password"
        type="password"
        autoComplete="current-password"
        variant="outlined"
        value={password || ""}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Typography
        variant="body1"
        sx={{ mt: 2, textAlign: "center", color: "red" }}
      >
        {message}
      </Typography>
      <Button
        variant="contained"
        color="primary"
        sx={{ mt: 2 }}
        onClick={handleLoginClick}
      >
        Me Connecter
      </Button>
      <Typography variant="body1" sx={{ mt: 2, textAlign: "center" }}>
        Pas de compte?{" "}
        <Link href="#" underline="hover">
          Créer mon compte
        </Link>
      </Typography>
    </Box>
  );
};

export default LoginForm;
