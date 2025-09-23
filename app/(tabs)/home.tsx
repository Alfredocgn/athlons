import CustomButton from "@/core/components/CustomButton";
import HomeScreenHeader from "@/core/components/home/HomeScreenHeader";
import WorkoutHistory from "@/core/components/training/WorkoutHistory";
import { useTheme } from "@/core/hooks/useTheme";
import { useWorkoutSession } from "@/core/workouts/hooks/useWorkoutSession";
import { router } from "expo-router";

import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const HomeScreen = () => {
  const theme = useTheme();
  const { sessions } = useWorkoutSession();

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <HomeScreenHeader />

        {/* Quick Actions Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.primaryText }]}>
            Quick Actions
          </Text>
          <View style={[styles.card, { backgroundColor: "white" }]}>
            <Text style={[styles.cardTitle, { color: theme.primaryText }]}>
              Ready to run?
            </Text>
            <Text style={[styles.cardSubtitle, { color: theme.secondaryText }]}>
              Start your training session and track your progress
            </Text>
            <CustomButton
              size="large"
              icon="walk"
              onPress={() => router.push("/(tabs)/training")}
              style={[
                styles.startButton,
                { backgroundColor: theme.primaryText },
              ]}
              textStyle={[styles.startButtonText, { color: theme.background }]}
            >
              Start Running
            </CustomButton>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.primaryText }]}>
            Recent Activity
          </Text>
          <WorkoutHistory sessions={sessions} title="Last workout" limit={1} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  section: {
    marginTop: 30,
  },
  sectionTitle: {
    fontFamily: "Yantramanav_Regular",
    fontSize: 20,
    marginBottom: 15,
  },
  card: {
    borderRadius: 12,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardTitle: {
    fontFamily: "Yantramanav_Regular",
    fontSize: 18,

    marginBottom: 8,
  },
  cardSubtitle: {
    fontFamily: "Yantramanav_Regular",
    fontSize: 14,
    marginBottom: 20,
    opacity: 0.8,
  },
  startButton: {
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  startButtonText: {
    fontFamily: "Yantramanav_Regular",

    fontSize: 16,
  },
});
export default HomeScreen;
