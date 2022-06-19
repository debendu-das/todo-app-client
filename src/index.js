import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './containers/App';

import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// Service Worker Registered for PWA
serviceWorkerRegistration.register();