import { useTheme } from "@/core/hooks/useTheme";

import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import CalendarDay from "./CalendarDay";
import { useWeeklyCalendar } from "./hooks/useWeeklyCalendar";

interface WeeklyCalendarProps {
  onDayPress?: (date: Date) => void;
  showNavigation?: boolean;
  size?: "small" | "medium" | "large";
}

const WeeklyCalendar = ({
  onDayPress,
  showNavigation = true,
  size = "medium",
}: WeeklyCalendarProps) => {
  const theme = useTheme();
  const {
    weeklyData,
    selectDay,
    goToPreviousWeek,
    goToNextWeek,
    goToCurrentWeek,
  } = useWeeklyCalendar();

  const handleDayPress = (date: Date) => {
    selectDay(date);
    onDayPress?.(date);
  };

  const formatWeekRange = () => {
    const start = weeklyData.currentWeekStart;
    const end = new Date(start);
    end.setDate(start.getDate() + 6);

    const startMonth = start.toLocaleDateString("en-US", { month: "short" });
    const endMonth = end.toLocaleDateString("en-US", { month: "short" });
    const startDay = start.getDate();
    const endDay = end.getDate();
    const year = start.getFullYear();

    if (startMonth === endMonth) {
      return `${startMonth} ${startDay}-${endDay}, ${year}`;
    } else {
      return `${startMonth} ${startDay} - ${endMonth} ${endDay}, ${year}`;
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Header con navegación */}
      {showNavigation && (
        <View style={styles.header}>
          <TouchableOpacity
            style={[styles.navButton, { borderColor: theme.primaryText }]}
            onPress={goToPreviousWeek}
            activeOpacity={0.7}
          >
            <Ionicons name="chevron-back" size={20} color={theme.primaryText} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.weekRange}
            onPress={goToCurrentWeek}
            activeOpacity={0.7}
          >
            <Text style={[styles.weekRangeText, { color: theme.primaryText }]}>
              {formatWeekRange()}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.navButton, { borderColor: theme.primaryText }]}
            onPress={goToNextWeek}
            activeOpacity={0.7}
          >
            <Ionicons
              name="chevron-forward"
              size={20}
              color={theme.primaryText}
            />
          </TouchableOpacity>
        </View>
      )}

      {/* Días de la semana */}
      <View style={styles.daysContainer}>
        {weeklyData.days.map((day, index) => (
          <View key={index} style={styles.dayColumn}>
            <Text style={[styles.dayName, { color: theme.secondaryText }]}>
              {day.dayName.substring(0, 3)}
            </Text>
            <CalendarDay day={day} onPress={handleDayPress} size={size} />
          </View>
        ))}
      </View>

      {/* Información del día seleccionado */}
      {weeklyData.selectedDay?.workout && (
        <View
          style={[
            styles.workoutInfo,
            { backgroundColor: theme.primaryText + "10" },
          ]}
        >
          <View style={styles.workoutHeader}>
            <Text style={[styles.workoutTitle, { color: theme.primaryText }]}>
              {weeklyData.selectedDay.workout.title}
            </Text>
            <View
              style={[
                styles.statusBadge,
                {
                  backgroundColor: weeklyData.selectedDay.workout.completed
                    ? theme.success
                    : theme.primaryText,
                },
              ]}
            >
              <Text style={[styles.statusText, { color: theme.background }]}>
                {weeklyData.selectedDay.workout.completed
                  ? "Completed"
                  : "Scheduled"}
              </Text>
            </View>
          </View>

          <View style={styles.workoutDetails}>
            {weeklyData.selectedDay.workout.duration && (
              <View style={styles.detailItem}>
                <Ionicons
                  name="time-outline"
                  size={14}
                  color={theme.secondaryText}
                />
                <Text
                  style={[styles.detailText, { color: theme.secondaryText }]}
                >
                  {weeklyData.selectedDay.workout.duration} min
                </Text>
              </View>
            )}
            {weeklyData.selectedDay.workout.distance && (
              <View style={styles.detailItem}>
                <Ionicons
                  name="location-outline"
                  size={14}
                  color={theme.secondaryText}
                />
                <Text
                  style={[styles.detailText, { color: theme.secondaryText }]}
                >
                  {weeklyData.selectedDay.workout.distance} km
                </Text>
              </View>
            )}
            {weeklyData.selectedDay.workout.scheduledTime && (
              <View style={styles.detailItem}>
                <Ionicons
                  name="alarm-outline"
                  size={14}
                  color={theme.secondaryText}
                />
                <Text
                  style={[styles.detailText, { color: theme.secondaryText }]}
                >
                  {weeklyData.selectedDay.workout.scheduledTime}
                </Text>
              </View>
            )}
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    padding: 16,
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
    marginBottom: 16,
  },
  navButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  weekRange: {
    flex: 1,
    alignItems: "center",
  },
  weekRangeText: {
    fontSize: 16,
    fontWeight: "600",
  },
  daysContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  dayColumn: {
    alignItems: "center",
    flex: 1,
  },
  dayName: {
    fontSize: 12,
    fontWeight: "500",
    marginBottom: 8,
    textTransform: "uppercase",
  },
  workoutInfo: {
    borderRadius: 8,
    padding: 12,
    marginTop: 8,
  },
  workoutHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  workoutTitle: {
    fontSize: 16,
    fontWeight: "600",
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 10,
    fontWeight: "600",
  },
  workoutDetails: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  detailText: {
    fontSize: 12,
  },
});

export default WeeklyCalendar;
