export const Fonts = {
  regular: "Yantramanav_Regular",
  bold: "Yantramanav_Bold",
  medium: "Yantramanav_Medium",
  light: "Yantramanav_Light",
  thin: "Yantramanav_Thin",
  black: "Yantramanav_Black",
  roman: "Roman",
} as const;

export type FontFamily = keyof typeof Fonts;

export const defaultTextStyle = {
  fontFamily: Fonts.regular,
} as const;
