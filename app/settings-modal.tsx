import { Button, ButtonText } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { VStack } from "@/components/ui/vstack";
import { router } from "expo-router";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Settings() {
  return (
    <SafeAreaView className="p-6 relative">
      <View>
        <Button variant="link" onPress={router.back} className="justify-end">
          <ButtonText className="text-xl">Done</ButtonText>
        </Button>
        <VStack space="xl">
          <Heading className="text-3xl">Settings</Heading>
        </VStack>
      </View>
    </SafeAreaView>
  );
}
