import { DebtCard } from "@/components/debt-card";
import { Button, ButtonText } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { generateSampleData } from "@/scripts/generateSampleData";
import { useDebtStore } from "@/stores/useDebtStore";
import { useUserStore } from "@/stores/useUserStore";
import { getFreedomDate } from "@/utils/freedom-date";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Link } from "expo-router";
import React, { useEffect, useMemo } from "react";
import { Alert, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const { user, loadUser } = useUserStore();
  const { debts, loadDebts } = useDebtStore();

  const filteredDebts = useMemo(() => {
    return debts.filter((d) => d.balance > 0);
  }, [debts]);

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

  const percentagePaid = useMemo(() => {
    const totalInitialValue =
      debts.reduce((sum, debt) => {
        return (sum += debt.initialValue);
      }, 0) / 100;
    const totalBalance =
      debts.reduce((sum, debt) => {
        return (sum += debt.balance);
      }, 0) / 100;
    return Math.round((totalBalance / totalInitialValue) * 100);
  }, [debts]);

  useEffect(() => {
    loadUser();
    loadDebts();
  }, [loadDebts, loadUser]);

  if (!debts) return null;

  return (
    <SafeAreaView>
      <ScrollView>
        <VStack className="m-6 mb-3" space="xl">
          <View className="flex-row justify-between items-center">
            <Heading size="3xl" className="flex-start">
              {user.name === "User" ? "Welcome" : `Welcome, ${user.name}`}
            </Heading>
            <Link href="../settings-modal">
              <Ionicons name="settings-outline" size={24} color="grey" />
            </Link>
          </View>
          {debts.length > 0 && (
            <View className="flex-row gap-3 w-full">
              <Card
                size="lg"
                variant="elevated"
                className="items-center flex-row gap-4 flex-1 w-1/2"
              >
                <Ionicons name="today-outline" size={24} color="grey" />
                <View>
                  <Text className="text-xl font-bold text-black">
                    {new Date(
                      getFreedomDate(filteredDebts, user.extraPayment)
                    ).toLocaleDateString("en-US", {
                      month: "short",
                      year: "numeric",
                    })}
                  </Text>
                  <Text className="text-lg center">Debt-free</Text>
                </View>
              </Card>

              <Card
                size="lg"
                variant="elevated"
                className="items-center flex-row gap-4 flex-1 w-1/2"
              >
                <Ionicons name="flame-outline" size={24} color="grey" />
                <View>
                  <Text className="text-xl font-bold text-black">
                    {percentagePaid}%
                  </Text>
                  <Text className="text-lg center">Paid off</Text>
                </View>
              </Card>
            </View>
          )}
        </VStack>

        <View className="mb-12">
          <Heading size="xl" className="m-6">
            Debts
          </Heading>
          {filteredDebts.length > 0 ? (
            <VStack space="sm">
              {filteredDebts.map((debt) => {
                return <DebtCard key={debt.id} debt={debt} />;
              })}
            </VStack>
          ) : (
            <View className="gap-6 p-6 mx-6 items-center">
              <Text className="text-center">
                No debts added yet. Load sample data to start, or load later in
                Settings.
              </Text>
              <Button onPress={handleOverwriteData}>
                <ButtonText>Load sample data</ButtonText>
              </Button>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
