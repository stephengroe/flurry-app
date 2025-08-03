import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Link } from "expo-router";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  return (
    <SafeAreaView>
      <View>
        <Link href="/settings">
          <Ionicons name="settings-outline" size={24} color="grey" />
        </Link>
        <Card size="lg" variant="elevated" className="m-3">
          <Heading size="lg" className="mb-1">
            Home
          </Heading>
          <Text size="lg">
            This screen will show an overview of debt repayment progress, plus
            gamification (streaks + badges).
          </Text>
        </Card>
      </View>
    </SafeAreaView>
  );
}
