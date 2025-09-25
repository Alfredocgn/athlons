import { useTheme } from "@/core/hooks/useTheme";
import { MapRegion } from "@/core/workouts/hooks/useWorkoutDetails";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";

interface WorkoutMapProps {
  region: MapRegion;
  trackPoints: { latitude: number; longitude: number }[];
  onMapReady?: () => void;
  onRegionChange?: (region: any) => void;
}

const WorkoutMap: React.FC<WorkoutMapProps> = ({
  region,
  trackPoints,
  onMapReady,
  onRegionChange,
}) => {
  const theme = useTheme();
  const [mapType, setMapType] = useState<"standard" | "satellite" | "hybrid">(
    "standard"
  );
  const [showTraffic, setShowTraffic] = useState(false);

  const toggleMapType = () => {
    const types: ("standard" | "satellite" | "hybrid")[] = [
      "standard",
      "satellite",
      "hybrid",
    ];
    const currentIndex = types.indexOf(mapType);
    const nextIndex = (currentIndex + 1) % types.length;
    setMapType(types[nextIndex]);
  };

  const toggleTraffic = () => {
    setShowTraffic(!showTraffic);
  };

  const getRouteColor = () => {
    // Color basado en la velocidad promedio o tipo de workout
    return theme.primaryText;
  };

  if (trackPoints.length === 0) {
    return (
      <View style={[styles.container, styles.emptyContainer]}>
        <Ionicons name="map-outline" size={48} color={theme.secondaryText} />
        <Text style={[styles.emptyText, { color: theme.secondaryText }]}>
          No route data available
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={region}
        onMapReady={onMapReady}
        onRegionChange={onRegionChange}
        mapType={mapType}
        showsTraffic={showTraffic}
        showsUserLocation={false}
        showsMyLocationButton={false}
        showsCompass={true}
        showsScale={true}
        rotateEnabled={true}
        scrollEnabled={true}
        zoomEnabled={true}
        pitchEnabled={true}
      >
        {/* Marcador de inicio */}
        {trackPoints.length > 0 && (
          <Marker
            coordinate={trackPoints[0]}
            title="Start"
            description="Workout started here"
          >
            <View
              style={[styles.startMarker, { backgroundColor: theme.success }]}
            >
              <Ionicons name="play" size={16} color="white" />
            </View>
          </Marker>
        )}

        {/* Marcador de fin */}
        {trackPoints.length > 1 && (
          <Marker
            coordinate={trackPoints[trackPoints.length - 1]}
            title="Finish"
            description="Workout completed here"
          >
            <View
              style={[styles.finishMarker, { backgroundColor: theme.error }]}
            >
              <Ionicons name="flag" size={16} color="white" />
            </View>
          </Marker>
        )}

        {/* Línea de la ruta */}
        {trackPoints.length > 1 && (
          <Polyline
            coordinates={trackPoints}
            strokeColor={getRouteColor()}
            strokeWidth={4}
            lineCap="round"
            lineJoin="round"
            lineDashPattern={[1, 0]} // Línea sólida
          />
        )}
      </MapView>

      {/* Controles del mapa */}
      <View style={styles.controls}>
        <TouchableOpacity
          style={[styles.controlButton, { backgroundColor: "white" }]}
          onPress={toggleMapType}
        >
          <Ionicons
            name={
              mapType === "satellite"
                ? "earth"
                : mapType === "hybrid"
                ? "layers"
                : "map"
            }
            size={20}
            color={theme.primaryText}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.controlButton,
            { backgroundColor: showTraffic ? theme.primaryText : "white" },
          ]}
          onPress={toggleTraffic}
        >
          <Ionicons
            name="car"
            size={20}
            color={showTraffic ? "white" : theme.primaryText}
          />
        </TouchableOpacity>
      </View>

      {/* Info del mapa */}
      <View style={[styles.mapInfo, { backgroundColor: "white" }]}>
        <Text style={[styles.mapInfoText, { color: theme.secondaryText }]}>
          {trackPoints.length} track points
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 300,
    borderRadius: 16,
    marginHorizontal: 20,
    marginVertical: 10,
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
  map: {
    flex: 1,
  },
  emptyContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  emptyText: {
    fontSize: 16,
    marginTop: 12,
    textAlign: "center",
  },
  controls: {
    position: "absolute",
    top: 12,
    right: 12,
    gap: 8,
  },
  controlButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  startMarker: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "white",
  },
  finishMarker: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "white",
  },
  mapInfo: {
    position: "absolute",
    bottom: 12,
    left: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  mapInfoText: {
    fontSize: 12,
    fontWeight: "500",
  },
});

export default WorkoutMap;
