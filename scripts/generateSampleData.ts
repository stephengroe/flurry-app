import { useDebtStore } from "@/stores/useDebtStore";
import { usePaymentStore } from "@/stores/usePaymentStore";
import { useUserStore } from "@/stores/useUserStore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Debt } from "../types/Debt";
import { Payment } from "../types/Payment";
import { User } from "../types/User";

export async function generateSampleData() {
  const setDebts = useDebtStore.getState().setDebts;
  const setUser = useUserStore.getState().setUser;
  const setPayments = usePaymentStore.getState().setPayments;

  const sampleUser: User = {
    id: "1",
    name: "Alex",
    extraPayment: 25000,
    joinDate: "2023-02-03T10:31:00.000Z",
  };

  const sampleDebts: Debt[] = [
    {
      id: "d0",
      name: "Chase Freedom",
      type: "Credit card",
      initialValue: 100000,
      balance: 0,
      minPayment: 0,
      target: false,
      interest: 2199,
    },
    {
      id: "d1",
      name: "Capital One",
      type: "Credit card",
      initialValue: 100000 + Math.floor(Math.random() * 100000),
      balance: Math.floor(Math.random() * 100000),
      minPayment: 5000,
      target: true,
      interest: 1825,
    },
    {
      id: "d2",
      name: "Apple Card",
      type: "Credit card",
      initialValue: 50000 + Math.floor(Math.random() * 50000),
      balance: Math.floor(Math.random() * 50000),
      minPayment: 5000,
      target: false,
      interest: 2345,
    },
    {
      id: "d3",
      name: "LendingClub",
      type: "Personal loan",
      initialValue: 100000 + Math.floor(Math.random() * 100000),
      balance: Math.floor(Math.random() * 100000),
      minPayment: Math.floor(Math.random() * 1000),
      target: false,
      interest: 1423,
    },
    {
      id: "d4",
      name: "Honda Civic",
      type: "Auto loan",
      initialValue: 1000000 + Math.floor(Math.random() * 1000000),
      balance: Math.floor(Math.random() * 1000000),
      minPayment: Math.floor(Math.random() * 10000),
      target: false,
      interest: 1499,
    },
    {
      id: "d5",
      name: "Sallie Mae",
      type: "Student debt",
      initialValue: 2000000 + Math.floor(Math.random() * 2000000),
      balance: Math.floor(Math.random() * 2000000),
      minPayment: Math.floor(Math.random() * 1000),
      target: false,
      interest: 699,
    },
  ];

  const samplePayments: Payment[] = [];

  function generatePayments(debts: Debt[], quantity: number = 25) {
    for (let i = 0; i < quantity; i++) {
      const randId = Math.floor(Math.random() * debts.length);
      const randDebtId = debts[randId].id;

      const YEAR_IN_MILLISECONDS = 1000 * 60 * 60 * 24 * 365;
      const randDate = new Date(
        Date.now() - Math.random() * YEAR_IN_MILLISECONDS * 2
      );

      const randMin = Math.floor(Math.random() * 10000);
      let randPayment = randMin;

      if (Math.random() < 0.25) {
        // Make non-minimum payments less likely
        randPayment += (Math.floor(Math.random()) * randMin) / 2 - randMin;
      }

      const newPayment: Payment = {
        id: `p${i}`,
        debtId: randDebtId,
        date: Number(randDate),
        minPayment: randPayment,
        amount: randMin,
      };
      samplePayments.push(newPayment);
    }
  }

  generatePayments(sampleDebts);

  setUser(sampleUser);
  setDebts(sampleDebts);
  setPayments(samplePayments);

  const user: [string, string] = ["user", JSON.stringify(sampleUser)];
  const debts: [string, string] = ["debts", JSON.stringify(sampleDebts)];
  const payments: [string, string] = [
    "payments",
    JSON.stringify(samplePayments),
  ];

  try {
    await AsyncStorage.multiSet([user, debts, payments]);
    console.log("Saved sample data");
  } catch (e) {
    console.log(e);
  }
}
