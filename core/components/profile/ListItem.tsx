import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export interface ListItemProps {
  icon?: keyof typeof Ionicons.glyphMap;
  title: string;
  onPress?: () => void;
}
const ListItem = ({ icon, title, onPress }: ListItemProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[style.container, { padding: 10 }]}
    >
      <View style={style.infoContainer}>
        <Ionicons name={icon} size={24} color="white" />
        <Text style={{ color: "white" }}>{title}</Text>
      </View>

      <Ionicons name="chevron-forward" size={24} color="white" />
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 10,
  },
  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
});

export default ListItem;
