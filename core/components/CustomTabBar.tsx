import { useTheme } from "@/core/hooks/useTheme";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const icons: Record<string, React.ComponentProps<typeof FontAwesome6>["name"]> =
  {
    home: "building-columns",
    wisdom: "book-quran",
    training: "dumbbell",
    profile: "person-walking",
  } as const;

const getTabIcon = (
  routeName: string
): React.ComponentProps<typeof FontAwesome6>["name"] => {
  return icons[routeName] || "help-outline";
};

const CustomTabBar = ({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) => {
  const insets = useSafeAreaInsets();
  const theme = useTheme();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.background,
          borderTopColor: theme.text + "40",
          paddingBottom: Math.max(insets.bottom, 10),
        },
      ]}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          typeof options.tabBarLabel === "string"
            ? options.tabBarLabel
            : typeof options.tabBarLabel === "function"
            ? options.tabBarLabel({
                focused: state.index === index,
                color: theme.primaryText,
                position: "below-icon",
                children: route.name,
              })
            : options.title || route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });
          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const badge = options.tabBarBadge;

        return (
          <Pressable
            key={route.key}
            onPress={onPress}
            style={[
              styles.tab,
              isFocused && [
                styles.activeTab,
                { backgroundColor: theme.tint + "20" },
              ],
            ]}
          >
            <View style={styles.iconContainer}>
              <FontAwesome6
                name={getTabIcon(route.name)}
                size={24}
                color={isFocused ? theme.tint : theme.icon}
              />
              {badge !== undefined && (
                <View
                  style={[styles.badge, { backgroundColor: theme.primaryText }]}
                >
                  <Text style={[styles.badgeText, { color: theme.background }]}>
                    {badge}
                  </Text>
                </View>
              )}
            </View>
            <Text
              style={[
                styles.label,
                {
                  color: isFocused ? theme.tint : theme.text,
                },
              ]}
            >
              {label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderTopWidth: 1,
    justifyContent: "space-around",
  },
  tab: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    paddingVertical: 5,
  },
  activeTab: {
    borderRadius: 6,
    // marginHorizontal: 60,
  },
  label: {
    fontSize: 12,
    marginTop: 4,
    textTransform: "capitalize",
    fontWeight: "500",
  },
  iconContainer: {
    position: "relative",
  },
  badge: {
    position: "absolute",
    right: -4,
    top: -5,
    borderRadius: 8,
    paddingHorizontal: 5,
    minWidth: 16,
    height: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: {
    fontSize: 10,
    fontWeight: "bold",
  },
});

export default CustomTabBar;
