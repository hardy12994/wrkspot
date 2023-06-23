import { handleActions } from 'redux-actions';
import {
  SET_COUNTRY_LIST,
  SET_ARE_MORE_COUNTRIES_LEFT_TO_SHOW,
  SET_IS_MOCK_COUNTRY_LIST_POPULATED,
  SET_TOTAL_COUNTRY_COUNT,
 } from '../types/country.types';

const countriesReducer = handleActions({
  [SET_COUNTRY_LIST]: (state, action) => ({
    ...state,
    countryList: action.payload,
  }),
  [SET_TOTAL_COUNTRY_COUNT]: (state, action) => ({
    ...state,
    totalCountryCount: action.payload,
  }),
  [SET_ARE_MORE_COUNTRIES_LEFT_TO_SHOW]: (state, action) => ({
    ...state,
    areMoreCountriesLeftToShow: action.payload,
  }),
  [SET_IS_MOCK_COUNTRY_LIST_POPULATED]: (state, action) => ({
    ...state,
    isMockCountryListPopulated: action.payload,
  }),
}, {
  countryList: [], // saved pagination wise
  totalCountryCount: 0,
  areMoreCountriesLeftToShow: false,
  isMockCountryListPopulated: false,
});

export default countriesReducer;
