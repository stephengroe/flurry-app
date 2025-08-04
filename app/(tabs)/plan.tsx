import { DebtCard } from "@/components/debt-card";
import { Button, ButtonText } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { useDebtStore } from "@/stores/useDebtStore";
import { getFreedomDate } from "@/utils/freedom-date";
import { router } from "expo-router";
import { useEffect, useMemo } from "react";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Plan() {
  const { debts, loadDebts } = useDebtStore();

  const pendingDebts = useMemo(() => {
    return debts
      .filter((debt) => debt.balance > 0)
      .sort((a, b) => a.balance - b.balance);
  }, [debts]);

  const paidDebts = useMemo(() => {
    return debts.filter((debt) => debt.balance === 0);
  }, [debts]);

  const totalInitialValue =
    pendingDebts.reduce((sum, debt) => {
      return (sum += debt.initialValue);
    }, 0) / 100;
  const totalBalance =
    pendingDebts.reduce((sum, debt) => {
      return (sum += debt.balance);
    }, 0) / 100;

  const today = new Date();
  const freedomDate = new Date(getFreedomDate(pendingDebts, 100000));
  const monthsLeft =
    (freedomDate.getFullYear() - today.getFullYear()) * 12 +
    (freedomDate.getMonth() - today.getMonth());

  useEffect(() => {
    loadDebts();
  }, [loadDebts]);

  return (
    <SafeAreaView>
      <ScrollView>
        <VStack className="m-6 mb-3 gap-4" space="2xl">
          <Heading size="3xl" className="flex-start">
            Plan
          </Heading>

          <View className="flex-row w-full gap-4">
            <Card className="items-center flex-1">
              <Text className="font-bold text-2xl text-black">
                {Math.round((totalBalance / totalInitialValue) * 100)}%
              </Text>
              <Text>paid off</Text>
            </Card>

            <Card className="items-center flex-1">
              <Text className="font-bold text-2xl text-black">
                {`${Math.floor(monthsLeft / 12)}y ${monthsLeft % 12}m`}
              </Text>
              <Text>time left</Text>
            </Card>
          </View>

          <View className="flex-row w-full gap-4">
            <Card className="items-center flex-1">
              <Text className="font-bold text-2xl text-black">
                {totalBalance.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })}
              </Text>
              <Text>total balance</Text>
            </Card>

            <Card className="items-center flex-1">
              <Text className="font-bold text-2xl text-black">
                {(
                  pendingDebts.reduce((sum, debt) => {
                    return (sum += debt.minPayment);
                  }, 0) /
                    100 +
                  1000
                ).toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })}
              </Text>
              <Text>due monthly</Text>
            </Card>
          </View>
        </VStack>

        <Heading size="xl" className="m-6">
          Pending debts ({pendingDebts.length})
        </Heading>
        <VStack space="sm">
          {pendingDebts.map((debt) => {
            return <DebtCard key={debt.id} debt={debt} progress={true} />;
          })}
        </VStack>

        <Heading size="xl" className="m-6">
          Paid debts ({paidDebts.length})
        </Heading>
        <VStack space="sm">
          {paidDebts.map((debt) => {
            return <DebtCard key={debt.id} debt={debt} progress={true} />;
          })}
          <Button
            size="lg"
            className=""
            onPress={() => router.navigate({ pathname: "../debt-modal" })}
          >
            <ButtonText className="2xl">Add Debt</ButtonText>
          </Button>
        </VStack>
      </ScrollView>
    </SafeAreaView>
  );
}
