import { useTheme } from "@/core/hooks/useTheme";
import { Image } from "expo-image";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface BookCardProps {
  title: string;
  author: string;
  coverImageUrl: string;
}
const BookCard = ({ title, author, coverImageUrl }: BookCardProps) => {
  const theme = useTheme();

  return (
    <TouchableOpacity style={styles.container}>
      <Image
        source={{ uri: coverImageUrl }}
        contentFit="cover"
        transition={300}
        style={styles.coverImage}
      />
      <View style={styles.infoContainer}>
        <Text style={[styles.title, { color: theme.text }]}>{title}</Text>
        <Text style={[styles.author, { color: theme.text }]}>{author}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 120,
    marginRight: 16,
  },
  coverImage: {
    width: 120,
    height: 180,
    borderRadius: 8,
    marginBottom: 8,
    backgroundColor: "#333",
  },
  infoContainer: {
    width: "100%",
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
  },
  author: {
    fontSize: 12,
    opacity: 0.8,
  },
});

export default BookCard;
