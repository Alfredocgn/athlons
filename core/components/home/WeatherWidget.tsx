import { useTheme } from "@/core/hooks/useTheme";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { useWeather } from "./hooks/useWeather";

interface WeatherWidgetProps {
  showDetails?: boolean;
}

const WeatherWidget = ({ showDetails = false }: WeatherWidgetProps) => {
  const theme = useTheme();
  const { weather, loading, error, refreshWeather } = useWeather();

  const getWeatherIcon = (description: string) => {
    const desc = description.toLowerCase();
    if (desc.includes("sunny") || desc.includes("clear")) return "sunny";
    if (desc.includes("cloudy") || desc.includes("overcast")) return "cloudy";
    if (desc.includes("rain")) return "rainy";
    if (desc.includes("storm")) return "thunderstorm";
    if (desc.includes("snow")) return "snow";
    return "partly-sunny";
  };

  const handlePress = () => {
    refreshWeather();
  };

  if (loading) {
    return (
      <TouchableOpacity
        style={[styles.container, { backgroundColor: theme.background }]}
        onPress={handlePress}
        activeOpacity={0.7}
      >
        <View style={styles.loadingContainer}>
          <Ionicons name="refresh" size={16} color={theme.secondaryText} />
          <Text style={[styles.loadingText, { color: theme.secondaryText }]}>
            Loading...
          </Text>
        </View>
      </TouchableOpacity>
    );
  }

  if (error || !weather) {
    return (
      <TouchableOpacity
        style={[styles.container, { backgroundColor: theme.background }]}
        onPress={handlePress}
        activeOpacity={0.7}
      >
        <View style={styles.errorContainer}>
          <Ionicons name="warning-outline" size={16} color={theme.error} />
          <Text style={[styles.errorText, { color: theme.error }]}>Error</Text>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor: theme.background }]}
      onPress={handlePress}
      activeOpacity={0.7}
    >
      <View style={styles.weatherContent}>
        <View style={styles.mainWeather}>
          <Ionicons
            name={getWeatherIcon(weather.description) as any}
            size={showDetails ? 24 : 20}
            color={theme.primaryText}
          />
          <View style={styles.temperatureContainer}>
            <Text style={[styles.temperature, { color: theme.primaryText }]}>
              {weather.temperature}°
            </Text>
            {showDetails && (
              <Text
                style={[styles.description, { color: theme.secondaryText }]}
              >
                {weather.description}
              </Text>
            )}
          </View>
        </View>

        {showDetails && weather.humidity && weather.windSpeed && (
          <View style={styles.detailsContainer}>
            <View style={styles.detailItem}>
              <Ionicons
                name="water-outline"
                size={12}
                color={theme.secondaryText}
              />
              <Text style={[styles.detailText, { color: theme.secondaryText }]}>
                {weather.humidity}%
              </Text>
            </View>
            <View style={styles.detailItem}>
              <Ionicons
                name="leaf-outline"
                size={12}
                color={theme.secondaryText}
              />
              <Text style={[styles.detailText, { color: theme.secondaryText }]}>
                {weather.windSpeed} km/h
              </Text>
            </View>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  weatherContent: {
    alignItems: "center",
  },
  mainWeather: {
    flexDirection: "row",
    alignItems: "center",
  },
  temperatureContainer: {
    marginLeft: 6,
    alignItems: "center",
  },
  temperature: {
    fontSize: 16,
    fontWeight: "bold",
    lineHeight: 18,
  },
  description: {
    fontSize: 10,
    textAlign: "center",
    marginTop: 2,
  },
  detailsContainer: {
    flexDirection: "row",
    marginTop: 4,
    gap: 8,
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
  detailText: {
    fontSize: 10,
  },
  loadingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  loadingText: {
    fontSize: 12,
  },
  errorContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  errorText: {
    fontSize: 12,
  },
});

export default WeatherWidget;
