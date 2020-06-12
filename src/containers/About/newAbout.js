import React, { Component } from "react";
import Team from '../../components/UI/AboutPage/Team'
import classes from './newAbout.module.css'
class About extends Component {
  render() {
    return (
      <div className={classes.Layout}>
        Tesarrec™ Tool for techno-Economic and Sustainability Analysis of
        Resource Recovery Engineering solutions for Circular economy New gen
        engineered technologies and solutions for sustainability and circular
        economy We develop computer software for use in: Evaluation of organic
        compounds synthesized by carbon dioxide capture by organic degradation
        in wastewater; Evaluating the dynamic performance of these systems;
        Evaluating technical feasibility and life cycle sustainability of these
        systems; One such group of technologies are electrochemical technologies
        Bio-based electrochemical technologies are becoming popular due to their
        non-toxic non-chemical way of transforming waste into electricity
        generation or fuel or chemical synthesis from carbon dioxide reuse,
        depending on the mode of operation. Their main modes of operation
        include microbial fuel cells (MFC) and microbial electrosynthesis
        systems (MES). Get started The research is supported by the British
        Council UKRI The Team Lead academic: Dr Jhuma Sadhukhan Other Academic:
        Dr Siddharth Gadkari IT Analyst: Sohum Sen
        <Team/>

      </div>
    );
  }
}
export default About;
