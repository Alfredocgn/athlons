import { useMemo } from "react";
import { LocationData, TrackingMetrics } from "./useWorkoutTracking";

export interface RunningMetrics {
  pace: number; // segundos por kilómetro
  speed: number; // km/h
  distance: number; // metros
  elevationGain: number; // metros
  elevationLoss: number; // metros
  heartRateZone?: number;
  trainingLoad?: number;
  vo2Max?: number;
}

export interface PaceAnalysis {
  currentPace: number;
  averagePace: number;
  bestPace: number;
  paceVariability: number;
  paceTrend: "improving" | "stable" | "declining";
}

export const useRunningMetrics = (
  trackingMetrics: TrackingMetrics,
  locationData: LocationData | null,
  startTime: number,
  currentTime: number
) => {
  const runningMetrics: RunningMetrics = useMemo(() => {
    const elapsedTime = (currentTime - startTime) / 1000; // segundos
    const distance = locationData ? calculateDistance(locationData) : 0;
    const speed = elapsedTime > 0 ? (distance / elapsedTime) * 3.6 : 0; // km/h
    const pace = speed > 0 ? (elapsedTime / distance) * 1000 : 0; // segundos por km

    return {
      pace,
      speed,
      distance,
      elevationGain: 0, // Implementar con barómetro
      elevationLoss: 0, // Implementar con barómetro
      heartRateZone: undefined, // Requiere monitor de frecuencia cardíaca
      trainingLoad: calculateTrainingLoad(trackingMetrics, speed),
      vo2Max: estimateVO2Max(trackingMetrics, speed),
    };
  }, [trackingMetrics, locationData, startTime, currentTime]);

  const paceAnalysis: PaceAnalysis = useMemo(() => {
    // Implementación simplificada
    // En producción, esto requeriría historial de paces
    return {
      currentPace: runningMetrics.pace,
      averagePace: runningMetrics.pace,
      bestPace: runningMetrics.pace * 0.9, // Estimación
      paceVariability: 5, // Porcentaje
      paceTrend: "stable" as const,
    };
  }, [runningMetrics.pace]);

  return {
    runningMetrics,
    paceAnalysis,
  };
};

// Función auxiliar para calcular distancia (implementación básica)
const calculateDistance = (location: LocationData): number => {
  // En una implementación real, acumularías la distancia entre puntos
  // Por ahora retornamos 0 ya que necesitamos múltiples puntos para calcular distancia
  return 0;
};

// Calcular carga de entrenamiento
const calculateTrainingLoad = (
  metrics: TrackingMetrics,
  speed: number
): number => {
  const baseLoad = (speed * metrics.cadence) / 100;
  const efficiencyFactor = metrics.efficiency / 100;
  return Math.round(baseLoad * efficiencyFactor * 10) / 10;
};

// Estimar VO2 Max
const estimateVO2Max = (metrics: TrackingMetrics, speed: number): number => {
  // Fórmula simplificada basada en velocidad y cadencia
  const vo2Max = 15.3 * (speed / metrics.cadence) * 1000;
  return Math.round(vo2Max * 10) / 10;
};
