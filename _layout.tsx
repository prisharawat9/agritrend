// app/_layout.tsx
import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack>
      {/* Home Page */}
      <Stack.Screen name="index" options={{ title: "Home" }} />

      {/* Camera Page */}
      <Stack.Screen name="camera" options={{ title: "Camera" }} />

      {/* Market Prices Page */}
      <Stack.Screen name="prices" options={{ title: "Market Prices" }} />

      {/* Mandis Page */}
      <Stack.Screen name="mandis" options={{ title: "Mandis" }} />
    </Stack>
  );
}
