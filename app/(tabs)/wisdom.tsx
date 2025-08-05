import BookRecomendation from "@/core/components/wisdom/BookRecomendation";
import QuoteCard from "@/core/components/wisdom/QuoteCard";
import { quoteData } from "@/core/data/mockQuotes";
import { useTheme } from "@/core/hooks/useTheme";
import Ionicons from "@expo/vector-icons/Ionicons";
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
      {/* Header Section */}
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <View
            style={[
              styles.iconContainer,
              { backgroundColor: theme.primaryText },
            ]}
          >
            <Ionicons name="library" size={24} color={theme.background} />
          </View>
          <View style={styles.textContainer}>
            <Text style={[styles.title, { color: theme.primaryText }]}>
              Wisdom
            </Text>
            <Text style={[styles.subtitle, { color: theme.secondaryText }]}>
              Train your mind as you train your body
            </Text>
          </View>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Book Recommendations Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.primaryText }]}>
            Book Recommendations
          </Text>
          <BookRecomendation />
        </View>

        {/* Quotes Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.primaryText }]}>
            Daily Wisdom
          </Text>
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
              onPress={
                visibleQuotesCount === 3 ? handleShowMore : handleShowLess
              }
              style={[
                styles.moreButton,
                { backgroundColor: theme.primaryText },
              ]}
            >
              <Text
                style={[styles.moreButtonText, { color: theme.background }]}
              >
                {visibleQuotesCount === 3 ? "Show more quotes" : "Show less"}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.1)",
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
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
  title: {
    fontSize: 28,
    fontFamily: "Roman",
    fontWeight: "600",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: "Roman",
    opacity: 0.8,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  section: {
    marginTop: 30,
  },
  sectionTitle: {
    fontFamily: "Roman",
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 15,
  },
  moreButton: {
    marginTop: 20,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  moreButtonText: {
    fontFamily: "Roman",
    fontWeight: "600",
    fontSize: 16,
  },
});

export default WisdomScreen;
