import { useTheme } from "@/core/hooks/useTheme";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import CustomButton from "../CustomButton";

const profileImages = {
  Amazon: require("../../../assets/images/png/Amazon-profile.png"),
  Spartan: require("../../../assets/images/png/Spartan-profile.png"),
};
const UserData = () => {
  const theme = useTheme();
  const isAmazon = true;
  const gender = isAmazon ? "Amazon" : "Spartan";

  return (
    <View style={style.container}>
      <View style={style.imageContainer}>
        <Image source={profileImages[gender]} style={style.image} />
      </View>
      <Text style={[style.text, { color: theme.primaryText }]}>
        {gender} User Name
      </Text>
      <CustomButton
        size="small"
        style={[style.button, { backgroundColor: theme.primaryText }]}
        onPress={() => console.log("Edit Profile")}
      >
        Edit Profile
      </CustomButton>
    </View>
  );
};

const style = StyleSheet.create({
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
  text: {
    fontSize: 20,
    color: "black",
    marginTop: 10,
  },
  button: {
    marginTop: 20,
    paddingVertical: 8,
  },
});

export default UserData;
