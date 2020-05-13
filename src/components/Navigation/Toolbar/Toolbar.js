import React from 'react'
import classes from './Toolbar.module.css'
import Logo from '../../UI/Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import {NavLink} from 'react-router-dom'
 
const toolbar=(props)=>(
    <header className={classes.Toolbar}> 
        <div className={classes.Logo}>
            <NavLink to="/"><Logo/></NavLink>
            
        </div>
        <nav className={classes.DesktopOnly}>
            <NavigationItems />
        </nav>

    </header>

)

export default toolbar