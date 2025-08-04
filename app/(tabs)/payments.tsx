import { PaymentCard } from "@/components/payment-card";
import { Fab, FabLabel } from "@/components/ui/fab";
import { Heading } from "@/components/ui/heading";
import { VStack } from "@/components/ui/vstack";
import { useDebtStore } from "@/stores/useDebtStore";
import { usePaymentStore } from "@/stores/usePaymentStore";
import { Debt } from "@/types/Debt";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import { useEffect } from "react";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Payments() {
  const { payments, loadPayments } = usePaymentStore();
  const { debts, loadDebts } = useDebtStore();

  const createPayment = () => {
    router.navigate({
      pathname: "../payment-modal",
    });
  };

  useEffect(() => {
    loadPayments();
    loadDebts();
  }, [loadPayments, loadDebts]);

  return (
    <SafeAreaView>
      <ScrollView>
        <VStack className="m-6 mb-3 gap-4" space="2xl">
          <Heading size="3xl" className="flex-start">
            Payments
          </Heading>
        </VStack>
        <VStack className="pb-12">
          {payments.length > 0 && (
            <VStack space="sm">
              {payments.map((payment) => {
                const debt: Debt | undefined = debts.find(
                  (d) => d.id === payment.debtId
                );
                return (
                  <PaymentCard key={payment.id} payment={payment} debt={debt} />
                );
              })}
            </VStack>
          )}
        </VStack>
      </ScrollView>
      <Fab
        size="lg"
        placement="bottom right"
        isHovered={false}
        isDisabled={false}
        isPressed={false}
        onPress={createPayment}
        className="bg-white"
      >
        <FabLabel className="flex-row justify-center items-center">
          <Ionicons name="add-outline" size={24} color="grey" />
        </FabLabel>
      </Fab>
    </SafeAreaView>
  );
}
