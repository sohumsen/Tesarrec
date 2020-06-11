import React, {Component} from 'react'
import classes from './LeftContent.module.css'
// import Scrolling from './Scrolling'
class LeftContent extends Component{

    render(){



        return(
            <div className={classes.LeftContent}>
                <p>Left Content</p>
                <p>Schematic</p>
                <p>Potential</p>
                <p>Production</p>
                <p>GWP</p>
                <p>Capital Cost</p>
                <p>DCF</p>

                <p>Equations</p>



            </div>

        )
    }

}
export default LeftContent