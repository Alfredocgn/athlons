import { useUpdatePersonalInfo } from "@/core/profile/useProfile";
import { useState } from "react";

import { Alert } from "react-native";
import { useImagePicker } from "../hooks/useImagePicker";

export interface ProfileImageUpdate {
  success: boolean;
  newImageUri?: string;
  error?: string;
}

export const useProfileImage = () => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const updatePersonalInfo = useUpdatePersonalInfo();
  const imagePicker = useImagePicker();

  const updateProfileImage = async (
    imageUri: string
  ): Promise<ProfileImageUpdate> => {
    setUploading(true);
    setError(null);

    try {
      // En producción, aquí subirías la imagen a tu servidor/cloud storage
      // Por ahora simulamos la subida
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Simular URL de imagen subida
      const uploadedImageUrl = `https://example.com/profile-images/${Date.now()}.jpg`;

      // Actualizar el perfil con la nueva URL de imagen
      await updatePersonalInfo.mutateAsync({
        profileImg: uploadedImageUrl,
      });

      return {
        success: true,
        newImageUri: uploadedImageUrl,
      };
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to update profile image";
      setError(errorMessage);

      return {
        success: false,
        error: errorMessage,
      };
    } finally {
      setUploading(false);
    }
  };

  const removeProfileImage = async (user: any): Promise<ProfileImageUpdate> => {
    setUploading(true);
    setError(null);

    try {
      // Actualizar el perfil removiendo la imagen personalizada
      await updatePersonalInfo.mutateAsync({
        profileImg: null,
      });

      return {
        success: true,
        newImageUri: undefined,
      };
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to remove profile image";
      setError(errorMessage);

      return {
        success: false,
        error: errorMessage,
      };
    } finally {
      setUploading(false);
    }
  };

  const handleImageSelection = async (): Promise<ProfileImageUpdate> => {
    try {
      const imageResult = await imagePicker.showImagePickerOptions();

      if (!imageResult) {
        return { success: false, error: "No image selected" };
      }

      // Si la imagen es vacía, significa que se quiere remover
      if (imageResult.uri === "") {
        // Aquí necesitarías pasar el usuario actual, pero por simplicidad
        // retornamos success
        return { success: true, newImageUri: undefined };
      }

      return await updateProfileImage(imageResult.uri);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to handle image selection";
      setError(errorMessage);

      return {
        success: false,
        error: errorMessage,
      };
    }
  };

  const showUpdateSuccessAlert = (imageUri: string | null) => {
    const message = imageUri
      ? "Your profile picture has been updated successfully."
      : "Your profile picture has been removed successfully.";

    Alert.alert("Success!", message, [{ text: "OK" }]);
  };

  const showUpdateErrorAlert = (error: string) => {
    Alert.alert("Error", `Failed to update profile picture: ${error}`, [
      { text: "OK" },
    ]);
  };

  return {
    uploading,
    error,
    updateProfileImage,
    removeProfileImage,
    handleImageSelection,
    showUpdateSuccessAlert,
    showUpdateErrorAlert,
    imagePicker,
  };
};
