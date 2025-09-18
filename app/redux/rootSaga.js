import { put, takeLatest, all } from 'redux-saga/effects';
import * as types from './actions/actionConstants';
import {
  fetchBetDetailsAction,
  fetchCurrentCalculationAction,
  fetchUserEventBetsAction,
} from './actions';
import { getUser } from './modules/user';
// import { getUser } from './modules/user';

function* fetchBet(action) {
  try {
    const betDetails = yield fetchBetDetailsAction(action.payload);
    yield put({ type: types.SET_SELECTED_BET, payload: betDetails });
  } catch (error) {
    // Handle errors
  }
}

function* fetchCurrentCalculation(action) {
  try {
    const calculation = yield fetchCurrentCalculationAction(action.payload);
    yield put({ type: types.CURRENT_CALCULATION, payload: calculation });
  } catch (error) {
    // Handle errors
  }
}
function* fetchUserEventBets(action) {
  try {
    const allEventBets = yield fetchUserEventBetsAction(action.payload); // Implement this function
    yield put({ type: types.USER_EVENT_BETS, payload: allEventBets });
  } catch (error) {
    // Handle errors
  }
}

function* init() {
  const user = yield getUser();
  if (user) {
    yield put({
      type: types.SET_USER,
      payload: {
        ...user,
      },
    });
  }
}

function* refreshUserDetails() {
  const user = yield getUser();
  if (user) {
    yield put({
      type: types.SET_USER,
      payload: user,
    });
  }
}

function* actionWatcher() {
  yield takeLatest(types.INIT, init);
  yield takeLatest(types.REFRESH_USER_DETAILS, refreshUserDetails);
}

function* betWatcher() {
  yield takeLatest(types.FETCH_BET_DETAILS, fetchBet);
  yield takeLatest(types.FETCH_CURRENT_CALCULATION, fetchCurrentCalculation);
  yield takeLatest(types.FETCH_USER_EVENT_BETS, fetchUserEventBets);
}

export default function* rootSaga() {
  yield all([actionWatcher(), betWatcher()]);
}
