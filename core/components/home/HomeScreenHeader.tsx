import { useTheme } from "@/core/hooks/useTheme";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import CustomButton from "../CustomButton";
import ProgressBar from "./ProgressBar";

const HomeScreenHeader = () => {
  const theme = useTheme();
  return (
    <View style={styles.container}>
      {/* Header with greeting */}
      <View style={styles.titleContainer}>
        <View
          style={[styles.iconContainer, { backgroundColor: theme.primaryText }]}
        >
          <Ionicons name="home" size={24} color={theme.background} />
        </View>
        <View style={styles.textContainer}>
          <Text style={[styles.greetingsText, { color: theme.primaryText }]}>
            Welcome back, Alfredo
          </Text>
          <Text style={[styles.subtitle, { color: theme.secondaryText }]}>
            `{"Ready for today's training?"}`
          </Text>
        </View>
      </View>

      {/* Progress Section */}
      <View style={[styles.progressCard, { backgroundColor: "white" }]}>
        <Text style={[styles.progressTitle, { color: theme.primaryText }]}>
          Training Progress
        </Text>
        <ProgressBar progress={0.65} label="You are on day 3 of training" />
      </View>

      {/* Daily Wisdom Section */}
      <View style={[styles.wisdomCard, { backgroundColor: "white" }]}>
        <View style={styles.wisdomHeader}>
          <Text style={[styles.wisdomTitle, { color: theme.primaryText }]}>
            Daily Wisdom
          </Text>
          <CustomButton
            size="small"
            style={[
              styles.wisdomButton,
              { backgroundColor: theme.primaryText },
            ]}
            icon="library"
            iconSize={14}
            textStyle={[styles.wisdomButtonText, { color: theme.background }]}
            onPress={() => router.push("/(tabs)/wisdom")}
          >
            More
          </CustomButton>
        </View>

        <Text style={[styles.quoteText, { color: theme.primaryText }]}>
          {"'Luck is what happens when preparation meets opportunity'"}
        </Text>
        <Text style={[styles.quoteAuthor, { color: theme.secondaryText }]}>
          – Seneca
        </Text>
      </View>
    </View>
  );
};

export default HomeScreenHeader;

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
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
  greetingsText: {
    fontSize: 24,
    fontFamily: "Roman",
    fontWeight: "600",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: "Roman",
    opacity: 0.8,
  },
  progressCard: {
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  progressTitle: {
    fontFamily: "Roman",
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 15,
  },
  wisdomCard: {
    borderRadius: 12,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  wisdomHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  wisdomTitle: {
    fontFamily: "Roman",
    fontSize: 18,
    fontWeight: "600",
  },
  wisdomButton: {
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  wisdomButtonText: {
    fontFamily: "Roman",
    fontSize: 12,
    fontWeight: "500",
  },
  quoteText: {
    fontSize: 16,
    fontFamily: "Roman",
    fontStyle: "italic",
    marginBottom: 8,
    lineHeight: 22,
  },
  quoteAuthor: {
    fontSize: 14,
    fontFamily: "Roman",
    fontStyle: "italic",
    textAlign: "right",
  },
});
