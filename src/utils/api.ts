import ENV from "./config";
import { LocalStorageOptions, getStoredOptions } from "./storage";
const url = `https://api.openweathermap.org/data/2.5/weather`;

// TODO: add options switch
export async function fetchData(city: string): Promise<WeatherData> {
  const options = await getStoredOptions();
  console.log(options);
  let optionsString = `&units=${options.units}`;

  try {
    const response = await fetch(
      `${url}?q=${city}&appid=${ENV.API_KEY}${optionsString}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

export interface WeatherData {
  coord: {
    lon: number;
    lat: number;
  };
  weather: Weather[];
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
  };
  rain: {
    "1h": number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}
