import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.scss';

import App from './App.jsx';
import store from './redux-store';

import axios from 'axios';

import * as serviceWorker from './serviceWorker';

import URLs from 'setts/urls';

if ('ontouchstart' in document.documentElement) {
  document.body.style.cursor = 'pointer';
}

axios.defaults.baseURL = 
  (process.env.NODE_ENV === 'production') ? URLs.BASE_PROD : URLs.BASE_DEV;

const token = localStorage.getItem('token');

if (token) axios.defaults.headers.common['Authorization'] = token;

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
// serviceWorker.register();
