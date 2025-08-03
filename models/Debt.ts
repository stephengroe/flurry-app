export interface Debt {
  id: string;
  name: string;
  total: number;
  balance: number;
  minPayment: number;
  interest?: number;
}
