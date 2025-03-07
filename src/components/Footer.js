import * as React from "react";
import { Box, Typography } from "@mui/material";

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        width: "100%",
        position: "static",
        bottom: 0,
        left: 0,
        backgroundColor: "#f8bbd0", // Pastel pink
        color: "white",
        display: "flex",
        justifyContent: "center",
        textAlign: "center",
        padding: "10px 0",
      }}
    >
      <Typography variant="body1">
        © 2025 Project Management App. Helmi Laakkonen, Pinja Kemppainen & Teemu
        Räisänen. All rights reserved.
      </Typography>
    </Box>
  );
}

export default Footer;
