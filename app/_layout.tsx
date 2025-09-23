import { useColorScheme } from "@/core/hooks/useColorScheme";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import "react-native-reanimated";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { queryClient } from "../core/api/queryClient";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    Roman: require("../assets/fonts/Roman.ttf"),
    Yantramanav_Black: require("../assets/fonts/Yantramanav-Black.ttf"),
    Yantramanav_Bold: require("../assets/fonts/Yantramanav-Bold.ttf"),
    Yantramanav_Medium: require("../assets/fonts/Yantramanav-Medium.ttf"),
    Yantramanav_Regular: require("../assets/fonts/Yantramanav-Regular.ttf"),
    Yantramanav_Light: require("../assets/fonts/Yantramanav-Light.ttf"),
    Yantramanav_Thin: require("../assets/fonts/Yantramanav-Thin.ttf"),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <SafeAreaProvider style={{ flex: 1 }}>
          <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="auth" options={{ headerShown: false }} />
          </Stack>
        </SafeAreaProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
