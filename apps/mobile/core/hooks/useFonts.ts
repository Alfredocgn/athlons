import { Fonts } from "../constants/Fonts";

export const useFonts = () => {
  return {
    fonts: Fonts,
    defaultStyle: {
      fontFamily: Fonts.regular,
    },
    getFontStyle: (fontType: keyof typeof Fonts) => ({
      fontFamily: Fonts[fontType],
    }),
  };
};
