import { useTheme } from "@/core/hooks/useTheme";
import { WorkoutSession } from "@/core/types/training";
import { formatDate, formatPace, formatTime } from "@/core/utils/formatters";
import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface WorkoutHistoryProps {
  sessions: WorkoutSession[];
  onSessionPress?: (session: WorkoutSession) => void;
}
const WorkoutHistory = ({ sessions, onSessionPress }: WorkoutHistoryProps) => {
  const theme = useTheme();
  if (sessions.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Ionicons
          name="fitness-outline"
          size={50}
          color={theme.text}
          style={{ opacity: 0.5 }}
        />
        <Text style={[styles.emptyText, { color: theme.text }]}>
          No registered workouts
        </Text>
        <Text style={[styles.emptySubtext, { color: theme.text }]}>
          Complete your first training to see it here.
        </Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Text style={[styles.sectionTitle, { color: theme.primaryText }]}>
        History Workouts
      </Text>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {sessions.map((session) => (
          <TouchableOpacity
            style={[
              styles.sessionCard,
              { backgroundColor: theme.background, borderColor: theme.tint },
            ]}
            key={session.id}
            onPress={() => onSessionPress?.(session)}
          >
            <View style={styles.sessionHeader}>
              <Text style={[styles.sessionDate, { color: theme.primaryText }]}>
                {formatDate(session.date)}
              </Text>
              <Ionicons name="chevron-forward" size={20} color={theme.text} />
            </View>
            <Text style={[styles.sessionTitle, { color: theme.text }]}>
              {session.title}
            </Text>
            <View style={styles.sessionStats}>
              <View style={styles.statRow}>
                <Ionicons name="time-outline" size={16} color={theme.text} />
                <Text style={[styles.statText, { color: theme.text }]}>
                  {formatTime(session.duration)}
                </Text>
              </View>
              <View style={styles.statRow}>
                <Ionicons
                  name="speedometer-outline"
                  size={16}
                  color={theme.text}
                />
                <Text style={[styles.statText, { color: theme.text }]}>
                  {formatPace(session.avgPace || 0)}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  scrollView: {
    flex: 1,
  },
  sessionCard: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  sessionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  sessionDate: {
    fontSize: 16,
    fontWeight: "bold",
  },
  sessionTitle: {
    fontSize: 14,
    marginBottom: 10,
    opacity: 0.8,
  },
  sessionStats: {
    gap: 8,
  },
  statRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  statText: {
    fontSize: 14,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
    opacity: 0.7,
  },
  emptySubtext: {
    fontSize: 14,
    marginTop: 5,
    opacity: 0.5,
    textAlign: "center",
  },
});

export default WorkoutHistory;
