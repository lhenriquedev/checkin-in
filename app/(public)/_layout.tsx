import { Stack } from "expo-router";

export default function PublicLayout() {
  return (
    <Stack>
      <Stack.Screen name="sign-in" />
      <Stack.Screen name="sign-up" />
    </Stack>
  );
}
