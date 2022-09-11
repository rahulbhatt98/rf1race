import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { Form as FinalForm, Field } from "react-final-form";
import {
  changePasswordAsync,
  selectAuthForgetPassword,
} from "./authSlice";
import { useHistory } from "react-router-dom";

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

export default function ChangePassword({ userId }) {
  // const initialState = {
  //   mailSent: null,
  // };
  // const [mailSent, setmailSent] = useState(initialState.mailSent);
  let history = useHistory();
  const classes = useStyles();
  const auth = useSelector(selectAuthForgetPassword);
  const dispatch = useDispatch();

  const handleFormSubmit = (data) => {
    data.user_id = userId;
    dispatch(changePasswordAsync(data));
    history.push("/")
  };
  return (
    <FinalForm
      onSubmit={handleFormSubmit}
      validate={(values) => {
        const errors = {};
        if (!values.old_password) {
          errors.old_password = "Required";
        }
        if (!values.new_password) {
          errors.new_password = "Required";
        }
        if (!values.c_password) {
          errors.c_password = "Required";
        } else if (values.c_password !== values.new_password) {
          errors.c_password = "Must match";
        }
        return errors;
      }}
      render={({ handleSubmit, values, errors }) => (
        <>
          {/* <Typography component="h1" variant="h5">
            Change Password
          </Typography> */}
          <form className={classes.form} onSubmit={handleSubmit} noValidate>
            <Grid item xs={12} className="input-custom">
              <Field name="old_password">
                {(fieldProps) => (
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="old_password"
                    label="Old Password"
                    autoComplete="old_password"
                    autoFocus
                    name={fieldProps.input.name}
                    value={fieldProps.input.value}
                    onChange={fieldProps.input.onChange}
                  />
                )}
              </Field>
            </Grid>
            <Grid item xs={12} className="input-custom">
              <Field name="new_password">
                {(fieldProps) => (
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="new_password"
                    label="New Password"
                    autoComplete="new_password"
                    autoFocus
                    name={fieldProps.input.name}
                    value={fieldProps.input.value}
                    onChange={fieldProps.input.onChange}
                  />
                )}
              </Field>
            </Grid>
            <Grid item xs={12} className="input-custom">
              <Field name="c_password">
                {(fieldProps) => (
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="c_password"
                    label="Confirm Password"
                    autoComplete="c_password"
                    autoFocus
                    name={fieldProps.input.name}
                    value={fieldProps.input.value}
                    onChange={fieldProps.input.onChange}
                  />
                )}
              </Field>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              {auth?.forgetPassword ? "Change Password" : "Forget Password"}
            </Button>
          </form>
        </>
      )}
    />
  );
}
