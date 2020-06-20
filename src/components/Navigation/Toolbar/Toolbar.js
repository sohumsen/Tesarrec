import React from 'react'
import classes from './Toolbar.module.css'
import Logo from '../../UI/Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import {NavLink} from 'react-router-dom'
 
const toolbar=(props)=>{

    return(
        <header className={classes.Toolbar}> 
        <div className={classes.Logo}>
            
            <NavLink to="/"><Logo/></NavLink>
            
        </div>

        <nav className={classes.DesktopOnly} >
            <NavigationItems isLoggedIn={props.isLoggedIn}/>
        </nav>

    </header>

    )
  
}

export default toolbar