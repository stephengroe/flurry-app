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
import {
  FormControl,
  FormControlLabel,
  FormControlLabelText,
} from "@/components/ui/form-control";
import { Heading } from "@/components/ui/heading";
import { Input, InputField } from "@/components/ui/input";
import { Progress, ProgressFilledTrack } from "@/components/ui/progress";
import { Spinner } from "@/components/ui/spinner";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { useDebtStore } from "@/stores/useDebtStore";
import { Debt } from "@/types/Debt";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { ScrollView, View } from "react-native";

export default function DebtModal() {
  const { id } = useLocalSearchParams();

  const { debts, loadDebts, setDebts } = useDebtStore();
  const activeDebt = useMemo(() => {
    const defaultDebt: Debt = {
      id: "",
      name: "New debt",
      type: "",
      initialValue: 0,
      target: false,
      balance: 0,
      minPayment: 0,
      interest: 0,
    };

    let foundDebt = debts.find((d) => d.id === id);
    return foundDebt ?? defaultDebt;
  }, [debts, id]);

  const handleDelete = () => {
    const updatedDebts = debts.filter((d) => d.id !== id);
    setDebts(updatedDebts);
  };

  const [showAlertDialog, setShowAlertDialog] = useState(false);
  const handleClose = () => setShowAlertDialog(false);

  const handleChange = async (key: keyof Debt, value: string) => {
    const updatedDebt = {
      ...activeDebt,
      [key]:
        key === "initialValue" || key === "minPayment" || key === "interest"
          ? Number.parseFloat(value) || 0
          : value,
    };
    setDebts(debts.map((d) => (d.id === activeDebt.id ? updatedDebt : d)));
  };

  useEffect(() => {
    loadDebts();
  }, [loadDebts]);

  if (!activeDebt) return <Spinner size="large" />;

  return (
    <>
      <ScrollView className="p-6 relative">
        <Button variant="link" onPress={router.back} className="justify-end">
          <ButtonText className="text-xl">Done</ButtonText>
        </Button>
        <VStack space="xl">
          <Heading className="text-3xl">{activeDebt.name}</Heading>

          {activeDebt.id !== "" && (
            <Card className="p-6 gap-4">
              <Heading>Progress</Heading>
              <Progress
                size="lg"
                value={
                  100 - (activeDebt.balance / activeDebt.initialValue) * 100
                }
              >
                <ProgressFilledTrack></ProgressFilledTrack>
              </Progress>
              <View className="flex-row gap-4 w-full items-center">
                <Card className="flex-1 items-center">
                  <Text className="font-bold text-3xl text-black">
                    {Math.floor(
                      100 - (activeDebt.balance / activeDebt.initialValue) * 100
                    )}
                    %
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
          )}

          <Card>
            <Card>
              <VStack space="xl">
                <FormControl>
                  <FormControlLabel>
                    <FormControlLabelText className="text-lg font-bold text-black">
                      Initial value
                    </FormControlLabelText>
                  </FormControlLabel>
                  <Input>
                    <InputField
                      keyboardType="numeric"
                      size="xl"
                      className="text-xl"
                      value={(activeDebt.initialValue / 100).toLocaleString()}
                      onChangeText={(value) =>
                        handleChange("initialValue", value)
                      }
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
                      value={(activeDebt.minPayment / 100).toLocaleString()}
                      onChangeText={(value) =>
                        handleChange("minPayment", value)
                      }
                    />
                  </Input>
                </FormControl>

                <FormControl>
                  <FormControlLabel>
                    <FormControlLabelText className="text-lg font-bold text-black">
                      Debt type
                    </FormControlLabelText>
                  </FormControlLabel>
                  <Input>
                    <InputField
                      size="xl"
                      className="text-xl"
                      value={activeDebt.type}
                      onChangeText={(value) => handleChange("type", value)}
                    />
                  </Input>
                </FormControl>

                <FormControl>
                  <FormControlLabel>
                    <FormControlLabelText className="text-lg font-bold text-black">
                      Interest rate (optional)
                    </FormControlLabelText>
                  </FormControlLabel>
                  <Input>
                    <InputField
                      keyboardType="numeric"
                      size="xl"
                      className="text-xl"
                      value={
                        activeDebt.interest !== undefined
                          ? (activeDebt.interest / 100).toLocaleString()
                          : "0.00"
                      }
                      onChangeText={(value) => handleChange("interest", value)}
                    />
                  </Input>
                </FormControl>
              </VStack>
            </Card>
          </Card>

          {activeDebt.id !== "" && (
            <>
              <Card
                className={`p-6 gap-4 ${activeDebt.balance === 0 ? "bg-green-100" : activeDebt.target ? "bg-blue-100" : "bg-white"}`}
              >
                <Heading>
                  {activeDebt.balance === 0
                    ? "Paid"
                    : activeDebt.target
                      ? "Target"
                      : "Pending"}
                </Heading>
                <Text>
                  {activeDebt.balance === 0
                    ? "Congratulations! This debt has been paid off."
                    : activeDebt.target
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
            </>
          )}
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
