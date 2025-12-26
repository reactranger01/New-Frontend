// src/store/casinoSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedGame: null, // Stores clicked game object
  iframeUrl: null, // Stores iframe URL after session creation
};

const casinoSlice = createSlice({
  name: 'casino',
  initialState,
  reducers: {
    setSelectedGame(state, action) {
      state.selectedGame = action.payload;
    },
    setIframeUrl(state, action) {
      state.iframeUrl = action.payload;
    },
    clearCasinoState(state) {
      state.selectedGame = null;
      state.iframeUrl = null;
    },
  },
});

export const { setSelectedGame, setIframeUrl, clearCasinoState } =
  casinoSlice.actions;
export default casinoSlice.reducer;
