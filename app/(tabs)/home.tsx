import CustomButton from "@/core/components/CustomButton";
import HomeScreenHeader from "@/core/components/home/HomeScreenHeader";
import WorkoutHistory from "@/core/components/training/WorkoutHistory";
import { mockWorkoutSessions } from "@/core/data/mockData";
import { useTheme } from "@/core/hooks/useTheme";
import { router } from "expo-router";

import React from "react";
import { SafeAreaView } from "react-native";

const HomeScreen = () => {
  const theme = useTheme();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
      <HomeScreenHeader />
      <CustomButton
        size="small"
        icon="walk"
        onPress={() => router.push("/(tabs)/training")}
      >
        Start Running
      </CustomButton>
      <WorkoutHistory
        sessions={mockWorkoutSessions}
        title="Last workout"
        limit={1}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;
