import { useTheme } from "@/core/hooks/useTheme";
import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

interface ActionButtonProps {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  onPress: () => void;
  variant?: "primary" | "danger" | "secondary";
  size?: "large" | "medium" | "small";
}
const ActionButton = ({
  icon,
  title,
  onPress,
  variant = "primary",
  size = "medium",
}: ActionButtonProps) => {
  const theme = useTheme();

  const getButtonStyle = () => {
    const baseStyle = [styles.button, styles[size]];
    switch (variant) {
      case "danger":
        return [...baseStyle, { backgroundColor: "#ff4444" }];
      case "secondary":
        return [...baseStyle, { backgroundColor: theme.text, opacity: 0.1 }];
      default:
        return [...baseStyle, { backgroundColor: theme.tint }];
    }
  };

  const getTextStyle = () => {
    const baseStyle = [styles.text, styles[`${size}Text`]];
    switch (variant) {
      case "secondary":
        return [...baseStyle, { color: theme.tint }];
      default:
        return [...baseStyle, { color: theme.background }];
    }
  };

  return (
    <TouchableOpacity style={getButtonStyle()} onPress={onPress}>
      <Ionicons
        name={icon}
        size={size === "large" ? 40 : size === "medium" ? 24 : 20}
        color={variant === "secondary" ? theme.text : theme.background}
      />
      <Text style={getTextStyle()}>{title}</Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 25,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  large: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  medium: {
    paddingHorizontal: 30,
    paddingVertical: 15,
  },
  small: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  text: {
    fontWeight: "bold",
    marginLeft: 10,
  },
  largeText: {
    fontSize: 16,
    marginTop: 10,
  },
  mediumText: {
    fontSize: 16,
  },
  smallText: {
    fontSize: 14,
  },
});
export default ActionButton;
