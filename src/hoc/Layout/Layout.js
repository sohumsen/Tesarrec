import React, { Component } from "react";
import Toolbar from "../../components/UI/Navigation/Toolbar";
import classes from "./Layout.module.css";
class Layout extends Component {
  render() {
    return (
      <div>
        <Toolbar isLoggedIn={this.props.isLoggedIn}/>

        <main className={classes.centerContent}>{this.props.children}</main>
      </div>
    );
  }
}
export default Layout;
