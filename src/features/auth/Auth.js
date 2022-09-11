import React from "react";
import { store } from "../../app/store";
import { Provider } from "react-redux";
// import Avatar from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
// import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import ForgetPassword from "./ForgetPassword";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import ChangePassword from "./ChangePassword";
import Registration from "./Registration";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export function Auth({ location, history }) {
  const classes = useStyles();
  const pathname = location.pathname;
  const AuthLayout = ({ children }) => {
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          {/* <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar> */}
          {children}
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
    );
  };
  switch (pathname) {
    case "/sign-in":
      return (
        <AuthLayout>
          <Provider store={store}>
            <SignIn history={history} />
          </Provider>
        </AuthLayout>
      );
    case "/sign-up":
      return (
        <AuthLayout>
          <SignUp history={history} />
        </AuthLayout>
      );
    case "/registration":
      return (
        <AuthLayout>
          <Registration history={history} />
        </AuthLayout>
      );
    case "/forget-password":
      return (
        <AuthLayout>
          <ForgetPassword history={history} />
        </AuthLayout>
      );
    case "/change-password":
      return (
        <AuthLayout>
          <ChangePassword history={history} />
        </AuthLayout>
      );
    default:
      break;
  }
}