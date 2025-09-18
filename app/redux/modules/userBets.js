import { USER_EVENT_BETS } from '../actions/actionConstants';

// import { SET_SELECTED_BET } from '@actions/actionConstants';

const initialState = {
  userEventBets: {},
};
const userBetsModule = (state = { ...initialState }, action = {}) => {
  switch (action.type) {
    case USER_EVENT_BETS:
      return {
        ...state,
        userEventBets: action.payload.payload,
      };
    default:
      return state;
  }
};

export default userBetsModule;
