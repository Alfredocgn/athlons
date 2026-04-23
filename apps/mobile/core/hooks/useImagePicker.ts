import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { Alert } from "react-native";

export interface ImagePickerResult {
  uri: string;
  width: number;
  height: number;
  type?: string;
}
export interface ImagePickerError {
  message: string;
  code?: string;
}

export const useImagePicker = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ImagePickerError | null>(null);

  const requestPermissions = async () => {
    try {
      const { status: cameraStatus } =
        await ImagePicker.requestCameraPermissionsAsync();
      const { status: mediaStatus } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      return {
        camera: cameraStatus === "granted",
        mediaLibrary: mediaStatus === "granted",
      };
    } catch (err) {
      console.error("Error requesting image picker permissions:", err);
      return {
        camera: false,
        mediaLibrary: false,
      };
    }
  };

  const pickImageFromGallery = async (): Promise<ImagePickerResult | null> => {
    setLoading(true);
    setError(null);
    try {
      const permissions = await requestPermissions();
      if (!permissions.mediaLibrary) {
        Alert.alert(
          "Permission Required",
          "Please grant access to your photo library to select an image.",
          [{ text: "OK" }]
        );
        return null;
      }
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
        base64: false,
      });
      if (result.canceled) {
        return null;
      }
      const asset = result.assets[0];
      return {
        uri: asset.uri,
        width: asset.width,
        height: asset.height,
        type: asset.type,
      };
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to pick image";
      setError({
        message: errorMessage,
        code: "IMAGE_PICKER_ERROR",
      });
      return null;
    } finally {
      setLoading(false);
    }
  };

  const takePhotoWithCamera = async (): Promise<ImagePickerResult | null> => {
    setLoading(true);
    setError(null);
    try {
      const permissions = await requestPermissions();
      if (!permissions.camera) {
        Alert.alert(
          "Permission Required",
          "Please grant access to your camera to take a photo.",
          [{ text: "OK" }]
        );
        return null;
      }
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
        base64: false,
      });
      if (result.canceled) {
        return null;
      }
      const asset = result.assets[0];
      return {
        uri: asset.uri,
        width: asset.width,
        height: asset.height,
        type: asset.type,
      };
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to take photo";
      setError({
        message: errorMessage,
        code: "CAMERA_ERROR",
      });
      return null;
    } finally {
      setLoading(false);
    }
  };
  const showImagePickerOptions = (): Promise<ImagePickerResult | null> => {
    return new Promise((resolve) => {
      Alert.alert(
        "Select Profile Picture",
        "Choose how you want to set your profile picture",
        [
          {
            text: "Camera",
            onPress: async () => {
              const result = await takePhotoWithCamera();
              resolve(result);
            },
          },
          {
            text: "Photo Library",
            onPress: async () => {
              const result = await pickImageFromGallery();
              resolve(result);
            },
          },
          {
            text: "Cancel",
            style: "cancel",
            onPress: () => resolve(null),
          },
        ]
      );
    });
  };

  return {
    loading,
    error,
    pickImageFromGallery,
    takePhotoWithCamera,
    showImagePickerOptions,
    requestPermissions,
  };
};
