import { Heading } from "@/components/ui/heading";
import { VStack } from "@/components/ui/vstack";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Payments() {
  return (
    <SafeAreaView>
      <ScrollView>
        <VStack className="m-6 mb-3 gap-4" space="2xl">
          <Heading size="3xl" className="flex-start">
            Payments
          </Heading>
        </VStack>
      </ScrollView>
    </SafeAreaView>
  );
}
