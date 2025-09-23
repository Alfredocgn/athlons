import { useTheme } from "@/core/hooks/useTheme";
import { useUser } from "@/core/profile/useProfile";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

interface ProfileAvatarProps {
  size?: number;
  showBorder?: boolean;
}

const ProfileAvatar = ({
  size = 40,
  showBorder = true,
}: ProfileAvatarProps) => {
  const theme = useTheme();
  const { data: user, isLoading } = useUser();

  const handlePress = () => {
    router.push("/(tabs)/profile");
  };

  const avatarSize = {
    width: size,
    height: size,
    borderRadius: size / 2,
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
      {user?.profileImg ? (
        <Image
          source={{ uri: user.profileImg }}
          style={[styles.image, avatarSize]}
          resizeMode="cover"
        />
      ) : (
        <View
          style={[styles.placeholder, { backgroundColor: theme.primaryText }]}
        >
          <Ionicons name="person" size={size * 0.6} color={theme.background} />
        </View>
      )}
    </TouchableOpacity>
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
});

export default ProfileAvatar;
