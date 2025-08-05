import { useTheme } from "@/core/hooks/useTheme";
import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export interface ListItemProps {
  icon?: keyof typeof Ionicons.glyphMap;
  title: string;
  subtitle?: string;
  onPress?: () => void;
  isLast?: boolean;
}
const ListItem = ({
  icon,
  title,
  onPress,
  subtitle,
  isLast,
}: ListItemProps) => {
  const theme = useTheme();

  return (
    <TouchableOpacity
      style={[
        styles.container,
        !isLast && styles.borderBottom,
        { borderBottomColor: theme.border },
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.content}>
        <View
          style={[styles.iconContainer, { backgroundColor: theme.background }]}
        >
          <Ionicons name={icon as any} size={20} color={theme.primaryText} />
        </View>
        <View style={styles.textContainer}>
          <Text style={[styles.title, { color: theme.primaryText }]}>
            {title}
          </Text>
          {subtitle && (
            <Text style={[styles.subtitle, { color: theme.secondaryText }]}>
              {subtitle}
            </Text>
          )}
        </View>
      </View>
      <Ionicons name="chevron-forward" size={20} color={theme.tabIconDefault} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  borderBottom: {
    borderBottomWidth: 1,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontFamily: "Roman",
    fontWeight: "500",
  },
  subtitle: {
    fontSize: 14,
    fontFamily: "Roman",
    marginTop: 2,
    opacity: 0.8,
  },
});

export default ListItem;
