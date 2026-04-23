import { queryClient } from "@/core/api/queryClient";
import CustomInput from "@/core/auth/CustomInput";
import CustomButton from "@/core/components/CustomButton";
import { useTheme } from "@/core/hooks/useTheme";
import {
  useRunningPreferences,
  useUpdateRunningPreferences,
} from "@/core/profile/useProfile";
import { Picker } from "@react-native-picker/picker";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

export interface RunningPreferences {
  id: string;
  preferredDistance: number;
  weeklyGoal: number;
  pace: string;
}
export interface Pace {
  BEGINNER: "BEGINNER";
  INTERMEDIATE: "INTERMEDIATE";
  ADVANCED: "ADVANCED";
  ELITE: "ELITE";
}
interface RunningPreferencesForm {
  preferredDistance?: number | undefined;
  weeklyGoal?: number | undefined;
  pace?: string | undefined;
}
const RunningPreferencesScreen = () => {
  const theme = useTheme();
  const user = useRunningPreferences();
  const { mutate: updateUser, isPending } = useUpdateRunningPreferences();
  const [form, setForm] = useState<RunningPreferencesForm>({
    preferredDistance: undefined,
    weeklyGoal: undefined,
    pace: undefined,
  });

  useEffect(() => {
    if (user.data) {
      setForm({
        preferredDistance: user.data.preferredDistance || undefined,
        weeklyGoal: user.data.weeklyGoal || undefined,
        pace: user.data.pace || "",
      });
    }
  }, [user.data]);

  const validateForm = (form: RunningPreferencesForm): string[] => {
    const errors: string[] = [];

    if (
      !form.preferredDistance ||
      form.preferredDistance <= 0 ||
      form.preferredDistance > 300
    ) {
      errors.push("Preferred distance must be between 1 and 300 km");
    }

    if (!form.weeklyGoal || form.weeklyGoal <= 0 || form.weeklyGoal > 500) {
      errors.push("Weekly goal must be between 1 and 500 km");
    }
    if (!form.pace) {
      errors.push("Pace level is required");
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
      preferredDistance: form.preferredDistance,
      weeklyGoal: form.weeklyGoal,
      pace: form.pace,
    };
    updateUser(updateData, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["user", "running"] });
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
          Running Preferences{" "}
        </Text>
        <CustomInput
          placeholder="Preferred distance (km)"
          icon="map"
          label="Preferred Distance"
          value={
            form.preferredDistance ? form.preferredDistance.toString() : ""
          }
          onChangeText={(text) =>
            setForm((prev) => ({
              ...prev,
              preferredDistance: text === "" ? undefined : Number(text),
            }))
          }
          labelColor={theme.primaryText}
          keyboardType="numeric"
        />
        <CustomInput
          placeholder="Weekly Goal (km)"
          icon="flag"
          label="Weekly Goal"
          value={form.weeklyGoal ? form.weeklyGoal.toString() : ""}
          onChangeText={(text) =>
            setForm((prev) => ({
              ...prev,
              weeklyGoal: text === "" ? undefined : Number(text),
            }))
          }
          labelColor={theme.primaryText}
          keyboardType="numeric"
        />
        <View style={styles.pickerContainer}>
          <Text style={[styles.label, { color: theme.primaryText }]}>
            Pace Level
          </Text>
          <View
            style={[
              styles.pickerWrapper,
              { borderColor: theme.tabIconDefault },
            ]}
          >
            <Picker
              selectedValue={form.pace}
              onValueChange={(value) =>
                setForm((prev) => ({ ...prev, pace: value }))
              }
              style={[
                styles.picker,
                {
                  color: theme.primaryText,
                  backgroundColor: theme.background,
                },
              ]}
            >
              <Picker.Item label="Select pace level" value="" />
              <Picker.Item label="Beginner" value="BEGINNER" />
              <Picker.Item label="Intermediate" value="INTERMEDIATE" />
              <Picker.Item label="Advanced" value="ADVANCED" />
              <Picker.Item label="Elite" value="ELITE" />
            </Picker>
          </View>
        </View>
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
  pickerContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
    fontFamily: "Roman",
  },
  pickerWrapper: {
    borderWidth: 1,
    borderRadius: 8,
    overflow: "hidden",
  },
  picker: {},
});

export default RunningPreferencesScreen;
