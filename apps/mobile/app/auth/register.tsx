import { queryClient } from "@/core/api/queryClient";
import CustomInput from "@/core/auth/CustomInput";
import { useRegister } from "@/core/auth/hooks/useAuth";
import CustomButton from "@/core/components/CustomButton";
import { useTheme } from "@/core/hooks/useTheme";
import { isValidEmail, isValidPassword } from "@/core/utils/stringValidators";
import { router } from "expo-router";
import React, { useState } from "react";
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

interface RegisterForm {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}
interface FormErrors {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}
const Register = () => {
  const theme = useTheme();
  const { mutate: registerUser, isPending } = useRegister();

  const [registerForm, setRegisterForm] = useState<RegisterForm>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<FormErrors>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    };
    let isValid = true;
    if (!registerForm.firstName.trim()) {
      newErrors.firstName = "First name is required";
      isValid = false;
    } else if (registerForm.firstName.trim().length < 2) {
      newErrors.firstName = "First name must be at least 2 characters";
      isValid = false;
    }
    if (!registerForm.lastName.trim()) {
      newErrors.lastName = "Last name is required";
      isValid = false;
    } else if (registerForm.lastName.trim().length < 2) {
      newErrors.lastName = "Last name must be at least 2 characters";
      isValid = false;
    }
    if (!registerForm.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!isValidEmail(registerForm.email)) {
      newErrors.email = "Invalid email format";
      isValid = false;
    }

    if (!registerForm.password.trim()) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (!isValidPassword(registerForm.password)) {
      newErrors.password =
        "Password must be at least 8 characters with uppercase,lowercase, number and special character";
      isValid = false;
    }

    if (!registerForm.confirmPassword.trim()) {
      newErrors.confirmPassword = "Please confirm your password";
      isValid = false;
    } else if (registerForm.password !== registerForm.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      isValid = false;
    }
    setErrors(newErrors);
    return isValid;
  };

  const handleRegister = () => {
    if (validateForm()) {
      const { confirmPassword, ...registerData } = registerForm;
      registerUser(registerData, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["user"] });
          router.replace("/(tabs)/home");
        },
        onError: (error) => {
          const errorMessage =
            (error as any)?.response?.data?.errors?.[0]?.message ||
            "An unexpected error occurred. Please try again.";
          console.log(errorMessage);
          Alert.alert("Registration Failed", errorMessage, [{ text: "OK" }]);
        },
      });
    }
  };

  const updateForm = (field: keyof RegisterForm, value: string) => {
    const processedValue = field === "email" ? value.toLowerCase() : value;
    setRegisterForm((prev) => ({ ...prev, [field]: processedValue }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const isFormValid =
    registerForm.firstName.trim() &&
    registerForm.lastName.trim() &&
    registerForm.email.trim() &&
    registerForm.password.trim() &&
    registerForm.confirmPassword.trim() &&
    isValidEmail(registerForm.email) &&
    isValidPassword(registerForm.password) &&
    registerForm.confirmPassword === registerForm.password;

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
    >
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: 20,
          paddingTop: 20,
          justifyContent: "center",
        }}
      >
        <Text style={[styles.title, { color: theme.primaryText }]}>
          Join Athlons
        </Text>
        <CustomInput
          placeholder="First Name"
          icon="person"
          label="First Name"
          value={registerForm.firstName}
          onChangeText={(text) => updateForm("firstName", text)}
          error={errors.firstName}
          labelColor={theme.primaryText}
          autoCapitalize="words"
        />
        <CustomInput
          placeholder="Last Name"
          icon="person"
          label="Last Name"
          value={registerForm.lastName}
          onChangeText={(text) => updateForm("lastName", text)}
          error={errors.lastName}
          labelColor={theme.primaryText}
          autoCapitalize="words"
        />
        <CustomInput
          placeholder="Email"
          icon="mail"
          label="Email"
          keyboardType="email-address"
          value={registerForm.email}
          onChangeText={(text) => updateForm("email", text)}
          error={errors.email}
          labelColor={theme.primaryText}
        />
        <CustomInput
          placeholder="Password"
          icon="lock-closed"
          label="Password"
          value={registerForm.password}
          onChangeText={(text) => updateForm("password", text)}
          error={errors.password}
          labelColor={theme.primaryText}
          showPasswordToggle={true}
          secureTextEntry={true}
        />
        <CustomInput
          placeholder="Confirm Password"
          icon="lock-closed"
          label="Confirm Password"
          value={registerForm.confirmPassword}
          onChangeText={(text) => updateForm("confirmPassword", text)}
          error={errors.confirmPassword}
          labelColor={theme.primaryText}
          showPasswordToggle={true}
          secureTextEntry={true}
        />
        {(errors.firstName ||
          errors.lastName ||
          errors.email ||
          errors.password ||
          errors.confirmPassword) && (
          <View style={{ marginVertical: 10 }}>
            {errors.firstName && (
              <Text style={{ color: "red", fontSize: 12 }}>
                {errors.firstName}
              </Text>
            )}
            {errors.lastName && (
              <Text style={{ color: "red", fontSize: 12 }}>
                {errors.lastName}
              </Text>
            )}
            {errors.email && (
              <Text style={{ color: "red", fontSize: 12 }}>{errors.email}</Text>
            )}
            {errors.password && (
              <Text style={{ color: "red", fontSize: 12 }}>
                {errors.password}
              </Text>
            )}
            {errors.confirmPassword && (
              <Text style={{ color: "red", fontSize: 12 }}>
                {errors.confirmPassword}
              </Text>
            )}
          </View>
        )}

        <CustomButton
          textStyle={{
            fontFamily: "Roman",
            color:
              isFormValid && !isPending
                ? theme.primaryText
                : theme.secondaryText,
          }}
          style={{
            backgroundColor:
              isFormValid && !isPending
                ? theme.background
                : theme.disabledBackground,
            borderWidth: 2,
            borderColor:
              isFormValid && !isPending
                ? theme.primaryText
                : theme.disabledBorder,
            opacity: isFormValid && !isPending ? 1 : 0.6,
            marginTop: 20,
          }}
          onPress={handleRegister}
          disabled={!isFormValid || isPending}
        >
          {isPending ? "Creating Account..." : "Create Account"}
        </CustomButton>
        <View style={styles.signInContainer}>
          <Text
            style={[
              styles.signInText,
              {
                color: theme.primaryText,
                textAlign: "center",
                marginBottom: 10,
              },
            ]}
          >
            Already have an Athlons Account?
          </Text>
          <TouchableOpacity onPress={() => router.push("/auth/login")}>
            <Text
              style={[
                styles.signInText,
                {
                  color: theme.primaryText,
                  borderBottomWidth: 2,
                  borderBottomColor: theme.primaryText,
                },
              ]}
            >
              Sign In
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontFamily: "Roman",
    fontSize: 40,
    textAlign: "center",
    marginBottom: 20,
    textShadowColor: "#000",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  signInContainer: {
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  signInText: {
    fontFamily: "Roman",
  },
});

export default Register;
