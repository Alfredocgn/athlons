import { Stack } from "expo-router";

export default function WorkoutLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen options={{ headerShown: false }} name="workout-details" />
    </Stack>
  );
}
