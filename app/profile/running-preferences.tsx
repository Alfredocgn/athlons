import CustomInput from "@/core/auth/CustomInput";
import CustomButton from "@/core/components/CustomButton";
import { useTheme } from "@/core/hooks/useTheme";
import { Picker } from "@react-native-picker/picker";
import { router } from "expo-router";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

interface RunningPreferencesForm {
  preferredDistance?: string;
  weeklyGoal?: string;
  pace?: string;
}
const RunningPreferencesScreen = () => {
  const theme = useTheme();
  const [form, setForm] = useState<RunningPreferencesForm>({
    preferredDistance: "",
    weeklyGoal: "",
    pace: "",
  });

  const handleSave = () => {
    console.log("Saving Running preferenes", form);
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
          Running Preferences{" "}
        </Text>
        <CustomInput
          placeholder="Preferred distance (km)"
          icon="map"
          label="Preferred Distance"
          value={form.preferredDistance}
          onChangeText={(text) =>
            setForm((prev) => ({ ...prev, preferredDistance: text }))
          }
          labelColor={theme.primaryText}
          keyboardType="numeric"
        />
        <CustomInput
          placeholder="Weekly Goal (km)"
          icon="flag"
          label="Weekly Goal"
          value={form.weeklyGoal}
          onChangeText={(text) =>
            setForm((prev) => ({ ...prev, weeklyGoal: text }))
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
              <Picker.Item label="Beginner" value="beginner" />
              <Picker.Item label="Intermediate" value="intermediate" />
              <Picker.Item label="Advanced" value="advanced" />
              <Picker.Item label="Elite" value="elite" />
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
