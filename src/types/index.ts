export interface Expense {
  id?: number | string;
  amount: number|null;
  description: string;
  date: string;
  category: string;
}
