/**
 * Root Reducer
 */
import { combineReducers } from 'redux';

// Import Reducers matches name of the actual state.app
import app from './modules/App/AppReducer';
import loans from './modules/Loans/LoansReducer';
import filters from './modules/Loans/LoanFilterReducer';

// Combine all reducers into one root reducer
export default combineReducers({
  app,
  loans,
  filters
});
