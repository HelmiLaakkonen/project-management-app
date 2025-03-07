import * as React from "react";
import { Box, Typography, Link, Grid } from "@mui/material";

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        width: "100%",
        backgroundColor: "#f8bbd0", // Pastel pink background
        color: "#3d3d3d", // Darker gray for readability
        padding: "20px",
        mt: "auto",
      }}
    >
      <Grid
        container
        spacing={3}
        justifyContent="space-between"
        alignItems="center"
      >
        {/* Project Information */}
        <Grid
          item
          xs={12}
          md={4}
          sx={{ textAlign: "left", paddingLeft: "20px" }}
        >
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Project Management App
          </Typography>
          <Typography variant="body2">
            Developed by Helmi Laakkonen, Pinja Kemppainen & Teemu Räisänen.
          </Typography>
        </Grid>

        {/* Links Section */}
        <Grid item xs={12} md={4} sx={{ textAlign: "center" }}>
          <Typography variant="body1">
            <Link
              href="https://github.com/your-repository"
              color="inherit"
              target="_blank"
              rel="noopener"
              sx={{
                textDecoration: "none",
                fontWeight: "bold",
                "&:hover": { color: "#d81b60" }, // Slightly darker pink on hover
              }}
            >
              GitHub Repository
            </Link>
          </Typography>
        </Grid>

        {/* Copyright Information */}
        <Grid
          item
          xs={12}
          md={4}
          sx={{ textAlign: "right", paddingRight: "20px" }}
        >
          <Typography variant="body2">© 2025 All rights reserved.</Typography>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Footer;
