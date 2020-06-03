import React from "react";
import classes from "./NavigationItems.module.css";
import NavigationItem from "./NavigationItem/NavigationItem";
import Dropdown from "./Dropdown/Dropdown";
const navigationItems = (props) => (
  <ul className={classes.NavigationItems}>
    <NavigationItem link="/">About</NavigationItem>

    <Dropdown name="Sustainability">
      <NavigationItem link="/sustainability/mfc">MFC</NavigationItem>
      <NavigationItem link="/sustainability/mes">MES</NavigationItem>
    </Dropdown>

    <Dropdown name="Dynamic">
      <NavigationItem link="/dynamic/mfc">MFC</NavigationItem>
      <NavigationItem link="/dynamic/mes">MES</NavigationItem>
    </Dropdown>

    <Dropdown name="Lab">
      <NavigationItem link="/dynamic">Dynamic</NavigationItem>
    </Dropdown>

    <NavigationItem link="/reference">Reference</NavigationItem>
    <NavigationItem link="/contact">Contact</NavigationItem>
  </ul>
);

export default navigationItems;
