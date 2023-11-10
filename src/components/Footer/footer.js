import React from "react";
import { Box } from "@mui/material";

const Footer = () => {
  return (
    <Box
      sx={{
        py: 2,
        px: 3,
        bgcolor: "#203059",
        color: "white",
        position: "static",
        bottom: 0,
        left: 0,
        width: "100%",
        textAlign: "center",
      }}
    >
      &copy; 2023 The Bradery
    </Box>
  );
};

export default Footer;
