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
        const loadedDebts: Debt[] = JSON.parse(data);
        if (loadedDebts) {
          const sortedDebts = loadedDebts.sort((a, b) => a.balance - b.balance);
          set({ debts: sortedDebts });
        } else {
          set({ debts: [] });
        }
      }
    } catch (e) {
      console.error("Error fetching debt:", e);
    }
  },
}));
