import React from "react";
import classes from "./NavigationItems.module.css";
import NavigationItem from "./NavigationItem";
import Dropdown from "./Dropdown";
const navigationItems = (props) => {
  return (
    <ul className={classes.NavigationItems}>
      <NavigationItem link="/">About</NavigationItem>
      <NavigationItem link="/sustainability">Sustainability</NavigationItem>

      {/* <Dropdown name="Sustainability">

        <NavigationItem link="/sustainability/mfc">MFC</NavigationItem>
        <NavigationItem link="/sustainability/mes">MES</NavigationItem>
        <NavigationItem link="/sustainability/chp">CHP</NavigationItem>
        <NavigationItem link="/sustainability/bioethanol">Bioethanol</NavigationItem>
        <NavigationItem link="/sustainability/chemical">Chemical</NavigationItem>
        <NavigationItem link="/sustainability/pyrolysis">Pyrolysis</NavigationItem>

      </Dropdown>
       */}

      {/* {props.isLoggedIn ? (
        <Dropdown name="Dynamic">
          <NavigationItem link="/dynamic/mfc">MFC</NavigationItem>
          <NavigationItem link="/dynamic/mes"> MES</NavigationItem>
        </Dropdown>
      ) : null} */}
      {props.isLoggedIn ? (
        <NavigationItem link="/modelbench"> Model Bench 🆕 </NavigationItem>
      ) : null}

      <NavigationItem link="/reference">Reference</NavigationItem>

      {!props.isLoggedIn ? (
        <NavigationItem link="/signin">Sign In</NavigationItem>
      ) : (
        <NavigationItem link="/logout">Log Out</NavigationItem>
      )}

      {/* <NavigationItem link="/contact">Contact</NavigationItem> */}
    </ul>
  );
};

export default navigationItems;
