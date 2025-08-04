import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Payments() {
  return (
    <SafeAreaView>
      <View>
        <Card size="lg" variant="elevated" className="m-3">
          <Heading size="lg" className="mb-1">
            Payments
          </Heading>
          <Text size="md">This screen will list recent payments made.</Text>
        </Card>
      </View>
    </SafeAreaView>
  );
}
