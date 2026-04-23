import { useTheme } from "@/core/hooks/useTheme";
import { WorkoutStats } from "@/core/types/workout";
import {
  formatDistance,
  formatPace,
  formatSpeed,
  formatTime,
} from "@/core/utils/formatters";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import ActionButton from "./ActionButton";
import StatCard from "./StatCard";

interface WorkoutTrackerProps {
  stats: WorkoutStats;
  onPause: () => void;
  onResume: () => void;
  onFinish: () => void;
  onCancel: () => void;
  isPaused: boolean;
  theme: any;
}

const WorkoutTracker = ({
  stats,
  onPause,
  onResume,
  onFinish,
  onCancel,
  isPaused,
}: WorkoutTrackerProps) => {
  const theme = useTheme();
  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: theme.primaryText }]}>
        {isPaused ? "Workout paused" : "Workout in progress"}
      </Text>
      <View style={styles.statsContainer}>
        <StatCard
          icon="time-outline"
          value={formatTime(stats.elapsedTime)}
          label="Time"
        />
        <StatCard
          icon="location-outline"
          value={formatDistance(stats.distance)}
          label="Distance"
        />
        <StatCard
          icon="speedometer-outline"
          value={formatPace(stats.pace)}
          label="Pace"
        />
      </View>
      <View style={styles.secondaryStats}>
        <StatCard
          icon="flash-outline"
          value={formatSpeed(stats.currentSpeed)}
          label="Speed"
        />
        <StatCard
          icon="flame-outline"
          value={`${stats.caloriesBurned}`}
          label="Calories"
        />
      </View>
      <View style={styles.controlsSection}>
        {isPaused ? (
          <View style={styles.buttonRow}>
            <ActionButton
              icon="play"
              title="Resume"
              onPress={onResume}
              variant="primary"
              size="medium"
            />
            <ActionButton
              icon="close"
              title="Cancel"
              onPress={onCancel}
              variant="secondary"
              size="medium"
            />
          </View>
        ) : (
          <View style={styles.buttonRow}>
            <ActionButton
              icon="pause"
              title="Pause"
              onPress={onPause}
              variant="secondary"
              size="medium"
            />
            <ActionButton
              icon="checkmark"
              title="Finish"
              onPress={onFinish}
              variant="primary"
              size="medium"
            />
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 30,
    alignItems: "center",
    gap: 8,
  },
  secondaryStats: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  controlsSection: {
    alignItems: "center",
  },
  buttonRow: {
    flexDirection: "row",
    gap: 15, // Espacio entre botones
  },
});

export default WorkoutTracker;
