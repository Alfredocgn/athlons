import { User } from "@/core/types/user";

export interface DefaultProfileImageConfig {
  male: any;
  female: any;
  default: any;
}

export const useDefaultProfileImage = () => {
  // Importar las imágenes por defecto
  const defaultImages: DefaultProfileImageConfig = {
    male: require("@/assets/images/png/Spartan-profile.png"),
    female: require("@/assets/images/png/Amazon-profile.png"),
    default: require("@/assets/images/png/Spartan-profile.png"), // Fallback
  };

  const getDefaultImageForUser = (user: User | undefined): any => {
    if (!user?.gender) {
      return defaultImages.default;
    }

    const gender = user.gender.toLowerCase();

    switch (gender) {
      case "male":
      case "m":
      case "masculino":
        return defaultImages.male;
      case "female":
      case "f":
      case "femenino":
        return defaultImages.female;
      default:
        return defaultImages.default;
    }
  };

  const getDefaultImageForGender = (gender: string): any => {
    const normalizedGender = gender.toLowerCase();

    switch (normalizedGender) {
      case "male":
      case "m":
      case "masculino":
        return defaultImages.male;
      case "female":
      case "f":
      case "femenino":
        return defaultImages.female;
      default:
        return defaultImages.default;
    }
  };

  return {
    defaultImages,
    getDefaultImageForUser,
    getDefaultImageForGender,
  };
};
