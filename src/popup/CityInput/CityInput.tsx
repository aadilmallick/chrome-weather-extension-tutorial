import React, { useState } from "react";
import {
  CardContent,
  Box,
  Card,
  Typography,
  CircularProgress,
  InputBase,
  Paper,
  IconButton,
} from "@mui/material";
import { AccessAlarm, ThreeDRotation, Add } from "@mui/icons-material";

interface CityInputProps {
  onAdd: (city: string) => void;
}

export const CityInput = ({ onAdd }: CityInputProps) => {
  const [inputValue, setInputValue] = useState("");
  return (
    <Paper
      sx={{
        display: "flex",
        justifyContent: "space-between",
        border: "Background",
      }}
    >
      <InputBase
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="add a city"
        sx={{ padding: "0.5rem" }}
      />
      <IconButton
        onClick={() => {
          onAdd(inputValue);
          setInputValue("");
        }}
      >
        <Add />
      </IconButton>
    </Paper>
  );
};
