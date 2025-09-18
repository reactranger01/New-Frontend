import { combineReducers } from '@reduxjs/toolkit';
import ui from './modules/ui';
import betModule from './modules/bet';
import user from './modules/user';
import calculationModule from './modules/calculation';
import userBetsModule from './modules/userBets';
import activeIndexReducer from './Slices/newBetSlice';
import yourReducer from './modules/stateupdate';

export default function createReducer() {
  const rootReducer = combineReducers({
    bet: betModule,
    calculation: calculationModule,
    userEventBets: userBetsModule,
    user: user,
    ui,
    activeNewBet: activeIndexReducer,
    updatestate: yourReducer,
  });

  return rootReducer;
}
