import { useTheme } from "@/core/hooks/useTheme";
import React from "react";
import Svg, { Path } from "react-native-svg";

interface SpartanHelmetIconProps {
  color?: string;
  size?: number;
}
const SpartanHelmetIcon = ({ color, size = 120 }: SpartanHelmetIconProps) => {
  const theme = useTheme();
  const iconColor = color || theme.text;
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path
        fill={iconColor}
        d="M12 2C8.13 2 5 5.13 5 9c0 1.8.6 3.45 1.59 4.74L5 15v3h14v-3l-1.59-1.26C18.4 12.45 19 10.8 19 9c0-3.87-3.13-7-7-7zm0 2c2.76 0 5 2.24 5 5s-2.24 5-5 5-5-2.24-5-5 2.24-5 5-5zm-4 8h8v1H8v-1z"
      />
    </Svg>
  );
};

export default SpartanHelmetIcon;
