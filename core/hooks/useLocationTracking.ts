import * as Location from "expo-location";
import { useEffect, useRef, useState } from "react";
import { TrackPoint } from "../types/workout";

export const useLocationTracking = (isActive: boolean) => {
  const [currentLocation, setCurrentLocation] = useState<TrackPoint | null>(
    null
  );
  const [trackPoints, setTrackPoints] = useState<TrackPoint[]>([]);

  const locationSubscription = useRef<Location.LocationSubscription | null>(
    null
  );

  const startTracking = async () => {
    try {
      await Location.enableNetworkProviderAsync();
      locationSubscription.current = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.BestForNavigation,
          timeInterval: 1000,
          distanceInterval: 5,
        },
        (location) => {
          const newTrackPoint: TrackPoint = {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            timestamp: location.timestamp,
            altitude: location.coords.altitude || undefined,
            accuracy: location.coords.accuracy || undefined,
            speed: location.coords.speed || undefined,
          };
          setCurrentLocation(newTrackPoint);
          setTrackPoints((prev) => [...prev, newTrackPoint]);
        }
      );
    } catch (error) {
      console.error("Error starting location tracking:", error);
      throw error;
    }
  };
  const stopTracking = () => {
    if (locationSubscription.current) {
      locationSubscription.current.remove();
      locationSubscription.current = null;
    }
  };
  useEffect(() => {
    if (isActive) {
      startTracking();
    } else {
      stopTracking();
    }
    return () => {
      stopTracking();
    };
  }, [isActive]);

  return {
    currentLocation,
    trackPoints,
    startTracking,
    stopTracking,
  };
};
