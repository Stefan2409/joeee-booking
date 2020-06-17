import React from 'react'
import Input from '../Input/Input'

const inputs = (props) =>
  Object.keys(props.form).map(key =>
    <Input
      key={key}
      name={key}
      elementConfig={{ ...props.form[key].elementConfig }}
      onChange={props.onChange.bind(this, key)}
      valid={props.form[key].valid}
      validation={props.form[key].validation || {}}
    />
  )

export default inputs