import { Button, ButtonText } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { Progress, ProgressFilledTrack } from "@/components/ui/progress";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { Debt } from "@/models/Debt";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";

export default function DebtModal() {
  const emptyDebt: Debt = {
    id: "",
    name: "",
    type: "",
    initialValue: 0,
    target: false,
    balance: 0,
    minPayment: 0,
    interest: 0,
  };

  const { id } = useLocalSearchParams();
  const [debt, setDebt] = useState<Debt>(emptyDebt);

  const fetchDebt = async () => {
    try {
      const data = await AsyncStorage.getItem("debts");
      if (data !== null) {
        const fetchedDebts: Debt[] = JSON.parse(data);
        const adjustedDebt = fetchedDebts.find((debt) => debt.id === id);
        if (adjustedDebt === undefined) {
          setDebt(emptyDebt);
        } else {
          setDebt(adjustedDebt);
        }
      }
    } catch (e) {
      console.error("Error fetching debt:", e);
    }
  };

  useEffect(() => {
    fetchDebt();
  });

  return (
    <ScrollView className="p-6 relative">
      <Button variant="link" onPress={router.back} className="justify-end">
        <ButtonText className="text-xl">Done</ButtonText>
      </Button>
      <VStack space="xl">
        <Heading className="text-3xl">{debt.name}</Heading>

        <Card className="p-6 gap-4">
          <Heading>Progress</Heading>
          <Progress
            size="lg"
            value={100 - (debt.balance / debt.initialValue) * 100}
          >
            <ProgressFilledTrack></ProgressFilledTrack>
          </Progress>

          <View className="flex-row gap-4 w-full items-center">
            <Card className="flex-1 items-center">
              <Text className="font-bold text-3xl text-black">
                {Math.floor(100 - (debt.balance / debt.initialValue) * 100)}%
              </Text>
              <Text>paid off</Text>
            </Card>
            <Card className="flex-1 items-center">
              <Text className="font-bold text-3xl text-black text-center">
                Nov. 2027
              </Text>
              <Text>freedom date</Text>
            </Card>
          </View>
        </Card>
        <Card
          className={`p-6 gap-4 ${debt.target ? "bg-blue-100" : "bg-white"}`}
        >
          <Heading>{debt.target ? "Target" : "Pending"}</Heading>
          <Text>
            {debt.target
              ? "Each month, pay your minimum payment and your extra amount. If you want to move faster, contribute to this debt."
              : "Continue paying the minimum payments each month. It's the fastest way to build momentum!"}
          </Text>
        </Card>
      </VStack>
    </ScrollView>
  );
}
