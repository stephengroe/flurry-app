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

  return (
    <Pressable
      // onPress={handlePress}
      className={"p-6 gap-4  text-black bg-white"}
    >
      <View className="flex-row justify-between">
        <View>
          <View className="flex-row gap-2 items-center">
            <Heading size="md">{debt?.name}</Heading>
          </View>
          <Text>{payment.date.toLocaleString("en-US")}</Text>
        </View>
        <View className="gap-2 items-end flex-col">
          <Text size="2xl" className="font-bold text-black">
            {(payment.amount / 100).toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </Text>
          <Badge size="md" variant="solid" action="success" className="w-auto">
            <BadgeText>On track</BadgeText>
          </Badge>
        </View>
      </View>
    </Pressable>
  );
}
