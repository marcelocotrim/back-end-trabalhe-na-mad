import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import reducers from 'reducers';

export const configure = (initialState = {}) => {
  const store = createStore(reducers, initialState, compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f,
  ));
  return store;
};
