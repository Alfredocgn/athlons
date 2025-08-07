import CustomInput from "@/core/auth/CustomInput";
import { useLogin } from "@/core/auth/hooks/useAuth";
import CustomButton from "@/core/components/CustomButton";
import { useTheme } from "@/core/hooks/useTheme";
import { isValidEmail, isValidPassword } from "@/core/utils/stringValidators";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface LoginForm {
  email: string;
  password: string;
}
interface FormErrors {
  email: string;
  password: string;
}

const LoginScreen = () => {
  const loginMutation = useLogin();
  const [loginForm, setLoginForm] = useState<LoginForm>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<FormErrors>({
    email: "",
    password: "",
  });

  const validateForm = (): boolean => {
    const newErrors: FormErrors = { email: "", password: "" };
    let isValid = true;

    if (!loginForm.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!isValidEmail(loginForm.email)) {
      newErrors.email = "Invalid email";
      isValid = false;
    }

    if (!loginForm.password.trim()) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (!isValidPassword(loginForm.password)) {
      newErrors.password = "Invalid password";
      isValid = false;
    }
    setErrors(newErrors);
    return isValid;
  };

  const handleLogin = async () => {
    if (validateForm()) {
      try {
        console.log("Intentando login con:", loginForm);
        await loginMutation.mutateAsync(loginForm);
        console.log("Login exitoso");
        router.push("/(tabs)/home");
      } catch (error) {
        console.error("Error de login:", error);
        // Aquí puedes mostrar un mensaje de error al usuario
        alert("Error al iniciar sesión. Verifica tus credenciales.");
      }
    }
  };

  const updateForm = (field: keyof LoginForm, value: string) => {
    setLoginForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const isFormValid =
    loginForm.email.trim() &&
    loginForm.password.trim() &&
    isValidEmail(loginForm.email) &&
    loginForm.password.length >= 8;

  const theme = useTheme();
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
          paddingTop: 40,
          justifyContent: "center",
        }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={[styles.title, { color: theme.primaryText }]}>
          Athlons
        </Text>
        <CustomInput
          placeholder="Email"
          icon="mail"
          label="Email"
          value={loginForm.email}
          onChangeText={(text) => updateForm("email", text)}
          error={errors.email}
          autoCapitalize="none"
          keyboardType="email-address"
          labelColor={theme.primaryText}
        />
        <CustomInput
          placeholder="Password"
          icon="lock-closed"
          label="Password"
          showPasswordToggle={true}
          secureTextEntry={true}
          value={loginForm.password}
          onChangeText={(text) => updateForm("password", text)}
          error={errors.password}
          labelColor={theme.primaryText}
        />
        {(errors.email || errors.password) && (
          <View style={{ marginVertical: 10 }}>
            {errors.email && (
              <Text style={{ color: "red", fontSize: 12 }}>{errors.email}</Text>
            )}
            {errors.password && (
              <Text style={{ color: "red", fontSize: 12 }}>
                {errors.password}
              </Text>
            )}
          </View>
        )}
        <CustomButton
          textStyle={{
            fontFamily: "Roman",
            color: isFormValid ? theme.primaryText : theme.secondaryText,
          }}
          style={{
            backgroundColor: isFormValid
              ? theme.background
              : theme.disabledBackground,
            borderWidth: 2,
            borderColor: isFormValid ? theme.primaryText : theme.disabledBorder,
            opacity: isFormValid ? 1 : 0.6,
          }}
          onPress={handleLogin}
          disabled={!isFormValid}
        >
          Login
        </CustomButton>
        <View style={styles.signUpContainer}>
          <Text style={[styles.signUpText, { color: theme.primaryText }]}>
            No Athlons Account?
          </Text>
          <TouchableOpacity onPress={() => router.push("/auth/register")}>
            <Text
              style={[
                styles.signUpText,
                {
                  color: theme.primaryText,
                  borderBottomWidth: 2,
                  borderBottomColor: theme.primaryText,
                },
              ]}
            >
              Sign Up
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
    textShadowColor: "#000",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
    alignSelf: "center",
    marginBottom: 10,
  },
  signUpContainer: {
    marginTop: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  signUpText: {
    fontFamily: "Roman",
  },
});

export default LoginScreen;
