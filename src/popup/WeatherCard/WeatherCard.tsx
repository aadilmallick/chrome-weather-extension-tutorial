import React, { useEffect, useState } from "react";
import { WeatherData, fetchData } from "../../utils/api";
import {
  CardContent,
  Box,
  Card,
  Typography,
  CircularProgress,
  CardActions,
  Button,
} from "@mui/material";

export const WeatherCard = ({
  city,
  onDelete,
  isCelcius = false,
}: {
  city: string;
  onDelete: (city: string) => void;
  isCelcius?: boolean;
}) => {
  const [data, setData] = useState<WeatherData>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);
  console.log(city);
  useEffect(() => {
    async function fetchWeatherData() {
      setLoading(true);
      try {
        const wdata = await fetchData(city);
        setData(wdata);
        console.log(wdata);
      } catch (e) {
        return e;
      }
    }

    fetchWeatherData()
      .then(() => setLoading(false))
      .catch((err) => {
        setError("something went wrong");
        setLoading(false);
        setData(null);
      });
  }, [isCelcius, city]);

  if (loading || !data) return <CircularProgress />;

  return (
    <Card sx={{ marginY: "1rem" }}>
      <CardContent>
        <Typography variant="h5">{city}</Typography>
        <Typography variant="body2">
          {data && `Feels like ${data?.main?.feels_like}`}
          {error}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          variant="outlined"
          color="error"
          onClick={() => onDelete(city)}
        >
          delete
        </Button>
      </CardActions>
    </Card>
  );
};
