import ActionButton from "@/core/components/training/ActionButton";
import TrainingHeader from "@/core/components/training/TrainingHeader";
import WorkoutHistory from "@/core/components/training/WorkoutHistory";
import WorkoutTracker from "@/core/components/training/WorkoutTracker";
import { useLocationPermission } from "@/core/hooks/useLocationPermission";
import { useLocationTracking } from "@/core/hooks/useLocationTracking";
import { useTheme } from "@/core/hooks/useTheme";
import { useWorkoutSession } from "@/core/hooks/useWorkoutSession";
import { useWorkoutStats } from "@/core/hooks/useWorkoutStats";
import { WorkoutType } from "@/core/types/training";
import {
  formatDistance,
  formatPace,
  formatTime,
} from "@/core/utils/formatters";
import React, { useEffect, useState } from "react";
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

const TrainingScreen = () => {
  const theme = useTheme();
  const { permission, requestPermission } = useLocationPermission();
  const {
    currentSession,
    sessions,
    startSession,
    finishSession,
    pauseSession,
    resumeSession,
    cancelSession,
    isPaused,
  } = useWorkoutSession();
  const { trackPoints } = useLocationTracking(
    currentSession?.status === "active"
  );
  const stats = useWorkoutStats(
    trackPoints,
    currentSession?.date || null,
    currentSession?.status === "active"
  );

  const [isTracking, setIsTracking] = useState(false);
  useEffect(() => {
    if (!permission.granted) {
      requestPermission();
    }
  }, [permission.granted, requestPermission]);

  const handleStartWorkout = async () => {
    if (!permission.granted) {
      Alert.alert(
        "Permission required",
        "Location permission required to start a training",
        [{ text: "OK" }]
      );
      return;
    }
    startSession("Race", WorkoutType.RUNNING);
    setIsTracking(true);
  };
  const handlePauseWorkout = () => {
    pauseSession();
  };
  const handleResumeWorkout = () => {
    resumeSession();
  };

  const handleFinishWorkout = () => {
    if (currentSession) {
      finishSession({
        distance: stats.distance,
        duration: stats.elapsedTime,
        pace: stats.pace,
        caloriesBurned: stats.caloriesBurned,
      });
      setIsTracking(false);

      Alert.alert(
        "Training Completed",
        `Great Job!\n\nTime: ${formatTime(
          stats.elapsedTime
        )}\nDistance: ${formatDistance(stats.distance)}\nPace: ${formatPace(
          stats.pace
        )}\nCalories: ${stats.caloriesBurned}`,
        [{ text: "OK" }]
      );
    }
  };
  const handleCancelWorkout = () => {
    Alert.alert(
      "Cancel Training",
      "Sure you want to cancel your training? All data will be lost",
      [
        { text: "No", style: "cancel" },
        {
          text: "Yes, Cancel",
          style: "destructive",
          onPress: () => {
            cancelSession();
            setIsTracking(false);
          },
        },
      ]
    );
  };

  const handleSessionPress = (session: any) => {
    Alert.alert(
      "Training details",
      `Time: ${session.duration}s\Distance: ${session.distance}m\nPace: ${session.avgPace}s/km`
    );
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <TrainingHeader />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {!isTracking ? (
          <View style={styles.startSection}>
            <ActionButton
              icon="play"
              title="Start Training"
              onPress={handleStartWorkout}
              variant="primary"
              size="large"
            />
            <View style={styles.permissionStatus}>
              {permission.granted ? (
                <Text style={[styles.statusText, { color: theme.text }]}>
                  Ready to track your race
                </Text>
              ) : (
                <Text style={[styles.statusText, { color: theme.text }]}>
                  Location permission required.
                </Text>
              )}
            </View>
          </View>
        ) : (
          <View style={styles.trackingSection}>
            <WorkoutTracker
              stats={stats}
              onPause={handlePauseWorkout}
              onResume={handleResumeWorkout}
              onFinish={handleFinishWorkout}
              onCancel={handleCancelWorkout}
              isPaused={isPaused}
              theme={theme}
            />
          </View>
        )}
        <View style={styles.historySection}>
          <WorkoutHistory
            sessions={sessions}
            onSessionPress={handleSessionPress}
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
    padding: 20,
    paddingBottom: 40,
  },
  startSection: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  trackingSection: {
    height: 400,
    marginBottom: 20,
  },
  historySection: {
    flex: 1,
    minHeight: 200,
  },
  permissionStatus: {
    marginTop: 20,
    alignItems: "center",
  },
  statusText: {
    fontSize: 14,
    textAlign: "center",
    opacity: 0.8,
  },
});

export default TrainingScreen;
