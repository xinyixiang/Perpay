export const toCurrency = (amount: number) => {
  return Math.round(amount * 100) / 100;
}