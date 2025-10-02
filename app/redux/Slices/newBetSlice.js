import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  activeIndex: null,
  activeType: '',
};

const activeIndexSlice = createSlice({
  name: 'activeIndex',
  initialState,
  reducers: {
    setActiveBetSlipIndex: (state, action) => {
      state.activeIndex = action.payload;
    },
    setActiveBetSlipType: (state, action) => {
      state.activeType = action.payload;
    },
    resetActiveBetSlipIndex: (state) => {
      state.activeIndex = null;
    },
  },
});

export const {
  setActiveBetSlipIndex,
  resetActiveBetSlipIndex,
  setActiveBetSlipType,
} = activeIndexSlice.actions;
export default activeIndexSlice.reducer;
