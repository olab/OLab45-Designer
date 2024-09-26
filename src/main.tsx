import { StrictMode } from 'react';
import { createRoot } from "react-dom/client";
import { Provider } from 'react-redux';
import { CssBaseline } from '@material-ui/core';
import store, { history } from './store/store';
import { ACTION_USER_AUTH_SUCCEEDED } from './redux/login/action';

import App from './components';
import GlobalStyles from './styles';
import { config } from './config';

console.log(`config: ${JSON.stringify(config, null, 1)}`);

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

createRoot(document.getElementById('root')).render(Root);

if ('serviceWorker' in navigator) {
  window.addEventListener(
    'load',
    () =>
      void navigator.serviceWorker.register(
        `${config.APP_BASEPATH || ''}/service-worker.js`.replace(
          /(:\/\/)|(\/)+/g,
          '$1$2',
        ),
      ),
  );
}



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
