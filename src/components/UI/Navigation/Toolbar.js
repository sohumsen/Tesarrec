import React from 'react'
import classes from './Toolbar.module.css'
import Logo from '../Logo/Logo'
import NavigationItems from './NavigationItems'
import {NavLink} from 'react-router-dom'
import caption from '../../../assets/caption.png'

const toolbar=(props)=>{

    return(
        <header className={classes.Toolbar}> 
        <div className={classes.Logo}>
            
            <NavLink to="/"><Logo/></NavLink>

        </div>
        <img className={classes.caption} src={caption} alt="caption"/>


        <nav className={classes.DesktopOnly} >
            
            <NavigationItems isLoggedIn={props.isLoggedIn}/>
        </nav>

    </header>

    )
  
}

export default toolbar