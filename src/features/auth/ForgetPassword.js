import React, { useState } from "react"; // , { useState }
import { useSelector, useDispatch } from "react-redux";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { Form as FinalForm, Field } from "react-final-form";
import Grid from "@material-ui/core/Grid";
import logo from '../../img/logo.png';
import ChangePassword from './ChangePassword';
import {
  forgetPasswordAsync,
  selectAuthForgetPassword,
  sendOtpAsync,
} from "./authSlice";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function ForgetPassword({ history }) {
  // const initialState = {
  //   mailSent: null,
  // };
  // const [mailSent, setmailSent] = useState(initialState.mailSent);
  const [passwordChanged, setPasswordChanges] = useState(false);
  const classes = useStyles();
  const auth = useSelector(selectAuthForgetPassword);
  const dispatch = useDispatch();
  const handleFormSubmit = (data) => {
    if (auth?.forgetPassword) {
      dispatch(sendOtpAsync(data));
    } else {
      dispatch(forgetPasswordAsync(data));
    }
    if (auth?.sendOtp) {
      setPasswordChanges(true)
    }
  };
  return (
    <FinalForm
      onSubmit={handleFormSubmit}
      validate={(values) => {
        const errors = {};
        if (!values.email) {
          errors.email = "Required";
        }
        return errors;
      }}
      render={({ handleSubmit, values, errors }) => (
        <>
          <Typography component="h1" className="main-top-heading" variant="h5">
            {!passwordChanged ? "Forgot something?" : 'Change Password'}
          </Typography>
          <img src={logo} alt="Logo" />
          {
            !passwordChanged ?
              <>
                <form className={classes.form} onSubmit={handleSubmit} noValidate>
                  <Grid item xs={12} className="input-custom">
                    <Field name="email">
                      {(fieldProps) => (
                        <TextField
                          variant="outlined"
                          margin="normal"
                          required
                          fullWidth
                          id="email"
                          placeholder="Email Address"
                          autoComplete="email"
                          autoFocus
                          name={fieldProps.input.name}
                          value={fieldProps.input.value}
                          onChange={fieldProps.input.onChange}
                        />
                      )}
                    </Field>

                  </Grid>
                  <Grid item xs={12} className="input-custom">
                    {auth?.forgetPassword ? (
                      <Field name="otp">
                        {(fieldProps) => (
                          <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="OTP"
                            autoComplete="otp"
                            autoFocus
                            name={fieldProps.input.name}
                            value={fieldProps.input.value}
                            onChange={fieldProps.input.onChange}
                          />
                        )}
                      </Field>
                    ) : null}
                  </Grid>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className="custom-primary"
                  >
                    {auth?.forgetPassword ? "Submit OTP" : "Forget Password"}
                  </Button>
                </form>
                <Grid item className="login-link">
                  <Link to="/sign-in" variant="body2" style={{textDecoration: 'none'}}>
                    <b>&lt; I REMEMBERED IT </b>
                  </Link>
                </Grid>
              </> :
              <ChangePassword userId={auth?.sendOtp?.data?.user_id} />
          }
        </>
      )}
    />
  );
}
