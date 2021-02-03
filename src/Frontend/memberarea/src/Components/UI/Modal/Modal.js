import React from 'react'

import Backdrop from '../Backdrop/Backdrop'
import classes from './Modal.module.scss';

const modal = (props) =>
  <>
    <Backdrop clicked={props.dismiss} show={true} />
    <div className={classes.Modal}>{props.children}</div>
  </>

export default modal;