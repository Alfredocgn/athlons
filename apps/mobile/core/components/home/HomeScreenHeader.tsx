import { useTheme } from "@/core/hooks/useTheme";
import { useUser } from "@/core/profile/useProfile";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import { router } from "expo-router";
import CustomButton from "../CustomButton";
import { useWeeklyCalendar } from "./hooks/useWeeklyCalendar";
import NotificationButton from "./NotificationButton";
import ProfileAvatar from "./ProfileAvatar";
import ProgressBar from "./ProgressBar";
import WeatherWidget from "./WeatherWidget";
import WeeklyCalendar from "./WeeklyCalendar";
import WorkoutDetailsModal from "./WorkoutDetailsModal";

const HomeScreenHeader = () => {
  const theme = useTheme();
  const { data: user, isLoading } = useUser();
  const { weeklyData, getWorkoutForDate, markWorkoutCompleted } =
    useWeeklyCalendar();
  const [modalVisible, setModalVisible] = useState(false);

  const getUserGreeting = () => {
    if (isLoading || !user) {
      return "Welcome back!";
    }
    return `Welcome back, ${user.firstName || "Athlete"}`;
  };

  const handleDayPress = (date: Date) => {
    const workout = getWorkoutForDate(date);
    if (workout) {
      setModalVisible(true);
    }
  };

  const handleStartWorkout = (workoutId: string) => {
    // Navegar a la pantalla de entrenamiento
    router.push("/(tabs)/training");
  };

  const handleMarkCompleted = (workoutId: string) => {
    markWorkoutCompleted(workoutId);
    setModalVisible(false);
  };

  return (
    <View style={[styles.container]}>
      {/* Top Header Row */}
      <View style={styles.topRow}>
        <View style={styles.leftSection}>
          <ProfileAvatar size={40} />
          <NotificationButton size={24} />
        </View>
        <WeatherWidget showDetails={false} />
      </View>

      {/* Greeting Section */}
      <View style={styles.greetingSection}>
        <Text style={[styles.greetingsText, { color: theme.primaryText }]}>
          {getUserGreeting()}
        </Text>
        <Text style={[styles.subtitle, { color: theme.secondaryText }]}>
          Ready for today&apos;s training?
        </Text>
      </View>

      {/* Weekly Calendar */}
      <View style={styles.calendarSection}>
        <WeeklyCalendar onDayPress={handleDayPress} size="medium" />
      </View>

      {/* Progress Section */}
      <View style={[styles.progressCard, { backgroundColor: "white" }]}>
        <Text style={[styles.progressTitle, { color: theme.primaryText }]}>
          Training Progress
        </Text>
        <ProgressBar progress={0.65} label="You are on day 3 of training" />
      </View>

      {/* Daily Wisdom Section */}
      <View style={[styles.wisdomCard, { backgroundColor: "white" }]}>
        <View style={styles.wisdomHeader}>
          <Text style={[styles.wisdomTitle, { color: theme.primaryText }]}>
            Daily Wisdom
          </Text>
          <CustomButton
            size="small"
            style={[
              styles.wisdomButton,
              { backgroundColor: theme.primaryText },
            ]}
            icon="library"
            iconSize={14}
            textStyle={[styles.wisdomButtonText, { color: theme.background }]}
            onPress={() => router.push("/(tabs)/wisdom")}
          >
            More
          </CustomButton>
        </View>

        <Text style={[styles.quoteText, { color: theme.primaryText }]}>
          &quot;Luck is what happens when preparation meets opportunity&quot;
        </Text>
        <Text style={[styles.quoteAuthor, { color: theme.secondaryText }]}>
          – Seneca
        </Text>
      </View>

      {/* Workout Details Modal */}
      <WorkoutDetailsModal
        visible={modalVisible}
        workout={weeklyData.selectedDay?.workout || null}
        selectedDate={weeklyData.selectedDay?.date || null}
        onClose={() => setModalVisible(false)}
        onStartWorkout={handleStartWorkout}
        onMarkCompleted={handleMarkCompleted}
      />
    </View>
  );
};

export default HomeScreenHeader;

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  leftSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  greetingSection: {
    marginBottom: 20,
  },
  greetingsText: {
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    opacity: 0.8,
  },
  calendarSection: {
    marginBottom: 20,
  },
  progressCard: {
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  progressTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 15,
  },
  wisdomCard: {
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
  wisdomHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  wisdomTitle: {
    fontSize: 18,
  },
  wisdomButton: {
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  wisdomButtonText: {
    fontSize: 12,
  },
  quoteText: {
    fontSize: 16,
    fontStyle: "italic",
    marginBottom: 8,
    lineHeight: 22,
  },
  quoteAuthor: {
    fontSize: 14,
    fontStyle: "italic",
    textAlign: "right",
  },
});
