import React from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { Grid2, Typography, Box } from "@mui/material";

function Kanban() {
  const Item = styled(Paper)(() => ({
    backgroundColor: "#98d6a9",
    padding: 8,
    textAlign: "center",
    color: "black",
    marginBottom: "8px",
  }));

  const Column = styled(Paper)(({ bgColor }) => ({
    backgroundColor: bgColor,
    padding: "16px",
    minHeight: "300px",
  }));

  return (
    <>
      <Grid2 container spacing={4}>
        {/* TO DO COLUMN */}
        <Grid2 item xs={4}>
          <Column elevation={3} bgColor="#f8d7da">
            <Typography variant="h6" align="center" gutterBottom>
              To Do
            </Typography>
            <Item elevation={3}>Task 1</Item>
            <Item elevation={3}>Task 2</Item>
          </Column>
        </Grid2>

        {/*IN PROGRESS COLUMN */}
        <Grid2 item xs={4}>
          <Column elevation={3} bgColor="#d1ecf1">
            <Typography variant="h6" align="center" gutterBottom>
              In Progress
            </Typography>
            <Item elevation={3}>Task 3</Item>
            <Item elevation={3}>Task 4</Item>
          </Column>
        </Grid2>

        {/* READY COLUMN */}
        <Grid2 item xs={4}>
          <Column elevation={3} bgColor="#d4edda">
            <Typography variant="h6" align="center" gutterBottom>
              Ready
            </Typography>
            <Item elevation={3}>Task 5</Item>
            <Item elevation={3}>Task 6</Item>
          </Column>
        </Grid2>
      </Grid2>
    </>
  );
}

export default Kanban;
