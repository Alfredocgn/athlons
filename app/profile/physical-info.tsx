import CustomInput from "@/core/auth/CustomInput";
import CustomButton from "@/core/components/CustomButton";
import { useTheme } from "@/core/hooks/useTheme";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface PhysicalForm {
  height?: string;
  weight?: string;
  profileImage?: string | null;
}
const PhysicalInfoScreen = () => {
  const theme = useTheme();
  const [form, setForm] = useState<PhysicalForm>({
    height: "",
    weight: "",
    profileImage: null,
  });

  const handleSave = () => {
    console.log("Saving physical info:", form);
    router.back();
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
          label="Height"
          value={form.height}
          onChangeText={(text) =>
            setForm((prev) => ({ ...prev, height: text }))
          }
          labelColor={theme.primaryText}
          keyboardType="numeric"
        />
        <CustomInput
          placeholder="Weight (kg)"
          icon="scale"
          label="Weight"
          value={form.weight}
          onChangeText={(text) =>
            setForm((prev) => ({ ...prev, weight: text }))
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
