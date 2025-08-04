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
import { useUserStore } from "@/stores/useUserStore";
import { Debt } from "@/types/Debt";
import { getFreedomDate } from "@/utils/freedom-date";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, ScrollView, View } from "react-native";

export default function DebtModal() {
  const { id } = useLocalSearchParams();
  const { user } = useUserStore();
  const { debts, loadDebts, setDebts, saveDebts } = useDebtStore();

  const [activeDebt, setActiveDebt] = useState<Debt | null>(null);

  const deleteDebt = () => {
    const updatedDebts = debts.filter((d) => d.id !== id);
    setDebts(updatedDebts);
    router.back();
  };

  const handleChange = async (key: keyof Debt, value: string) => {
    if (!activeDebt) return;

    const updatedDebt = {
      ...activeDebt,
      [key]:
        key === "initialValue" ||
        key === "minPayment" ||
        key === "interest" ||
        key === "balance"
          ? // Workaround to convert string to number
            Math.round(Number.parseFloat(value) * 100) || 0
          : value,
    };
    setActiveDebt(updatedDebt);
    setDebts(debts.map((d) => (d.id === activeDebt.id ? activeDebt : d)));
  };

  const handleDelete = () => {
    Alert.alert(
      `Delete ${activeDebt ? activeDebt.name : "this debt"}?`,
      "This will delete this debt and all its data. This cannot be undone.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: deleteDebt,
        },
      ],
      { cancelable: false }
    );
  };

  const logPayment = () => {
    if (activeDebt) {
      router.navigate({
        pathname: "../payment-modal",
        params: { debtId: activeDebt.id },
      });
    }
  };

  const handleSave = async () => {
    // For creating new debt
    if (activeDebt && activeDebt.id === "") {
      const id = Date.now().toString();
      const updatedDebt = { ...activeDebt, id: id };

      const newDebts = [...debts, updatedDebt];
      setActiveDebt(updatedDebt);
      setDebts(newDebts);
      await saveDebts(newDebts);
    } else {
      await saveDebts(debts);
    }
    router.back();
  };

  useEffect(() => {
    loadDebts().then(() => {
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
      const newDebt = debts.find((d) => d.id === id) ?? defaultDebt;
      setActiveDebt(newDebt);
    });
  }, [loadDebts, id]);

  if (!activeDebt) return <Spinner size="large" />;

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
        <VStack space="xl" className="mb-12">
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
                    {new Date(
                      getFreedomDate(debts, user.extraPayment, activeDebt.id)
                    ).toLocaleDateString("en-US", {
                      month: "short",
                      year: "numeric",
                    })}
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
                      Balance
                    </FormControlLabelText>
                  </FormControlLabel>
                  <Input>
                    <InputField
                      keyboardType="numeric"
                      size="xl"
                      className="text-xl"
                      value={String(activeDebt.balance / 100)}
                      onChangeText={(value: string) =>
                        handleChange("balance", value)
                      }
                    />
                  </Input>
                </FormControl>

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
                      value={String(activeDebt.initialValue / 100)}
                      onChangeText={(value: string) =>
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
                      value={String(activeDebt.minPayment / 100)}
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
                        activeDebt.interest
                          ? String(activeDebt.interest / 100)
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
                <Button size="lg" onPress={logPayment}>
                  <ButtonText>Log payment</ButtonText>
                </Button>
                <Button size="lg" action="negative" onPress={handleDelete}>
                  <ButtonText>Delete debt</ButtonText>
                </Button>
              </VStack>
            </>
          )}
        </VStack>
      </ScrollView>
    </>
  );
}
