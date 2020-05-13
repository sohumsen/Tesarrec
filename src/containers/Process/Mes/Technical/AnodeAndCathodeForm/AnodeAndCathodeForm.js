import React, { Component } from "react";

import Form from "../../../../../components/UI/Form/Form";

import classes from "./AnodeAndCathodeForm.module.css";
import Input from "../../../../../components/UI/Input/Input";
import OverallReactionAnodeCathode from "../../../../../components/Calculations/OverallReactionAnodeCathode";
//import Slider from '../../../../components/UI/Slider/Slider'
import Slider from "@material-ui/core/Slider";
import Grid from "@material-ui/core/Grid";

class AnodeAndCathodeForm extends Component {
  state = {
    AnodeSubstrateChemical: "Ethanol",
    AnodeSubstrateConcentration: 0,
    CathodeProductChemical: "Acetic acid",
    Volume: 0,
    efficiencyValue: 50,
  };

  SliderhandleChange = (event, newValue) => {
    this.setState({ efficiencyValue: newValue });
  };

  inputChangedHandler = (event) => {
    // event.target should have methods to tell us which component should handle this

    const target = event.target;
    let value = target.value;

    let name = target.name;

    this.setState({
      [name]: value,
    });
  };

  render() {
    return (
      <div className={classes.Content}>
        <Form>
          <label>Select the Anode substrate :</label>

          <select
            className={classes.Dropdown}
            name="AnodeSubstrateChemical"
            value={this.state.AnodeSubstrateChemical}
            onChange={this.inputChangedHandler}
          >
            <option value="Acetate">Acetate</option>
            <option value="Ethanol">Ethanol</option>
            <option value="Glucose">Glucose</option>
            <option value="Lactate">Lactate</option>
            <option value="Methane">Methane</option>
            <option value="Methanol">Methanol</option>
            <option value="Propionate">Propionate</option>
            <option value="Pyruvate">Pyruvate</option>
            <option value="Sorbitol">Sorbitol</option>
            <option value="Sucrose">Sucrose</option>
          </select>
          <br></br>

          <label>
            Anode substrate concentration in g/L:
            <Input
              name="AnodeSubstrateConcentration"
              type="number"
              value={this.state.AnodeSubstrateConcentration}
              onChange={this.inputChangedHandler}
            />
          </label>
          <br></br>

          <label>Select the Cathode product :</label>

          <select
            className={classes.Dropdown}
            name="CathodeProductChemical"
            value={this.state.CathodeProductChemical}
            onChange={this.inputChangedHandler}
          >
            <option value="Acetic acid">Acetic acid</option>
            <option value="Butyric acid">Butyric acid</option>
            <option value="Caproic acid">Caproic acid</option>
            <option value="Formic acid">Formic acid</option>
            <option value="Propionic acid">Propionic acid</option>
            <option value="Valeric acid">Valeric acid</option>
          </select>

          <br></br>

          <label>
            Volume in L:
            <Input
              name="Volume"
              type="number"
              value={this.state.Volume}
              onChange={this.inputChangedHandler}
            />
          </label>
          <br></br>

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
          <p>{this.state.efficiencyValue / 100}</p>
        </Form>

        <div className={classes.Graph}>
          <OverallReactionAnodeCathode
            cathodeProduct={this.state.CathodeProductChemical}
            anodeSubstrate={this.state.AnodeSubstrateChemical}
            concentration={this.state.AnodeSubstrateConcentration}
            volume={this.state.Volume}
            efficiency={this.state.efficiencyValue / 100}
          />
        </div>
      </div>
    );
  }
}

export default AnodeAndCathodeForm;
