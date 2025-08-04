import { Badge, BadgeText } from "@/components/ui/badge";
import { Heading } from "@/components/ui/heading";
import { Progress, ProgressFilledTrack } from "@/components/ui/progress";
import { Text } from "@/components/ui/text";
import { Debt } from "@/types/Debt";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import { Pressable, View } from "react-native";

export function DebtCard({
  debt,
  progress,
}: {
  debt: Debt;
  progress: boolean;
}) {
  const handlePress = () => {
    router.navigate({ pathname: "../debt-modal", params: { id: debt.id } });
  };

  return (
    <Pressable
      onPress={handlePress}
      className={`p-6 gap-4 ${debt.target ? "bg-blue-100" : "bg-white text-black"}`}
    >
      <View className="flex-row justify-between">
        <View>
          <View className="flex-row gap-2 items-center">
            <Heading size="md">{debt.name}</Heading>
            {debt.target && (
              <Ionicons name="rocket-outline" size={16} color="blue" />
            )}
          </View>
          <Text>{debt.type}</Text>
        </View>
        <View className="gap-2 items-end flex-col">
          <Text size="2xl" className="font-bold text-black">
            {(debt.balance / 100).toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </Text>
          <Badge size="md" variant="solid" action="success" className="w-auto">
            <BadgeText>On track</BadgeText>
          </Badge>
        </View>
      </View>
      {progress && (
        <Progress
          value={100 - (debt.balance / debt.initialValue) * 100}
          size="sm"
          orientation="horizontal"
        >
          <ProgressFilledTrack />
        </Progress>
      )}
    </Pressable>
  );
}
