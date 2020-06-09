import React, {Component} from 'react'
import classes from './LeftContent.module.css'
import WordDoc from '../../../../../assets/MES discussion.docx'
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

                <a href={WordDoc} download>Click to download</a>
                <p>Equations</p>



            </div>

        )
    }

}
export default LeftContent