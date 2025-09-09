import { apiClient } from "@/core/api/api";
import { LOGIN_MUTATION, REGISTER_MUTATION } from "@/core/graphql/Auth";
import { AuthResponse, LoginInput, RegisterInput } from "@/core/types/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useMutation } from "@tanstack/react-query";
import { print } from "graphql";

export const useLogin = () => {
  return useMutation({
    mutationFn: async (credentials: LoginInput) => {
      if (!process.env.EXPO_PUBLIC_API_URL) {
        throw new Error("API URL missing. Check .env");
      }

      try {
        const response = await apiClient.post("", {
          query: print(LOGIN_MUTATION),
          variables: {
            input: credentials,
          },
        });

        if (response.data.errors) {
          console.error("[useLogin] GraphQL:", response.data.errors);
          throw new Error(response.data.errors[0].message);
        }

        if (!response.data.data?.login) {
          throw new Error("Login Error no server data");
        }

        return response.data.data.login as AuthResponse;
      } catch (error: any) {
        console.error("[useLogin] Error:", error);

        if (error.response) {
          console.error("[useLogin] Error response:", error.response.data);
          console.error("[useLogin] Status:", error.response.status);

          if (error.response.data?.errors) {
            throw new Error(error.response.data.errors[0].message);
          }
        }

        throw error;
      }
    },
    onSuccess: async (data) => {
      await AsyncStorage.setItem("accessToken", data.accessToken);
      await AsyncStorage.setItem("refreshToken", data.refreshToken);
    },
    onError: (error) => {
      console.error("[useLogin] Error:", error);
    },
  });
};

export const useRegister = () => {
  return useMutation({
    mutationFn: async (userData: RegisterInput) => {
      const response = await apiClient.post("", {
        query: print(REGISTER_MUTATION),
        variables: {
          input: userData,
        },
      });

      if (response.data.errors) {
        console.error("[useRegister] GraphQL Error:", response.data.errors);
        throw new Error(response.data.errors[0].message);
      }

      const result = response.data.data.register as AuthResponse;
      console.log("[useRegister] succesfull", result);
      return result;
    },
    onSuccess: async (data) => {
      await AsyncStorage.setItem("accessToken", data.accessToken);
      await AsyncStorage.setItem("refreshToken", data.refreshToken);
    },
  });
};
