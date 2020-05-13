import React, {Component} from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";


class ContinuousSlider extends Component{
  state={
    efficiencyValue:50

  }
  SliderhandleChange=(event, newValue)=>{

    this.setState({efficiencyValue:newValue})

  }

  render(){
    return(

      <div>
      <p>Efficiency</p>
    <Grid container spacing={2}>
      <Grid item>
        <p>0</p>
      </Grid>
      <Grid item xs>
        <Slider
          
          style={{ color: "rgb(255, 255, 255)" }}
          value={this.state.efficiencyValue}
          onChange={this.SliderhandleChange}
        />
      </Grid>
      <Grid item>
        <p>1</p>
      </Grid>
    </Grid>
  </div>

    )
  }


}

export default ContinuousSlider

