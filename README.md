# Material UI

## Input with Icon

Essentially, you're using a `<Paper>` component as a flex wrapper, with justify-between. The `<InputBase>` component is the input, and the `<IconButton>` is the icon. They are both the children of the `<Paper>` component.

```javascript
import React, { useState } from "react";
import { InputBase, Paper, IconButton } from "@mui/material";
import { Add } from "@mui/icons-material";

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
```
