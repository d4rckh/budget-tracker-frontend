export type AccountContract = {
  id: number,
  userId: number,
  name: string,
  type: "CHECKING" | "DEBT" | "CASH" | "SAVINGS",
  balance: number,
  currency: string,
}