import axios, { AxiosError } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { FormData } from '../../src/components/Input/props';
import toast from 'react-hot-toast';
import { Transaction } from '../../src/components/TransactionTable/props.ts';

type UpdateTransactionArgs = {
  transaction: Transaction;
  _id: string;
};

export const getAllTransactions = createAsyncThunk(
  'transactions/getAllTransactions',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('/api/transactions');
      return response.data;
    } catch (err: unknown) {
      const error = err as AxiosError<{ message: string }>;
      const message = error.response?.data?.message || 'Something went wrong';
      toast.error(message);
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const addTransaction = createAsyncThunk<Transaction, FormData>(
  'transactions/addTransaction',
  async (credentials, thunkAPI) => {
    try {
      const response = await axios.post('/api/transactions', credentials);
      return response.data;
    } catch (err: unknown) {
      const error = err as AxiosError<{ message: string }>;
      const message = error.response?.data?.message || 'Something went wrong';
      toast.error(message);
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const updateTransaction = createAsyncThunk<
  Transaction,
  UpdateTransactionArgs
>('transactions/updateTransaction', async ({ transaction, _id }, thunkAPI) => {
  try {
    const response = await axios.patch(`/api/transactions/${_id}`, transaction);
    return response.data;
  } catch (err: unknown) {
    const error = err as AxiosError<{ message: string }>;
    const message = error.response?.data?.message || 'Something went wrong';
    toast.error(message);
    return thunkAPI.rejectWithValue(message);
  }
});

export const deleteTransaction = createAsyncThunk<string, string>(
  'transactions/deleteTransaction',
  async (transactionId, thunkAPI) => {
    try {
      const response = await axios.delete(`/api/transactions/${transactionId}`);
      return response.data._id;
    } catch (err: unknown) {
      const error = err as AxiosError<{ message: string }>;
      const message = error.response?.data?.message || 'Something went wrong';
      toast.error(message);
      return thunkAPI.rejectWithValue(message);
    }
  },
);
