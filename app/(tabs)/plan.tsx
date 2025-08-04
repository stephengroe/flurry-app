import { DebtCard } from "@/components/debt-card";
import { Button, ButtonText } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import {
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
} from "@/components/ui/slider";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { useDebtStore } from "@/stores/useDebtStore";
import { useUserStore } from "@/stores/useUserStore";
import { getFreedomDate } from "@/utils/freedom-date";
import { router } from "expo-router";
import { useEffect, useMemo } from "react";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Plan() {
  const { debts, loadDebts } = useDebtStore();
  const { user, setUser, loadUser } = useUserStore();

  const pendingDebts = useMemo(() => {
    return debts
      .filter((debt) => debt.balance > 0)
      .sort((a, b) => a.balance - b.balance);
  }, [debts]);

  const paidDebts = useMemo(() => {
    return debts.filter((debt) => debt.balance === 0);
  }, [debts]);

  const totalBalance =
    pendingDebts.reduce((sum, debt) => {
      return (sum += debt.balance);
    }, 0) / 100;

  const today = new Date();
  const freedomDate = new Date(getFreedomDate(pendingDebts, user.extraPayment));
  const monthsLeft =
    (freedomDate.getFullYear() - today.getFullYear()) * 12 +
    (freedomDate.getMonth() - today.getMonth());

  useEffect(() => {
    loadDebts();
    loadUser();
  }, [loadDebts, loadUser]);

  return (
    <SafeAreaView>
      <ScrollView>
        <VStack className="m-6 mb-3 gap-4" space="2xl">
          <Heading size="3xl" className="flex-start">
            Plan
          </Heading>

          <Card className="bg-white p-6 gap-6">
            <View className="gap-1">
              <Heading>Extra payment</Heading>
              <Text>
                The fastest way to get debt-free is by paying extra on your
                target debt each month.
              </Text>
            </View>
            <View className="flex-row w-full gap-4">
              <Card className="items-center flex-1">
                <Text className="font-bold text-2xl text-black">
                  ${(user.extraPayment / 100).toLocaleString()}
                </Text>
                <Text>extra payment</Text>
              </Card>

              <Card className="items-center flex-1">
                <Text className="font-bold text-2xl text-black">
                  {`${Math.floor(monthsLeft / 12)}y ${monthsLeft % 12}m`}
                </Text>
                <Text>until debt-free</Text>
              </Card>
            </View>

            <Slider
              defaultValue={user.extraPayment}
              minValue={2500}
              maxValue={1_000_00}
              step={2500}
              size="lg"
              orientation="horizontal"
              isDisabled={false}
              isReversed={false}
              value={user.extraPayment}
              onChange={(value) => {
                setUser({ ...user, extraPayment: value });
              }}
            >
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb />
            </Slider>
          </Card>
          <View className="flex-row w-full gap-4">
            <Card className="items-center flex-1">
              <Text className="font-bold text-2xl text-black">
                {(
                  pendingDebts.reduce((sum, debt) => {
                    return (sum += debt.minPayment);
                  }, 0) / 100
                ).toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })}
              </Text>
              <Text>monthly</Text>
            </Card>
            <Card className="items-center flex-1">
              <Text className="font-bold text-2xl text-black">
                {totalBalance.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })}
              </Text>
              <Text>total balance</Text>
            </Card>
          </View>
        </VStack>

        <Heading size="xl" className="m-6">
          Pending debts ({pendingDebts.length})
        </Heading>
        <VStack space="sm">
          {pendingDebts.map((debt) => {
            return <DebtCard key={debt.id} debt={debt} />;
          })}
        </VStack>

        <Heading size="xl" className="m-6">
          Paid debts ({paidDebts.length})
        </Heading>
        <VStack space="sm">
          {paidDebts.map((debt) => {
            return <DebtCard key={debt.id} debt={debt} />;
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
