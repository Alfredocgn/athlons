import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useState } from "react";
import {
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import { useThemeColor } from "../hooks/useThemeColor";

interface CustomInputProps extends TextInputProps {
  label?: string;
  error?: string;
  icon?: keyof typeof Ionicons.glyphMap;
  iconPosition?: "left" | "right";
  containerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  showPasswordToggle?: boolean;
  labelColor?: string;
}
const CustomInput = ({
  label,
  error,
  icon,
  iconPosition = "left",
  containerStyle,
  inputStyle,
  showPasswordToggle = false,
  secureTextEntry,
  labelColor,
  style,
  ...rest
}: CustomInputProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const textColor = useThemeColor({}, "text");
  const backgroundColor = useThemeColor({}, "background");
  const borderColor = useThemeColor({}, "border");
  const errorColor = "#ff4444";

  const IconElement = icon ? (
    <Ionicons
      name={icon}
      size={20}
      color={isFocused ? textColor : "grey"}
      style={{ marginHorizontal: 8 }}
    />
  ) : null;

  const PasswordToggleIcon = showPasswordToggle ? (
    <Ionicons
      name={isPasswordVisible ? "eye-off" : "eye"}
      size={20}
      color={textColor}
      style={{ marginHorizontal: 8 }}
      onPress={() => setIsPasswordVisible(!isPasswordVisible)}
    />
  ) : null;

  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <Text style={[styles.label, { color: labelColor || textColor }]}>
          {label}
        </Text>
      )}
      <View
        style={[
          styles.inputContainer,
          {
            borderColor: error
              ? errorColor
              : isFocused
              ? "#007bbf"
              : borderColor,
            backgroundColor: backgroundColor,
          },
          isFocused && styles.focused,
        ]}
      >
        {iconPosition === "left" && IconElement}
        <TextInput
          style={[
            styles.input,
            { color: textColor, flex: 1 },
            inputStyle,
            style,
          ]}
          placeholderTextColor={useThemeColor({}, "tabIconDefault")}
          secureTextEntry={
            showPasswordToggle ? !isPasswordVisible : secureTextEntry
          }
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...rest}
        />
        {iconPosition === "right" && IconElement}
        {PasswordToggleIcon}
      </View>
      {error && (
        <Text style={[styles.errorText, { color: errorColor }]}>{error}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
    fontFamily: "Roman",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    minHeight: 48,
  },
  input: {
    fontSize: 16,
  },
  focused: {
    borderWidth: 2,
  },
  errorText: {
    fontSize: 14,
    marginTop: 4,
    fontFamily: "Roman",
  },
});

export default CustomInput;
