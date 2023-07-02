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

# Chrome

## Adding context menu

```javascript
// background.ts

chrome.runtime.onInstalled.addListener(() => {
  // set default storage

  // create contextMenus only in the onInstalled listener
  chrome.contextMenus.create({
    contexts: ["selection"],
    id: "weather",
    title: "Get weather for %s",
  });
});
```

```javascript
chrome.contextMenus.onClicked.addListener(async (event) => {
  const cities = await getStoredCities();
  setStoredCities([...cities, event.selectionText]);
});
```

## Options page

Using the `name` attribute, we can simplify the state handling in a form. All we need to do is to match the value of the `name` attribute to be exactly the same as the state name.

```javascript
const App: React.FC<{}> = () => {
  // get options from storage
  const [options, setOptions] = useState < LocalStorageOptions > {};

  // on first page render, get stored options and set in state
  useEffect(() => {
    async function getStorage() {
      const options = await getStoredOptions();
      setOptions(options);
    }

    getStorage();
  }, []);

  // handle change of input on all inputs, using their `name` attribute
  const handleOptionsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setOptions((prevOptions) => ({ ...prevOptions, [name]: value }));
  };

  // save options to storage
  const handleSave = async () => {
    await setStoredOptions(options);
  };

  return (
    <div>
      <TextField
        variant="filled"
        value={options.homeCity || ""}
        placeholder="enter home city"
        // set name equal to state name exactly
        name="homeCity"
        onChange={handleOptionsChange}
      />
      <button onClick={handleSave}>save</button>
    </div>
  );
};
```

For code below, you must set the `name` attribute of the input to be exactly the same as the state name. If we have `homeCity` state, we should have an input with `"name"="homeCity"`. We then attach this event handler on all the form fields in our form.

```javascript
const handleOptionsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  const { name, value } = event.target;
  setOptions((prevOptions) => ({ ...prevOptions, [name]: value }));
};
```
