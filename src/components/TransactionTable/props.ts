export type Transaction = {
  id: string;
  type: 'дохід' | 'витрата';
  category: string;
  description: string;
  amount: number;
  date: string;
  owner?: string;
};
