import { useTheme } from "@/core/hooks/useTheme";
import { useEffect, useRef } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";

interface ProgressBarProps {
  progress: number;
  label?: string;
}

const ProgressBar = ({ progress, label }: ProgressBarProps) => {
  const theme = useTheme();
  const animatedProgress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animatedProgress, {
      toValue: Math.min(Math.max(progress, 0), 1),
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [progress, animatedProgress]);

  const widthInterpolated = animatedProgress.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "100%"],
  });
  return (
    <View style={styles.container}>
      {label && (
        <Text
          style={[
            styles.label,
            { color: theme.primaryText, fontFamily: "Roman" },
          ]}
        >
          {label}
        </Text>
      )}
      <View style={[styles.barBackground, { backgroundColor: theme.border }]}>
        <Animated.View
          style={[
            styles.barFill,
            {
              width: widthInterpolated,
              backgroundColor: theme.primaryText,
            },
          ]}
        />
      </View>
      <Text
        style={[
          styles.percentage,
          { color: theme.primaryText, fontFamily: "Roman" },
        ]}
      >
        {`${Math.round(progress * 100)}%`}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  label: {
    marginBottom: 8,
    fontSize: 14,
    fontWeight: "500",
  },
  barBackground: {
    height: 8,
    borderRadius: 4,
    overflow: "hidden",
  },
  barFill: {
    height: "100%",
    borderRadius: 4,
  },
  percentage: {
    marginTop: 6,
    fontSize: 12,
    textAlign: "right",
    fontWeight: "500",
  },
});

export default ProgressBar;
