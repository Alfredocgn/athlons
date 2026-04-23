import { useCallback, useState } from "react";
import {
  CreateWorkoutSessionInput,
  DeviceType,
  LocalWorkoutSession,
  TrackPoint,
  WorkoutStatus,
  WorkoutType,
} from "../../types/workout";
import { useCreateWorkout, useGetWorkouts } from "./useWorkouts";

export const useWorkoutSession = () => {
  const [currentSession, setCurrentSession] =
    useState<LocalWorkoutSession | null>(null);
  const { data: backendSessions = [], isLoading, error } = useGetWorkouts();
  const {
    mutate: createWorkout,
    isPending,
    error: createError,
  } = useCreateWorkout();

  const startSession = useCallback(
    (title: string, workoutType: WorkoutType = WorkoutType.RUN) => {
      const newSession: LocalWorkoutSession = {
        localId: Date.now().toString(),
        title,
        date: new Date(),
        duration: 0,
        distance: 0,
        workoutType,
        importedFrom: DeviceType.OTHER,
        trackPoints: [],
        status: WorkoutStatus.ACTIVE,
      };
      setCurrentSession(newSession);
      return newSession;
    },
    []
  );

  const updateSession = useCallback((updates: Partial<LocalWorkoutSession>) => {
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
    updateSession({ status: WorkoutStatus.PAUSED });
  }, [updateSession]);

  const resumeSession = useCallback(() => {
    updateSession({ status: WorkoutStatus.ACTIVE });
  }, [updateSession]);
  const finishSession = useCallback(
    (finalStats: {
      distance: number;
      duration: number;
      pace: number;
      caloriesBurned?: number;
      notes?: string;
    }) => {
      if (!currentSession) return null;

      const workoutToCreate: CreateWorkoutSessionInput = {
        title: currentSession.title,
        date: new Date(),
        distance: finalStats.distance,
        duration: finalStats.duration,
        avgPace: finalStats.pace,
        caloriesBurned: finalStats.caloriesBurned,
        notes: finalStats.notes,
        workoutType: currentSession.workoutType,
        importedFrom: currentSession.importedFrom,
        trackPoints: currentSession.trackPoints || [],
      };
      createWorkout(workoutToCreate);
      setCurrentSession(null);

      return workoutToCreate;
    },
    [currentSession, createWorkout]
  );

  const cancelSession = useCallback(() => {
    setCurrentSession(null);
  }, []);

  const loadSessions = () => {
    // TODO CONECTAR CON BACKEND PARA TRAER SESISONS
  };

  return {
    currentSession,
    sessions: backendSessions,
    isLoading,
    isCreating: isPending,
    error,
    createError,

    startSession,
    updateSession,
    addTrackPoints,
    pauseSession,
    resumeSession,
    finishSession,
    cancelSession,
    loadSessions,

    isActive: currentSession?.status === "active",
    isPaused: currentSession?.status === "paused",
    hasActiveSession: currentSession !== null,
  };
};
