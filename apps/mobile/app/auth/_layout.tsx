import { useTheme } from "@/core/hooks/useTheme";
import { Slot } from "expo-router";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const AuthLayout = () => {
  const theme = useTheme();

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: theme.background,
        paddingHorizontal: 20,
      }}
    >
      <Slot />
    </SafeAreaView>
  );
};

export default AuthLayout;
