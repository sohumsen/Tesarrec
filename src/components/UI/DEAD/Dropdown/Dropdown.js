import React from 'react';

import classes from './Dropdown.module.css';

const Dropdown = (props) => (
    <div className={classes.Dropdown}>
      {props.children}
  </div>
);

export default Dropdown;