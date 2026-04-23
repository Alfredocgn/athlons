import { useTheme } from "@/core/hooks/useTheme";
import { WorkoutStats as WorkoutStatsType } from "@/core/workouts/hooks/useWorkoutDetails";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface WorkoutStatsProps {
  stats: WorkoutStatsType;
  workoutType: string;
}

const WorkoutStats: React.FC<WorkoutStatsProps> = ({ stats, workoutType }) => {
  const theme = useTheme();

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, "0")}:${secs
        .toString()
        .padStart(2, "0")}`;
    }
    return `${minutes}:${secs.toString().padStart(2, "0")}`;
  };

  const formatPace = (paceInSeconds: number) => {
    if (paceInSeconds === 0) return "--:--";
    const minutes = Math.floor(paceInSeconds / 60);
    const seconds = paceInSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const formatSpeed = (speed: number) => {
    return `${speed.toFixed(1)} km/h`;
  };

  const formatDistance = (distance: number) => {
    return `${distance.toFixed(2)} km`;
  };

  const formatElevation = (elevation: number) => {
    return `${elevation.toFixed(0)} m`;
  };

  const statItems = [
    {
      title: "Distance",
      value: formatDistance(stats.distance),
      icon: "location-outline",
      color: theme.primaryText,
    },
    {
      title: "Duration",
      value: formatDuration(stats.duration),
      icon: "time-outline",
      color: theme.primaryText,
    },
    {
      title: "Avg Pace",
      value: formatPace(stats.avgPace),
      icon: "speedometer-outline",
      color: theme.primaryText,
    },
    {
      title: "Avg Speed",
      value: formatSpeed(stats.avgSpeed),
      icon: "flash-outline",
      color: theme.primaryText,
    },
    {
      title: "Max Speed",
      value: formatSpeed(stats.maxSpeed),
      icon: "rocket-outline",
      color: theme.primaryText,
    },
    {
      title: "Calories",
      value: stats.caloriesBurned.toString(),
      icon: "flame-outline",
      color: theme.error,
    },
    {
      title: "Elevation Gain",
      value: formatElevation(stats.elevationGain),
      icon: "trending-up-outline",
      color: theme.success,
    },
    {
      title: "Elevation Loss",
      value: formatElevation(stats.elevationLoss),
      icon: "trending-down-outline",
      color: theme.secondaryText,
    },
  ];

  return (
    <View style={[styles.container, { backgroundColor: "white" }]}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={[styles.title, { color: theme.primaryText }]}>
            Workout Stats
          </Text>
          <Text style={[styles.subtitle, { color: theme.secondaryText }]}>
            {workoutType} Session
          </Text>
        </View>
      </View>

      <View style={styles.statsGrid}>
        {statItems.map((item, index) => (
          <View key={index} style={styles.statItem}>
            <View
              style={[
                styles.iconContainer,
                { backgroundColor: item.color + "20" },
              ]}
            >
              <Ionicons name={item.icon as any} size={20} color={item.color} />
            </View>
            <Text style={[styles.statValue, { color: theme.primaryText }]}>
              {item.value}
            </Text>
            <Text style={[styles.statLabel, { color: theme.secondaryText }]}>
              {item.title}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 20,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  headerLeft: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    opacity: 0.8,
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  statItem: {
    width: "48%",
    alignItems: "center",
    marginBottom: 16,
    paddingVertical: 12,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  statValue: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
    textAlign: "center",
  },
  statLabel: {
    fontSize: 12,
    textAlign: "center",
    opacity: 0.8,
  },
});

export default WorkoutStats;
