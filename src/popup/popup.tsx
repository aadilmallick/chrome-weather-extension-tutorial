import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "./popup.css";
import { fetchData } from "../utils/api";
import { WeatherCard } from "./WeatherCard";
import CityInput from "./CityInput";
import {
  setStoredCities,
  getStoredCities,
  setStoredOptions,
  getStoredOptions,
} from "../utils/storage";
import { Switch } from "@mui/material";
import { MessageTypes, sendMessageToContentScript } from "../utils/messages";

const label = { inputProps: { "aria-label": "Temperature Scale" } };

/* TODO: explain form state 
  have a form state, like ready or waiting, a string state, and show a loading spinner. 
  To create the illusion of laoding, have a setTimeout to reduce. 

  Things to do during loading state: 
  - disable the input
  - show a loading spinner
  - show a message that says "loading"
*/

const App: React.FC<{}> = () => {
  const [cities, setCities] = useState<string[]>([]);
  const [checked, setChecked] = React.useState(false);
  // homeCity state
  const [homeCity, setHomeCity] = useState<string>("");
  const [showCard, setShowCard] = useState<boolean>(false);
  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(event.target.checked);
    // console.log("hello");
    setChecked(event.target.checked);
    await setStoredOptions({
      homeCity: homeCity,
      units: event.target.checked ? "metric" : "imperial",
    });
  };

  // when the page loads, get stored cities and set them to state
  useEffect(() => {
    async function getStoredData() {
      const storedCities = await getStoredCities();
      const storedOptions = await getStoredOptions();
      setCities(storedCities);
      setChecked(storedOptions.units === "metric");
      setHomeCity(storedOptions.homeCity);
      setShowCard(storedOptions.showCard);
    }

    getStoredData();
  }, []);

  // after adding, update storage
  const addCity = async (city: string) => {
    if (city === "") return;
    setCities((prev) => [...prev, city]);
    await setStoredCities([...cities, city]);
  };

  // after deleting, update storage
  const deleteCity = async (city: string) => {
    setCities((prev) => prev.filter((c) => c !== city));
    await setStoredCities(cities.filter((c) => c !== city));
  };

  const onToggleCard = async () => {
    setShowCard((prev) => !prev);
    const storedOptions = await getStoredOptions();
    await setStoredOptions({
      ...storedOptions,
      showCard: !showCard,
    });
    // await sendMessageToContentScript("TOGGLE_OVERLAY", (response) => {
    //   console.log("response in popup", response);
    // });
    await sendMessageToContentScript("TOGGLE_OVERLAY");
  };
  return (
    <div style={{ marginRight: "1rem", marginLeft: "1rem" }}>
      <div className="input-container">
        <CityInput onAdd={addCity} />
        <div className="switch-container">
          <Switch {...label} checked={checked} onChange={handleChange} />
          <label>°C</label>
        </div>
      </div>
      <button onClick={onToggleCard}>
        {showCard ? "hide card" : "Show card"}
      </button>
      {cities.length === 0 && homeCity !== "" && (
        <WeatherCard
          city={homeCity}
          key={homeCity}
          onDelete={deleteCity}
          isCelcius={checked}
        ></WeatherCard>
      )}
      {cities?.map((city) => (
        <WeatherCard
          city={city}
          key={city}
          onDelete={deleteCity}
          isCelcius={checked}
        ></WeatherCard>
      ))}
    </div>
  );
};

const container = document.createElement("div");
document.body.appendChild(container);
const root = createRoot(container);
root.render(<App />);
