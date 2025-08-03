import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Activity() {
  return (
    <SafeAreaView>
      <View>
        <Card size="lg" variant="elevated"  className="m-3">
          <Text size="lg" className="mb-1">
            Activity
          </Text>
          <Heading size="lg">April 2027</Heading>
        </Card>
      </View>
    </SafeAreaView>
  );
}
