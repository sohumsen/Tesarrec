import React from "react";
import classes from "./NavigationItems.module.css";
import NavigationItem from "./NavigationItem/NavigationItem";
import Dropdown from "./Dropdown/Dropdown";
const navigationItems = (props) => {
  return (
    <ul className={classes.NavigationItems}>
      {props.localhost ? (
        <NavigationItem link="/local">localhost</NavigationItem>
      ) : null}
      <NavigationItem link="/">About</NavigationItem>

      <Dropdown name="Sustainability">
        <NavigationItem link="/sustainability/mfc">MFC</NavigationItem>
        <NavigationItem link="/sustainability/mes">MES</NavigationItem>
      </Dropdown>

      <Dropdown name="Model Bench">
        <NavigationItem link="/dynamic"> ALL</NavigationItem>

        <NavigationItem link="/lab/singleode"> Single ODE</NavigationItem>
        <NavigationItem link="/lab/systemsode"> ODE Systems</NavigationItem>
        <NavigationItem link="/lab/algebraicode">
          {" "}
          Algebraic+ODEs
        </NavigationItem>
        <Dropdown name="Samples">
          <NavigationItem link="/lab/samples/seir">SEIR</NavigationItem>
          <NavigationItem link="/lab/samples/navierstokes">
            Navier Stokes
          </NavigationItem>
        </Dropdown>
      </Dropdown>

      <NavigationItem link="/reference">Reference</NavigationItem>
      <NavigationItem link="/contact">Contact</NavigationItem>
    </ul>
  );
};

export default navigationItems;
