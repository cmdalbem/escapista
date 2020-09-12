import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom";

import './i18n.js';

import App from './App';
import * as serviceWorker from './serviceWorker';

const render = Component => {
  return ReactDOM.render(
    <Router>
      <Component />
    </Router>,
    document.getElementById('root')
  );
};

render(App)

if (module.hot) {
  module.hot.accept('./App', () => {
    const NextApp = require('./App').default;
    render(NextApp);
  });
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
