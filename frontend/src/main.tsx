import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.scss';
import { headObserver } from './helpers/element-observers';

headObserver();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
