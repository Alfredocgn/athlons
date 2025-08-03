/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = "#CBA144";
const tintColorDark = "#F5F2EB";

export const Colors = {
  light: {
    text: "#8C6239",
    primaryText: "#a97f39",
    background: "#f8f0df",
    tint: tintColorLight,
    icon: "#687076",
    tabIconDefault: "#A6A6A6",
    tabIconSelected: tintColorLight,
    border: "#E0E0E0",
    secondaryText: "#8C6239",
    disabledBackground: "#E8E8E8",
    disabledBorder: "#CCCCCC",
    error: "#FF4444",
    success: "#4CAF50",
  },
  dark: {
    text: "#ECEDEE",
    primaryText: "#CBA144",
    background: "#001426",
    tint: tintColorDark,
    icon: "#B4B9BF",
    tabIconDefault: "#B4B9BF",
    tabIconSelected: tintColorDark,
    border: "#2A2A2A",
    secondaryText: "#B4B9BF",
    disabledBackground: "#1A1A1A",
    disabledBorder: "#404040",
    error: "#FF6B6B",
    success: "#66BB6A",
  },
};
