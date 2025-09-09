import { queryClient } from "@/core/api/queryClient";
import CustomInput from "@/core/auth/CustomInput";
import CustomButton from "@/core/components/CustomButton";
import { useTheme } from "@/core/hooks/useTheme";
import {
  usePersonalInfo,
  useUpdatePersonalInfo,
} from "@/core/profile/useProfile";
import { calculateAge } from "@/core/utils/formatters";
import Ionicons from "@expo/vector-icons/Ionicons";
import DateTimePicker from "@react-native-community/datetimepicker";

import { Picker } from "@react-native-picker/picker";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
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

interface PersonalInfoForm {
  firstName: string;
  lastName: string;
  birthDate?: string;
  gender?: string;
  bio?: string;
}

const PersonalInfoScreen = () => {
  const user = usePersonalInfo();
  const { mutate: updateUser, isPending } = useUpdatePersonalInfo();
  console.log("Current user:", user);
  const theme = useTheme();
  const [form, setForm] = useState<PersonalInfoForm>({
    firstName: "",
    lastName: "",
    birthDate: "",
    gender: "",
    bio: "",
  });
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  useEffect(() => {
    if (user.data) {
      setForm({
        firstName: user.data.firstName || "",
        lastName: user.data.lastName || "",
        birthDate: user.data.birthDate || "",
        gender: user.data.gender || "",
        bio: user.data.bio || "",
      });
      if (user.data.birthDate) {
        const parsedDate = new Date(user.data.birthDate);
        if (!isNaN(parsedDate.getTime())) {
          setSelectedDate(parsedDate);
        }
      } else {
        const defaultDate = new Date();
        defaultDate.setFullYear(defaultDate.getFullYear() - 25);
        setSelectedDate(defaultDate);
      }
    }
  }, [user.data]);

  const validateForm = (form: PersonalInfoForm): string[] => {
    const errors: string[] = [];

    if (!form.firstName.trim()) {
      errors.push("First name is required");
    }

    if (!form.lastName.trim()) {
      errors.push("Last name is required");
    }

    if (form.birthDate) {
      const birthDate = new Date(form.birthDate);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();

      if (
        monthDiff < 0 ||
        (monthDiff === 0 && today.getDate() < birthDate.getDate())
      ) {
        age--;
      }

      if (age < 13) {
        errors.push("You must be at least 13 years old");
      }

      if (birthDate > today) {
        errors.push("Birth date cannot be in the future");
      }
    }

    if (form.firstName.length < 2) {
      errors.push("First name must be at least 2 characters");
    }

    if (form.lastName.length < 2) {
      errors.push("Last name must be at least 2 characters");
    }

    return errors;
  };
  const formatDate = (date: Date): string => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };
  const handleDateChange = (event: any, date?: Date) => {
    if (Platform.OS === "android") {
      setShowDatePicker(false);
    }

    if (date) {
      setSelectedDate(date);
      setForm((prev) => ({
        ...prev,
        birthDate: date.toISOString(),
      }));
    }
  };

  const openDatePicker = () => {
    setShowDatePicker(true);
  };
  const handleSave = () => {
    const errors = validateForm(form);
    if (errors.length > 0) {
      Alert.alert("Validation Error", errors.join("\n"), [{ text: "OK" }]);
      return;
    }
    const updateData = {
      id: user.data?.id,
      ...form,
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

  if (user.isLoading) {
    return (
      <View
        style={[
          styles.container,
          {
            backgroundColor: theme.background,
            justifyContent: "center",
            alignItems: "center",
          },
        ]}
      >
        <Text style={{ color: theme.primaryText }}>Loading...</Text>
      </View>
    );
  }

  if (user.isError) {
    return (
      <View
        style={[
          styles.container,
          {
            backgroundColor: theme.background,
            justifyContent: "center",
            alignItems: "center",
          },
        ]}
      >
        <Text style={{ color: theme.primaryText }}>Error loading profile</Text>
      </View>
    );
  }

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
        {/* Date Picker Field */}
        <View style={styles.dateContainer}>
          <Text style={[styles.label, { color: theme.primaryText }]}>
            Birth Date
          </Text>
          <TouchableOpacity
            style={[styles.dateButton, { borderColor: theme.border }]}
            onPress={openDatePicker}
          >
            <Ionicons
              name="calendar"
              size={20}
              color={theme.primaryText}
              style={styles.dateIcon}
            />
            <Text style={[styles.dateText, { color: theme.primaryText }]}>
              {form.birthDate
                ? formatDate(selectedDate) + calculateAge(form.birthDate)
                : "Select your birth date"}
            </Text>
            <Ionicons name="chevron-down" size={20} color={theme.primaryText} />
          </TouchableOpacity>
        </View>

        {/* Date Picker Modal */}
        {showDatePicker && (
          <DateTimePicker
            value={selectedDate}
            mode="date"
            display={Platform.OS === "ios" ? "spinner" : "default"}
            onChange={handleDateChange}
            maximumDate={new Date()} // No future dates
            minimumDate={new Date(1900, 0, 1)} // Reasonable minimum
          />
        )}
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
              <Picker.Item label="Male" value="MALE" />
              <Picker.Item label="Female" value="FEMALE" />
              <Picker.Item label="Other" value="OTHER" />
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
          disabled={isPending}
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
  dateContainer: {
    marginBottom: 16,
  },
  dateButton: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    minHeight: 50,
  },
  dateIcon: {
    marginRight: 10,
  },
  dateText: {
    flex: 1,
    fontSize: 16,
    fontFamily: "Roman",
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
