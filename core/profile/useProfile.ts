// core/profile/useProfile.ts
import { useMutation, useQuery } from "@tanstack/react-query";
import { print } from "graphql";
import { apiClient } from "../api/api";
import {
  GET_MY_PROFILE,
  GET_PERSONAL_INFO,
  GET_PHYSICAL_INFO,
  GET_RUNNING_PREFERENCES,
  UPDATE_PERSONAL_INFO,
  UPDATE_PHYSICAL_INFO,
  UPDATE_RUNNING_PREFERENCES,
} from "../graphql/Profile";

export const useUser = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const response = await apiClient.post("", {
        query: print(GET_MY_PROFILE),
      });
      return response.data.data.myProfile;
    },
  });
};

export const usePersonalInfo = () => {
  return useQuery({
    queryKey: ["user", "personal"],
    queryFn: async () => {
      const response = await apiClient.post("", {
        query: print(GET_PERSONAL_INFO),
      });
      return response.data.data.myProfile;
    },
  });
};

export const usePhysicalInfo = () => {
  return useQuery({
    queryKey: ["user", "physical"],
    queryFn: async () => {
      const response = await apiClient.post("", {
        query: print(GET_PHYSICAL_INFO),
      });
      return response.data.data.myProfile;
    },
  });
};

export const useRunningPreferences = () => {
  return useQuery({
    queryKey: ["user", "running"],
    queryFn: async () => {
      const response = await apiClient.post("", {
        query: print(GET_RUNNING_PREFERENCES),
      });
      return response.data.data.myProfile;
    },
  });
};

// ✅ Mutaciones específicas
export const useUpdatePersonalInfo = () => {
  return useMutation({
    mutationFn: async (userData: any) => {
      const response = await apiClient.post("", {
        query: print(UPDATE_PERSONAL_INFO),
        variables: { updateProfileInput: userData },
      });
      if (response.data.errors) {
        throw new Error(response.data.errors[0].message);
      }
      return response.data.data.updateProfile;
    },
  });
};

export const useUpdatePhysicalInfo = () => {
  return useMutation({
    mutationFn: async (userData: any) => {
      const response = await apiClient.post("", {
        query: print(UPDATE_PHYSICAL_INFO),
        variables: { updateProfileInput: userData },
      });
      if (response.data.errors) {
        throw new Error(response.data.errors[0].message);
      }
      return response.data.data.updateProfile;
    },
  });
};

export const useUpdateRunningPreferences = () => {
  return useMutation({
    mutationFn: async (userData: any) => {
      const response = await apiClient.post("", {
        query: print(UPDATE_RUNNING_PREFERENCES),
        variables: { updateProfileInput: userData },
      });
      if (response.data.errors) {
        throw new Error(response.data.errors[0].message);
      }
      return response.data.data.updateProfile;
    },
  });
};
