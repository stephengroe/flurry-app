import { DebtForm } from "@/components/debt-form";
import {
  AlertDialog,
  AlertDialogBackdrop,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
} from "@/components/ui/alert-dialog";
import { Button, ButtonText } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { Progress, ProgressFilledTrack } from "@/components/ui/progress";
import { Spinner } from "@/components/ui/spinner";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { Debt } from "@/models/Debt";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";

export default function DebtModal() {
  const { id } = useLocalSearchParams();
  const [debt, setDebt] = useState<Debt | null>(null);
  const [showAlertDialog, setShowAlertDialog] = useState(false);

  const handleClose = () => setShowAlertDialog(false);

  const fetchDebt = async () => {
    try {
      const data = await AsyncStorage.getItem("debts");
      if (data !== null) {
        const fetchedDebts: Debt[] = JSON.parse(data);
        const adjustedDebt = fetchedDebts.find((d) => d.id === id);
        if (adjustedDebt === undefined) {
          setDebt(null);
        } else {
          setDebt(adjustedDebt);
        }
      }
    } catch (e) {
      console.error("Error fetching debt:", e);
    }
  };

  const handleDelete = async () => {
    try {
      const data = await AsyncStorage.getItem("debts");
      if (data !== null) {
        const fetchedDebts: Debt[] = JSON.parse(data);
        const adjustedDebts = fetchedDebts.filter((d) => d.id !== id);
        AsyncStorage.setItem("debts", JSON.stringify(adjustedDebts));
        handleClose();
        router.back();
      }
    } catch (e) {
      console.error("Error deleting debt:", e);
    }
  };

  useEffect(() => {
    fetchDebt();
  });

  if (!debt) return <Spinner size="large" />;

  return (
    <>
      <ScrollView className="p-6 relative">
        <Button variant="link" onPress={router.back} className="justify-end">
          <ButtonText className="text-xl">Done</ButtonText>
        </Button>
        <VStack space="xl">
          <Heading className="text-3xl">{debt.name}</Heading>

          <Card className="p-6 gap-4">
            <Heading>Progress</Heading>
            <Progress
              size="lg"
              value={100 - (debt.balance / debt.initialValue) * 100}
            >
              <ProgressFilledTrack></ProgressFilledTrack>
            </Progress>

            <View className="flex-row gap-4 w-full items-center">
              <Card className="flex-1 items-center">
                <Text className="font-bold text-3xl text-black">
                  {Math.floor(100 - (debt.balance / debt.initialValue) * 100)}%
                </Text>
                <Text>paid off</Text>
              </Card>
              <Card className="flex-1 items-center">
                <Text className="font-bold text-3xl text-black text-center">
                  Nov. 2027
                </Text>
                <Text>freedom date</Text>
              </Card>
            </View>
          </Card>

          <Card>
            <DebtForm debt={debt} />
          </Card>

          <Card
            className={`p-6 gap-4 ${debt.balance === 0 ? "bg-green-100" : debt.target ? "bg-blue-100" : "bg-white"}`}
          >
            <Heading>
              {debt.balance === 0 ? "Paid" : debt.target ? "Target" : "Pending"}
            </Heading>
            <Text>
              {debt.balance === 0
                ? "Congratulations! This debt has been paid off."
                : debt.target
                  ? "Each month, pay your minimum payment and your extra amount. If you want to move faster, contribute to this debt."
                  : "Continue paying the minimum payments each month. It's the fastest way to build momentum!"}
            </Text>
          </Card>

          <VStack space="md">
            <Button size="lg">
              <ButtonText>Log payment</ButtonText>
            </Button>
            <Button size="lg" action="negative">
              <ButtonText onPress={() => console.log("delete attempt")}>
                Delete debt
              </ButtonText>
            </Button>
          </VStack>
        </VStack>
      </ScrollView>
      <AlertDialog isOpen={showAlertDialog} onClose={handleClose} size="md">
        <AlertDialogBackdrop />
        <AlertDialogContent>
          <AlertDialogHeader>
            <Heading className="text-typography-950 font-semibold" size="md">
              Delete this debt?
            </Heading>
          </AlertDialogHeader>
          <AlertDialogBody className="mt-3 mb-4">
            <Text size="md">
              This will delete this debt and all its data. This cannot be
              undone.
            </Text>
          </AlertDialogBody>
          <AlertDialogFooter className="">
            <Button
              variant="outline"
              action="secondary"
              onPress={handleClose}
              size="sm"
            >
              <ButtonText>Cancel</ButtonText>
            </Button>
            <Button size="sm" onPress={handleDelete}>
              <ButtonText>Delete</ButtonText>
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
