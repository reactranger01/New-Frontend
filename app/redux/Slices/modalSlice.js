import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
  name: 'modal',
  initialState: { type: null, isOpen: false },
  reducers: {
    openModal: (state, action) => {
      state.type = action.payload;
      state.isOpen = true;
    },
    closeModal: (state) => {
      state.type = null;
      state.isOpen = false;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
