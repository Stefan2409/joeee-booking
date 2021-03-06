/*global memberData*/
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import axios from 'axios';

/*Change the baseURL to memberData.restURL in production*/
axios.defaults.baseURL = memberData.restURL;

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('joeee-booking-members')
);
