import { Badge, BadgeText } from "@/components/ui/badge";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { Debt } from "@/types/Debt";
import { Payment } from "@/types/Payment";
import { Pressable, View } from "react-native";

export function PaymentCard({
  payment,
  debt,
}: {
  payment: Payment;
  debt: Debt | undefined;
}) {
  // const handlePress = () => {
  //   router.navigate({ pathname: "../payment-modal", params: { id: payment.id } });
  // };

  const status =
    payment.amount < payment.minPayment
      ? "below"
      : payment.amount > payment.minPayment + 100
        ? "above"
        : "minimum";

  return (
    <Pressable
      // onPress={handlePress}
      className={"px-6 py-4 gap-1  text-black bg-white"}
    >
      <View className="flex-row justify-between">
        <View>
          <View className="flex-row gap-2 items-center">
            <Heading size="md">{debt ? debt.name : `No category`}</Heading>
          </View>
          <Text>
            {new Date(payment.date).toLocaleString("en-US", {
              year: "2-digit",
              month: "2-digit",
              day: "2-digit",
            })}
          </Text>
        </View>
        <View className="gap-2 items-end flex-col">
          <Text size="xl" className="font-bold text-black">
            {(payment.amount / 100).toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </Text>
          <Badge
            size="md"
            variant="solid"
            action={status === "below" ? "error" : "success"}
            className="w-auto"
          >
            <BadgeText>{status}</BadgeText>
          </Badge>
        </View>
      </View>
    </Pressable>
  );
}
