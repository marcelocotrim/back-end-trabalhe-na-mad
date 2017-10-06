import {
  SHOW_PRODUCT_MODAL,
  HIDE_PRODUCT_MODAL,
  FETCH_CATEGORIES,
  FETCH_CATEGORIES_SUCCESS,
  FETCH_CATEGORIES_FAILURE,
  RESET_PRODUCT_FORM,
  CHANGE_PRODUCT_FIELD,
  SAVE_PRODUCT,
  SAVE_PRODUCT_SUCCESS,
  SAVE_PRODUCT_FAILURE,
} from '../actions/types';

const INITIAL_STATE = {
  isShowing: false,
  allCategories: [],
  objectId: '',
  name: '',
  manufactureDate: '',
  size: '',
  width: '',
  weight: '',
  categories: [],
  success: null,
  error: null,
  isLoading: false,
  submit: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SHOW_PRODUCT_MODAL:
      return {
        ...state,
        isShowing: true,
      };
    case HIDE_PRODUCT_MODAL:
      return {
        ...state,
        isShowing: false,
      };
    case FETCH_CATEGORIES:
      return {
        ...state,
        error: null,
        isLoading: true,
      };
    case FETCH_CATEGORIES_SUCCESS:
      return {
        ...state,
        allCategories: action.payload,
        isLoading: false,
      };
    case FETCH_CATEGORIES_FAILURE:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    case SAVE_PRODUCT:
      return {
        ...state,
        error: null,
        success: null,
        isLoading: true,
        submit: true,
      };
    case SAVE_PRODUCT_SUCCESS:
      return {
        ...state,
        success: true,
        isLoading: false,
      };
    case SAVE_PRODUCT_FAILURE:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    case RESET_PRODUCT_FORM:
      return {
        ...state,
        allCategories: [],
        objectId: '',
        name: '',
        manufactureDate: '',
        size: '',
        width: '',
        weight: '',
        categories: [],
        success: null,
        error: null,
        isLoading: false,
        submit: false,
      };
    case CHANGE_PRODUCT_FIELD:
      return {
        ...state,
        [action.payload.prop]: action.payload.value,
      };
    default:
      return state;
  }
};
