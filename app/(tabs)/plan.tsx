import { DebtCard } from "@/components/debt-card";
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { VStack } from "@/components/ui/vstack";
import { Debt } from "@/models/Debt";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { ScrollView } from "react-native";
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
    <SafeAreaView className="overflow-auto">
      <ScrollView>
        <VStack className="m-6 mb-3" space="lg">
          <Heading size="3xl" className="flex-start">
            Plan
          </Heading>

          <Card>
            <Heading>How does the debt snowball work?</Heading>
          </Card>

          <VStack space="sm">
            {debts.map((debt) => {
              return <DebtCard key={debt.id} debt={debt} progress={true} />;
            })}
          </VStack>
        </VStack>
      </ScrollView>
    </SafeAreaView>
  );
}
