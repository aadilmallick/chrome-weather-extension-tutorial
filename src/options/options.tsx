import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "./options.scss";
import { TextField } from "@mui/material";
import {
  LocalStorageOptions,
  getStoredOptions,
  setStoredOptions,
} from "../utils/storage";

const App: React.FC<{}> = () => {
  const [options, setOptions] = useState<LocalStorageOptions>({});

  useEffect(() => {
    async function getStorage() {
      const options = await getStoredOptions();
      setOptions(options);
    }

    getStorage();
  }, []);

  const handleOptionsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    console.log(value);
    setOptions((prevOptions) => ({ ...prevOptions, [name]: value }));
  };

  const handleSave = async () => {
    await setStoredOptions(options);
  };

  return (
    <div>
      <TextField
        variant="filled"
        value={options.homeCity || ""}
        placeholder="enter home city"
        // set name equal to state exactly
        name="homeCity"
        onChange={handleOptionsChange}
      />
      <button onClick={handleSave}>save</button>
    </div>
  );
};

const container = document.createElement("div");
document.body.appendChild(container);
const root = createRoot(container);
root.render(<App />);
