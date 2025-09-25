import { PaceAnalysis, RunningMetrics } from "@/core/hooks/useRunningMetrics";
import { useTheme } from "@/core/hooks/useTheme";
import { TrackingMetrics } from "@/core/hooks/useWorkoutTracking";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface AdvancedRunningMetricsProps {
  trackingMetrics: TrackingMetrics;
  runningMetrics: RunningMetrics;
  paceAnalysis: PaceAnalysis;
}

const AdvancedRunningMetrics: React.FC<AdvancedRunningMetricsProps> = ({
  trackingMetrics,
  runningMetrics,
  paceAnalysis,
}) => {
  const theme = useTheme();

  const formatPace = (paceInSeconds: number) => {
    if (paceInSeconds === 0) return "--:--";
    const minutes = Math.floor(paceInSeconds / 60);
    const seconds = Math.floor(paceInSeconds % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const formatSpeed = (speed: number) => {
    return `${speed.toFixed(1)} km/h`;
  };

  const formatDistance = (distance: number) => {
    return `${(distance / 1000).toFixed(2)} km`;
  };

  const getPaceTrendIcon = (trend: string) => {
    switch (trend) {
      case "improving":
        return "trending-up";
      case "declining":
        return "trending-down";
      default:
        return "remove";
    }
  };

  const getPaceTrendColor = (trend: string) => {
    switch (trend) {
      case "improving":
        return theme.success;
      case "declining":
        return theme.error;
      default:
        return theme.secondaryText;
    }
  };

  const metrics = [
    {
      title: "Current Pace",
      value: formatPace(paceAnalysis.currentPace),
      icon: "speedometer-outline",
      color: theme.primaryText,
    },
    {
      title: "Average Pace",
      value: formatPace(paceAnalysis.averagePace),
      icon: "time-outline",
      color: theme.primaryText,
    },
    {
      title: "Speed",
      value: formatSpeed(runningMetrics.speed),
      icon: "flash-outline",
      color: theme.primaryText,
    },
    {
      title: "Cadence",
      value: `${trackingMetrics.cadence} spm`,
      icon: "footsteps",
      color: theme.primaryText,
    },
    {
      title: "Stride Length",
      value: `${trackingMetrics.strideLength}m`,
      icon: "resize-outline",
      color: theme.primaryText,
    },
    {
      title: "Ground Contact",
      value: `${trackingMetrics.groundContactTime}ms`,
      icon: "stopwatch-outline",
      color: theme.primaryText,
    },
    {
      title: "Vertical Oscillation",
      value: `${trackingMetrics.verticalOscillation}cm`,
      icon: "trending-up-outline",
      color: theme.primaryText,
    },
    {
      title: "Running Power",
      value: `${trackingMetrics.runningPower}W`,
      icon: "flash",
      color: theme.primaryText,
    },
  ];

  return (
    <View style={[styles.container, { backgroundColor: "white" }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.primaryText }]}>
          Advanced Running Metrics
        </Text>
        <View style={styles.paceTrend}>
          <Ionicons
            name={getPaceTrendIcon(paceAnalysis.paceTrend) as any}
            size={16}
            color={getPaceTrendColor(paceAnalysis.paceTrend)}
          />
          <Text
            style={[
              styles.trendText,
              { color: getPaceTrendColor(paceAnalysis.paceTrend) },
            ]}
          >
            {paceAnalysis.paceTrend}
          </Text>
        </View>
      </View>

      <View style={styles.metricsGrid}>
        {metrics.map((metric, index) => (
          <View key={index} style={styles.metricItem}>
            <View
              style={[
                styles.iconContainer,
                { backgroundColor: metric.color + "20" },
              ]}
            >
              <Ionicons
                name={metric.icon as any}
                size={20}
                color={metric.color}
              />
            </View>
            <Text style={[styles.metricValue, { color: theme.primaryText }]}>
              {metric.value}
            </Text>
            <Text style={[styles.metricLabel, { color: theme.secondaryText }]}>
              {metric.title}
            </Text>
          </View>
        ))}
      </View>

      {/* Análisis adicional */}
      <View style={styles.analysisSection}>
        <View style={styles.analysisItem}>
          <Text style={[styles.analysisLabel, { color: theme.secondaryText }]}>
            Efficiency Score
          </Text>
          <Text style={[styles.analysisValue, { color: theme.primaryText }]}>
            {trackingMetrics.efficiency.toFixed(1)}
          </Text>
        </View>

        <View style={styles.analysisItem}>
          <Text style={[styles.analysisLabel, { color: theme.secondaryText }]}>
            Training Load
          </Text>
          <Text style={[styles.analysisValue, { color: theme.primaryText }]}>
            {runningMetrics.trainingLoad || "--"}
          </Text>
        </View>

        <View style={styles.analysisItem}>
          <Text style={[styles.analysisLabel, { color: theme.secondaryText }]}>
            Pace Variability
          </Text>
          <Text style={[styles.analysisValue, { color: theme.primaryText }]}>
            {paceAnalysis.paceVariability}%
          </Text>
        </View>
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
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  paceTrend: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  trendText: {
    fontSize: 12,
    fontWeight: "600",
    textTransform: "capitalize",
  },
  metricsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  metricItem: {
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
  metricValue: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
    textAlign: "center",
  },
  metricLabel: {
    fontSize: 12,
    textAlign: "center",
    opacity: 0.8,
  },
  analysisSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
    paddingTop: 16,
  },
  analysisItem: {
    alignItems: "center",
    flex: 1,
  },
  analysisLabel: {
    fontSize: 12,
    marginBottom: 4,
    opacity: 0.8,
  },
  analysisValue: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default AdvancedRunningMetrics;
