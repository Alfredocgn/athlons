import { CalendarDay as CalendarDayType } from "@/core/components/home/hooks/useWeeklyCalendar";
import { useTheme } from "@/core/hooks/useTheme";
import { WorkoutType } from "@/core/types/workout";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface CalendarDayProps {
  day: CalendarDayType;
  onPress: (date: Date) => void;
  size?: "small" | "medium" | "large";
}

const CalendarDay = ({ day, onPress, size = "medium" }: CalendarDayProps) => {
  const theme = useTheme();

  const getSizeStyles = () => {
    switch (size) {
      case "small":
        return {
          container: styles.smallContainer,
          dayNumber: styles.smallDayNumber,
        };
      case "large":
        return {
          container: styles.largeContainer,
          dayNumber: styles.largeDayNumber,
        };
      default:
        return {
          container: styles.mediumContainer,
          dayNumber: styles.mediumDayNumber,
        };
    }
  };

  const getWorkoutIcon = (type?: WorkoutType) => {
    if (!type) return null;

    switch (type) {
      case WorkoutType.RUN:
        return "footsteps";
      case WorkoutType.LONG_RUN:
        return "trail-sign";
      case WorkoutType.TEMPO:
        return "speedometer";
      case WorkoutType.INTERVAL:
        return "flash";
      case WorkoutType.RECOVERY:
        return "leaf";
      case WorkoutType.RACE:
        return "trophy";
      case WorkoutType.TRAIL:
        return "mountain";
      default:
        return "fitness";
    }
  };

  const getWorkoutColor = (type?: WorkoutType) => {
    if (!type) return theme.primaryText;

    switch (type) {
      case WorkoutType.RUN:
        return "#4CAF50";
      case WorkoutType.LONG_RUN:
        return "#FF9800";
      case WorkoutType.TEMPO:
        return "#F44336";
      case WorkoutType.INTERVAL:
        return "#9C27B0";
      case WorkoutType.RECOVERY:
        return "#2196F3";
      case WorkoutType.RACE:
        return "#FFD700";
      case WorkoutType.TRAIL:
        return "#795548";
      default:
        return theme.primaryText;
    }
  };

  const sizeStyles = getSizeStyles();
  const workoutIcon = getWorkoutIcon(day.workout?.type);
  const workoutColor = getWorkoutColor(day.workout?.type);

  return (
    <TouchableOpacity
      style={[
        sizeStyles.container,
        {
          backgroundColor: day.isSelected
            ? theme.primaryText
            : day.isToday
            ? theme.primaryText + "20"
            : theme.background,
          borderColor: day.isToday ? theme.primaryText : "transparent",
        },
      ]}
      onPress={() => onPress(day.date)}
      activeOpacity={0.7}
    >
      <Text
        style={[
          sizeStyles.dayNumber,
          {
            color: day.isSelected ? theme.background : theme.primaryText,
            fontWeight: day.isToday ? "bold" : "normal",
          },
        ]}
      >
        {day.dayNumber}
      </Text>

      {day.hasWorkout && (
        <View style={styles.workoutIndicator}>
          <View
            style={[
              styles.workoutDot,
              {
                backgroundColor: day.workout?.completed
                  ? theme.success
                  : workoutColor,
                opacity: day.workout?.completed ? 0.8 : 1,
              },
            ]}
          />
          {workoutIcon && (
            <Ionicons
              name={workoutIcon as any}
              size={8}
              color={day.workout?.completed ? theme.success : workoutColor}
              style={styles.workoutIcon}
            />
          )}
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  // Small size
  smallContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    marginHorizontal: 2,
  },
  smallDayNumber: {
    fontSize: 12,
    fontWeight: "500",
  },

  // Medium size (default)
  mediumContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    marginHorizontal: 3,
    position: "relative",
  },
  mediumDayNumber: {
    fontSize: 16,
    fontWeight: "600",
  },

  // Large size
  largeContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    marginHorizontal: 4,
    position: "relative",
  },
  largeDayNumber: {
    fontSize: 20,
    fontWeight: "700",
  },

  workoutIndicator: {
    position: "absolute",
    bottom: 2,
    right: 2,
    alignItems: "center",
  },
  workoutDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginBottom: 1,
  },
  workoutIcon: {
    position: "absolute",
    top: -1,
  },
});

export default CalendarDay;
