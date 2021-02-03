import React from 'react';
import classes from './App.module.css';
import './containers/Widget/Widget';
import Widget from './containers/Widget/Widget';


function App() {
  return (
      <div className={classes.App}>
        <Widget></Widget>
      </div>   
  );
}

export default App;
