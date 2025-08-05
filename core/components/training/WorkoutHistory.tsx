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
  title?: string;
  limit?: number;
}
const WorkoutHistory = ({
  sessions,
  onSessionPress,
  title = "History Workouts",
  limit,
}: WorkoutHistoryProps) => {
  const theme = useTheme();
  const sortedSessions = [...sessions].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  const sessionsToShow = limit
    ? sortedSessions.slice(0, limit)
    : sortedSessions;
  if (sessionsToShow.length === 0) {
    return (
      <View style={[styles.emptyContainer, { backgroundColor: "white" }]}>
        <Ionicons
          name="fitness-outline"
          size={50}
          color={theme.secondaryText}
          style={{ opacity: 0.5 }}
        />
        <Text style={[styles.emptyText, { color: theme.primaryText }]}>
          No registered workouts
        </Text>
        <Text style={[styles.emptySubtext, { color: theme.secondaryText }]}>
          Complete your first training to see it here
        </Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {sessionsToShow.map((session, index) => (
          <TouchableOpacity
            style={[
              styles.sessionCard,
              {
                backgroundColor: "white",
                borderBottomColor: theme.border,
                borderBottomWidth: index < sessionsToShow.length - 1 ? 1 : 0,
              },
            ]}
            key={session.id}
            onPress={() => onSessionPress?.(session)}
            activeOpacity={0.7}
          >
            <View style={styles.sessionHeader}>
              <View style={styles.dateContainer}>
                <Text
                  style={[styles.sessionDate, { color: theme.primaryText }]}
                >
                  {formatDate(session.date)}
                </Text>
                <Text
                  style={[styles.sessionTitle, { color: theme.secondaryText }]}
                >
                  {session.title}
                </Text>
              </View>
              <Ionicons
                name="chevron-forward"
                size={20}
                color={theme.tabIconDefault}
              />
            </View>

            <View style={styles.sessionStats}>
              <View style={styles.statItem}>
                <View
                  style={[
                    styles.statIcon,
                    { backgroundColor: theme.background },
                  ]}
                >
                  <Ionicons
                    name="time-outline"
                    size={16}
                    color={theme.primaryText}
                  />
                </View>
                <Text style={[styles.statText, { color: theme.primaryText }]}>
                  {formatTime(session.duration)}
                </Text>
              </View>

              <View style={styles.statItem}>
                <View
                  style={[
                    styles.statIcon,
                    { backgroundColor: theme.background },
                  ]}
                >
                  <Ionicons
                    name="speedometer-outline"
                    size={16}
                    color={theme.primaryText}
                  />
                </View>
                <Text style={[styles.statText, { color: theme.primaryText }]}>
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
  },
  scrollView: {
    flex: 1,
  },
  sessionCard: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  sessionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  dateContainer: {
    flex: 1,
  },
  sessionDate: {
    fontSize: 16,
    fontFamily: "Roman",
    fontWeight: "600",
    marginBottom: 4,
  },
  sessionTitle: {
    fontSize: 14,
    fontFamily: "Roman",
    opacity: 0.8,
  },
  sessionStats: {
    flexDirection: "row",
    gap: 20,
  },
  statItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  statIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  statText: {
    fontSize: 14,
    fontFamily: "Roman",
    fontWeight: "500",
  },
  emptyContainer: {
    borderRadius: 12,
    padding: 40,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  emptyText: {
    fontSize: 16,
    fontFamily: "Roman",
    fontWeight: "600",
    marginTop: 10,
  },
  emptySubtext: {
    fontSize: 14,
    fontFamily: "Roman",
    marginTop: 5,
    textAlign: "center",
    opacity: 0.8,
  },
});

export default WorkoutHistory;
