import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import axios from 'axios';

const restRoute = window.restRoute;
axios.defaults.baseURL = restRoute.restURL;

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('joeee-booking-login')
);

