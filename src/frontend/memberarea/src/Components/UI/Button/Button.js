import React from 'react'
import classes from './Button.module.css'

const button = (props) =>
  <button
    onClick={props.clicked}
    className={[classes.Position, classes[props.classType]].join(' ')}
    type={props.type}
    id={props.btnId}
  >{props.children}</button>

export default button