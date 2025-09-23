import { useTheme } from "@/core/hooks/useTheme";
import React from "react";
import {
  Alert,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { WorkoutType } from "@/core/types/workout";
import { Ionicons } from "@expo/vector-icons";
import CustomButton from "../CustomButton";
import { DayWorkout } from "./hooks/useWeeklyCalendar";

interface WorkoutDetailsModalProps {
  visible: boolean;
  workout: DayWorkout | null;
  selectedDate: Date | null;
  onClose: () => void;
  onStartWorkout?: (workoutId: string) => void;
  onMarkCompleted?: (workoutId: string) => void;
}

const WorkoutDetailsModal = ({
  visible,
  workout,
  selectedDate,
  onClose,
  onStartWorkout,
  onMarkCompleted,
}: WorkoutDetailsModalProps) => {
  const theme = useTheme();

  if (!workout || !selectedDate) return null;

  const getWorkoutIcon = (type: WorkoutType) => {
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

  const getWorkoutColor = (type: WorkoutType) => {
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

  const getWorkoutDescription = (type: WorkoutType) => {
    switch (type) {
      case WorkoutType.RUN:
        return "A steady-paced run to build endurance and aerobic capacity.";
      case WorkoutType.LONG_RUN:
        return "Extended duration run to improve stamina and mental toughness.";
      case WorkoutType.TEMPO:
        return "Sustained effort at lactate threshold to improve race pace.";
      case WorkoutType.INTERVAL:
        return "High-intensity intervals with recovery periods to boost speed.";
      case WorkoutType.RECOVERY:
        return "Easy effort to promote recovery and maintain fitness.";
      case WorkoutType.RACE:
        return "Race simulation or actual race event.";
      case WorkoutType.TRAIL:
        return "Off-road running to improve strength and agility.";
      default:
        return "Training session to improve your running performance.";
    }
  };

  const handleStartWorkout = () => {
    Alert.alert("Start Workout", `Ready to start "${workout.title}"?`, [
      { text: "Cancel", style: "cancel" },
      {
        text: "Start",
        onPress: () => {
          onStartWorkout?.(workout.id);
          onClose();
        },
      },
    ]);
  };

  const handleMarkCompleted = () => {
    Alert.alert("Mark as Completed", `Mark "${workout.title}" as completed?`, [
      { text: "Cancel", style: "cancel" },
      {
        text: "Mark Complete",
        onPress: () => {
          onMarkCompleted?.(workout.id);
          onClose();
        },
      },
    ]);
  };

  const workoutColor = getWorkoutColor(workout.type);
  const workoutIcon = getWorkoutIcon(workout.type);

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <View style={[styles.container, { backgroundColor: theme.background }]}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Ionicons name="close" size={24} color={theme.primaryText} />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Workout Icon and Title */}
          <View style={styles.titleSection}>
            <View
              style={[styles.iconContainer, { backgroundColor: workoutColor }]}
            >
              <Ionicons name={workoutIcon as any} size={32} color="white" />
            </View>
            <Text style={[styles.workoutTitle, { color: theme.primaryText }]}>
              {workout.title}
            </Text>
            <Text style={[styles.workoutDate, { color: theme.secondaryText }]}>
              {selectedDate.toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
              })}
            </Text>
          </View>

          {/* Status Badge */}
          <View style={styles.statusSection}>
            <View
              style={[
                styles.statusBadge,
                {
                  backgroundColor: workout.completed
                    ? theme.success
                    : workoutColor,
                },
              ]}
            >
              <Ionicons
                name={workout.completed ? "checkmark-circle" : "time"}
                size={16}
                color="white"
              />
              <Text style={styles.statusText}>
                {workout.completed ? "Completed" : "Scheduled"}
              </Text>
            </View>
          </View>

          {/* Workout Details */}
          <View style={styles.detailsSection}>
            <Text style={[styles.sectionTitle, { color: theme.primaryText }]}>
              Workout Details
            </Text>

            <View style={styles.detailsGrid}>
              {workout.duration && (
                <View
                  style={[
                    styles.detailCard,
                    { backgroundColor: theme.background },
                  ]}
                >
                  <Ionicons
                    name="time-outline"
                    size={24}
                    color={workoutColor}
                  />
                  <Text
                    style={[styles.detailValue, { color: theme.primaryText }]}
                  >
                    {workout.duration}
                  </Text>
                  <Text
                    style={[styles.detailLabel, { color: theme.secondaryText }]}
                  >
                    Minutes
                  </Text>
                </View>
              )}

              {workout.distance && (
                <View
                  style={[
                    styles.detailCard,
                    { backgroundColor: theme.background },
                  ]}
                >
                  <Ionicons
                    name="location-outline"
                    size={24}
                    color={workoutColor}
                  />
                  <Text
                    style={[styles.detailValue, { color: theme.primaryText }]}
                  >
                    {workout.distance}
                  </Text>
                  <Text
                    style={[styles.detailLabel, { color: theme.secondaryText }]}
                  >
                    Kilometers
                  </Text>
                </View>
              )}

              {workout.scheduledTime && (
                <View
                  style={[
                    styles.detailCard,
                    { backgroundColor: theme.background },
                  ]}
                >
                  <Ionicons
                    name="alarm-outline"
                    size={24}
                    color={workoutColor}
                  />
                  <Text
                    style={[styles.detailValue, { color: theme.primaryText }]}
                  >
                    {workout.scheduledTime}
                  </Text>
                  <Text
                    style={[styles.detailLabel, { color: theme.secondaryText }]}
                  >
                    Scheduled Time
                  </Text>
                </View>
              )}
            </View>
          </View>

          {/* Workout Description */}
          <View style={styles.descriptionSection}>
            <Text style={[styles.sectionTitle, { color: theme.primaryText }]}>
              About This Workout
            </Text>
            <Text style={[styles.description, { color: theme.secondaryText }]}>
              {getWorkoutDescription(workout.type)}
            </Text>
          </View>
        </ScrollView>

        {/* Action Buttons */}
        <View style={styles.actionSection}>
          {!workout.completed ? (
            <>
              <CustomButton
                size="large"
                icon="play"
                onPress={handleStartWorkout}
                style={[styles.actionButton, { backgroundColor: workoutColor }]}
                textStyle={styles.actionButtonText}
              >
                Start Workout
              </CustomButton>

              <CustomButton
                size="medium"
                icon="checkmark"
                onPress={handleMarkCompleted}
                style={[
                  styles.actionButton,
                  styles.secondaryButton,
                  { borderColor: workoutColor },
                ]}
                textStyle={[
                  styles.secondaryButtonText,
                  { color: workoutColor },
                ]}
              >
                Mark as Completed
              </CustomButton>
            </>
          ) : (
            <View
              style={[
                styles.completedBadge,
                { backgroundColor: theme.success },
              ]}
            >
              <Ionicons name="checkmark-circle" size={24} color="white" />
              <Text style={styles.completedText}>
                Great job! This workout is completed.
              </Text>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  closeButton: {
    padding: 4,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  titleSection: {
    alignItems: "center",
    marginBottom: 24,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  workoutTitle: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
  },
  workoutDate: {
    fontSize: 16,
    textAlign: "center",
  },
  statusSection: {
    alignItems: "center",
    marginBottom: 32,
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 8,
  },
  statusText: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
  },
  detailsSection: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 16,
  },
  detailsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  detailCard: {
    flex: 1,
    minWidth: 100,
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  detailValue: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 8,
    marginBottom: 4,
  },
  detailLabel: {
    fontSize: 12,
    textAlign: "center",
  },
  descriptionSection: {
    marginBottom: 32,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: "justify",
  },
  actionSection: {
    padding: 20,
    gap: 12,
  },
  actionButton: {
    borderRadius: 12,
  },
  actionButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  secondaryButton: {
    backgroundColor: "transparent",
    borderWidth: 2,
  },
  secondaryButtonText: {
    fontSize: 14,
    fontWeight: "600",
  },
  completedBadge: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    borderRadius: 12,
    gap: 12,
  },
  completedText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default WorkoutDetailsModal;
