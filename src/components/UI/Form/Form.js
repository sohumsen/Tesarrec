import React from 'react';

import classes from './Form.module.css';

const Form = (props) => (
    <form className={classes.Form} name= {props.name} value={props.value} onChange={props.onChange}>
            {props.children}
    </form>
);

export default Form;