
import { handleActions } from 'redux-actions';
import {
  SET_PAGE_NUMBER,
  SET_PAGE_SIZE
 } from '../types/pagination.types';

const paginationReducer = handleActions({
  [SET_PAGE_NUMBER]: (state, action) => ({
    ...state,
    pageNumber: action.payload,
  }),
  [SET_PAGE_SIZE]: (state, action) => ({
    ...state,
    pageSize: action.payload,
  }),
}, {
  pageSize: 10,
  pageNumber: 1
});

export default paginationReducer;