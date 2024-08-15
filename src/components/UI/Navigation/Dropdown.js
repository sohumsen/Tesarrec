import React from 'react'
import classes from './Dropdown.module.css'
const Dropdown=(props)=>(

    <div className={classes.dropdown}>
        <button className={classes.dropbtn}>{props.name}
        
        </button>
        <div className={classes.dropdowncontent}>
            {props.children}
        </div>
    </div> 

    

    

)

export default Dropdown