import React, { Component } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";

import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { withStyles } from "@material-ui/core/styles";
import FIREBASE_KEY from "../../../firebasekey";
import SnackbarError from '../../../components/UI/MyErrorMessage/SnackbarError'

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

class ForgotPassword extends Component {
  state = {
    email: "",
    showPassword: false,
    password: "",
    oobCode: "",
    error: false,
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  sendPasswordResetEmail = () => {
    const authData = {
      email: this.state.email,
      requestType: "PASSWORD_RESET",
    };

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=" +
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
          this.setState({ showPassword: true });
        } else {
        }
      })
      .catch((error) => {
        this.setState({ error: true });
      });

    //
  };
  updatePassword = () => {
    const authData = {
      oobCode: this.state.oobCode,
      newPassword: this.state.password,
    };
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:resetPassword?key=" +
        FIREBASE_KEY,
      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(authData),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (!data.error) {
        } else {
        }
      })
      .catch((error) => {
        this.setState({ error: true });
      });
  };
  onSubmit = (e) => {
    e.preventDefault();
    if (!this.state.showPassword) {
      this.sendPasswordResetEmail();
    } else {
      this.updatePassword();
    }
  };
  render() {
    const { classes } = this.props;

    return (
      <Container component="main" maxWidth="xs">
        {this.state.error?<SnackbarError/>:null}
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Forgot Password
          </Typography>
          <form className={classes.form} noValidate onSubmit={this.onSubmit}>
            {!this.state.showPassword ? (
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
            ) : (
              <div>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="oobCode"
                  label="oobCode"
                  id="oobCode"
                  autoComplete="current-password"
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
              </div>
            )}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Reset Password
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

export default withStyles(styles)(ForgotPassword);
