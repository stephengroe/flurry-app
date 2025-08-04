import { Debt } from "@/types/Debt";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";

type DebtState = {
  debts: Debt[];
  loadDebts: () => Promise<void>;
  setDebts: (debts: Debt[]) => void;
};

export const useDebtStore = create<DebtState>((set) => ({
  debts: [],
  setDebts: (debts) => set({ debts }),
  loadDebts: async () => {
    try {
      const data = await AsyncStorage.getItem("debts");
      if (data) {
        set({ debts: JSON.parse(data) });
      }
    } catch (e) {
      console.error("Error fetching debt:", e);
    }
  },
}));
