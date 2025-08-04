import { Button, ButtonText } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Debt } from "@/models/Debt";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { View } from "react-native";

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
    <View className="p-6 relative">
      <Button variant="link" onPress={router.back} className="justify-end">
        <ButtonText className="text-xl">Done</ButtonText>
      </Button>
      <Heading className="text-3xl">{debt.name}</Heading>
    </View>
  );
}
