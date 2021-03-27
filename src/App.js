import React, { Component } from "react";

import Layout from "./hoc/Layout/Layout";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import About from "./containers/About/newAbout";
import Reference from "./containers/Reference/Reference";
import Mes from "./containers/Sustainability/Mes/Mes";
import Mfc from "./containers/Sustainability/Mfc/Mfc";
import Bioethanol from "./containers/Sustainability/Bioethanol/Bioethanol";

import ModelBench from "./containers/Lab/ModelBench";
import { BrowserView, MobileView } from "react-device-detect";
import MyMobileView from "./hoc/MyMobileView/MyMobileView";
import SignIn from "./containers/Authenticate/SignIn/SignIn";
import ForgotPassword from "./containers/Authenticate/ForgotPassword/ForgotPassword";

import SignUp from "./containers/Authenticate/SignUp/SignUp";
import Logout from "./containers/Authenticate/Logout/Logout";
import FIREBASE_KEY from "./firebasekey";
import Chp from "./containers/Sustainability/Chp/Chp";

import Blog from "./containers/Sustainability/Main";
import Sustainability from "./containers/Sustainability/Sustainability/Technical/HeatMapForm/HeatMapForm";

import { SnackbarProvider } from "notistack";
import Button from "@material-ui/core/Button";
import firebaseConfig from "./firebaseConfig";
import { withStyles } from "@material-ui/core";

import CostCalculator from './containers/CostCalculator/CostCalculator'
// import classes from './App.module.css'
const styles = (theme) => ({
  containerRoot: { width: 10, minWidth: 10, maxWidth: 10 },
  root: { width: 10, minWidth: 10, maxWidth: 10 },
  success: { backgroundColor: "purple !important" },
  error: { backgroundColor: "blue !important" },
  warning: { backgroundColor: "green !important" },
  // info: {
  //   backgroundColor: "yellow !important",
  //   width: 10,
  //   minWidth: 10,
  //   maxWidth: 10,
  // },
});

class App extends Component {
  state = {
    isLoggedIn: false,
    token: null,
    userId: null,
    error: null,
    loading: false,
  };

  onLogoutHandler = () => {
    this.setState({
      isLoggedIn: false,
      token: null,
      userId: null,
      error: null,
      loading: false,
    });
    localStorage.removeItem("token");
    localStorage.removeItem("expirationDate");
    localStorage.removeItem("refreshToken");

    localStorage.removeItem("userId");
    // if (this.props.location.pathname === "/signout") {
    //   this.props.history.push("/");

    // }
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
    // axios
    //   .post(
    //     "https://securetoken.googleapis.com/v1/token?key=" + FIREBASE_KEY,
    //     authData
    //   )
    //   .then((data) => {
    //     const expirationDate = new Date(
    //       new Date().getTime() + data.expires_in * 1000
    //     );
    //     localStorage.setItem("token", data.id_token);
    //     localStorage.setItem("expirationDate", expirationDate);
    //     localStorage.setItem("userId", data.user_id);
    //     localStorage.setItem("refreshToken", data.refresh_token);

    //     this.authSuccess(data.id_token, data.user_id);
    //     this.checkAuthTimeout(data.expires_in);
    //   })
    //   .catch((err) => {
    //     this.authFail(err);
    //   });
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
    if (this.props.location.pathname === "/signin") {
      this.props.history.push("/modelbench");
    }
  };
  authFail = (errorMsg) => {
    this.setState({
      error: errorMsg,
      loading: false,
      isLoggedIn: false,
    });
    localStorage.removeItem("token");
    localStorage.removeItem("expirationDate");
    localStorage.removeItem("refreshToken");
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
        this.refreshSession(refreshToken);
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
    const notistackRef = React.createRef();
    const onClickDismiss = (key) => () => {
      notistackRef.current.closeSnackbar(key);
    };
    const { classes } = this.props;

    let ifLoggedIn = (
      <Switch>
        <Route
          path="/modelbench"
          exact
          render={(props) => (
            <SnackbarProvider
              bodyStyle={{ maxWidth: "10%" }}
              maxSnack={1}
              ref={notistackRef}
              action={(key) => (
                <Button onClick={onClickDismiss(key)}>Dismiss</Button>
              )}
              // style={{width:"100px"}}

              classes={{
                containerRoot: classes.containerRoot,
                root: classes.root,
                containerAnchorOriginBottomLeft: classes.snackContainer,
                // variantSuccess: classes.success,
                // variantError: classes.error,
                // variantWarning: classes.warning,
                // variantInfo: classes.info,
              }}
            >
              <ModelBench
                {...props}
                userId={this.state.userId}
                token={this.state.token}
              />
            </SnackbarProvider>
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
        {/* <Route path="/sustainability/bioethanol" exact component={Bioethanol} /> */}
        <Route
          path="/sustainability/:type"
          exact
          render={(props) => (
            <Sustainability key={props.match.params.type} {...props} />
          )}
        />
                <Route path="/costcalculator" component={CostCalculator} />

        <Route path="/reference" component={Reference} />
        <Route path="/sustainability" component={Blog} />

        {/* <Route path="/contact" component={Contact} /> */}
        {/* <Redirect exact from="/" to="/sustainability/chemical" /> */}

        {/* <Redirect to="/" /> */}
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
          path="/forgotpassword"
          exact
          render={(props) => (
            <ForgotPassword
              {...props}
              error={this.state.error}
              // checkAuthTimeout={this.checkAuthTimeout}
              // authFail={this.authFail}
              // authSuccess={this.authSuccess}
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
        {/* <Route path="/sustainability/bioethanol" exact component={Bioethanol} /> */}

        <Route
          path="/sustainability/:type"
          exact
          render={(props) => (
            <Sustainability key={props.match.params.type} {...props} />
          )}
        />
        <Route path="/costcalculator" component={CostCalculator} />

        <Route path="/reference" component={Reference} />
        <Route path="/sustainability" component={Blog} />


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

export default withStyles(styles)(withRouter(App));
