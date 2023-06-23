import { createAction } from 'redux-actions';

import { 
  SET_PAGE_NUMBER,
} from "../types/pagination.types";

const setPageNumber = createAction(SET_PAGE_NUMBER);

export const setPageNumberAction = (pageNumber) => {
  return (dispatch) => {
    dispatch(setPageNumber(pageNumber));
  }
}
