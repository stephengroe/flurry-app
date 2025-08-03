import { DebtCard } from "@/components/debt-card";
import { Button, ButtonText } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { Debt } from "@/models/Debt";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Plan() {
  const [debts, setDebts] = useState<Debt[]>([]);

  const fetchDebts = async () => {
    try {
      const data = await AsyncStorage.getItem("debts");
      if (data !== null) {
        const fetchedDebts: Debt[] = JSON.parse(data);
        const adjustedDebts = fetchedDebts
          .filter((debt) => debt.balance > 0)
          .sort((a, b) => a.balance - b.balance);
        setDebts(adjustedDebts);
      }
    } catch (e) {
      console.error("Error fetching user:", e);
    }
  };

  useEffect(() => {
    fetchDebts();
  }, []);

  return (
    <SafeAreaView>
      <ScrollView>
        <VStack className="m-6 mb-3" space="2xl">
          <Heading size="3xl" className="flex-start">
            Plan
          </Heading>

          <Card>
            <Heading>How does the debt snowball work?</Heading>
          </Card>

          <View className="flex-row gap-4 w-full">
            <Card className="flex-1 items-center">
              <Text className="font-bold text-2xl text-black">
                {(
                  debts.reduce((sum, debt) => {
                    return (sum += debt.balance);
                  }, 0) / 100
                ).toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })}
              </Text>
              <Text>total debt</Text>
            </Card>
            <Card className="flex-1 items-center">
              <Text className="font-bold text-2xl text-black">
                {(
                  debts.reduce((sum, debt) => {
                    return (sum += debt.minPayment);
                  }, 0) / 100
                ).toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })}
              </Text>
              <Text>due monthly</Text>
            </Card>
          </View>
        </VStack>

        <VStack space="sm">
          {debts.map((debt) => {
            return <DebtCard key={debt.id} debt={debt} progress={true} />;
          })}
          <Button size="lg" className="">
            <ButtonText className="2xl">Add Debt</ButtonText>
          </Button>
        </VStack>
      </ScrollView>
    </SafeAreaView>
  );
}
