import { Badge, BadgeText } from "@/components/ui/badge";
import { Heading } from "@/components/ui/heading";
import { Progress, ProgressFilledTrack } from "@/components/ui/progress";
import { Text } from "@/components/ui/text";
import { Debt } from "@/models/Debt";
import { View } from "react-native";
import { Card } from "../ui/card";

export function DebtCard({
  debt,
  progress,
}: {
  debt: Debt;
  progress: boolean;
}) {
  return (
    <Card className="p-6 gap-4">
      <View className="flex-row justify-between">
        <View>
          <Heading size="md">{debt.name}</Heading>
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
    </Card>
  );
}
