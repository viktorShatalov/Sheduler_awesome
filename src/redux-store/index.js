import {
  createStore,
  applyMiddleware,
  compose
} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const middlewares = applyMiddleware(
  thunk
);

// const store = createStore(rootReducer, middlewares);
const store = createStore(rootReducer, composeEnhancers(middlewares));

export default store;