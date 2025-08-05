import { router } from "expo-router";
import { ListItemProps } from "../components/profile/ListItem";

export const SettingsProfileItems: ListItemProps[] = [
  {
    icon: "person-outline",
    title: "Personal Information",
    subtitle: "Name, birth date, gender, bio",
    onPress: () => router.push("/profile/personal-info"),
  },
  {
    icon: "body-outline",
    title: "Physical Information",
    subtitle: "Height, weight, profile image",
    onPress: () => router.push("/profile/physical-info"),
  },
  // Sección: Preferencias de Running
  {
    icon: "map-outline",
    title: "Running Preferences",
    subtitle: "Distance, goals, pace",
    onPress: () => router.push("/profile/running-preferences"),
  },
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
