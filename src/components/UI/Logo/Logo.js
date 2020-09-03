import React from 'react'

import tesarrec from '../../../assets/logo2.png'

import classes from './Logo.module.css'
const logo=(props)=>(
    <div className={classes.Logo}>
        <img className={classes.cube} src={tesarrec} alt="TesarrecLogo"/>

    </div>
   
)

export default logo