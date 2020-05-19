import React from 'react'

import MFC from '../../../../assets/MFC.png'


import classes from './MFCPic.module.css'
const MESPic=(props)=>(
    <div className={classes.MESPic} style={{height:props.height}}>
        <img src={MFC} alt="MFCPic"/>
    </div>
   
)

export default MESPic