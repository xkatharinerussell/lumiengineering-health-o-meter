import callApi from '../../util/apiCaller';

// Export Constants
export const GOT_LOANS = 'GOT_LOANS';
export const SET_INDUSTRY_FILTER = 'SET_INDUSTRY_FILTER';
export const SET_HEALTH_FILTER = 'SET_HEALTH_FILTER';

export const VisibilityFilters = {
  HEALTH_HIGH: 'HEALTH_HIGH',
  HEALTH_MEDIUM: 'HEALTH_MEDIUM',
  HEALTH_LOW: 'HEALTH_LOW',
  INDUSTRY: 'INDUSTRY'
}

// Export Actions
// Action. The source of information for the store. This describes what happened.
export function gotData(data) {
  return {
    type: GOT_LOANS,
    data,
  };
}
//Action for setting filters
export function setIndustryFilter(data) {
  return {
    type: SET_INDUSTRY_FILTER,
    data,
  };
}

export function setHealthFilter(data) {
  return {
    type: SET_HEALTH_FILTER,
    data,
  };
}

//Get all the loan data via API call.
export function fetchData(nextPage) {
  return (dispatch) => {
    return callApi(`/loans/${nextPage}`).then(res => dispatch(gotData(res)));
  };
}

//Store visibility filters
export function storeIndustryFilter(filters) {
    return (dispatch) => {
      return dispatch(setIndustryFilter(filters));
    }
}

export function storeHealthFilter(filters) {
    return (dispatch) => {
      return dispatch(setHealthFilter(filters));
    }
}
