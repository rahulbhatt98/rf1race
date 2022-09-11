import { useState } from "react";
import { useDispatch } from "react-redux";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { text } from "../../utils/text";
import { Form as FinalForm, Field } from "react-final-form";
import { loginAsync } from "./authSlice";
import GoogleLoginComponent from "./GoogleLogin";
import FacebookLoginComponent from "./FacebookLogin";
import AppleLoginComponent from "./AppleLogin";
import appleLoginLogo from "../../img/apple-login-logo.png";
import facebookLogin from "../../img/facebook-login.png";
import googleLogin from "../../img/google-login.png";
import trackNinja from '../../img/track-ninja-logo.svg';

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

export default function SignIn() {
  const classes = useStyles();
  const [showError, setShowError] = useState(false)
  const dispatch = useDispatch();
  const handleFormSubmit = (data) => {
    dispatch(loginAsync(data));
  };

  const errorShow = () => {
    setShowError(true)
  }

  // useEffect(() => {
  //   navigator.geolocation.getCurrentPosition(function(position) {
  //     console.log("Latitude is :", position.coords.latitude);
  //     console.log("Longitude is :", position.coords.longitude);
  //   });
  // }, [])
  return (
    <FinalForm
      onSubmit={handleFormSubmit}
      validate={(values) => {
        const errors = {};
        if (!values.email) {
          errors.email = "Email Required";
        }
        if (!values.password) {
          errors.password = "Password Required";
        }

        return errors;
      }}
      render={({
        submitError,
        handleSubmit,
        form,
        submitting,
        pristine,
        values,
        errors
      }) => (
        <>
          {/* <Typography component="h1" variant="h5">
            {`${text.signInFormTitle}`}
          </Typography> */}
          <Typography component="h1" className="main-top-heading" variant="h5">
            WELCOME BACK!
          </Typography>

          <img src={trackNinja} alt="" />
          
          <form className={classes.form} onSubmit={handleSubmit} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12} className="input-custom">
                <Field name="email">
                  {({ input, meta }) => (
                    <>
                      <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        placeholder={`${text.signInEmailLabel}`}
                        autoComplete="email"
                        autoFocus
                        name={input.name}
                        value={input.value}
                        onChange={input.onChange}
                      />
                    </>
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
                      margin="normal"
                      required
                      fullWidth
                      placeholder={`${text.signInPasswordLabel}`}
                      type="password"
                      id="password"
                      autoComplete="current-password"
                      name={fieldProps.input.name}
                      value={fieldProps.input.value}
                      onChange={fieldProps.input.onChange}
                    />
                  )}
                </Field>
                {(errors && errors.password && showError) ?
                  <span style={{ color: "red" }}>
                    {errors.password}
                  </span>
                  : ''}
              </Grid>
              <Grid container spacing={2} className="input-custom">
                <Grid item xs={6}>
                  <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label={`${text.signInRememberLabel}`}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Link to="/sign-in" className="login-help-button">
                    Need Help?
                  </Link>
                </Grid>
              </Grid>
              {/* {submitError && <div className="error">{submitError}</div>} */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className="custom-primary"
                disabled={submitting}
                onClick={errorShow}
              >
                {`${text.signInFormSubmit}`}
              </Button>

              <div className="divider-login">
                or
              </div>

              <div className="acc-with">

                <div className="w-full max-w-185 position-relative cursor-pointer mb-15">
                  <div className="w-full bg-1B1D25">
                    <div className="w-full d-flex align-items-center justify-content-between">
                      <img className="max-w-38" src={appleLoginLogo} alt="Logo" />
                      <span className="text-white font-12 d-flex align-items-center px-10px"> Sign in with Apple</span>
                    </div>
                  </div>
                  <div className="social-c-login">
                    <AppleLoginComponent />
                  </div>
                </div>

                <div className="w-full max-w-185 position-relative cursor-pointer mb-15">
                  <div className="w-full bg-1B1D25">
                    <div className="w-full d-flex align-items-center justify-content-between">
                      <img className="max-w-38" src={googleLogin} alt="Logo" />
                      <span className="text-white font-12 d-flex align-items-center px-10px">Sign in with Google</span>
                    </div>
                  </div>
                  <div className="social-c-login">
                    <GoogleLoginComponent />
                  </div>
                </div>

                <div className="w-full max-w-185 position-relative cursor-pointer mb-15">
                  <div className="w-full bg-1B1D25">
                    <div className="w-full d-flex align-items-center justify-content-between">
                      <img className="max-w-38" src={facebookLogin} alt="Logo" />
                      <span className="text-white font-12 d-flex align-items-center px-10px">Sign in with Facebook</span>
                    </div>
                  </div>
                  <div className="social-c-login">
                    <FacebookLoginComponent />
                  </div>
                </div>

                {/* <div className="acc-box google-btn">
                  <GoogleLoginComponent />
                </div>
                <div className="acc-box">
                  <FacebookLoginComponent />
                </div> */}
              </div>

              <Grid container className="mt-3 text-center">
                <Grid item xs className="login-link">
                  <Link to="/forget-password" variant="body2" style={{ cursor: 'pointer' }}>
                    {`${text.signInForgetPasswordButtonText}`}
                  </Link>
                </Grid>
                <Grid item className="login-link">
                  <Link to="/sign-up" variant="body2">
                    Need an Account? <b>Sign Up!</b>
                  </Link>
                </Grid>
              </Grid>
            </Grid>
          </form>
        </>
      )}
    />
  );
}