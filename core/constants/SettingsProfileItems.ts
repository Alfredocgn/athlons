import { ListItemProps } from "../components/profile/ListItem";

export const SettingsProfileItems: ListItemProps[] = [
  {
    icon: "watch-outline",
    title: "Connect App & Devices",
    // onPress: () => router.push("/(tabs)/connect"),
    onPress: () => console.log("Connect App & Devices Pressed"),
  },
  {
    icon: "barbell-outline",
    title: "Workout Settings",
    onPress: () => console.log("Workout Settings Pressed"),
  },
  {
    icon: "create",
    title: "Units of Measure",
    onPress: () => console.log("Units of Measure Pressed"),
  },
  {
    icon: "notifications",
    title: "Notification Settings",
    onPress: () => console.log("Notification Settings Pressed"),
  },
];
