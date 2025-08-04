import { Debt } from "@/types/Debt";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";

type DebtState = {
  debts: Debt[];
  loadDebts: () => Promise<void>;
  setDebts: (debts: Debt[]) => void;
  saveDebts: (debts: Debt[]) => void;
};

export const useDebtStore = create<DebtState>((set) => ({
  debts: [],
  setDebts: (debts) => {
    // Mocking backend logic to sort and mark smallest debt as target
    const sorted = debts.sort((a, b) => a.balance - b.balance);
    const minBalance = Math.min(
      ...debts.filter((debt) => debt.balance > 0).map((debt) => debt.balance)
    );

    const adjustedDebts = sorted.map((debt) => ({
      ...debt,
      target: debt.balance === minBalance,
    }));

    set({ debts: adjustedDebts });
  },

  loadDebts: async () => {
    try {
      const data = await AsyncStorage.getItem("debts");
      if (data) {
        const loadedDebts: Debt[] = JSON.parse(data);
        set({ debts: loadedDebts });
      }
    } catch (e) {
      console.error("Error fetching debt:", e);
    }
  },
  saveDebts: async (debts) => {
    try {
      await AsyncStorage.setItem("debts", JSON.stringify(debts));
    } catch (e) {
      console.error("Error saving debt:", e);
    }
  },
}));
