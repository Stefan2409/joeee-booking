import React from 'react';
import classes from './Button.module.css';

const button = (props) => (
    <button
    disabled={props.disabled} 
    onClick={props.clicked}
    className={[classes.Button, classes[props.btnType]].join(' ')}
    type={props.type}
    >
        {props.children}
    </button>
);

export default button;