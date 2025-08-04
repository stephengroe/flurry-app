import { Payment } from "@/types/Payment";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";

type PaymentState = {
  payments: Payment[];
  loadPayments: () => Promise<void>;
  setPayments: (payments: Payment[]) => void;
  savePayments: (payment: Payment[]) => void;
};

export const usePaymentStore = create<PaymentState>((set) => ({
  payments: [],
  setPayments: (payments) => {
    const sorted = payments.sort((a, b) => b.date - a.date);
    set({ payments: sorted });
  },

  loadPayments: async () => {
    try {
      const data = await AsyncStorage.getItem("payments");
      if (data) {
        const loadedPayments: Payment[] = JSON.parse(data);
        set({ payments: loadedPayments });
      }
    } catch (e) {
      console.error("Error fetching payment:", e);
    }
  },
  savePayments: async (payments) => {
    try {
      await AsyncStorage.setItem("payments", JSON.stringify(payments));
    } catch (e) {
      console.error("Error saving payments:", e);
    }
  },
}));
