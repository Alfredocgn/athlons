import { useTheme } from "@/core/hooks/useTheme";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import WorkoutInfo from "@/core/components/training/WorkoutInfo";
import WorkoutMap from "@/core/components/training/WorkoutMap";
import WorkoutStats from "@/core/components/training/WorkoutStats";
import { useWorkoutDetails } from "@/core/workouts/hooks/useWorkoutDetails";
import { Ionicons } from "@expo/vector-icons";

const WorkoutDetailsScreen = () => {
  const theme = useTheme();
  const { sessionId } = useLocalSearchParams();
  const {
    session,
    loading,
    error,
    workoutStats,
    mapRegion,
    routeCoordinates,
    getWorkoutTypeIcon,
    getWorkoutTypeColor,
  } = useWorkoutDetails(sessionId as string);

  const handleRefresh = () => {
    // Refrescar datos del workout
    // En producción, aquí invalidarías la query
  };

  const handleShare = () => {
    // Implementar funcionalidad de compartir
    console.log("Share workout");
  };

  const handleEdit = () => {
    // Implementar funcionalidad de editar
    console.log("Edit workout");
  };

  const handleDelete = () => {
    // Implementar funcionalidad de eliminar
    console.log("Delete workout");
  };

  if (loading) {
    return (
      <SafeAreaView
        style={[styles.container, { backgroundColor: theme.background }]}
      >
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={24} color={theme.primaryText} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: theme.primaryText }]}>
            Loading...
          </Text>
          <View style={styles.placeholder} />
        </View>

        <View style={styles.loadingContainer}>
          <Text style={[styles.loadingText, { color: theme.secondaryText }]}>
            Loading workout details...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error || !session) {
    return (
      <SafeAreaView
        style={[styles.container, { backgroundColor: theme.background }]}
      >
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={24} color={theme.primaryText} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: theme.primaryText }]}>
            Workout Details
          </Text>
          <View style={styles.placeholder} />
        </View>

        <View style={styles.errorContainer}>
          <Ionicons name="alert-circle-outline" size={48} color={theme.error} />
          <Text style={[styles.errorText, { color: theme.primaryText }]}>
            {error || "Workout not found"}
          </Text>
          <TouchableOpacity
            style={[styles.retryButton, { backgroundColor: theme.primaryText }]}
            onPress={handleRefresh}
          >
            <Text style={[styles.retryButtonText, { color: theme.background }]}>
              Try Again
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color={theme.primaryText} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.primaryText }]}>
          Workout Details
        </Text>
        <TouchableOpacity style={styles.actionButton} onPress={handleShare}>
          <Ionicons name="share-outline" size={24} color={theme.primaryText} />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={handleRefresh}
            tintColor={theme.primaryText}
          />
        }
      >
        {/* Información del workout */}
        <WorkoutInfo
          session={session}
          getWorkoutTypeIcon={getWorkoutTypeIcon}
          getWorkoutTypeColor={getWorkoutTypeColor}
        />

        {/* Estadísticas */}
        <WorkoutStats stats={workoutStats} workoutType={session.workoutType} />

        {/* Mapa */}
        <WorkoutMap region={mapRegion} trackPoints={routeCoordinates} />

        {/* Acciones */}
        <View style={[styles.actionsContainer, { backgroundColor: "white" }]}>
          <TouchableOpacity
            style={[styles.actionItem, { borderBottomColor: theme.border }]}
            onPress={handleEdit}
          >
            <Ionicons
              name="create-outline"
              size={20}
              color={theme.primaryText}
            />
            <Text style={[styles.actionText, { color: theme.primaryText }]}>
              Edit Workout
            </Text>
            <Ionicons
              name="chevron-forward"
              size={20}
              color={theme.secondaryText}
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionItem} onPress={handleDelete}>
            <Ionicons name="trash-outline" size={20} color={theme.error} />
            <Text style={[styles.actionText, { color: theme.error }]}>
              Delete Workout
            </Text>
            <Ionicons
              name="chevron-forward"
              size={20}
              color={theme.secondaryText}
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    flex: 1,
    textAlign: "center",
  },
  actionButton: {
    padding: 4,
  },
  placeholder: {
    width: 32,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: 16,
    marginTop: 16,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
  },
  errorText: {
    fontSize: 16,
    textAlign: "center",
    marginVertical: 16,
  },
  retryButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    fontSize: 16,
    fontWeight: "600",
  },
  actionsContainer: {
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  actionItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    gap: 12,
  },
  actionText: {
    fontSize: 16,
    fontWeight: "500",
    flex: 1,
  },
});

export default WorkoutDetailsScreen;
