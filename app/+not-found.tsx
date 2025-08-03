import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { View } from "react-native";

export default function NotFoundScreen() {
  return (
    <View>
      <Card size="lg" variant="elevated" className="m-3">
        <Heading size="lg">Page not found</Heading>
      </Card>
    </View>
  );
}
