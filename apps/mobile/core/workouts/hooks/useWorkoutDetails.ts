import { TrackPoint, WorkoutSession, WorkoutType } from "@/core/types/workout";
import { useMemo } from "react";
import { useGetWorkout } from "./useWorkouts";

export interface WorkoutDetailsData {
  session: WorkoutSession | null;
  loading: boolean;
  error: string | null;
}

export interface WorkoutStats {
  distance: number;
  duration: number;
  avgPace: number;
  caloriesBurned: number;
  avgSpeed: number;
  maxSpeed: number;
  elevationGain: number;
  elevationLoss: number;
}

export interface MapRegion {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

export const useWorkoutDetails = (sessionId: string) => {
  const { data: session, isLoading, error } = useGetWorkout(sessionId);

  const workoutStats: WorkoutStats = useMemo(() => {
    if (!session) {
      return {
        distance: 0,
        duration: 0,
        avgPace: 0,
        caloriesBurned: 0,
        avgSpeed: 0,
        maxSpeed: 0,
        elevationGain: 0,
        elevationLoss: 0,
      };
    }

    const distance = session.distance || 0;
    const duration = session.duration || 0;
    const avgPace = session.avgPace || 0;
    const caloriesBurned = session.caloriesBurned || 0;

    // Calcular velocidad promedio (km/h)
    const avgSpeed = duration > 0 ? (distance / duration) * 3600 : 0;

    // Calcular velocidad máxima y elevación desde trackPoints
    let maxSpeed = 0;
    let elevationGain = 0;
    let elevationLoss = 0;
    let previousAltitude = 0;

    if (session.trackPoints && session.trackPoints.length > 0) {
      session.trackPoints.forEach((point: TrackPoint, index: number) => {
        if (point.speed && point.speed > maxSpeed) {
          maxSpeed = point.speed;
        }

        if (point.altitude && index > 0) {
          const altitudeDiff = point.altitude - previousAltitude;
          if (altitudeDiff > 0) {
            elevationGain += altitudeDiff;
          } else {
            elevationLoss += Math.abs(altitudeDiff);
          }
          previousAltitude = point.altitude;
        }
      });
    }

    return {
      distance,
      duration,
      avgPace,
      caloriesBurned,
      avgSpeed,
      maxSpeed,
      elevationGain,
      elevationLoss,
    };
  }, [session]);

  const mapRegion: MapRegion = useMemo(() => {
    if (!session?.trackPoints || session.trackPoints.length === 0) {
      // Buenos Aires por defecto
      return {
        latitude: -34.5743,
        longitude: -58.411,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      };
    }

    const trackPoints = session.trackPoints;
    const latitudes = trackPoints.map((point: TrackPoint) => point.latitude);
    const longitudes = trackPoints.map((point: TrackPoint) => point.longitude);

    const minLat = Math.min(...latitudes);
    const maxLat = Math.max(...latitudes);
    const minLng = Math.min(...longitudes);
    const maxLng = Math.max(...longitudes);

    const centerLat = (minLat + maxLat) / 2;
    const centerLng = (minLng + maxLng) / 2;

    const latDelta = Math.max(maxLat - minLat, 0.005) * 1.2; // 20% padding
    const lngDelta = Math.max(maxLng - minLng, 0.005) * 1.2;

    return {
      latitude: centerLat,
      longitude: centerLng,
      latitudeDelta: latDelta,
      longitudeDelta: lngDelta,
    };
  }, [session]);

  const routeCoordinates = useMemo(() => {
    if (!session?.trackPoints) return [];
    return session.trackPoints.map((point: TrackPoint) => ({
      latitude: point.latitude,
      longitude: point.longitude,
    }));
  }, [session]);

  const getWorkoutTypeIcon = (type: WorkoutType) => {
    switch (type) {
      case WorkoutType.RUN:
        return "footsteps";
      case WorkoutType.LONG_RUN:
        return "trail-sign";
      case WorkoutType.TEMPO:
        return "speedometer";
      case WorkoutType.INTERVAL:
        return "flash";
      case WorkoutType.RECOVERY:
        return "leaf";
      case WorkoutType.RACE:
        return "trophy";
      case WorkoutType.TRAIL:
        return "mountain";
      default:
        return "fitness";
    }
  };

  const getWorkoutTypeColor = (type: WorkoutType) => {
    switch (type) {
      case WorkoutType.RUN:
        return "#4CAF50";
      case WorkoutType.LONG_RUN:
        return "#FF9800";
      case WorkoutType.TEMPO:
        return "#F44336";
      case WorkoutType.INTERVAL:
        return "#9C27B0";
      case WorkoutType.RECOVERY:
        return "#2196F3";
      case WorkoutType.RACE:
        return "#FFD700";
      case WorkoutType.TRAIL:
        return "#795548";
      default:
        return "#666666";
    }
  };

  return {
    session,
    loading: isLoading,
    error: error?.message || null,
    workoutStats,
    mapRegion,
    routeCoordinates,
    getWorkoutTypeIcon,
    getWorkoutTypeColor,
  };
};
