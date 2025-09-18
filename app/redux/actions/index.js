import * as types from './actionConstants';

export const setUI = (payload) => ({
  type: types.SET_UI,
  payload,
});

export const fetchBetDetailsAction = (payload) => ({
  type: types.FETCH_BET_DETAILS,
  payload: payload,
});

export const fetchCurrentCalculationAction = (payload) => ({
  type: types.FETCH_CURRENT_CALCULATION,
  payload: payload,
});

export const fetchUserEventBetsAction = (payload) => ({
  type: types.FETCH_USER_EVENT_BETS,
  payload: payload,
});

export const init = () => ({
  type: types.INIT,
});

export const setUser = (payload) => ({
  type: types.SET_USER,
  payload,
});

export const refreshUserDetails = () => ({
  type: types.REFRESH_USER_DETAILS,
});
export const setBetPlacementSuccess = (payload) => ({
  type: types.SET_BET_PLACEMENT_SUCCESS,
  payload,
});
