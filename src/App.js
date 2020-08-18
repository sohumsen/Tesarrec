import React, { Component } from "react";

import Layout from "./hoc/Layout/Layout";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import About from "./containers/About/About";
import Reference from "./containers/Reference/Reference";
import Mes from "./containers/Sustainability/Mes/Mes";
import DynamicMes from "./containers/Dynamic/Mes/Mes";
import Mfc from "./containers/Sustainability/Mfc/Mfc";
import ModelBench from "./containers/Lab/ModelBench";
import { BrowserView, MobileView } from "react-device-detect";
import MyMobileView from "./hoc/MyMobileView/MyMobileView";
import Contact from "./containers/Contact/Contact";
import SignIn from "./containers/Authenticate/SignIn/SignIn";
import SignUp from "./containers/Authenticate/SignUp/SignUp";
import Logout from "./containers/Authenticate/Logout/Logout";
import FIREBASE_KEY from "./firebasekey";
import Chp from './containers/Sustainability/Chp/Chp'
class App extends Component {
  state = {
    isLoggedIn: false,
    token: null,
    userId: null,
    error: null,
    loading: false,
  };

  onLogoutHandler = () => {
    this.setState({ isLoggedIn: false, token: null, userId: null });
    localStorage.removeItem("token");
    localStorage.removeItem("expirationDate");
    localStorage.removeItem("userId");
    // this.props.history.push("/");
  };

  refreshSession = (refreshToken) => {
    const authData = {
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    };
    fetch("https://securetoken.googleapis.com/v1/token?key=" + FIREBASE_KEY, {
      method: "post",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(authData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (!data.error) {
          const expirationDate = new Date(
            new Date().getTime() + data.expires_in * 1000
          );
          localStorage.setItem("token", data.id_token);
          localStorage.setItem("expirationDate", expirationDate);
          localStorage.setItem("userId", data.user_id);
          localStorage.setItem("refreshToken", data.refresh_token);

          this.authSuccess(data.id_token, data.user_id);
          this.checkAuthTimeout(data.expires_in);
        } else {
          this.authFail(data.error.message);
        }
      })
      .catch((error) => {
        this.authFail(error);
      });
  };

  checkAuthTimeout = (expirationTime) => {
    setTimeout(() => {
      const refreshToken = localStorage.getItem("refreshToken");

      this.refreshSession(refreshToken);
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

  componentDidMount() {
    const token = localStorage.getItem("token");
    if (!token) {
      this.onLogoutHandler(); //no token
    } else {
      const expirationDate = new Date(localStorage.getItem("expirationDate"));
      const refreshToken = localStorage.getItem("refreshToken");
      if (expirationDate <= new Date()) {
        this.refreshSession(refreshToken)
        //this.onLogoutHandler(); //token expired
      } else {
        const userId = localStorage.getItem("userId");
        this.authSuccess(token, userId); //theyre in
        this.checkAuthTimeout(
          (expirationDate.getTime() - new Date().getTime()) / 1000
        );
        // this.onLoginHandler();
      }
    }
  }

  render() {
    let ifLoggedIn = (
      <Switch>
       <Route
          path="/modelbench"
          exact
          render={(props) => (
            <ModelBench
              {...props}
              userId={this.state.userId}
              token={this.state.token}
            />
          )}
        />
        <Route
          path="/logout"
          exact
          render={(props) => (
            <Logout {...props} onLogoutHandler={this.onLogoutHandler} />
          )}
        />
          {/* <Route path="/dynamic/mes" exact component={DynamicMes} /> */}


        <Route path="/sustainability/chp" exact component={Chp} />

        <Route path="/sustainability/mfc" exact component={Mfc} />
        <Route path="/sustainability/mes" exact component={Mes} />
        <Route path="/reference" component={Reference} />
        {/* <Route path="/contact" component={Contact} /> */}

        <Redirect to="/" />
      </Switch>
    );
    let ifNotLoggedIn = (
      <Switch>
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
        <Route path="/sustainability/chp" exact component={Chp} />

        <Route path="/sustainability/mfc" exact component={Mfc} />
        <Route path="/sustainability/mes" exact component={Mes} />
        <Route path="/reference" component={Reference} />
        {/* <Route path="/contact" component={Contact} /> */}
        <Redirect to="/" />
      </Switch>
    );
    let dynamicRoutes = this.state.isLoggedIn ? ifLoggedIn : ifNotLoggedIn;

    return (
      <div>
        <BrowserView>
          <Route path="/" exact component={About} />

          <Layout isLoggedIn={this.state.isLoggedIn}>{dynamicRoutes}</Layout>
        </BrowserView>
        <MobileView>
          <MyMobileView />
        </MobileView>
      </div>
    );
  }
}

export default withRouter(App);
