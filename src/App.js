import React, { Component } from "react";

import Layout from "./hoc/Layout/Layout";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import About from "./containers/About/About";
import Reference from "./containers/Reference/Reference";
import Mes from "./containers/Sustainability/Mes/Mes";
import Mfc from "./containers/Sustainability/Mfc/Mfc";
import Dynamic from "./containers/Lab/Dynamic";
import { BrowserView, MobileView } from "react-device-detect";
import MyMobileView from "./hoc/MyMobileView/MyMobileView";
import Contact from "./containers/Contact/Contact";
import SignIn from './containers/Authenticate/SignIn/SignIn'
import SignUp from './containers/Authenticate/SignUp/SignUp'
class App extends Component {
  render() {
    let localhost = false;
    if (window.location.hostname === "localhost") {
      localhost = true;
    }
    let routes = (
      <Switch>
        {localhost ? <Route path="/dynamic" exact component={Dynamic} /> : null}
        <Route path="/signin" exact component={SignIn} />
        <Route path="/signup" exact component={SignUp} />


        <Route path="/sustainability/mfc" exact component={Mfc} />
        <Route path="/sustainability/mes" exact component={Mes} />
        <Route path="/reference" component={Reference} />
        <Route path="/contact" component={Contact} />

        <Redirect to="/" />
      </Switch>
    );

    return (
      <div>
        <BrowserView>
          <Route path="/" exact component={About} />

          <Layout>{routes}</Layout>
        </BrowserView>
        <MobileView>
          <MyMobileView />
        </MobileView>
      </div>
    );
  }
}

export default withRouter(App);
