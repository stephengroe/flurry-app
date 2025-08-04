export interface Debt {
  id: string;
  name: string;
  type: string;
  initialValue: number;
  balance: number;
  minPayment: number;
  target: boolean;
  interest?: number;
}
