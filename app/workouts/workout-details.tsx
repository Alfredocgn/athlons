import { useGetWorkout } from "@/core/workouts/hooks/useWorkouts";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { Dimensions, StyleSheet, Text } from "react-native";
import MapView from "react-native-maps";
import { SafeAreaProvider } from "react-native-safe-area-context";

const WorkoutDetailsScreen = () => {
  const { sessionId } = useLocalSearchParams();
  const { data: session } = useGetWorkout(sessionId as string);
  const { width, height } = Dimensions.get("window");

  const mockSession = {
    title: "Morning Run",
    trackPoints: [
      { latitude: 19.4326, longitude: -99.1332 },
      { latitude: 19.433, longitude: -99.134 },
      { latitude: 19.434, longitude: -99.135 },
      { latitude: 19.435, longitude: -99.136 },
    ],
  };

  const ASPECT_RATIO = width / height;
  const LATITUDE = 37.78825;
  const LONGITUDE = -122.4324;
  const LATITUDE_DELTA = 0.0922;
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

  const SAMPLE_REGION = {
    latitude: LATITUDE,
    longitude: LONGITUDE,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  };
  const { title, trackPoints } = mockSession;
  return (
    <SafeAreaProvider style={styles.container}>
      <Text style={{ color: "black", fontSize: 20, marginBottom: 10 }}>
        {title}
      </Text>
      <MapView liteMode style={styles.map} initialRegion={SAMPLE_REGION}>
        {/* <Polyline
          coordinates={trackPoints}
          strokeColor="#FF0000"
          strokeWidth={4}
        /> */}
      </MapView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    backgroundColor: "white",
  },
  map: {
    width: Dimensions.get("window").width,
    height: 300,
  },
});

export default WorkoutDetailsScreen;
