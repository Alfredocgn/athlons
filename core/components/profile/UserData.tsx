import { useTheme } from "@/core/hooks/useTheme";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

const profileImages = {
  Amazon: require("../../../assets/images/png/Amazon-profile.png"),
  Spartan: require("../../../assets/images/png/Spartan-profile.png"),
};
const UserData = () => {
  const theme = useTheme();
  const isAmazon = true;
  const gender = isAmazon ? "Amazon" : "Spartan";

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={profileImages[gender]} style={styles.image} />
      </View>
      <Text style={[styles.name, { color: theme.primaryText }]}>
        {gender} User Name
      </Text>
      <Text style={[styles.subtitle, { color: theme.secondaryText }]}>
        Runner • Athlete
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  imageContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "white",

    borderColor: "black",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  name: {
    fontSize: 24,
    fontFamily: "Roman",
    fontWeight: "600",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: "Roman",
    opacity: 0.8,
  },
});

export default UserData;
