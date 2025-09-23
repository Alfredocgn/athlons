import * as Location from "expo-location";
import { useEffect, useState } from "react";

export interface WeatherData {
  temperature: number;
  description: string;
  icon: string;
  humidity?: number;
  windSpeed?: number;
}

export interface WeatherError {
  message: string;
  code?: string;
}

export const useWeather = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<WeatherError | null>(null);

  const getWeatherByLocation = async (latitude: number, longitude: number) => {
    setLoading(true);
    setError(null);
    try {
      const mockWeather: WeatherData = {
        temperature: Math.round(20 + Math.random() * 15),
        description: ["Sunny", "Cloudy", "Rainy", "Stormy", "Foggy"][
          Math.floor(Math.random() * 5)
        ],
        icon: "sunny",
        humidity: Math.floor(Math.random() * 100),
        windSpeed: Math.floor(Math.random() * 10) + 1,
      };
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setWeather(mockWeather);
    } catch (err) {
      console.error("Error fetching weather data:", err);
      setError({
        message: "Failed to fetch weather data",
        code: "WEATHER_ERROR",
      });
    } finally {
      setLoading(false);
    }
  };

  const refreshWeather = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setError({
          message: "Location permission required for weather",
          code: "LOCATION_PERMISSION_ERROR",
        });
        return;
      }
      const location = await Location.getCurrentPositionAsync({});
      await getWeatherByLocation(
        location.coords.latitude,
        location.coords.longitude
      );
    } catch (err) {
      console.error("Error fetching weather data:", err);
      setError({
        message: "Unable to get current location",
        code: "LOCATION_ERROR",
      });
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    refreshWeather();
  }, []);

  return {
    weather,
    loading,
    error,
    refreshWeather,
  };
};
