import { combineReducers } from 'redux';
import ProductReducer from './ProductReducer';
import ProductsReducer from './ProductsReducer';

export default combineReducers({
  productReducer: ProductReducer,
  productsReducer: ProductsReducer,
});
