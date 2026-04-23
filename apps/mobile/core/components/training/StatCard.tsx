import { useTheme } from "@/core/hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface StatCardProps {
  icon: string;
  value: string;
  label: string;
  size?: "small" | "medium" | "large";
  color?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  icon,
  value,
  label,
  size = "medium",
  color,
}) => {
  const theme = useTheme();
  const cardColor = color || theme.primaryText;

  const getSizeStyles = () => {
    switch (size) {
      case "small":
        return {
          container: styles.smallContainer,
          icon: styles.smallIcon,
          value: styles.smallValue,
          label: styles.smallLabel,
        };
      case "large":
        return {
          container: styles.largeContainer,
          icon: styles.largeIcon,
          value: styles.largeValue,
          label: styles.largeLabel,
        };
      default:
        return {
          container: styles.mediumContainer,
          icon: styles.mediumIcon,
          value: styles.mediumValue,
          label: styles.mediumLabel,
        };
    }
  };

  const sizeStyles = getSizeStyles();

  return (
    <View style={[sizeStyles.container, { backgroundColor: "white" }]}>
      <View
        style={[styles.iconContainer, { backgroundColor: cardColor + "20" }]}
      >
        <Ionicons
          name={icon as any}
          size={size === "large" ? 24 : size === "small" ? 16 : 20}
          color={cardColor}
        />
      </View>
      <Text style={[sizeStyles.value, { color: theme.primaryText }]}>
        {value}
      </Text>
      <Text style={[sizeStyles.label, { color: theme.secondaryText }]}>
        {label}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  // Small size
  smallContainer: {
    alignItems: "center",
    padding: 12,
    borderRadius: 8,
    minWidth: 80,
  },
  smallIcon: {
    marginBottom: 6,
  },
  smallValue: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 2,
    textAlign: "center",
  },
  smallLabel: {
    fontSize: 10,
    opacity: 0.8,
    textAlign: "center",
  },

  // Medium size (default)
  mediumContainer: {
    alignItems: "center",
    padding: 16,
    borderRadius: 12,
    minWidth: 100,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  mediumIcon: {
    marginBottom: 8,
  },
  mediumValue: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
    textAlign: "center",
  },
  mediumLabel: {
    fontSize: 12,
    opacity: 0.8,
    textAlign: "center",
  },

  // Large size
  largeContainer: {
    alignItems: "center",
    padding: 20,
    borderRadius: 16,
    minWidth: 120,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  largeIcon: {
    marginBottom: 12,
  },
  largeValue: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 6,
    textAlign: "center",
  },
  largeLabel: {
    fontSize: 14,
    opacity: 0.8,
    textAlign: "center",
  },

  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default StatCard;
