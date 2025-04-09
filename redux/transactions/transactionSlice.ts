import { createSlice } from '@reduxjs/toolkit';
import { Transaction } from '../../src/components/TransactionTable/props';

interface TransactionState {
  transactions: Transaction[];
  isLoading: boolean;
  error: unknown | string | null;
}

const initialState: TransactionState = {
  transactions: [],
  isLoading: false,
  error: null,
};

const transactionSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {},
});

export const transactionsReducer = transactionSlice.reducer;
