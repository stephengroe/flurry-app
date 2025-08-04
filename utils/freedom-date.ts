import { Debt } from "@/types/Debt";

export function getFreedomDate(
  initialDebts: Debt[],
  extra: number,
  id?: string
): number {
  if (!initialDebts || initialDebts.length === 0) return Date.now();

  // We'll be adjusting balances based on interest/payments, so need duplicate
  const debts = JSON.parse(JSON.stringify(initialDebts));

  let months = 0;
  let snowball = 0;
  let extraRemainder = 0;

  for (const debt of debts) {
    debt.balance = Number(debt.balance) || 0;
    debt.minPayment = Number(debt.minPayment) || 0;
    debt.interest = Number(debt.interest) || 0;

    let loopCount = 0;

    while (debt.balance > 0 && loopCount < 1000) {
      loopCount++;
      months++;

      const payment = debt.minPayment + extra + snowball + extraRemainder;
      debt.balance = getInterestBalance(debt) - payment;
      extraRemainder = 0;

      if (debt.balance <= 0) {
        extraRemainder = -debt.balance;
        debt.balance = 0;
        snowball += debt.minPayment;

        if (debt.id === id) {
          return getDate(months);
        }
      }
    }
  }

  return getDate(months);
}

function getDate(months: number): number {
  const today = new Date();
  return today.setMonth(today.getMonth() + months);
}

function getInterestBalance(debt: Debt) {
  if (!debt.interest) return debt.balance;
  const interestMultiplier = 1 + debt.interest / 10000 / 12;
  return Math.ceil(debt.balance * interestMultiplier);
}
