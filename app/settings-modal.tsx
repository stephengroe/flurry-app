import { Button, ButtonText } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { generateSampleData } from "@/scripts/generateSampleData";
import { useUserStore } from "@/stores/useUserStore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useEffect } from "react";
import { Alert, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Settings() {
  const { user, loadUser } = useUserStore();

  const handleOverwriteData = () => {
    if (user.name === "User") {
      overwriteData();
    } else {
      Alert.alert(
        "Overwrite existing data?",
        "Loading sample data will replace all existing debts, payments, and user data. This cannot be undone.",
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "Replace",
            style: "destructive",
            onPress: overwriteData,
          },
        ],
        { cancelable: false }
      );
    }
  };

  const overwriteData = async () => {
    try {
      await generateSampleData();
    } catch (e) {
      console.error("Error generating sample data:", e);
    }
  };

  const handleClearData = async () => {
    Alert.alert(
      "Delete all data?",
      "This will erase all existing debts, payments, and user data. This cannot be undone.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: clearData,
        },
      ],
      { cancelable: false }
    );
  };

  const clearData = async () => {
    try {
      await AsyncStorage.clear();
    } catch (e) {
      console.error("Cannot clear data:", e);
    }
  };

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  return (
    <>
      <SafeAreaView className="p-6 relative">
        <VStack space="xl">
          <View>
            <Button
              variant="link"
              onPress={router.back}
              className="justify-end"
            >
              <ButtonText className="text-xl">Done</ButtonText>
            </Button>
            <VStack space="xl">
              <Heading className="text-3xl">Settings</Heading>
            </VStack>
          </View>

          <Card className="align-center p-8">
            <Heading size="xl" className="text-center">
              {user.name}
            </Heading>
            <Text size="md" className="text-center">
              Member since{" "}
              {new Date(user.joinDate).toLocaleDateString("en-US", {
                month: "long",
                year: "numeric",
              })}
            </Text>
          </Card>
          <Card className="align-center p-8">
            <Heading size="xl" className="text-center">
              {(user.extraPayment / 100).toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </Heading>
            <Text size="md" className="text-center">
              Extra monthly payment
            </Text>
          </Card>

          <View className="gap-3">
            <Button onPress={handleOverwriteData}>
              <ButtonText>Load sample data</ButtonText>
            </Button>
            <Button onPress={handleClearData} action="negative">
              <ButtonText>Clear all data</ButtonText>
            </Button>
          </View>
        </VStack>
      </SafeAreaView>
    </>
  );
}
