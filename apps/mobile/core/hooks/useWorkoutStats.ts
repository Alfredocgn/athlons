import { useCallback, useEffect, useState } from "react";
import { TrackPoint, WorkoutStats } from "../types/workout";

export const useWorkoutStats = (
  trackPoints: TrackPoint[],
  startTime: Date | null,
  isActive: boolean
) => {
  const [stats, setStats] = useState<WorkoutStats>({
    elapsedTime: 0,
    distance: 0,
    pace: 0,
    currentSpeed: 0,
    caloriesBurned: 0,
  });

  const calculateDistance = useCallback(
    (lat1: number, lon1: number, lat2: number, lon2: number): number => {
      const R = 6371e3;
      const φ1 = (lat1 * Math.PI) / 180;
      const φ2 = (lat2 * Math.PI) / 180;
      const Δφ = ((lat2 - lat1) * Math.PI) / 180;
      const Δλ = ((lon2 - lon1) * Math.PI) / 180;

      const a =
        Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
        Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

      return R * c;
    },
    []
  );

  const calculateTotalDistance = useCallback(
    (points: TrackPoint[]): number => {
      let totalDistance = 0;

      for (let i = 1; i < points.length; i++) {
        const prev = points[i - 1];
        const curr = points[i];
        totalDistance += calculateDistance(
          prev.latitude,
          prev.longitude,
          curr.latitude,
          curr.longitude
        );
      }

      return totalDistance;
    },
    [calculateDistance]
  );

  const calculateCalories = (distance: number, duration: number): number => {
    const distanceKm = distance / 1000;
    return Math.round(distanceKm * 70);
  };

  useEffect(() => {
    if (!startTime || !isActive) return;

    const timer = setInterval(() => {
      const now = new Date();
      const elapsedTime = Math.floor(
        (now.getTime() - startTime.getTime()) / 1000
      );
      const totalDistance = calculateTotalDistance(trackPoints);

      const distanceKm = totalDistance / 1000;
      const pace = distanceKm > 0 ? elapsedTime / distanceKm : 0;

      let currentSpeed = 0;
      if (trackPoints.length >= 10) {
        const recentPoints = trackPoints.slice(-10);
        const recentDistance = calculateTotalDistance(recentPoints);
        const recentTime =
          (recentPoints[recentPoints.length - 1].timestamp -
            recentPoints[0].timestamp) /
          1000;
        currentSpeed = recentTime > 0 ? recentDistance / recentTime : 0;
      }

      const caloriesBurned = calculateCalories(totalDistance, elapsedTime);

      setStats({
        elapsedTime,
        distance: totalDistance,
        pace,
        currentSpeed,
        caloriesBurned,
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [trackPoints, startTime, isActive]);

  return stats;
};
