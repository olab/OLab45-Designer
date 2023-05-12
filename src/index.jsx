import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { CssBaseline } from '@material-ui/core';
import store, { history } from './store/store';
import { ACTION_USER_AUTH_SUCCEEDED } from './redux/login/action';

import App from './components';
import GlobalStyles from './styles';

const token = localStorage.getItem('token');
if (token) {
  store.dispatch(ACTION_USER_AUTH_SUCCEEDED(token));
}

const target = document.getElementById('root');

const Root = (
  <Provider store={store}>
    <CssBaseline />
    <GlobalStyles />
    <App history={history} />
  </Provider>
);

ReactDOM.render(Root, target);

if ('serviceWorker' in navigator) {
  window.addEventListener(
    'load',
    () =>
      void navigator.serviceWorker.register(
        `${process.env.PUBLIC_URL || ''}/service-worker.js`.replace(
          /(:\/\/)|(\/)+/g,
          '$1$2',
        ),
      ),
  );
}
