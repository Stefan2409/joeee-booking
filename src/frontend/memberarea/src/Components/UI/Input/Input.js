import React from 'react'
import classes from './Input.module.scss';

const input = (props) => {
  const required = <abbr title="required">*</abbr>

  return <div className={classes.Input}>
    <label className={props.valid ? null : classes.NotValid}>
      {props.validation.required ? required : null}
      {props.elementConfig.label}
    </label>
    <input
      type="text"
      value={props.value}
      onChange={props.onChange}
      className={props.valid ? null : classes.NotValid}
      {...props.elementConfig} />
  </div>
}

export default input;