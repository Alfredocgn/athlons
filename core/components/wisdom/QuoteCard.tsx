import { useTheme } from "@/core/hooks/useTheme";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import CustomButton from "../CustomButton";

interface QuoteCardProps {
  text: string;
  author: string;
  category: string;
}

const QuoteCard = ({ text, author, category }: QuoteCardProps) => {
  const isStoic = category === "Stoic";
  const theme = useTheme();
  return (
    <View
      style={[
        styles.card,
        { backgroundColor: isStoic ? "#2c3e50" : "#1e3c72" },
      ]}
    >
      <View style={styles.backgroundIcon}>
        <Image
          source={require("../../../assets/images/png/noun-spartan-helmet-4588848.png")}
          style={{ width: 100, height: 100, tintColor: theme.tint }}
          resizeMode="contain"
        />
      </View>

      <View>
        <Text style={styles.quoteText}>{`"${text}"`}</Text>
        <Text style={styles.author}>– {author}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <View
          style={[
            styles.tag,
            isStoic ? styles.tagStoic : styles.tagMotivational,
          ]}
        >
          <Text style={styles.tagText}>{category}</Text>
        </View>
        <CustomButton
          onPress={() => console.log("Share button pressed")}
          icon="share-outline"
          style={styles.shareButton}
          textStyle={{ fontSize: 12 }}
          iconSize={18}
        >
          Share
        </CustomButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: 20,
    marginVertical: 10,
    marginHorizontal: 16,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    minHeight: 160,
    justifyContent: "space-between",
  },
  quoteText: {
    fontSize: 18,
    color: "#fff",
    fontStyle: "italic",
    marginBottom: 12,
  },
  author: {
    fontSize: 16,
    color: "#ddd",
    textAlign: "right",
    marginBottom: 10,
  },
  tag: {
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    justifyContent: "center",
  },
  tagStoic: {
    backgroundColor: "#5c6e74",
  },
  tagMotivational: {
    backgroundColor: "#446df6",
  },
  tagText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
  shareButton: {
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    backgroundColor: "#5c6e74",
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  backgroundIcon: {
    position: "absolute",
    right: 0,
    top: "50%",
    transform: [{ translateY: -50 }],
    opacity: 0.08,
    zIndex: -1,
  },
});

export default QuoteCard;
