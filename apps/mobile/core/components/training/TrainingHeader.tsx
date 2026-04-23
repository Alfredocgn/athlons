import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { useTheme } from "@/core/hooks/useTheme";
import Ionicons from "@expo/vector-icons/Ionicons";

const TrainingHeader = () => {
  const theme = useTheme();
  return (
    <View style={[styles.header, { backgroundColor: theme.background }]}>
      <View style={styles.titleContainer}>
        <View
          style={[styles.iconContainer, { backgroundColor: theme.primaryText }]}
        >
          <Ionicons name="fitness" size={24} color={theme.background} />
        </View>
        <View style={styles.textContainer}>
          <Text style={[styles.title, { color: theme.primaryText }]}>
            Training
          </Text>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.1)",
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 28,
    fontFamily: "Roman",
    fontWeight: "600",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: "Roman",
    opacity: 0.8,
  },
});

export default TrainingHeader;
