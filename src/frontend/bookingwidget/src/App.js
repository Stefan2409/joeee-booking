import React from 'react';
import './App.css';
import './containers/Widget/Widget';
import Widget from './containers/Widget/Widget';
import Auxiliary from './hoc/Auxiliary/Auxiliary';

function App() {
  return (
      <Auxiliary>
        <Widget></Widget>
      </Auxiliary>    
  );
}

export default App;
