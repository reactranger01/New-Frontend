import { combineReducers } from '@reduxjs/toolkit';
import ui from './modules/ui';
import betModule from './modules/bet';
import user from './modules/user';
import calculationModule from './modules/calculation';
import userBetsModule from './modules/userBets';
import activeIndexReducer from './Slices/newBetSlice';
import modalReducer from './Slices/modalSlice';
import yourReducer from './modules/stateupdate';
import casinoReducer from './Slices/casinoUrlSlice';

export default function createReducer() {
  const rootReducer = combineReducers({
    bet: betModule,
    calculation: calculationModule,
    userEventBets: userBetsModule,
    user: user,
    ui,
    activeNewBet: activeIndexReducer,
    updatestate: yourReducer,
    modal: modalReducer,
    casino: casinoReducer,
  });

  return rootReducer;
}
