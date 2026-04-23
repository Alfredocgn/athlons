import CustomButton from "@/core/components/CustomButton";
import { useColorScheme } from "@/core/hooks/useColorScheme";
import { useTheme } from "@/core/hooks/useTheme";
import { router } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

const HomeScreen = () => {
  const theme = useTheme();
  const colorScheme = useColorScheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.primaryText }]}>Athlons</Text>
      <Image
        style={styles.img}
        source={
          colorScheme === "dark"
            ? require("../assets/images/Athlons_V1.png")
            : require("../assets/images/Athlons_V1_light.png")
        }
      />
      <CustomButton
        textStyle={{
          fontFamily: "Roman",
          color: theme.primaryText,
        }}
        style={{
          backgroundColor: theme.background,
          borderWidth: 2,
          borderColor: theme.primaryText,
        }}
        onPress={() => router.push("/auth/login")}
      >
        Login
      </CustomButton>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontFamily: "Roman",
    fontSize: 40,
    textShadowColor: "#000",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  img: {
    width: 300,
    height: 300,
  },
  loginButton: {
    fontFamily: "Roman",
  },
});

export default HomeScreen;
