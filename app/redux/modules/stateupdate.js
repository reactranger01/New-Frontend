import { SET_BET_PLACEMENT_SUCCESS } from '../actions/actionConstants';
const initialState = {
  betPlacementSuccess: false,
  // other states...
};

const yourReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_BET_PLACEMENT_SUCCESS:
      return {
        ...state,
        betPlacementSuccess: !state.betPlacementSuccess,
      };
    // other cases...
    default:
      return state;
  }
};

export default yourReducer;
