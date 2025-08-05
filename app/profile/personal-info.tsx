import CustomInput from "@/core/auth/CustomInput";
import CustomButton from "@/core/components/CustomButton";
import { useTheme } from "@/core/hooks/useTheme";

import { Picker } from "@react-native-picker/picker";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

interface PersonalInfoForm {
  firstName: string;
  lastName: string;
  birthDate?: string;
  gender?: string;
  bio?: string;
}

const PersonalInfoScreen = () => {
  const theme = useTheme();
  const [form, setForm] = useState<PersonalInfoForm>({
    firstName: "",
    lastName: "",
    birthDate: "",
    gender: "",
    bio: "",
  });

  const handleSave = () => {
    console.log("Saving personal info:", form);
    router.back();
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
          Personal Information
        </Text>
        <CustomInput
          placeholder="First Name"
          icon="person"
          label="First Name"
          value={form.firstName}
          onChangeText={(text) =>
            setForm((prev) => ({ ...prev, firstName: text }))
          }
          labelColor={theme.primaryText}
        />
        <CustomInput
          placeholder="Last Name"
          icon="person"
          label="Last Name"
          value={form.lastName}
          onChangeText={(text) =>
            setForm((prev) => ({ ...prev, lastName: text }))
          }
          labelColor={theme.primaryText}
        />
        <CustomInput
          placeholder="MM/DD/YYYY"
          icon="calendar"
          label="Birth Date"
          value={form.birthDate}
          onChangeText={(text) =>
            setForm((prev) => ({ ...prev, birthDate: text }))
          }
          labelColor={theme.primaryText}
        />
        <View style={styles.pickerContainer}>
          <Text style={[styles.label, { color: theme.primaryText }]}>
            Gender
          </Text>
          <View style={[styles.pickerWrapper, { borderColor: theme.border }]}>
            <Picker
              selectedValue={form.gender}
              onValueChange={(value) =>
                setForm((prev) => ({ ...prev, gender: value }))
              }
              style={[
                styles.picker,
                {
                  color: theme.primaryText,
                  backgroundColor: theme.background,
                },
              ]}
            >
              <Picker.Item label="Select gender" value="" />
              <Picker.Item label="Male" value="male" />
              <Picker.Item label="Female" value="female" />
              <Picker.Item label="Other" value="other" />
              <Picker.Item label="Prefer not to say" value="not_specified" />
            </Picker>
          </View>
        </View>
        <CustomInput
          placeholder="Tell us about yourself"
          icon="chatbubble"
          label="Bio"
          value={form.bio}
          onChangeText={(text) => setForm((prev) => ({ ...prev, bio: text }))}
          labelColor={theme.primaryText}
          multiline
          numberOfLines={3}
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
  pickerContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: 600,
    marginBottom: 8,
    fontFamily: "Roman",
  },
  pickerWrapper: {
    borderWidth: 1,
    borderRadius: 8,
    overflow: "hidden", // Importante para que el border funcione
  },
  picker: {},
});

export default PersonalInfoScreen;
