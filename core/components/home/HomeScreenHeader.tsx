import { useTheme } from "@/core/hooks/useTheme";
import Entypo from "@expo/vector-icons/Entypo";
import { router } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import CustomButton from "../CustomButton";
import ProgressBar from "./ProgressBar";

const HomeScreenHeader = () => {
  const theme = useTheme();
  return (
    <View style={[styles.container]}>
      <View style={[styles.textContainer]}>
        <Text style={[styles.greetingsText, { color: theme.text }]}>
          Greetings, Alfredo
        </Text>
        <Entypo name="feather" size={24} color={theme.text} />
      </View>
      <View>
        <ProgressBar progress={0.65} label="You are on 3 day of training" />
        <View>
          <Text style={[styles.wisdomContainer, { color: theme.text }]}>
            Daily Wisdom
          </Text>
          <Text style={[styles.quoteText, { color: theme.primaryText }]}>
            `{"Luck is what happens when preparation meets opportunity"}`
          </Text>
        </View>
        <View style={styles.quoteContainer}>
          <Text style={styles.quoteTextAutor}>Seneca</Text>
          <CustomButton
            size="small"
            style={{
              backgroundColor: theme.background,
              borderWidth: 1,
              borderColor: "#C0C0C0",
            }}
            icon="leaf"
            iconSize={10}
            textStyle={{ fontSize: 8 }}
            onPress={() => router.push("/(tabs)/wisdom")}
          >
            Wisdom
          </CustomButton>
        </View>
      </View>
    </View>
  );
};

export default HomeScreenHeader;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    gap: 4,
  },
  textContainer: {
    flexDirection: "row",
    gap: 4,
  },
  greetingsText: {
    fontSize: 20,
  },
  wisdomContainer: {},
  wisdomTitle: {
    fontSize: 16,
  },
  quoteContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
    gap: 4,
  },
  quoteText: {
    fontSize: 16,
    fontStyle: "italic",
    marginVertical: 4,
  },
  quoteTextAutor: {
    fontSize: 12,
    color: "#C0C0C0",
    fontStyle: "italic",
  },
});
