import AsyncStorage from "@react-native-async-storage/async-storage";
import { Debt } from "../models/Debt";
import { Payment } from "../models/Payment";
import { User } from "../models/User";

export async function generateSampleData() {
  const sampleUser: User = {
    id: "1",
    name: "Alex",
    joinDate: "2023-02-03T10:31:00.000Z",
  };

  const sampleDebts: Debt[] = [
    {
      id: "d0",
      name: "💳 Capital One",
      initialValue: 0,
      balance: 0,
      minPayment: 0,
      interest: 2199,
    },
    {
      id: "d1",
      name: "💳 Chase Freedom",
      initialValue: 32539,
      balance: 9623,
      minPayment: 5000,
      interest: 1825,
    },
    {
      id: "d2",
      name: "💳 Apple Card",
      initialValue: 128954,
      balance: 128954,
      minPayment: 5000,
      interest: 2345,
    },
    {
      id: "d3",
      name: "💵 Personal Loan",
      initialValue: 300000,
      balance: 278298,
      minPayment: 16700,
      interest: 1423,
    },
    {
      id: "d4",
      name: "🚗 Auto Loan",
      initialValue: 2267485,
      balance: 1432113,
      minPayment: 750,
      interest: 1423,
    },
    {
      id: "d5",
      name: "🎓 Student Debt",
      initialValue: 3266436,
      balance: 2868535,
      minPayment: 456,
      interest: 699,
    },
  ];

  const samplePayments: Payment[] = [
    {
      id: "p1",
      debtId: "1",
      minPayment: 5000,
      date: "2025-02-01T00:00:00Z",
      amount: 5000,
    },
    {
      id: "p2",
      debtId: "1",
      minPayment: 5000,
      date: "2025-03-01T00:00:00Z",
      amount: 5000,
    },
    {
      id: "p3",
      debtId: "1",
      minPayment: 5000,
      date: "2025-04-01T00:00:00Z",
      amount: 5000,
    },
    {
      id: "p4",
      debtId: "1",
      minPayment: 5000,
      date: "2025-05-01T00:00:00Z",
      amount: 5000,
    },
    {
      id: "p5",
      debtId: "1",
      minPayment: 5000,
      date: "2025-06-01T00:00:00Z",
      amount: 5000,
    },
    {
      id: "p6",
      debtId: "1",
      minPayment: 5000,
      date: "2025-07-01T00:00:00Z",
      amount: 5000,
    },
    {
      id: "p7",
      debtId: "1",
      minPayment: 5000,
      date: "2025-08-01T00:00:00Z",
      amount: 5000,
    },
    {
      id: "p8",
      debtId: "2",
      minPayment: 5000,
      date: "2025-02-01T00:00:00Z",
      amount: 5000,
    },
    {
      id: "p9",
      debtId: "2",
      minPayment: 5000,
      date: "2025-03-01T00:00:00Z",
      amount: 5000,
    },
    {
      id: "p10",
      debtId: "2",
      minPayment: 5000,
      date: "2025-04-01T00:00:00Z",
      amount: 5000,
    },
    {
      id: "p11",
      debtId: "2",
      minPayment: 5000,
      date: "2025-05-01T00:00:00Z",
      amount: 5000,
    },
    {
      id: "p12",
      debtId: "2",
      minPayment: 5000,
      date: "2025-06-01T00:00:00Z",
      amount: 5000,
    },
    {
      id: "p13",
      debtId: "2",
      minPayment: 5000,
      date: "2025-07-01T00:00:00Z",
      amount: 5000,
    },
    {
      id: "p14",
      debtId: "2",
      minPayment: 5000,
      date: "2025-08-01T00:00:00Z",
      amount: 5000,
    },
    {
      id: "p15",
      debtId: "3",
      minPayment: 16700,
      date: "2025-02-01T00:00:00Z",
      amount: 16700,
    },
    {
      id: "p16",
      debtId: "3",
      minPayment: 16700,
      date: "2025-03-01T00:00:00Z",
      amount: 16700,
    },
    {
      id: "p17",
      debtId: "3",
      minPayment: 16700,
      date: "2025-04-01T00:00:00Z",
      amount: 16700,
    },
    {
      id: "p18",
      debtId: "3",
      minPayment: 16700,
      date: "2025-05-01T00:00:00Z",
      amount: 16700,
    },
    {
      id: "p19",
      debtId: "3",
      minPayment: 16700,
      date: "2025-06-01T00:00:00Z",
      amount: 16700,
    },
    {
      id: "p20",
      debtId: "3",
      minPayment: 16700,
      date: "2025-07-01T00:00:00Z",
      amount: 16700,
    },
    {
      id: "p21",
      debtId: "3",
      minPayment: 16700,
      date: "2025-08-01T00:00:00Z",
      amount: 16700,
    },
    {
      id: "p22",
      debtId: "4",
      minPayment: 750,
      date: "2025-02-01T00:00:00Z",
      amount: 750,
    },
    {
      id: "p23",
      debtId: "4",
      minPayment: 750,
      date: "2025-03-01T00:00:00Z",
      amount: 750,
    },
    {
      id: "p24",
      debtId: "4",
      minPayment: 750,
      date: "2025-04-01T00:00:00Z",
      amount: 750,
    },
    {
      id: "p25",
      debtId: "4",
      minPayment: 750,
      date: "2025-05-01T00:00:00Z",
      amount: 750,
    },
    {
      id: "p26",
      debtId: "4",
      minPayment: 750,
      date: "2025-06-01T00:00:00Z",
      amount: 750,
    },
    {
      id: "p27",
      debtId: "4",
      minPayment: 750,
      date: "2025-07-01T00:00:00Z",
      amount: 750,
    },
    {
      id: "p28",
      debtId: "4",
      minPayment: 750,
      date: "2025-08-01T00:00:00Z",
      amount: 750,
    },
    {
      id: "p29",
      debtId: "5",
      minPayment: 456,
      date: "2025-02-01T00:00:00Z",
      amount: 456,
    },
    {
      id: "p30",
      debtId: "5",
      minPayment: 456,
      date: "2025-03-01T00:00:00Z",
      amount: 456,
    },
    {
      id: "p31",
      debtId: "5",
      minPayment: 456,
      date: "2025-04-01T00:00:00Z",
      amount: 456,
    },
    {
      id: "p32",
      debtId: "5",
      minPayment: 456,
      date: "2025-05-01T00:00:00Z",
      amount: 456,
    },
    {
      id: "p33",
      debtId: "5",
      minPayment: 456,
      date: "2025-06-01T00:00:00Z",
      amount: 456,
    },
    {
      id: "p34",
      debtId: "5",
      minPayment: 456,
      date: "2025-07-01T00:00:00Z",
      amount: 456,
    },
    {
      id: "p35",
      debtId: "5",
      minPayment: 456,
      date: "2025-08-01T00:00:00Z",
      amount: 456,
    },
  ];

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
