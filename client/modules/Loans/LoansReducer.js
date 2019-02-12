import { GOT_LOANS } from './LoansActions';

// Initial State
const initialState = { data: [] };

//Specifies how the application state changes in response to actions sent to the store.
//Takes in previous state, action. Returns the next state based on action dispatched.
const LoansReducer = (state = initialState, action) => {
  switch (action.type) {
    //When GOT_LOANS happens, push new data into the state array
    case GOT_LOANS :
      return {
        data: action.data,
      };
    default:
      return state;
  }
};


/* Selectors */

// Get all loans
export const getLoans = state => state.loans.data;

// Export Reducer
export default LoansReducer;
