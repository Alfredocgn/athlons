import { Book, bookData } from "@/core/data/mockBooks";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import BookCard from "./BookCard";

const BookRecomendation = () => {
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
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
    marginTop: 10,
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingRight: 20,
  },
});

export default BookRecomendation;
