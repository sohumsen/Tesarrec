import React from 'react'
import classes from './NavigationItems.module.css'
import NavigationItem from './NavigationItem/NavigationItem'
import Dropdown from './Dropdown/Dropdown'
const navigationItems=(props)=>(

    <ul className={classes.NavigationItems}>
        <NavigationItem link="/" >About</NavigationItem>



        <Dropdown>
            <NavigationItem link="/process/dynamic">Dynamic</NavigationItem> 

            <NavigationItem link="/process/mfc">MFC</NavigationItem> 
            <NavigationItem link="/process/mes">MES</NavigationItem> 
        </Dropdown>

        <NavigationItem link="/reference">Reference</NavigationItem> 
        <NavigationItem link="/signup">Signup</NavigationItem> 
        <NavigationItem link="/contact">Contact</NavigationItem> 



    </ul>

)

export default navigationItems