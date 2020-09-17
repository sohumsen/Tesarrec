import React, { Component } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { withStyles } from "@material-ui/core/styles";
import FIREBASE_KEY from "../../../firebasekey";

// import classes from './SignIn.module.css'
// import { createMuiTheme, withTheme } from "@material-ui/core/styles";

import { NavLink } from "react-router-dom";
import CustomizedErrorMessage from "../../../components/UI/MyErrorMessage/AuthenticateError";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Tesarrec™
      </Link>
      {new Date().getFullYear()}
    </Typography>
  );
}

const styles = (theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});

class SignIn extends Component {
  state = {
    email: "",
    password: "",
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  sendToServer = () => {
    const authData = {
      email: this.state.email,
      password: this.state.password,
      returnSecureToken: true,
    };
    // axios
    //   .post(
    //     "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" +
    //       FIREBASE_KEY,
    //     authData
    //   )
    //   .then((data) => {
    //     const expirationDate = new Date(
    //       new Date().getTime() + data.expiresIn * 1000
    //     );
    //     localStorage.setItem("token", data.idToken);
    //     localStorage.setItem("expirationDate", expirationDate);
    //     localStorage.setItem("userId", data.localId);
    //     localStorage.setItem("refreshToken", data.refreshToken);

    //     this.props.authSuccess(data.idToken, data.localId);
    //     this.props.checkAuthTimeout(data.expiresIn);
    //   })
    //   .catch((err) => {
    //     this.props.authFail(err);
    //   });

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" +
        FIREBASE_KEY,
      {
        method: "post",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(authData),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (!data.error) {
          const expirationDate = new Date(
            new Date().getTime() + data.expiresIn * 1000
          );
          localStorage.setItem("token", data.idToken);
          localStorage.setItem("expirationDate", expirationDate);
          localStorage.setItem("userId", data.localId);
          localStorage.setItem("refreshToken", data.refreshToken);

          this.props.authSuccess(data.idToken, data.localId);
          this.props.checkAuthTimeout(data.expiresIn);
        } else {
          this.props.authFail(data.error.message);
        }
      })
      .catch((error) => {
        this.props.authFail(error);
      });

    //
  };
  onSubmit = (e) => {
    e.preventDefault();
    this.sendToServer();
  };
  render() {
    const { classes } = this.props;

    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate onSubmit={this.onSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={this.onChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={this.onChange}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            {this.props.error !== null ? (
              <CustomizedErrorMessage msg={this.props.error} />
            ) : null}
            <Grid container>
              <Grid item xs>
                <NavLink to="/forgotpassword">{" Forgot password?"}</NavLink>
              </Grid>
              <Grid item>
                <NavLink to="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </NavLink>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
    );
  }
}

export default withStyles(styles)(SignIn);
