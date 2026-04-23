import { Colors } from "../constants/Colors";
import { useColorScheme } from "./useColorScheme";

export const useTheme = () => {
  const colorScheme = useColorScheme();

  return Colors[colorScheme ?? "light"];
};
