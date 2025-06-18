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
  },
  dark: {
    text: "#ECEDEE",
    primaryText: "#CBA144",
    background: "#001426",
    tint: tintColorDark,
    icon: "#B4B9BF",
    tabIconDefault: "#B4B9BF",
    tabIconSelected: tintColorDark,
  },
};

// // En modo light, sustituimos el dorado por un "golden-brown" más legible
// const accentColorLight = '#8C6239'; // Bronce oscuro
// const accentColorDark = '#CBA144';  // Dorado puro

// export const Colors = {
//   light: {
//     text: '#1A1E22',
//     primaryText: accentColorLight, // Para títulos
//     background: '#F5F2EB',
//     tint: accentColorLight,
//     icon: '#687076',
//     tabIconDefault: '#A6A6A6',
//     tabIconSelected: accentColorLight,
//   },
//   dark: {
//     text: '#ECEDEE',
//     primaryText: accentColorDark,  // En oscuro usamos el dorado puro
//     background: '#0C1B2A',
//     tint: accentColorDark,
//     icon: '#B4B9BF',
//     tabIconDefault: '#B4B9BF',
//     tabIconSelected: accentColorDark,
//   },
// };
