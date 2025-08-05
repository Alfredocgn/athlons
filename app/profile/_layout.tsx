import { Stack } from "expo-router";

export default function ProfileLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="personal-info" />
      <Stack.Screen name="physical-info" />
      <Stack.Screen name="running-preferences" />
    </Stack>
  );
}
