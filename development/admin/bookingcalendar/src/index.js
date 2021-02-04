import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import axios from 'axios';


const restRoute = window.restRoute;
var rest_url = "";
if (process.env.NODE_ENV === 'development') {
  axios.defaults.baseURL = process.env.REACT_APP_URL;
  rest_url = process.env.REACT_APP_URL;
}
else {
  axios.defaults.baseURL = restRoute.restURL;
  rest_url = restRoute.restURL;
}

ReactDOM.render(
  <React.StrictMode>
    <App rest_url={rest_url}/>
  </React.StrictMode>,
  document.getElementById('joeee-booking-calendar')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
