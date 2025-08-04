export interface Payment {
  id: string;
  debtId: string;
  minPayment: number; // To compare with relevant min payment amount
  date: number;
  amount: number;
}
