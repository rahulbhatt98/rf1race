import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { Form as FinalForm, Field } from "react-final-form";
import { registerAsync } from "./authSlice";
import trackNinja from '../../img/track-ninja-logo.svg';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(0),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
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

export default function SignUp({ history }) {

  const [showError, setShowError] = useState(false)
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleFormSubmit = (data) => {
    dispatch(registerAsync(data));
    history.push("/registration");
  };

  const errorShow = () => {
    setShowError(true)
  }
  return (
    <>
      <FinalForm
        onSubmit={handleFormSubmit}
        validate={(values) => {
          const errors = {};
          var checkpassword = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
          var resultpassword = checkpassword.test(values.password);
          var checkemail = /\S+@\S+\.\S+/;
          var resultemail = checkemail.test(values.email);

          if (!values.password) {
            errors.password = "Required Password";
          }
          if (!values.c_password) {
            errors.c_password = "Required Confirm Password";
          } else if (values.c_password !== values.password) {
            errors.c_password = "Password Must Be Match";
          }
          if (resultpassword === false) {
            errors.c_password = "must be more than 8 characters with a capital letter, number, and special character.";
          }
          if (resultemail === false) {
            errors.email = "email should be vaildated";
          }
          if (!values.email) {
            errors.email = "Required email";
          }
          console.log(errors)
          return errors;
        }}

        render={({ handleSubmit, values, errors }) => (
          <>
            {/* <Typography component="h1" variant="h5">
        Sign up
      </Typography>
      <Typography component="h1" className="main-top-heading" variant="h5">
        welcome back!
      </Typography> */}

            <img src={trackNinja} alt="" />

            <form className={classes.form} onSubmit={handleSubmit} noValidate>
              <Grid container spacing={2}>

                <Grid item xs={12} className="input-custom">
                  <Field name="email">
                    {(fieldProps) => (
                      <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="email"
                        placeholder="Email Address"
                        autoComplete="email"
                        name={fieldProps.input.name}
                        value={fieldProps.input.value}
                        onChange={fieldProps.input.onChange}
                      />
                    )}
                  </Field>
                  {(errors && errors.email && showError) ?
                    <span style={{ color: "red" }}>
                      {errors.email}
                    </span>
                    : ''}
                </Grid>
                <Grid item xs={12} className="input-custom">
                  <Field name="password">
                    {(fieldProps) => (
                      <TextField
                        variant="outlined"
                        required
                        fullWidth
                        placeholder="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        name={fieldProps.input.name}
                        value={fieldProps.input.value}
                        onChange={fieldProps.input.onChange}
                      />
                    )}
                  </Field>
                  <Typography className="helping-text">
                    must be more than 8 characters with a capital letter,
                    number, and special character.
                  </Typography>
                </Grid>
                <Grid item xs={12} className="input-custom">
                  <Field name="c_password">
                    {(fieldProps) => (
                      <TextField
                        variant="outlined"
                        required
                        fullWidth
                        placeholder="Confirm password"
                        type="password"
                        id="c_password"
                        autoComplete="current-password"
                        name={fieldProps.input.name}
                        value={fieldProps.input.value}
                        onChange={fieldProps.input.onChange}
                      />
                    )}
                  </Field>
                  {(errors && errors.c_password && showError) ?
                    <span style={{ color: "red" }}>
                      {errors.c_password}
                    </span>
                    : ''}
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className="custom-primary"
                onClick={errorShow}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="center " className="mt-3 text-center">
                <Grid item className="login-link">
                  <Link to="/sign-in" variant="body2">
                    Already have an account? <b> Log In! </b>
                  </Link>
                </Grid>
              </Grid>
            </form>
          </>
        )}
      />
    </>
  );
}