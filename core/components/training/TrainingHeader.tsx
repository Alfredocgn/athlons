import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { useTheme } from "@/core/hooks/useTheme";
import Ionicons from "@expo/vector-icons/Ionicons";

const TrainingHeader = () => {
  const theme = useTheme();
  return (
    <View style={[styles.header, { backgroundColor: theme.background }]}>
      <View style={styles.titleContainer}>
        <Ionicons name="fitness" size={24} color={theme.tint} />
        <Text style={[styles.title, { color: theme.primaryText }]}>
          Training
        </Text>
      </View>
      <Text style={[styles.subtitle, { color: theme.text }]}>
        Track your races improve your running
      </Text>
    </View>
  );
};
const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "rbga(0,0,0,0.1)",
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 10,
  },
  subtitle: {
    fontSize: 14,
    opacity: 0.8,
  },
});

export default TrainingHeader;
