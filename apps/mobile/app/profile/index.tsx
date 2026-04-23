import { useTheme } from "@/core/hooks/useTheme";
import { useUser } from "@/core/profile/useProfile";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import CustomButton from "@/core/components/CustomButton";
import ImagePickerModal from "@/core/components/profile/ImagePickerModal";
import { useDefaultProfileImage } from "@/core/profile/useDefaultProfileImage";
import { useProfileImage } from "@/core/profile/useProfileImage";
import { Ionicons } from "@expo/vector-icons";

const ProfileScreen = () => {
  const theme = useTheme();
  const { data: user, isLoading } = useUser();
  const { handleImageSelection, showUpdateSuccessAlert, showUpdateErrorAlert } =
    useProfileImage();
  const { getDefaultImageForUser } = useDefaultProfileImage();
  const [imagePickerVisible, setImagePickerVisible] = useState(false);

  const handleImageSelected = async (imageUri: string) => {
    const result = await handleImageSelection();

    if (result.success) {
      showUpdateSuccessAlert(result.newImageUri || null);
    } else {
      showUpdateErrorAlert(result.error || "Unknown error");
    }
  };

  const profileMenuItems = [
    {
      title: "Personal Information",
      subtitle: "Name, email, and basic info",
      icon: "person-outline",
      route: "/profile/personal-info",
    },
    {
      title: "Physical Information",
      subtitle: "Height, weight, and body metrics",
      icon: "body-outline",
      route: "/profile/physical-info",
    },
    {
      title: "Running Preferences",
      subtitle: "Pace, distance, and training goals",
      icon: "fitness-outline",
      route: "/profile/running-preferences",
    },
  ];

  const getInitials = (firstName?: string, lastName?: string) => {
    const first = firstName?.charAt(0) || "";
    const last = lastName?.charAt(0) || "";
    return (first + last).toUpperCase();
  };

  const getProfileImage = () => {
    // Si el usuario tiene una imagen personalizada, usarla
    if (user?.profileImg) {
      return { uri: user.profileImg };
    }

    // Si no tiene imagen personalizada, usar la imagen por defecto basada en género
    return getDefaultImageForUser(user);
  };

  const showGenderBasedImage = () => {
    // Solo mostrar imagen por defecto si tiene género definido
    return user?.profileImg || user?.gender;
  };

  if (isLoading) {
    return (
      <SafeAreaView
        style={[styles.container, { backgroundColor: theme.background }]}
      >
        <View style={styles.loadingContainer}>
          <Text style={[styles.loadingText, { color: theme.primaryText }]}>
            Loading profile...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={24} color={theme.primaryText} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: theme.primaryText }]}>
            Profile
          </Text>
          <View style={styles.placeholder} />
        </View>

        {/* Profile Section */}
        <View style={[styles.profileSection, { backgroundColor: "white" }]}>
          <TouchableOpacity
            style={styles.avatarContainer}
            onPress={() => setImagePickerVisible(true)}
            activeOpacity={0.7}
          >
            {showGenderBasedImage() ? (
              <Image
                source={getProfileImage()}
                style={styles.avatar}
                resizeMode="cover"
              />
            ) : (
              <View
                style={[
                  styles.avatarPlaceholder,
                  { backgroundColor: theme.primaryText },
                ]}
              >
                <Text
                  style={[styles.avatarInitials, { color: theme.background }]}
                >
                  {getInitials(user?.firstName, user?.lastName)}
                </Text>
              </View>
            )}

            <View
              style={[
                styles.editButton,
                { backgroundColor: theme.primaryText },
              ]}
            >
              <Ionicons name="camera" size={16} color="white" />
            </View>
          </TouchableOpacity>

          <View style={styles.userInfo}>
            <Text style={[styles.userName, { color: theme.primaryText }]}>
              {user?.firstName && user?.lastName
                ? `${user.firstName} ${user.lastName}`
                : "Complete your profile"}
            </Text>
            <Text style={[styles.userEmail, { color: theme.secondaryText }]}>
              {user?.email || "No email provided"}
            </Text>

            {/* Gender indicator */}
            {user?.gender && (
              <View style={styles.genderContainer}>
                <Ionicons
                  name={
                    user.gender.toLowerCase() === "female" ? "female" : "male"
                  }
                  size={16}
                  color={theme.secondaryText}
                />
                <Text
                  style={[styles.genderText, { color: theme.secondaryText }]}
                >
                  {user.gender.charAt(0).toUpperCase() + user.gender.slice(1)}
                </Text>
              </View>
            )}
          </View>
        </View>

        {/* Menu Items */}
        <View style={styles.menuSection}>
          {profileMenuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.menuItem, { backgroundColor: "white" }]}
              onPress={() => router.push(item.route as any)}
              activeOpacity={0.7}
            >
              <View style={styles.menuItemLeft}>
                <View
                  style={[
                    styles.menuIcon,
                    { backgroundColor: theme.primaryText },
                  ]}
                >
                  <Ionicons name={item.icon as any} size={20} color="white" />
                </View>
                <View style={styles.menuItemText}>
                  <Text
                    style={[styles.menuItemTitle, { color: theme.primaryText }]}
                  >
                    {item.title}
                  </Text>
                  <Text
                    style={[
                      styles.menuItemSubtitle,
                      { color: theme.secondaryText },
                    ]}
                  >
                    {item.subtitle}
                  </Text>
                </View>
              </View>
              <Ionicons
                name="chevron-forward"
                size={20}
                color={theme.secondaryText}
              />
            </TouchableOpacity>
          ))}
        </View>

        {/* Stats Section */}
        <View style={[styles.statsSection, { backgroundColor: "white" }]}>
          <Text style={[styles.sectionTitle, { color: theme.primaryText }]}>
            Your Stats
          </Text>

          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: theme.primaryText }]}>
                {user?.weeklyGoal || 0}
              </Text>
              <Text style={[styles.statLabel, { color: theme.secondaryText }]}>
                Weekly Goal (km)
              </Text>
            </View>

            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: theme.primaryText }]}>
                {user?.preferredDistance || 0}
              </Text>
              <Text style={[styles.statLabel, { color: theme.secondaryText }]}>
                Preferred Distance (km)
              </Text>
            </View>

            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: theme.primaryText }]}>
                {user?.pace || "--"}
              </Text>
              <Text style={[styles.statLabel, { color: theme.secondaryText }]}>
                Target Pace
              </Text>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionSection}>
          <CustomButton
            size="large"
            icon="settings-outline"
            onPress={() => {
              // Navegar a configuración si existe
              console.log("Navigate to settings");
            }}
            style={[
              styles.actionButton,
              { backgroundColor: theme.primaryText },
            ]}
            textStyle={[styles.actionButtonText, { color: theme.background }]}
          >
            Settings
          </CustomButton>
        </View>
      </ScrollView>

      <ImagePickerModal
        visible={imagePickerVisible}
        onClose={() => setImagePickerVisible(false)}
        onImageSelected={handleImageSelected}
        currentGender={user?.gender}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  placeholder: {
    width: 32,
  },
  profileSection: {
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 16,
    padding: 24,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  avatarContainer: {
    position: "relative",
    marginBottom: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  avatarPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarInitials: {
    fontSize: 32,
    fontWeight: "bold",
  },
  editButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "white",
  },
  userInfo: {
    alignItems: "center",
  },
  userName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 16,
    opacity: 0.8,
    marginBottom: 8,
  },
  genderContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  genderText: {
    fontSize: 14,
    opacity: 0.8,
  },
  menuSection: {
    marginHorizontal: 20,
    marginBottom: 20,
    gap: 12,
  },
  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  menuItemLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  menuItemText: {
    flex: 1,
  },
  menuItemTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 2,
  },
  menuItemSubtitle: {
    fontSize: 14,
    opacity: 0.8,
  },
  statsSection: {
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  statItem: {
    alignItems: "center",
    flex: 1,
  },
  statValue: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    textAlign: "center",
    opacity: 0.8,
  },
  actionSection: {
    marginHorizontal: 20,
    marginBottom: 40,
  },
  actionButton: {
    borderRadius: 12,
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: "600",
  },
});

export default ProfileScreen;
