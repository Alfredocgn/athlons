import BookRecomendation from "@/core/components/wisdom/BookRecomendation";
import QuoteCard from "@/core/components/wisdom/QuoteCard";
import { quoteData } from "@/core/data/mockQuotes";
import { useTheme } from "@/core/hooks/useTheme";
import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const WisdomScreen = () => {
  const theme = useTheme();
  const [visibleQuotesCount, setVisiblesQuoteCount] = useState(3);
  const handleShowMore = () => {
    setVisiblesQuoteCount(quoteData.length);
  };
  const handleShowLess = () => {
    setVisiblesQuoteCount(3);
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.text }]}>
            Wisdom Section
          </Text>
          <Text style={[styles.subtitle, { color: theme.text }]}>
            Train your mind as you train your body.
          </Text>
        </View>
        <BookRecomendation />
        {quoteData.slice(0, visibleQuotesCount).map((q, index) => (
          <QuoteCard
            key={index}
            text={q.text}
            author={q.author}
            category={q.category}
          />
        ))}
        {quoteData.length > 3 && (
          <TouchableOpacity
            onPress={visibleQuotesCount === 3 ? handleShowMore : handleShowLess}
            style={styles.moreButton}
          >
            <Text style={styles.moreButtonText}>
              {visibleQuotesCount === 3 ? "Show more" : "Show less"}
            </Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 16,
    opacity: 0.8,
    marginTop: 4,
  },
  moreButton: {
    marginHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  moreButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default WisdomScreen;
