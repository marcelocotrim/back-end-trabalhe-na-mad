import {
  SHOW_FILTER,
  HIDE_FILTER,
  FETCH_PRODUCTS,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_FAILURE,
  ORDER_PRODUCTS,
} from '../actions/types';

const INITIAL_STATE = {
  isOpen: false,
  products: [],
  error: null,
  isLoading: false,
  ascending: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SHOW_FILTER:
      return {
        ...state,
        isOpen: true,
      };
    case HIDE_FILTER:
      return {
        ...state,
        isOpen: false,
      };
    case FETCH_PRODUCTS:
      return {
        ...state,
        error: null,
        isLoading: true,
      };
    case FETCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        products: action.payload,
        isLoading: false,
      };
    case FETCH_PRODUCTS_FAILURE:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    case ORDER_PRODUCTS:
      return {
        ...state,
        ascending: action.payload,
      };
    default:
      return state;
  }
};
