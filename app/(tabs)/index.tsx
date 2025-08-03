import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  return (
    <SafeAreaView>
      <View>
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
