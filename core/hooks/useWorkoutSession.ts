import { useCallback, useState } from "react";
import {
  DeviceType,
  TrackPoint,
  WorkoutSession,
  WorkoutType,
} from "../types/training";

export const useWorkoutSession = () => {
  const [currentSession, setCurrentSession] = useState<WorkoutSession | null>(
    null
  );
  const [sessions, setSessions] = useState<WorkoutSession[]>([]);

  const startSession = useCallback(
    (title: string, workoutType: WorkoutType = WorkoutType.RUNNING) => {
      const newSession: WorkoutSession = {
        id: Date.now().toString(),
        title,
        date: new Date(),
        duration: 0,
        distance: 0,
        workoutType,
        importedFrom: DeviceType.MOBILE,
        status: "active",
        trackPoints: [],
      };
      setCurrentSession(newSession);
      return newSession;
    },
    []
  );

  const updatedSession = useCallback((updates: Partial<WorkoutSession>) => {
    setCurrentSession((prev) => (prev ? { ...prev, ...updates } : null));
  }, []);

  const addTrackPoints = useCallback((newTrackPoints: TrackPoint[]) => {
    setCurrentSession((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        trackPoints: [...(prev.trackPoints || []), ...newTrackPoints],
      };
    });
  }, []);

  const pauseSession = useCallback(() => {
    updatedSession({ status: "paused" });
  }, [updatedSession]);

  const resumeSession = useCallback(() => {
    updatedSession({ status: "active" });
  }, [updatedSession]);

  const stopSession = useCallback(
    (finalStats: {
      distance: number;
      duration: number;
      pace: number;
      caloriesBurned?: number;
      notes?: string;
    }) => {
      if (!currentSession) return null;
      const completedSession: WorkoutSession = {
        ...currentSession,
        date: new Date(),
        distance: finalStats.distance,
        duration: finalStats.duration,
        avgPace: finalStats.pace,
        caloriesBurned: finalStats.caloriesBurned,
        notes: finalStats.notes,
        status: "completed",
      };
      setSessions((prev) => [completedSession, ...prev]);
      setCurrentSession(null);
      return completedSession;
    },
    [currentSession]
  );

  const loadSessions = () => {
    // TODO CONECTAR CON BACKEND PARA TRAER SESISONS
  };
  const clearHistory = useCallback(() => {
    setSessions([]);
  }, []);
  return {
    currentSession,
    sessions,

    startSession,
    updatedSession,
    addTrackPoints,
    pauseSession,
    resumeSession,
    stopSession,
    loadSessions,
    clearHistory,

    isActive: currentSession?.status === "active",
    isPaused: currentSession?.status === "completed",
    hasActiveSession: currentSession !== null,
  };
};
