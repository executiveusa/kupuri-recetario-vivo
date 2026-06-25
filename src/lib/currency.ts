export const USD_TO_MXN_SNAPSHOT = 17.6139;
export const ORIGINAL_DAILY_BUDGET_USD = 4;
export const ORIGINAL_DAILY_BUDGET_MXN = 70.4556;
export const DISPLAY_DAILY_BUDGET_MXN = 70;
export const SAFE_DAILY_BUDGET_COPY = "menos de 80 pesos al día";

export function usdToMxn(usd: number): number {
  return Math.round(usd * USD_TO_MXN_SNAPSHOT * 100) / 100;
}

export function formatMxn(amount: number): string {
  return `$${amount.toFixed(0)} MXN`;
}
