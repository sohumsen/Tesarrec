import React, { Component } from "react";
import classes from "./Layout.module.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import LeftContent from "./LeftContent/LeftContent";
class Layout extends Component {
  render() {
    return (
      <div>
        <Toolbar />
        <main className={classes.centerContent}>{this.props.children}</main>
      </div>
    );
  }
}
export default Layout;
