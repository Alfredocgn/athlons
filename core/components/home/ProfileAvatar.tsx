import { useTheme } from "@/core/hooks/useTheme";
import { useUser } from "@/core/profile/useProfile";
import { router } from "expo-router";
import React, { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { useDefaultProfileImage } from "@/core/profile/useDefaultProfileImage";
import { useProfileImage } from "@/core/profile/useProfileImage";
import { Ionicons } from "@expo/vector-icons";
import ImagePickerModal from "../profile/ImagePickerModal";

interface ProfileAvatarProps {
  size?: number;
  showBorder?: boolean;
  editable?: boolean;
}

const ProfileAvatar: React.FC<ProfileAvatarProps> = ({
  size = 40,
  showBorder = true,
  editable = true,
}) => {
  const theme = useTheme();
  const { data: user, isLoading } = useUser();
  const { handleImageSelection, showUpdateSuccessAlert, showUpdateErrorAlert } =
    useProfileImage();
  const { getDefaultImageForUser } = useDefaultProfileImage();
  const [imagePickerVisible, setImagePickerVisible] = useState(false);

  const handlePress = () => {
    router.push("/profile");
  };

  const handleLongPress = () => {
    if (editable) {
      setImagePickerVisible(true);
    }
  };

  const handleImageSelected = async (imageUri: string) => {
    const result = await handleImageSelection();

    if (result.success) {
      showUpdateSuccessAlert(result.newImageUri || null);
    } else {
      showUpdateErrorAlert(result.error || "Unknown error");
    }
  };

  const avatarSize = {
    width: size,
    height: size,
    borderRadius: size / 2,
  };

  const getInitials = (firstName?: string, lastName?: string) => {
    const first = firstName?.charAt(0) || "";
    const last = lastName?.charAt(0) || "";
    return (first + last).toUpperCase();
  };

  if (isLoading) {
    return (
      <TouchableOpacity
        style={[
          styles.container,
          avatarSize,
          showBorder && {
            borderWidth: 2,
            borderColor: theme.primaryText,
          },
        ]}
        onPress={handlePress}
        activeOpacity={0.7}
      >
        <View
          style={[styles.placeholder, { backgroundColor: theme.primaryText }]}
        >
          <Ionicons name="person" size={size * 0.6} color={theme.background} />
        </View>
      </TouchableOpacity>
    );
  }

  // Determinar qué imagen mostrar
  const getProfileImage = () => {
    // Si el usuario tiene una imagen personalizada, usarla
    if (user?.profileImg) {
      return { uri: user.profileImg };
    }

    // Si no tiene imagen personalizada, usar la imagen por defecto basada en género
    return getDefaultImageForUser(user);
  };

  return (
    <>
      <TouchableOpacity
        style={[
          styles.container,
          avatarSize,
          showBorder && {
            borderWidth: 2,
            borderColor: theme.primaryText,
          },
        ]}
        onPress={handlePress}
        onLongPress={handleLongPress}
        activeOpacity={0.7}
      >
        {user?.profileImg || user?.gender ? (
          <Image
            source={getProfileImage()}
            style={[styles.image, avatarSize]}
            resizeMode="cover"
          />
        ) : (
          <View
            style={[styles.placeholder, { backgroundColor: theme.primaryText }]}
          >
            <Text style={[styles.initials, { color: theme.background }]}>
              {getInitials(user?.firstName, user?.lastName)}
            </Text>
          </View>
        )}

        {editable && (
          <View
            style={[styles.editIcon, { backgroundColor: theme.primaryText }]}
          >
            <Ionicons
              name="camera"
              size={size * 0.25}
              color={theme.background}
            />
          </View>
        )}
      </TouchableOpacity>

      <ImagePickerModal
        visible={imagePickerVisible}
        onClose={() => setImagePickerVisible(false)}
        onImageSelected={handleImageSelected}
        currentGender={user?.gender}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    position: "relative",
  },
  image: {
    borderRadius: 20,
  },
  placeholder: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
  initials: {
    fontSize: 16,
    fontWeight: "bold",
  },
  editIcon: {
    position: "absolute",
    bottom: -2,
    right: -2,
    width: 16,
    height: 16,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "white",
  },
});

export default ProfileAvatar;
