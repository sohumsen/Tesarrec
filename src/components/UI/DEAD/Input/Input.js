import React from 'react';

import classes from './Input.module.css';

const Input = (props) => (

    <input className={classes.Input} name={props.name} type={props.type} value={props.value} onChange={props.onChange} />

)
export default Input;