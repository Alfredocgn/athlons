import CustomButton from "@/core/components/CustomButton";
import HomeScreenHeader from "@/core/components/home/HomeScreenHeader";
import WorkoutHistory from "@/core/components/training/WorkoutHistory";
import { mockWorkoutSessions } from "@/core/data/mockData";
import { useTheme } from "@/core/hooks/useTheme";
import { router } from "expo-router";

import React from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";

const HomeScreen = () => {
  const theme = useTheme();
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

        {/* Recent Activity Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.primaryText }]}>
            Recent Activity
          </Text>
          <WorkoutHistory
            sessions={mockWorkoutSessions}
            title="Last workout"
            limit={1}
          />
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
    fontFamily: "Roman",
    fontSize: 20,
    fontWeight: "600",
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
    fontFamily: "Roman",
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
  },
  cardSubtitle: {
    fontFamily: "Roman",
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
    fontFamily: "Roman",
    fontWeight: "600",
    fontSize: 16,
  },
});
export default HomeScreen;
