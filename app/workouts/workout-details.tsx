import { useGetWorkout } from "@/core/workouts/hooks/useWorkouts";
import { useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";

const WorkoutDetailsScreen = () => {
  const { sessionId } = useLocalSearchParams();
  const { data: session } = useGetWorkout(sessionId as string);
  const [mapReady, setMapReady] = useState(false);

  const mockSession = {
    title: "Morning Run",
    trackPoints: [
      { latitude: -34.5764, longitude: -58.4131 },
      { latitude: -34.5758, longitude: -58.4125 },
      { latitude: -34.5752, longitude: -58.4119 },
      { latitude: -34.5746, longitude: -58.4113 },
      { latitude: -34.574, longitude: -58.4107 },
      { latitude: -34.5734, longitude: -58.4101 },
      { latitude: -34.5728, longitude: -58.4095 },
      { latitude: -34.5722, longitude: -58.4089 },
    ],
  };

  const onRegionChange = (region) => {
    console.log("Region:", region);
  };

  const { trackPoints } = mockSession;

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: -34.5743, // ✅ Buenos Aires
          longitude: -58.411, // ✅ Buenos Aires
          latitudeDelta: 0.01, // ✅ Zoom correcto
          longitudeDelta: 0.01, // ✅ Zoom correcto
        }}
        onRegionChange={onRegionChange}
        mapType="standard"
      >
        {/* Marcador de inicio */}
        <Marker coordinate={trackPoints[0]} title="Inicio" pinColor="green" />

        {/* Marcador de fin */}
        <Marker
          coordinate={trackPoints[trackPoints.length - 1]}
          title="Fin"
          pinColor="red"
        />

        {/* Línea de la ruta */}
        <Polyline
          coordinates={trackPoints}
          strokeColor="#FF0000"
          strokeWidth={4}
          lineCap="round"
          lineJoin="round"
        />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    backgroundColor: "white",
  },
  map: {
    flex: 1, // ✅ Ocupa toda la pantalla
    width: "100%", // ✅ Ancho completo
    height: "100%", // ✅ Alto completo
  },
});

export default WorkoutDetailsScreen;
