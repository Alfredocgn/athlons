import { useTheme } from "@/core/hooks/useTheme";
import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet, Text, View } from "react-native";

interface StatCardProps {
  icon: keyof typeof Ionicons.glyphMap;
  value: string;
  label: string;
}

const StatCard = ({ icon, value, label }: StatCardProps) => {
  const theme = useTheme();
  return (
    <View style={styles.container}>
      <Ionicons style={styles.icon} name={icon} size={24} color={theme.tint} />
      <Text style={[styles.value, { color: theme.primaryText }]}>{value}</Text>
      <Text style={[styles.label, { color: theme.text }]}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: 15,
    borderRadius: 10,
    backgroundColor: "rgba(255,255,255,0.1)",
    minWidth: 100,
  },
  icon: {
    marginBottom: 8,
  },
  value: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 4,
  },
  label: {
    fontSize: 12,
    opacity: 0.8,
    textAlign: "center",
  },
});

export default StatCard;
