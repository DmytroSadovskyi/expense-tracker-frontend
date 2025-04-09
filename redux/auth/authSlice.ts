import { createSlice } from '@reduxjs/toolkit';
import { register, logIn, logOut, refreshUser } from './operations.ts';

export interface AuthState {
  user: {
    name: string | null;
    email: string | null;
  };
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  isLoggedIn: boolean;
  isRefreshing: boolean;
  error: unknown | string | null;
  token: string | null;
}

const initialState: AuthState = {
  user: {
    name: null,
    email: null,
  },
  loading: 'idle',
  isLoggedIn: false,
  isRefreshing: false,
  error: null,
  token: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(register.pending, state => {
        state.loading = 'pending';
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.isLoggedIn = true;
        state.error = null;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = 'failed';
        state.token = null;
        state.user = { name: null, email: null };
        state.isLoggedIn = false;
        state.error = action.payload;
      })
      .addCase(logIn.pending, state => {
        state.loading = 'pending';
      })
      .addCase(logIn.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.isLoggedIn = true;
        state.error = null;
      })
      .addCase(logIn.rejected, (state, action) => {
        state.loading = 'failed';
        state.token = null;
        state.user = { name: null, email: null };
        state.isLoggedIn = false;
        state.error = action.payload;
      })
      .addCase(logOut.pending, state => {
        state.loading = 'pending';
      })
      .addCase(logOut.fulfilled, state => {
        state.user = { name: null, email: null };
        state.token = null;
        state.error = null;
        state.loading = 'succeeded';
        state.isLoggedIn = false;
      })
      .addCase(refreshUser.pending, state => {
        state.isRefreshing = true;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoggedIn = true;
        state.isRefreshing = false;
      })
      .addCase(refreshUser.rejected, state => {
        state.isRefreshing = false;
      });
  },
});

export const authReducer = authSlice.reducer;
