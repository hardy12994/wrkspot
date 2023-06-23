import { combineReducers } from 'redux';

import countryReducer from './countries.reducer';
import paginationReducer from './pagination.reducer';

const appReducer = combineReducers({
  country: countryReducer,
  pagination: paginationReducer,
});

const rootReducer = (state, action) => appReducer(state, action)

export default rootReducer;
