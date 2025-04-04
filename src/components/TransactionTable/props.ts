export type Transaction = {
  _id: string;
  type: string;
  category: string;
  description: string;
  amount: number;
  date: string;
  owner?: string;
};
