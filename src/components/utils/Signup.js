import React, { useCallback, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { withRouter } from "react-router";
import base from "../../config/FbConfig";
import Paper from "@material-ui/core/Paper";
import firestore from "firebase/firestore";

function Copyright() {
  return (
    <Typography
      variant="body2"
      color="textSecondary"
      align="center"
      style={{ padding: "1vh" }}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(7),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(2),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Signup = ({ history }) => {
  const classes = useStyles();
  const [data, setState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
  });

  const updateField = (e) => {
    e.preventDefault();
    setState({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignUp = useCallback(
    async (event) => {
      event.preventDefault();
      const {
        firstName,
        lastName,
        email,
        mobile,
        password,
      } = event.target.elements;
      const db = base.firestore();

      console.log(firstName + lastName + email + mobile + password);
      try {
        await base
          .auth()
          .createUserWithEmailAndPassword(email.value, password.value)
          .then((cred) => {
            return db.collection("UserData").doc(cred.user.uid).set({
              firstName: firstName.value,
              lastName: lastName.value,
              email: email.value,
              mobile: mobile.value,
            });
          })
          .then(() => {
            history.push("/");
          });
      } catch (error) {
        alert(error.message);
      }
    },
    [history]
  );

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Paper
        style={{
          borderRadius: "16px",
          padding: "0vh 5vh",
          marginBottom: "3vh",
        }}
      >
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form className={classes.form} onSubmit={handleSignUp} validate>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="fname"
                  value={data.firstName}
                  name="firstName"
                  onChange={updateField}
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  value={data.lastName}
                  name="lastName"
                  onChange={updateField}
                  autoComplete="lname"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  value={data.email}
                  name="email"
                  onChange={updateField}
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="mobile"
                  label="Mobile Number"
                  value={data.mobile}
                  name="mobile"
                  onChange={updateField}
                  type="mobile"
                  autoComplete="mobile"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
              </Grid>
              {/* <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid> */}
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign Up
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link
                  href="/login"
                  variant="body2"
                  style={{ cursor: "pointer" }}
                >
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={5}>
          <Copyright />
        </Box>
      </Paper>
    </Container>
  );
};

export default withRouter(Signup);
