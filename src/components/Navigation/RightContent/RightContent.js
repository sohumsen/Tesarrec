import React, { Component } from "react";
import classes from "./RightContent.module.css";
import MESPic from "../../UI/MESPic/MESPic";
import MySliderContainer from "../../UI/SliderContainer/SliderContainer";
import MySlider from "../../UI/SliderContainer/Slider/Slider";

const RightContent = (props) => (
  <div className={classes.RightContent}>

    
    <MESPic height={200} />

    <div style={{borderWidth:5}}>

    <p>X-axis :Anode Substrate: {props.AnodeSubstrateChemical}</p>
    <p>Y-axis :Cathode Product : {props.CathodeProductChemical}</p>
    <p>Value : {props.chosenValue}</p>

    </div>

    <MySliderContainer>
      <br></br>
      <MySlider
        displayCaption={"Anode substrate concentration in g/L: "}
        value={props.AnodeSubstrateConcentration}
        displayValue={props.AnodeSubstrateConcentration}
        lowestVal={0}
        highestVal={100}
        SliderhandleChange={props.SliderhandleChange(
          "AnodeSubstrateConcentration"
        )}
      />
      <br></br>
      <MySlider
        displayCaption={"Volume in L:"}
        value={props.Volume}
        displayValue={props.Volume * 10}
        lowestVal={0}
        highestVal={1000}
        SliderhandleChange={props.SliderhandleChange("Volume")}
      />
      <br></br>
      <MySlider
        displayCaption={"Efficiency: "}
        value={props.efficiencyValue}
        displayValue={props.efficiencyValue / 100}
        lowestVal={0}
        highestVal={1}
        SliderhandleChange={props.SliderhandleChange("efficiencyValue")}
      />
      <br></br>
    </MySliderContainer>
  </div>
);
export default RightContent;
