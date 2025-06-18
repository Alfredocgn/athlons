import { useEffect, useRef } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";

interface ProgressBarProps {
  progress: number;
  label?: string;
}

const ProgressBar = ({ progress, label }: ProgressBarProps) => {
  const animatedProgress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animatedProgress, {
      toValue: Math.min(Math.max(progress, 0), 1),
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [progress]);

  const widthInterpolated = animatedProgress.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "100%"],
  });
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={styles.barBackground}>
        <Animated.View style={[styles.barFill, { width: widthInterpolated }]} />
      </View>
      <Text style={styles.percentage}>{`${Math.round(progress * 100)}%`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginVertical: 10,
  },
  label: {
    marginBottom: 6,
    fontSize: 16,
    fontWeight: 600,
    color: "#fff",
  },
  barBackground: {
    height: 14,
    backgroundColor: "#cbd5e1",
    borderRadius: 50,
    overflow: "hidden",
  },
  barFill: {
    height: "100%",
    backgroundColor: "#0077b6",
    borderRadius: 50,
  },
  percentage: {
    marginTop: 6,
    fontSize: 14,
    color: "#fff",
    textAlign: "right",
    fontWeight: 500,
  },
});

export default ProgressBar;
