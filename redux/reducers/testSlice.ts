import { createSlice } from '@reduxjs/toolkit';

interface InitialStateType {
  currentNumber: number;
}

const initialState: InitialStateType = {
  currentNumber: 0,
};

const numberSlice = createSlice({
  name: 'numberSlice',
  initialState,
  reducers: {
    increment: state => {
      state.currentNumber += 1;
    },
    decrement: state => {
      state.currentNumber -= 1;
    },
    incrementValue: (state, action) => {
      state.currentNumber += action.payload;
    },
    decrementValue: (state, action) => {
      state.currentNumber -= action.payload;
    },
  },
});

export const { increment, decrement } = numberSlice.actions;
export default numberSlice.reducer;
