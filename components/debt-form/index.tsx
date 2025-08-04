import { Debt } from "@/models/Debt";
import { debounce } from "@/utils/debounce";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import { Card } from "../ui/card";
import {
  FormControl,
  FormControlLabel,
  FormControlLabelText,
} from "../ui/form-control";
import { Input, InputField } from "../ui/input";
import { VStack } from "../ui/vstack";

export function DebtForm({ debt: initialDebt }: { debt: Debt }) {
  const [debt, setDebt] = useState<Debt>(initialDebt);

  const handleChange = async (key: keyof Debt, value: string) => {
    const updatedDebt = {
      ...debt,
      [key]:
        key === "initialValue" || key === "minPayment" || key === "interest"
          ? Number.parseFloat(value) || 0
          : value,
    };
    setDebt(updatedDebt);
    await debounce(() => saveToStorage(updatedDebt), 500);
  };

  const saveToStorage = async (updatedDebt: Debt) => {
    try {
      const data = await AsyncStorage.getItem("debt");
      let updatedDebts: Debt[] = [];
      if (data !== null) {
        const debts: Debt[] = JSON.parse(data);
        updatedDebts = debts.filter((d) => d.id !== debt.id);
      }
      updatedDebts.push(debt);

      await AsyncStorage.setItem("debt", JSON.stringify(updatedDebts));
    } catch (e) {
      console.error("Could not update debt:", e);
    }
  };

  return (
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
              value={(debt.initialValue / 100).toLocaleString()}
              onChangeText={(value) => handleChange("initialValue", value)}
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
              value={(debt.minPayment / 100).toLocaleString()}
              onChangeText={(value) => handleChange("minPayment", value)}
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
              value={debt.type}
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
                debt.interest !== undefined
                  ? (debt.interest / 100).toLocaleString()
                  : "0.00"
              }
              onChangeText={(value) => handleChange("interest", value)}
            />
          </Input>
        </FormControl>
      </VStack>
    </Card>
  );
}
