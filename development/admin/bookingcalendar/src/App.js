import React from 'react';
import './App.css';
import Calendar from './Components/Calendar/Calendar';


function App(props) {

  return (
    <div className="joeee-booking-calendar">
      <Calendar rest_url={props.rest_url}/>
    </div>
  );
}

export default App;
