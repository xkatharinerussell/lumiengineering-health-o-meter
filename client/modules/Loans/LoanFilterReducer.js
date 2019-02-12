import { VisibilityFilters } from './LoansActions';
import { SET_INDUSTRY_FILTER, SET_HEALTH_FILTER } from './LoansActions';

const initialState = { data: {} };

const LoanFilterReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_INDUSTRY_FILTER :
      return {
        industryFilters: action.data,
        healthFilters: state.healthFilters
      };
    case SET_HEALTH_FILTER :
      return {
        industryFilters: state.industryFilters,
        healthFilters: action.data,
      };

    default:
      return state;
  }
};

// Returns both industry and health filters
export const getAllFilters = state => state.filters;

export default LoanFilterReducer;
