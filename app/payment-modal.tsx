import { Button, ButtonText } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  FormControl,
  FormControlLabel,
  FormControlLabelText,
} from "@/components/ui/form-control";
import { Heading } from "@/components/ui/heading";
import { Input, InputField } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { VStack } from "@/components/ui/vstack";
import { useDebtStore } from "@/stores/useDebtStore";
import { usePaymentStore } from "@/stores/usePaymentStore";
import { Debt } from "@/types/Debt";
import { Payment } from "@/types/Payment";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useMemo } from "react";
import { Alert, ScrollView, View } from "react-native";

export default function PaymentModal() {
  const { id, debtId } = useLocalSearchParams();
  const { payments, loadPayments, setPayments, savePayments } =
    usePaymentStore();
  const { debts, loadDebts } = useDebtStore();

  const activePayment = useMemo(() => {
    const defaultPayment: Payment = {
      id: "",
      debtId: "",
      minPayment: 0,
      amount: 0,
      date: 0,
    };

    let foundPayment = payments.find((p) => p.id === id);
    if (debtId) defaultPayment.debtId = debtId[0];
    return foundPayment ?? defaultPayment;
  }, [payments, id, debtId]);

  const activeDebt: Debt | undefined = useMemo(() => {
    return debts.find((d) => d.id === activePayment.debtId);
  }, [activePayment, debts]);

  const deletePayment = () => {
    const updatedPayments = payments.filter((p) => p.id !== id);
    setPayments(updatedPayments);
    router.back();
  };

  const editDebt = () => {
    if (activeDebt) {
      router.navigate({
        pathname: "../debt-modal",
        params: { id: activeDebt.id },
      });
    }
  };

  const handleChange = async (key: keyof Payment, value: string) => {
    const updatedPayment = {
      ...activePayment,
      [key]:
        key === "minPayment" || key === "amount" || key === "date"
          ? // Workaround to convert string to number
            Math.round(Number.parseFloat(value) * 100) || 0
          : value,
    };
    setPayments(
      payments.map((p) => (p.id === activePayment.id ? updatedPayment : p))
    );
  };

  const handleDelete = () => {
    Alert.alert(
      "Delete this payment?",
      "This will delete this payment and cannot be undone. The associated debt will not be affected.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: deletePayment,
        },
      ],
      { cancelable: false }
    );
  };

  const handleSave = async () => {
    await savePayments(payments);
    router.back();
  };

  useEffect(() => {
    loadPayments();
    loadDebts();
  }, [loadDebts, loadPayments]);

  if (!activePayment) return <Spinner size="large" />;

  return (
    <>
      <ScrollView className="p-6 pt-4">
        <View className="flex-row w-full justify-between items-center mb-4">
          <Button variant="link" onPress={router.back} className="">
            <ButtonText className="text-xl font-normal">Cancel</ButtonText>
          </Button>

          <Button variant="link" onPress={handleSave} className="">
            <ButtonText className="text-xl">Save</ButtonText>
          </Button>
        </View>
        <VStack space="xl">
          <Heading className="text-3xl">
            {activePayment.id === "" ? "New" : "Edit"} payment
          </Heading>

          <Card>
            <Card>
              <VStack space="xl">
                <FormControl>
                  <FormControlLabel>
                    <FormControlLabelText className="text-lg font-bold text-black">
                      Amount
                    </FormControlLabelText>
                  </FormControlLabel>
                  <Input>
                    <InputField
                      keyboardType="numeric"
                      size="xl"
                      className="text-xl"
                      value={(activePayment.amount / 100).toLocaleString()}
                      onChangeText={(value) => handleChange("amount", value)}
                    />
                  </Input>
                </FormControl>

                <FormControl>
                  <FormControlLabel>
                    <FormControlLabelText className="text-lg font-bold text-black">
                      Minimum payment
                    </FormControlLabelText>
                  </FormControlLabel>
                  <Input>
                    <InputField
                      keyboardType="numeric"
                      size="xl"
                      className="text-xl"
                      value={(activePayment.minPayment / 100).toLocaleString()}
                      onChangeText={(value) =>
                        handleChange("minPayment", value)
                      }
                    />
                  </Input>
                </FormControl>
              </VStack>
            </Card>
          </Card>

          {activePayment && activeDebt && (
            <VStack space="md">
              <Button size="lg">
                <ButtonText onPress={editDebt}>
                  Edit {activeDebt.name} debt
                </ButtonText>
              </Button>
              <Button size="lg" action="negative" onPress={handleDelete}>
                <ButtonText>Delete payment</ButtonText>
              </Button>
            </VStack>
          )}
        </VStack>
      </ScrollView>
    </>
  );
}
