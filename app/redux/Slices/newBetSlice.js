import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  activeIndex: null,
};

const activeIndexSlice = createSlice({
  name: 'activeIndex',
  initialState,
  reducers: {
    setActiveBetSlipIndex: (state, action) => {
      state.activeIndex = action.payload;
    },
    resetActiveBetSlipIndex: (state) => {
      state.activeIndex = null;
    },
  },
});

export const { setActiveBetSlipIndex, resetActiveBetSlipIndex } =
  activeIndexSlice.actions;
export default activeIndexSlice.reducer;
