import { useImagePicker } from "@/core/hooks/useImagePicker";
import { useTheme } from "@/core/hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface ImagePickerModalProps {
  visible: boolean;
  onClose: () => void;
  onImageSelected: (imageUri: string) => void;
  currentGender?: string;
}

const ImagePickerModal: React.FC<ImagePickerModalProps> = ({
  visible,
  onClose,
  onImageSelected,
  currentGender,
}) => {
  const theme = useTheme();
  const { loading, pickImageFromGallery, takePhotoWithCamera } =
    useImagePicker();

  const handleGalleryPress = async () => {
    const result = await pickImageFromGallery();
    if (result) {
      onImageSelected(result.uri);
      onClose();
    }
  };

  const handleCameraPress = async () => {
    const result = await takePhotoWithCamera();
    if (result) {
      onImageSelected(result.uri);
      onClose();
    }
  };

  const handleRemovePhoto = () => {
    const genderText = currentGender
      ? ` (will show ${
          currentGender === "female" ? "Amazon" : "Spartan"
        } default)`
      : "";

    Alert.alert(
      "Remove Profile Picture",
      `Are you sure you want to remove your profile picture?${genderText}`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Remove",
          style: "destructive",
          onPress: () => {
            onImageSelected("");
            onClose();
          },
        },
      ]
    );
  };

  const getGenderBasedDescription = () => {
    if (!currentGender) return "";

    const gender = currentGender.toLowerCase();
    const defaultImage = gender === "female" ? "Amazon" : "Spartan";

    return ` (will show ${defaultImage} default)`;
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.primaryText }]}>
            Update Profile Picture
          </Text>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Ionicons name="close" size={24} color={theme.primaryText} />
          </TouchableOpacity>
        </View>

        {/* Info about default images */}
        {currentGender && (
          <View
            style={[
              styles.infoContainer,
              { backgroundColor: theme.primaryText + "10" },
            ]}
          >
            <Ionicons
              name="information-circle"
              size={20}
              color={theme.primaryText}
            />
            <Text style={[styles.infoText, { color: theme.primaryText }]}>
              Default profile images:{" "}
              {currentGender === "female" ? "Amazon" : "Spartan"} (based on your
              gender)
            </Text>
          </View>
        )}

        {/* Options */}
        <View style={styles.optionsContainer}>
          <TouchableOpacity
            style={[styles.option, { backgroundColor: theme.background }]}
            onPress={handleCameraPress}
            disabled={loading}
            activeOpacity={0.7}
          >
            <View
              style={[
                styles.iconContainer,
                { backgroundColor: theme.primaryText },
              ]}
            >
              <Ionicons name="camera" size={24} color="white" />
            </View>
            <Text style={[styles.optionTitle, { color: theme.primaryText }]}>
              Take Photo
            </Text>
            <Text
              style={[styles.optionDescription, { color: theme.secondaryText }]}
            >
              Use your camera to take a new photo
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.option, { backgroundColor: theme.background }]}
            onPress={handleGalleryPress}
            disabled={loading}
            activeOpacity={0.7}
          >
            <View
              style={[
                styles.iconContainer,
                { backgroundColor: theme.primaryText },
              ]}
            >
              <Ionicons name="images" size={24} color="white" />
            </View>
            <Text style={[styles.optionTitle, { color: theme.primaryText }]}>
              Choose from Gallery
            </Text>
            <Text
              style={[styles.optionDescription, { color: theme.secondaryText }]}
            >
              Select an existing photo from your gallery
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.option,
              styles.removeOption,
              { backgroundColor: theme.error + "20" },
            ]}
            onPress={handleRemovePhoto}
            disabled={loading}
            activeOpacity={0.7}
          >
            <View
              style={[styles.iconContainer, { backgroundColor: theme.error }]}
            >
              <Ionicons name="trash" size={24} color="white" />
            </View>
            <Text style={[styles.optionTitle, { color: theme.error }]}>
              Remove Photo
            </Text>
            <Text
              style={[styles.optionDescription, { color: theme.secondaryText }]}
            >
              Remove your current profile picture{getGenderBasedDescription()}
            </Text>
          </TouchableOpacity>
        </View>

        {loading && (
          <View style={styles.loadingContainer}>
            <Text style={[styles.loadingText, { color: theme.secondaryText }]}>
              Processing image...
            </Text>
          </View>
        )}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  closeButton: {
    padding: 4,
  },
  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 12,
    borderRadius: 8,
    gap: 8,
  },
  infoText: {
    fontSize: 14,
    flex: 1,
    lineHeight: 20,
  },
  optionsContainer: {
    paddingHorizontal: 20,
    gap: 16,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  removeOption: {
    borderWidth: 1,
    borderColor: "#FF6B6B",
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  optionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 4,
  },
  optionDescription: {
    fontSize: 14,
    opacity: 0.8,
  },
  loadingContainer: {
    alignItems: "center",
    paddingVertical: 20,
  },
  loadingText: {
    fontSize: 16,
  },
});

export default ImagePickerModal;
