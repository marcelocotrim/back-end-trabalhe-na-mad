import { Parse } from 'parse';
import moment from 'moment';
import {
  SHOW_PRODUCT_MODAL,
  HIDE_PRODUCT_MODAL,
  RESET_PRODUCT_FORM,
  CHANGE_PRODUCT_FIELD,
  FETCH_CATEGORIES,
  FETCH_CATEGORIES_SUCCESS,
  FETCH_CATEGORIES_FAILURE,
  SAVE_PRODUCT,
  SAVE_PRODUCT_SUCCESS,
  SAVE_PRODUCT_FAILURE,
  FETCH_PRODUCT,
  FETCH_PRODUCT_SUCCESS,
  FETCH_PRODUCT_FAILURE,
} from './types';
import { fetchProducts } from './../actions';

export function showProductModal() {
  return {
    type: SHOW_PRODUCT_MODAL,
  };
}

export function hideProductModal() {
  return {
    type: HIDE_PRODUCT_MODAL,
  };
}

export function resetProductForm() {
  return {
    type: RESET_PRODUCT_FORM,
  };
}

export function changeProductField({ prop, value }) {
  return {
    type: CHANGE_PRODUCT_FIELD,
    payload: { prop, value },
  };
}

export function fetchCategoriesSuccess(allCategories) {
  return {
    type: FETCH_CATEGORIES_SUCCESS,
    payload: allCategories,
  };
}

export function fetchCategoriesFailure(error) {
  return {
    type: FETCH_CATEGORIES_FAILURE,
    payload: error,
  };
}

export function fetchCategories() {
  return ((dispatch) => {
    dispatch({ type: FETCH_CATEGORIES });
    return Parse.Cloud.run('fetchCategories').then((results) => {
      dispatch(fetchCategoriesSuccess(JSON.parse(JSON.stringify(results))));
    }, (error) => {
      dispatch(fetchCategoriesFailure(JSON.parse(JSON.stringify(error))));
    });
  });
}

export function saveProductSuccess(product) {
  return {
    type: SAVE_PRODUCT_SUCCESS,
    payload: { ...product },
  };
}

export function saveProductFailure(error) {
  return {
    type: SAVE_PRODUCT_FAILURE,
    payload: error,
  };
}

export function saveProduct({ objectId, name, manufactureDate, size, width, weight, categories }) {
  return ((dispatch) => {
    dispatch({ type: SAVE_PRODUCT });
    if (!name || !manufactureDate) {
      dispatch(saveProductFailure());
    } else {
      Parse.Cloud.run('saveProduct', {
        objectId,
        name,
        manufactureDate: moment(manufactureDate).format('YYYY-MM-DDT00:00:00.000'),
        size: size ? Number(size) : undefined,
        width: width ? Number(width) : undefined,
        weight: weight ? Number(weight) : undefined,
        categories,
      }).then((results) => {
        dispatch(saveProductSuccess(JSON.parse(JSON.stringify(results))));
        dispatch(hideProductModal());
        dispatch(fetchProducts({}));
      }, (error) => {
        dispatch(saveProductFailure(JSON.parse(JSON.stringify(error))));
      });
    }
  });
}

export function fetchProductSuccess(product) {
  return {
    type: FETCH_PRODUCT_SUCCESS,
    payload: { ...product, manufactureDate: product.manufactureDate.iso },
  };
}

export function fetchProductFailure(error) {
  return {
    type: FETCH_PRODUCT_FAILURE,
    payload: error,
  };
}

export function fetchProduct(objectId) {
  return ((dispatch) => {
    dispatch({ type: FETCH_PRODUCT });
    return Parse.Cloud.run('fetchProduct', { objectId }).then((results) => {
      dispatch(fetchProductSuccess(JSON.parse(JSON.stringify(results))));
    }, (error) => {
      dispatch(fetchProductFailure(JSON.parse(JSON.stringify(error))));
    });
  });
}
