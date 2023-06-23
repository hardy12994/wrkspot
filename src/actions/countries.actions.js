import axios from 'axios';
import { createAction } from 'redux-actions';

import { 
  SET_COUNTRY_LIST,
  SET_IS_MOCK_COUNTRY_LIST_POPULATED,
  SET_TOTAL_COUNTRY_COUNT,
} from "../types/country.types";
import { CountryListAPI, TimeToLiveAPI } from "../app.constants";
import CountryMockList from "../mockData/countryList.mock";

const setCountryList = createAction(SET_COUNTRY_LIST);
const setIsMockCountryListPopulated = createAction(SET_IS_MOCK_COUNTRY_LIST_POPULATED);
const setTotalCountryCount = createAction(SET_TOTAL_COUNTRY_COUNT);


const getFromMockList = (params) => {
  debugger;
  const { population, countryName, pageNumber, pageSize  } = params;
  let searchFromList = CountryMockList;

  if (countryName || population !== Infinity) {
    searchFromList = CountryMockList.filter(item => {

      if (population !== Infinity && countryName) {
        return ((item.name.toLowerCase().search(countryName.toLowerCase()) !== -1) && (item.population < population));
      }
      else if (countryName) {
        return (item.name.toLowerCase().search(countryName.toLowerCase()) !== -1);
      }
      else {
        return (item.population < population);
      }
    }) 
  }

  const getDataFromIndex = (pageNumber - 1) * pageSize; 
  const getDataTillIndex = getDataFromIndex + pageSize;

  return { 
    newTotalCountryCount: searchFromList.length,
    slicedData: [...searchFromList].slice(getDataFromIndex, getDataTillIndex) 
  };
}

export const getCountries = (params) => {
  const controller = new AbortController();
  let countryListData = null;

  return async (dispatch, getState) => {
    try {
      const { country } = getState();
      const runSetTimeOutMultiplier = country.isMockCountryListPopulated ? 0 : TimeToLiveAPI;

      setTimeout(() => {
        if (countryListData) return;
        const { newTotalCountryCount, slicedData } = getFromMockList(params);

        controller.abort();

        if (params.pageNumber === 1) {
          dispatch(setIsMockCountryListPopulated(true));
        } 

        dispatch(setTotalCountryCount(newTotalCountryCount));
        return dispatch(setCountryList(slicedData));
      }, runSetTimeOutMultiplier * 1000);

      if (!country.isMockCountryListPopulated) {
        countryListData = await axios.get(CountryListAPI, { signal: controller.signal, params });
        const data = countryListData.json();
        
        dispatch(setTotalCountryCount(data.itemCount));
        return dispatch(setCountryList(data));
      }
    } catch (error) {
      if (error.name === 'CanceledError') {
        console.log('Setting Countries Mock Data');
      } else {
        throw error; // don't swallow errors :)
      }
    }
  }
}
