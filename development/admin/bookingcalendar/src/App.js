import React from 'react';
import './App.css';
import Calendar from './Components/Calendar/Calendar';


function App() {
  return (
    <div className="joeee-booking-calendar">
      <Calendar rest_url={process.env.REACT_APP_URL} />
    </div>
  );
}

export default App;
