import React from 'react';

import classes from './SliderContainer.module.css';

const sliderContainer = (props) => (
    <div className={classes.sliderContainer}>
            {props.children}
    </div>
);

export default sliderContainer;