import { useTheme } from "@/core/hooks/useTheme";
import { WorkoutSession, WorkoutType } from "@/core/types/workout";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface WorkoutInfoProps {
  session: WorkoutSession;
  getWorkoutTypeIcon: (type: WorkoutType) => string;
  getWorkoutTypeColor: (type: WorkoutType) => string;
}

const WorkoutInfo: React.FC<WorkoutInfoProps> = ({
  session,
  getWorkoutTypeIcon,
  getWorkoutTypeColor,
}) => {
  const theme = useTheme();

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getDeviceIcon = (device: string) => {
    switch (device.toLowerCase()) {
      case "garmin":
        return "watch";
      case "apple_health":
        return "phone-portrait";
      case "google_fit":
        return "logo-google";
      case "strava":
        return "logo-strava";
      case "fitbit":
        return "fitness";
      default:
        return "hardware-chip";
    }
  };

  const workoutTypeIcon = getWorkoutTypeIcon(session.workoutType);
  const workoutTypeColor = getWorkoutTypeColor(session.workoutType);

  return (
    <View style={[styles.container, { backgroundColor: "white" }]}>
      {/* Header con tipo de workout */}
      <View style={styles.header}>
        <View
          style={[
            styles.workoutTypeIcon,
            { backgroundColor: workoutTypeColor },
          ]}
        >
          <Ionicons name={workoutTypeIcon as any} size={24} color="white" />
        </View>
        <View style={styles.headerText}>
          <Text style={[styles.title, { color: theme.primaryText }]}>
            {session.title}
          </Text>
          <Text style={[styles.workoutType, { color: theme.secondaryText }]}>
            {session.workoutType.replace("_", " ")}
          </Text>
        </View>
      </View>

      {/* Información de fecha y hora */}
      <View style={styles.dateSection}>
        <View style={styles.dateItem}>
          <Ionicons
            name="calendar-outline"
            size={16}
            color={theme.secondaryText}
          />
          <Text style={[styles.dateText, { color: theme.primaryText }]}>
            {formatDate(session.date)}
          </Text>
        </View>
        <View style={styles.dateItem}>
          <Ionicons name="time-outline" size={16} color={theme.secondaryText} />
          <Text style={[styles.dateText, { color: theme.primaryText }]}>
            {formatTime(session.date)}
          </Text>
        </View>
      </View>

      {/* Información del dispositivo */}
      <View style={styles.deviceSection}>
        <View style={styles.deviceItem}>
          <Ionicons
            name={getDeviceIcon(session.importedFrom) as any}
            size={16}
            color={theme.secondaryText}
          />
          <Text style={[styles.deviceText, { color: theme.secondaryText }]}>
            Imported from {session.importedFrom.replace("_", " ")}
          </Text>
        </View>
      </View>

      {/* Notas si existen */}
      {session.notes && (
        <View style={styles.notesSection}>
          <Text style={[styles.notesLabel, { color: theme.primaryText }]}>
            Notes
          </Text>
          <Text style={[styles.notesText, { color: theme.secondaryText }]}>
            {session.notes}
          </Text>
        </View>
      )}

      {/* IDs externos si existen */}
      {(session.externalId || session.runId) && (
        <View style={styles.idSection}>
          {session.externalId && (
            <View style={styles.idItem}>
              <Text style={[styles.idLabel, { color: theme.secondaryText }]}>
                External ID:
              </Text>
              <Text style={[styles.idValue, { color: theme.primaryText }]}>
                {session.externalId}
              </Text>
            </View>
          )}
          {session.runId && (
            <View style={styles.idItem}>
              <Text style={[styles.idLabel, { color: theme.secondaryText }]}>
                Run ID:
              </Text>
              <Text style={[styles.idValue, { color: theme.primaryText }]}>
                {session.runId}
              </Text>
            </View>
          )}
        </View>
      )}
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
    alignItems: "center",
    marginBottom: 16,
  },
  workoutTypeIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  headerText: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 4,
  },
  workoutType: {
    fontSize: 14,
    textTransform: "capitalize",
  },
  dateSection: {
    marginBottom: 16,
  },
  dateItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    gap: 8,
  },
  dateText: {
    fontSize: 16,
    fontWeight: "500",
  },
  deviceSection: {
    marginBottom: 16,
  },
  deviceItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  deviceText: {
    fontSize: 14,
    textTransform: "capitalize",
  },
  notesSection: {
    marginBottom: 16,
  },
  notesLabel: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },
  notesText: {
    fontSize: 14,
    lineHeight: 20,
    fontStyle: "italic",
  },
  idSection: {
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
    paddingTop: 16,
  },
  idItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  idLabel: {
    fontSize: 12,
    opacity: 0.7,
  },
  idValue: {
    fontSize: 12,
    fontWeight: "500",
  },
});

export default WorkoutInfo;
