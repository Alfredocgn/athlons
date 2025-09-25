import { useRunningMetrics } from "@/core/hooks/useRunningMetrics";
import { useTheme } from "@/core/hooks/useTheme";
import { useWorkoutTracking } from "@/core/hooks/useWorkoutTracking";
import { WorkoutStats } from "@/core/types/workout";
import {
  formatDistance,
  formatPace,
  formatSpeed,
  formatTime,
} from "@/core/utils/formatters";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import ActionButton from "./ActionButton";
import AdvancedRunningMetrics from "./AdvancedRunningMetrics";
import StatCard from "./StatCard";

interface EnhancedWorkoutTrackerProps {
  stats: WorkoutStats;
  onPause: () => void;
  onResume: () => void;
  onFinish: () => void;
  onCancel: () => void;
  isPaused: boolean;
  theme: any;
}

const EnhancedWorkoutTracker: React.FC<EnhancedWorkoutTrackerProps> = ({
  stats,
  onPause,
  onResume,
  onFinish,
  onCancel,
  isPaused,
}) => {
  const theme = useTheme();
  const [showAdvancedMetrics, setShowAdvancedMetrics] = useState(false);
  const [startTime] = useState(Date.now());
  const [currentTime, setCurrentTime] = useState(Date.now());

  // Inicializar tracking de sensores
  const {
    sensorData,
    trackingMetrics,
    locationData,
    isTracking,
    error,
    startTracking,
    stopTracking,
  } = useWorkoutTracking();

  // Calcular métricas avanzadas
  const { runningMetrics, paceAnalysis } = useRunningMetrics(
    trackingMetrics,
    locationData,
    startTime,
    currentTime
  );

  // Actualizar tiempo actual cada segundo
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Iniciar tracking de sensores cuando comienza el workout
  useEffect(() => {
    if (!isPaused && !isTracking) {
      startTracking();
    }
  }, [isPaused, isTracking]);

  // Detener tracking cuando se pausa o termina
  useEffect(() => {
    if (isPaused || !isTracking) {
      stopTracking();
    }
  }, [isPaused, isTracking]);

  const toggleAdvancedMetrics = () => {
    setShowAdvancedMetrics(!showAdvancedMetrics);
  };

  const getCombinedStats = () => {
    return {
      elapsedTime: stats.elapsedTime,
      distance: stats.distance || runningMetrics.distance,
      pace: stats.pace || runningMetrics.pace,
      currentSpeed: stats.currentSpeed || runningMetrics.speed,
      caloriesBurned: stats.caloriesBurned,
    };
  };

  const combinedStats = getCombinedStats();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.primaryText }]}>
          {isPaused ? "Workout Paused" : "Workout in Progress"}
        </Text>

        {error && (
          <View
            style={[
              styles.errorContainer,
              { backgroundColor: theme.error + "20" },
            ]}
          >
            <Ionicons name="warning" size={16} color={theme.error} />
            <Text style={[styles.errorText, { color: theme.error }]}>
              {error}
            </Text>
          </View>
        )}

        {/* Toggle para métricas avanzadas */}
        <TouchableOpacity
          style={[
            styles.toggleButton,
            { backgroundColor: theme.primaryText + "20" },
          ]}
          onPress={toggleAdvancedMetrics}
        >
          <Ionicons
            name={showAdvancedMetrics ? "chevron-up" : "chevron-down"}
            size={16}
            color={theme.primaryText}
          />
          <Text style={[styles.toggleText, { color: theme.primaryText }]}>
            {showAdvancedMetrics ? "Hide" : "Show"} Advanced Metrics
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Métricas principales */}
        <View style={styles.primaryStats}>
          <StatCard
            icon="time-outline"
            value={formatTime(combinedStats.elapsedTime)}
            label="Time"
            size="large"
          />
          <StatCard
            icon="location-outline"
            value={formatDistance(combinedStats.distance)}
            label="Distance"
            size="large"
          />
          <StatCard
            icon="speedometer-outline"
            value={formatPace(combinedStats.pace)}
            label="Pace"
            size="large"
          />
        </View>

        {/* Métricas secundarias */}
        <View style={styles.secondaryStats}>
          <StatCard
            icon="flash-outline"
            value={formatSpeed(combinedStats.currentSpeed)}
            label="Speed"
          />
          <StatCard
            icon="flame-outline"
            value={`${combinedStats.caloriesBurned}`}
            label="Calories"
          />
          <StatCard
            icon="footsteps"
            value={`${trackingMetrics.cadence}`}
            label="Cadence"
          />
        </View>

        {/* Métricas avanzadas (condicionales) */}
        {showAdvancedMetrics && (
          <View style={styles.advancedSection}>
            <AdvancedRunningMetrics
              trackingMetrics={trackingMetrics}
              runningMetrics={runningMetrics}
              paceAnalysis={paceAnalysis}
            />
          </View>
        )}

        {/* Información de sensores */}
        {sensorData && (
          <View style={[styles.sensorInfo, { backgroundColor: "white" }]}>
            <Text style={[styles.sensorTitle, { color: theme.primaryText }]}>
              Sensor Status
            </Text>
            <View style={styles.sensorGrid}>
              <View style={styles.sensorItem}>
                <Ionicons
                  name="phone-portrait"
                  size={16}
                  color={theme.success}
                />
                <Text
                  style={[styles.sensorText, { color: theme.secondaryText }]}
                >
                  Accelerometer
                </Text>
              </View>
              <View style={styles.sensorItem}>
                <Ionicons name="compass" size={16} color={theme.success} />
                <Text
                  style={[styles.sensorText, { color: theme.secondaryText }]}
                >
                  Gyroscope
                </Text>
              </View>
              <View style={styles.sensorItem}>
                <Ionicons name="location" size={16} color={theme.success} />
                <Text
                  style={[styles.sensorText, { color: theme.secondaryText }]}
                >
                  GPS
                </Text>
              </View>
              <View style={styles.sensorItem}>
                <Ionicons name="bar-chart" size={16} color={theme.success} />
                <Text
                  style={[styles.sensorText, { color: theme.secondaryText }]}
                >
                  Barometer
                </Text>
              </View>
            </View>
          </View>
        )}

        {/* Controles */}
        <View style={styles.controlsSection}>
          {isPaused ? (
            <View style={styles.buttonRow}>
              <ActionButton
                icon="play"
                title="Resume"
                onPress={onResume}
                variant="primary"
                size="large"
              />
              <ActionButton
                icon="close"
                title="Cancel"
                onPress={onCancel}
                variant="secondary"
                size="large"
              />
            </View>
          ) : (
            <View style={styles.buttonRow}>
              <ActionButton
                icon="pause"
                title="Pause"
                onPress={onPause}
                variant="secondary"
                size="large"
              />
              <ActionButton
                icon="checkmark"
                title="Finish"
                onPress={onFinish}
                variant="primary"
                size="large"
              />
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 12,
  },
  errorContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    gap: 8,
  },
  errorText: {
    fontSize: 14,
    flex: 1,
  },
  toggleButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    gap: 8,
  },
  toggleText: {
    fontSize: 14,
    fontWeight: "600",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  primaryStats: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
    gap: 8,
  },
  secondaryStats: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
    gap: 8,
  },
  advancedSection: {
    marginBottom: 20,
  },
  sensorInfo: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  sensorTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
    textAlign: "center",
  },
  sensorGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  sensorItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    gap: 6,
  },
  sensorText: {
    fontSize: 12,
  },
  controlsSection: {
    alignItems: "center",
    paddingTop: 10,
  },
  buttonRow: {
    flexDirection: "row",
    gap: 15,
  },
});

export default EnhancedWorkoutTracker;
