import HomeScreenHeader from "@/core/components/home/HomeScreenHeader";
import { useTheme } from "@/core/hooks/useTheme";
import React from "react";
import { SafeAreaView } from "react-native";

const HomeScreen = () => {
  const theme = useTheme();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
      <HomeScreenHeader />
    </SafeAreaView>
  );
};

export default HomeScreen;
