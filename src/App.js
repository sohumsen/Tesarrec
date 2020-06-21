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
import SignIn from "./containers/Authenticate/SignIn/SignIn";
import SignUp from "./containers/Authenticate/SignUp/SignUp";
import Logout from "./containers/Authenticate/Logout/Logout";
class App extends Component {
  state = {
    isLoggedIn: false,
    token: null,
    userId: null,
    error: null,
    loading: false,
  };
  // onLoginHandler = () => {
  //   this.setState({ isLoggedIn: true });
  //   this.props.history.push("/modelbench");
  //   console.log("5");
  // };
  onLogoutHandler = () => {
    this.setState({ isLoggedIn: false, token: null, userId: null });
    localStorage.removeItem("token");
    localStorage.removeItem("expirationDate");
    localStorage.removeItem("userId");
    console.log("4");
  };

  checkAuthTimeout = (expirationTime) => {
    setTimeout(() => {
      this.onLogoutHandler();
    }, expirationTime * 1000);
  };
  authSuccess = (idToken, localId) => {
    this.setState({
      token: idToken,
      userId: localId,
      error: null,
      loading: false,
      isLoggedIn: true,
    });
    this.props.history.push("/modelbench");
    //this.onLoginHandler();
  };
  authFail = (errorMsg) => {
    this.setState({
      error: errorMsg,
      loading: false,
      isLoggedIn: false,
    });
    localStorage.removeItem("token");
    localStorage.removeItem("expirationDate");
    localStorage.removeItem("userId");
  };

  // logout = () => {
  //   this.props.onLogoutHandler();

  //   this.setState({
  //     token: null,
  //     userId: null,
  //   });
  // };

  componentDidMount() {
    const token = localStorage.getItem("token");
    if (!token) {
      this.onLogoutHandler();
    } else {
      const expirationDate = new Date(localStorage.getItem("expirationDate"));
      if (expirationDate <= new Date()) {
        this.onLogoutHandler();
      } else {
        const userId = localStorage.getItem("userId");
        this.authSuccess(token, userId);
        this.checkAuthTimeout(
          (expirationDate.getTime() - new Date().getTime()) / 1000
        );
        // this.onLoginHandler();
      }
    }
  }

  render() {
    let ifLoggedIn = (
      <div>
        <Route path="/modelbench" exact component={Dynamic} />
        <Route
          path="/logout"
          exact
          render={(props) => (
            <Logout {...props} onLogoutHandler={this.onLogoutHandler} />
          )}
        />
        <Route path="/sustainability/mfc" exact component={Mfc} />
        <Route path="/sustainability/mes" exact component={Mes} />
        <Route path="/reference" component={Reference} />
        <Route path="/contact" component={Contact} />

        <Redirect to="/" />
      </div>
    );
    let ifNotLoggedIn = (
      <div>
        <Route
          path="/signin"
          exact
          render={(props) => (
            <SignIn
              {...props}
              error={this.state.error}
              checkAuthTimeout={this.checkAuthTimeout}
              authFail={this.authFail}
              authSuccess={this.authSuccess}
            />
          )}
        />
        <Route
          path="/signup"
          exact
          render={(props) => (
            <SignUp
              {...props}
              error={this.state.error}
              checkAuthTimeout={this.checkAuthTimeout}
              authFail={this.authFail}
              authSuccess={this.authSuccess}
            />
          )}
        />
        <Route path="/sustainability/mfc" exact component={Mfc} />
        <Route path="/sustainability/mes" exact component={Mes} />
        <Route path="/reference" component={Reference} />
        <Route path="/contact" component={Contact} />

        <Redirect to="/" />
      </div>
    );
    let dynamicRoutes = this.state.isLoggedIn ? ifLoggedIn : ifNotLoggedIn;

    return (
      <div>
        <BrowserView>
          <Route path="/" exact component={About} />

          <Layout isLoggedIn={this.state.isLoggedIn}>
            <Switch>{dynamicRoutes}</Switch>
          </Layout>
        </BrowserView>
        <MobileView>
          <MyMobileView />
        </MobileView>
      </div>
    );
  }
}

export default withRouter(App);
