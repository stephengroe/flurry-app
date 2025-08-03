export interface Debt {
  id: string;
  name: string;
  initialValue: number;
  balance: number;
  minPayment: number;
  interest?: number;
}
