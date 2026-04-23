import { queryClient } from "@/core/api/queryClient";
import CustomInput from "@/core/auth/CustomInput";
import CustomButton from "@/core/components/CustomButton";
import { useTheme } from "@/core/hooks/useTheme";
import {
  usePhysicalInfo,
  useUpdatePhysicalInfo,
} from "@/core/profile/useProfile";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface PhysicalForm {
  height?: number | undefined;
  weight?: number | undefined;
  profileImage?: string | null;
}
const PhysicalInfoScreen = () => {
  const user = usePhysicalInfo();
  const { mutate: updateUser, isPending } = useUpdatePhysicalInfo();
  const theme = useTheme();
  const [form, setForm] = useState<PhysicalForm>({
    height: undefined,
    weight: undefined,
    profileImage: null,
  });

  useEffect(() => {
    if (user.data) {
      setForm({
        height: user.data.height ? user.data.height : undefined,
        weight: user.data.weight ? user.data.weight : undefined,
        profileImage: user.data.profileImg || null,
      });
    }
  }, [user.data]);

  const validateForm = (form: PhysicalForm): string[] => {
    const errors: string[] = [];

    if (!form.height || form.height <= 0 || form.height > 300) {
      errors.push("Height must be between 1 and 300 cm");
    }

    if (!form.weight || form.weight <= 0 || form.weight > 500) {
      errors.push("Weight must be between 1 and 500 kg");
    }

    return errors;
  };

  const handleSave = () => {
    const errors = validateForm(form);
    if (errors.length > 0) {
      Alert.alert("Validation Error", errors.join("\n"), [{ text: "OK" }]);
      return;
    }
    const updateData = {
      id: user.data?.id,
      height: form.height,
      weight: form.weight,
      profileImg: form.profileImage,
    };
    updateUser(updateData, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["user"] });
        Alert.alert("Success", "Profile updated successfully!", [
          {
            text: "OK",
            onPress: () => router.back(),
          },
        ]);
      },
      onError: (error) => {
        const errorMessage =
          (error as any)?.response?.data?.errors?.[0]?.message ||
          "An unexpected error occurred. Please try again.";
        console.log(errorMessage);
        Alert.alert("Registration Failed", errorMessage, [{ text: "OK" }]);
      },
    });
  };

  const handleImagePicker = () => {
    console.log("Open image picker");
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: theme.background }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={[styles.title, { color: theme.primaryText }]}>
          Physical Information
        </Text>
        <View style={styles.imageSection}>
          <Text style={[styles.sectionTitle, { color: theme.primaryText }]}>
            Profile Picture
          </Text>
          <TouchableOpacity
            style={[styles.imageContainer, { borderColor: theme.primaryText }]}
            onPress={handleImagePicker}
          >
            <Ionicons name="camera" size={40} color={theme.primaryText} />
            <Text style={[styles.imageText, { color: theme.primaryText }]}>
              Tap to add a photo
            </Text>
          </TouchableOpacity>
        </View>
        <CustomInput
          placeholder="Height (cm)"
          icon="resize"
          label="Height (cm)"
          value={form.height?.toString() || ""}
          onChangeText={(text) =>
            setForm((prev) => ({
              ...prev,
              height: text === "" ? undefined : Number(text),
            }))
          }
          labelColor={theme.primaryText}
          keyboardType="numeric"
        />
        <CustomInput
          placeholder="Weight (kg)"
          icon="scale"
          label="Weight (Kg)"
          value={form.weight?.toString() || ""}
          onChangeText={(text) =>
            setForm((prev) => ({
              ...prev,
              weight: text === "" ? undefined : Number(text),
            }))
          }
          labelColor={theme.primaryText}
          keyboardType="numeric"
        />
        <CustomButton
          textStyle={{
            fontFamily: "Roman",
            color: theme.primaryText,
          }}
          style={{
            backgroundColor: theme.background,
            marginTop: 20,
            borderWidth: 1,
            borderColor: theme.text,
          }}
          disabled={isPending}
          onPress={handleSave}
        >
          Save Changes
        </CustomButton>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
  },
  title: {
    fontFamily: "Roman",
    fontSize: 28,
    textAlign: "center",
    marginBottom: 30,
  },
  imageSection: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontFamily: "Roman",
    fontSize: 18,
    marginBottom: 15,
  },
  imageContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderStyle: "dashed",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  imageText: {
    fontFamily: "Roman",
    fontSize: 10,
    marginTop: 5,
    textAlign: "center",
  },
});

export default PhysicalInfoScreen;
