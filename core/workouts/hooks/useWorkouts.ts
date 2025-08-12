import { apiClient } from "@/core/api/api";
import {
  CREATE_WORKOUT_SESSION,
  GET_WORKOUT_SESSIONS,
} from "@/core/graphql/Workouts";
import { CreateWorkoutSessionInput } from "@/core/types/workout";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { print } from "graphql";

export const useGetWorkouts = () => {
  return useQuery({
    queryKey: ["workouts"],
    queryFn: async () => {
      const response = await apiClient.post("", {
        query: print(GET_WORKOUT_SESSIONS),
      });
      return response.data.data.workoutSessions || [];
    },
    staleTime: 5 * 60 * 1000,
    retry: 2,
  });
};

export const useCreateWorkout = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (workoutData: CreateWorkoutSessionInput) => {
      const response = await apiClient.post("", {
        query: print(CREATE_WORKOUT_SESSION),
        variables: {
          createWorkoutSessionInput: workoutData,
        },
      });
      if (response.data.errors) {
        console.error(
          "[useCreateWorkout] Graphql Error:",
          response.data.errors
        );
        throw new Error(response.data.errors[0].message);
      }

      const result = response.data.data.createWorkoutSession;
      console.log("[useCreateWorkout] successfull:", result);
      return result;
    },

    onSuccess: (newWorkout) => {
      queryClient.invalidateQueries({ queryKey: ["workouts"] });
      console.log("Workout creado exitosamente:", newWorkout);
    },
    onError: (error) => {
      console.error("[useCreateWorkout] Error:", error);
    },
    retry: 2,
    retryDelay: 1000,
  });
};
