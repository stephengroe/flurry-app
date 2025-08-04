import { useDebtStore } from "@/stores/useDebtStore";
import { useUserStore } from "@/stores/useUserStore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Debt } from "../types/Debt";
import { Payment } from "../types/Payment";
import { User } from "../types/User";

export async function generateSampleData() {
  const setDebts = useDebtStore.getState().setDebts;
  const setUser = useUserStore.getState().setUser;

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

  const samplePayments: Payment[] = [
    {
      id: "p1",
      debtId: "1",
      minPayment: 5000,
      date: 1749043200,
      amount: 5000,
    },
    {
      id: "p2",
      debtId: "1",
      minPayment: 5000,
      date: 1747334400,
      amount: 5000,
    },
    {
      id: "p3",
      debtId: "1",
      minPayment: 5000,
      date: 1746009600,
      amount: 5000,
    },
    {
      id: "p4",
      debtId: "1",
      minPayment: 5000,
      date: 1744300800,
      amount: 5000,
    },
    {
      id: "p5",
      debtId: "1",
      minPayment: 5000,
      date: 1742976000,
      amount: 5000,
    },
    {
      id: "p6",
      debtId: "1",
      minPayment: 5000,
      date: 1741267200,
      amount: 5000,
    },
    {
      id: "p7",
      debtId: "1",
      minPayment: 5000,
      date: 1739462400,
      amount: 5000,
    },
    {
      id: "p8",
      debtId: "2",
      minPayment: 5000,
      date: 1738137600,
      amount: 5000,
    },
    {
      id: "p9",
      debtId: "2",
      minPayment: 5000,
      date: 1733308800,
      amount: 5000,
    },
    {
      id: "p10",
      debtId: "2",
      minPayment: 5000,
      date: 1736428800,
      amount: 5000,
    },
    {
      id: "p11",
      debtId: "2",
      minPayment: 5000,
      date: 1735017600,
      amount: 5000,
    },
    {
      id: "p12",
      debtId: "2",
      minPayment: 5000,
      date: 1730371200,
      amount: 5000,
    },
    {
      id: "p13",
      debtId: "2",
      minPayment: 5000,
      date: 1728566400,
      amount: 5000,
    },
    {
      id: "p14",
      debtId: "2",
      minPayment: 5000,
      date: 1727241600,
      amount: 5000,
    },
    {
      id: "p15",
      debtId: "3",
      minPayment: 16700,
      date: 1722499200,
      amount: 16700,
    },
    {
      id: "p16",
      debtId: "3",
      minPayment: 16700,
      date: 1720790400,
      amount: 16700,
    },
    {
      id: "p17",
      debtId: "3",
      minPayment: 16700,
      date: 1716556800,
      amount: 16700,
    },
    {
      id: "p18",
      debtId: "3",
      minPayment: 16700,
      date: 1713043200,
      amount: 16700,
    },
    {
      id: "p19",
      debtId: "3",
      minPayment: 16700,
      date: 1711718400,
      amount: 16700,
    },
    {
      id: "p20",
      debtId: "3",
      minPayment: 16700,
      date: 1710009600,
      amount: 16700,
    },
    {
      id: "p21",
      debtId: "3",
      minPayment: 16700,
      date: 1708684800,
      amount: 16700,
    },
    {
      id: "p22",
      debtId: "4",
      minPayment: 750,
      date: 1706976000,
      amount: 750,
    },
    {
      id: "p23",
      debtId: "4",
      minPayment: 750,
      date: 1703769600,
      amount: 750,
    },
    {
      id: "p24",
      debtId: "4",
      minPayment: 750,
      date: 1702060800,
      amount: 750,
    },
    {
      id: "p25",
      debtId: "4",
      minPayment: 750,
      date: 1699046400,
      amount: 750,
    },
    {
      id: "p26",
      debtId: "4",
      minPayment: 750,
      date: 1696012800,
      amount: 750,
    },
    {
      id: "p27",
      debtId: "4",
      minPayment: 750,
      date: 1697337600,
      amount: 750,
    },
    {
      id: "p28",
      debtId: "4",
      minPayment: 750,
      date: 1710009600,
      amount: 750,
    },
    {
      id: "p29",
      debtId: "5",
      minPayment: 456,
      date: 1688083200,
      amount: 456,
    },
    {
      id: "p30",
      debtId: "5",
      minPayment: 456,
      date: 1689792000,
      amount: 456,
    },
    {
      id: "p31",
      debtId: "5",
      minPayment: 456,
      date: 1691193600,
      amount: 456,
    },
    {
      id: "p32",
      debtId: "5",
      minPayment: 456,
      date: 1727241600,
      amount: 456,
    },
    {
      id: "p33",
      debtId: "5",
      minPayment: 456,
      date: 1720790400,
      amount: 456,
    },
    {
      id: "p34",
      debtId: "5",
      minPayment: 456,
      date: 1719484800,
      amount: 456,
    },
    {
      id: "p35",
      debtId: "5",
      minPayment: 456,
      date: 1735017600,
      amount: 456,
    },
  ];

  setUser(sampleUser);
  setDebts(sampleDebts);

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
