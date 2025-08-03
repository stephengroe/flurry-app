import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs>

      <Tabs.Screen name="index" options={{ title: "Home", headerShown: false }} />
      <Tabs.Screen name="activity" options={{ title: "Activity", headerShown: false  }} />
      <Tabs.Screen name="plan" options={{ title: "Plan", headerShown: false  }} />
      <Tabs.Screen name="settings" options={{ title: "Settings", headerShown: false  }} />
    </Tabs>
  );
}
