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
class App extends Component {
  render() {
    let routes = (
      <Switch>
        <Route path="/dynamic" exact component={Dynamic} />

        <Route path="/sustainability/mfc" exact component={Mfc} />
        <Route path="/sustainability/mes" exact component={Mes} />
        <Route path="/reference" component={Reference} />
        <Route path="/" exact component={About} />
        <Redirect to="/" />
      </Switch>
    );

    return (
      <div>
        <BrowserView>
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
