import React from 'react'

import MES from '../../../../assets/MES.jpg'


import classes from './MESPic.module.css'
const MESPic=(props)=>(
    <div className={classes.MESPic} style={{height:props.height}}>
        <img src={MES} alt="MESPic"/>
    </div>
   
)

export default MESPic