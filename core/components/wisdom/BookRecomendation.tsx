import { Book, bookData } from "@/core/data/mockBooks";
import { useTheme } from "@/core/hooks/useTheme";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import BookCard from "./BookCard";

const BookRecomendation = () => {
  const theme = useTheme();
  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: theme.text }]}>
        Book Recomendations
      </Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.scrollContainer}
      >
        {bookData.map((book: Book) => (
          <BookCard
            key={book.id}
            title={book.title}
            author={book.author}
            coverImageUrl={book.coverImageUrl}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  scrollContainer: {
    paddingHorizontal: 16,
  },
});

export default BookRecomendation;
