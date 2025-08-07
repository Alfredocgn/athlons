import { apiClient } from "@/core/api/api";
import { AuthResponse, LoginInput, RegisterInput } from "@/core/types/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useLogin = () => {
  return useMutation({
    mutationFn: async (credentials: LoginInput) => {
      console.log("[useLogin] Intentando login con:", credentials);

      if (!process.env.EXPO_PUBLIC_API_URL) {
        throw new Error("API URL no configurada. Verifica tu archivo .env");
      }

      console.log("[useLogin] URL del API:", process.env.EXPO_PUBLIC_API_URL);

      try {
        const response = await apiClient.post("", {
          query: `
          mutation Login($input:LoginInput!){
          login(input:$input){
          accessToken
          refreshToken
          user{
          id
          email
          firstName
          lastName
          bio
          gender
          pace
          height
          weight
          preferredDistance
          weeklyGoal
          profileImg
          socialLinks
          enableEmailNotifications
          enablePushNotifications
          createdAt
          updatedAt
          }
          }
          }`,
          variables: {
            input: credentials,
          },
        });

        console.log(
          "[useLogin] Respuesta completa del servidor:",
          JSON.stringify(response.data, null, 2)
        );

        if (response.data.errors) {
          console.error("[useLogin] Errores de GraphQL:", response.data.errors);
          throw new Error(response.data.errors[0].message);
        }

        if (!response.data.data?.login) {
          throw new Error("Respuesta del servidor no contiene datos de login");
        }

        return response.data.data.login as AuthResponse;
      } catch (error: any) {
        console.error("[useLogin] Error completo:", error);

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
      console.log("[useLogin] Login exitoso, guardando tokens");
      await AsyncStorage.setItem("accessToken", data.accessToken);
      await AsyncStorage.setItem("refreshToken", data.refreshToken);
    },
    onError: (error) => {
      console.error("[useLogin] Error en login:", error);
    },
  });
};

export const useUser = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const response = await apiClient.post("", {
        query: `
        query GetCurrentUser{
        currentUser{
        id
        email
        firstName
        lastName
        bio
        gender
        pace
        height
        weight
        preferredDistance
        weeklyGoal
        profileImg
        socialLinks
        enableEmailNotifications
        enablePushNotifications
        createdAt
        updatedAt
        }
        }`,
      });
      return response.data.data.currentUser;
    },
  });
};

export const useRegister = () => {
  return useMutation({
    mutationFn: async (userData: RegisterInput) => {
      console.log("[useRegister] Intentando registrar con:", userData);
      console.log(
        "[useRegister] URL del API:",
        process.env.EXPO_PUBLIC_API_URL
      );
      const response = await apiClient.post("", {
        query: `
        mutation Register($input:CreateUserInput!){
        register(input:$input){
        accessToken
        refreshToken
        user{
        id
        email
        firstName
        lastName
        bio
        gender
        pace
        height
        weight
        preferredDistance
        weeklyGoal
        profileImg
        socialLinks
        enableEmailNotifications
        enablePushNotifications
        createdAt
        updatedAt
        }
        }
        }`,
        variables: {
          input: userData,
        },
      });
      console.log(
        "[useRegister] Respuesta completa del servidor:",
        JSON.stringify(response, null, 2)
      );
      if (response.data.errors) {
        console.error(
          "[useRegister] Errores de GraphQL:",
          response.data.errors
        );
        throw new Error(response.data.errors[0].message);
      }

      const result = response.data.data.register as AuthResponse;
      console.log("[useRegister] Datos de la respuesta exitosa:", result);
      return result;
    },
    onSuccess: async (data) => {
      await AsyncStorage.setItem("accessToken", data.accessToken);
      await AsyncStorage.setItem("refreshToken", data.refreshToken);
    },
  });
};
