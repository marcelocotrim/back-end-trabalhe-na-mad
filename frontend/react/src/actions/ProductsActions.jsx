import { Parse } from 'parse';
import moment from 'moment';
import {
  SHOW_FILTER,
  HIDE_FILTER,
  FETCH_PRODUCTS,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_FAILURE,
  ORDER_PRODUCTS,
} from './types';

export function showFilter() {
  return {
    type: SHOW_FILTER,
  };
}

export function hideFilter() {
  return {
    type: HIDE_FILTER,
  };
}

export function fetchProductsSuccess(products) {
  return {
    type: FETCH_PRODUCTS_SUCCESS,
    payload: products,
  };
}

export function fetchProductsFailure(error) {
  return {
    type: FETCH_PRODUCTS_FAILURE,
    payload: error,
  };
}

export function fetchProducts({
  name,
  manufactureDate,
  size,
  width,
  weight,
  categories,
  ascending,
}) {
  return ((dispatch) => {
    dispatch({ type: FETCH_PRODUCTS });
    return Parse.Cloud.run('fetchProducts', {
      name: name && name !== '' ? name : undefined,
      manufactureDate: manufactureDate && moment(manufactureDate).format('YYYY-MM-DDT00:00:00.000'),
      size: size && size !== '' ? Number(size) : undefined,
      width: width && width !== '' ? Number(width) : undefined,
      weight: weight && weight !== '' ? Number(weight) : undefined,
      categories: categories && categories.length > 0 ? categories : undefined,
      ascending,
    }).then((results) => {
      dispatch(fetchProductsSuccess(JSON.parse(JSON.stringify(results))));
    }, (error) => {
      dispatch(fetchProductsFailure(JSON.parse(JSON.stringify(error))));
    });
  });
}

export function orderProducts(ascending) {
  return ((dispatch) => {
    dispatch({ type: ORDER_PRODUCTS });
    dispatch(fetchProducts({ ascending }));
  });
}
