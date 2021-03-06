import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import store from './utils/store'
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';

// Log the initial state
console.log('Initial state: ', store.getState())
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

serviceWorker.register();