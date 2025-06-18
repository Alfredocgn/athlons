import CustomTabBar from "@/core/components/CustomTabBar";
import { useTheme } from "@/core/hooks/useTheme";
import { Tabs } from "expo-router";
import "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TabLayout() {
  const theme = useTheme();
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: theme.background,
        marginHorizontal: 10,
      }}
      edges={["top"]}
    >
      <Tabs
        tabBar={(props) => <CustomTabBar {...props} />}
        screenOptions={{
          headerShown: false,
        }}
      >
        <Tabs.Screen
          name="wisdom"
          options={{
            title: "Wisdom",
          }}
        />
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            tabBarBadge: 2,
          }}
        />

        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            tabBarBadge: 1,
          }}
        />
      </Tabs>
    </SafeAreaView>
  );
}
