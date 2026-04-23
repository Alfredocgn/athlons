import Ionicons from "@expo/vector-icons/Ionicons";
import {
  Pressable,
  PressableProps,
  StyleProp,
  Text,
  TextStyle,
  ViewStyle,
} from "react-native";

type ButtonSize = "small" | "medium" | "large";

interface CustomButtonProps extends PressableProps {
  size?: ButtonSize;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  children: React.ReactNode;
  onPress: () => void;
  icon?: keyof typeof Ionicons.glyphMap;
  iconColor?: string;
  iconSize?: number;
  iconPosition?: "left" | "right";
}
const sizeStyles = {
  small: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    fontSize: 14,
  },
  medium: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  large: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    fontSize: 18,
  },
};

const CustomButton = ({
  size = "medium",
  disabled = false,
  style,
  textStyle,
  children,
  onPress,
  icon,
  iconColor = "#fff",
  iconSize = 20,
  iconPosition = "right",
}: CustomButtonProps) => {
  const currentSize = sizeStyles[size];

  const IconElement = icon ? (
    <Ionicons
      name={icon}
      color={iconColor}
      size={iconSize}
      style={{ marginHorizontal: 4 }}
    />
  ) : null;
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        {
          opacity: pressed ? 0.7 : 1,
          backgroundColor: disabled ? "#ccc" : "#007bbf",
          borderRadius: 8,
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "row",
          gap: 4,
        },
        {
          paddingVertical: currentSize.paddingVertical,
          paddingHorizontal: currentSize.paddingHorizontal,
        },
        style,
      ]}
    >
      {iconPosition === "left" && IconElement}
      <Text
        style={[
          {
            color: "#fff",
            fontSize: currentSize.fontSize,
            fontWeight: "600",
            marginHorizontal: 4,
          },
          textStyle,
        ]}
      >
        {children}
      </Text>
      {iconPosition === "right" && IconElement}
    </Pressable>
  );
};

export default CustomButton;
