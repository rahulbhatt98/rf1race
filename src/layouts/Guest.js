import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import clsx from "clsx";
import {
  makeStyles,
  createTheme,
  ThemeProvider,
} from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import CloseIcon from "@mui/icons-material/Close";
import { Button } from "@material-ui/core";
import { selectAuth } from "../features/auth/authSlice";
// import ProfileDropdown from "../features/common/ProfileDropdown";
import { logout } from "../features/auth/authSlice";
import { gapi } from 'gapi-script';
import SearchBar from "./SearchBar"
import ListItemIcon from '@mui/material/ListItemIcon';
import logowhite from '../img/logo-white.svg';
import { useHistory } from "react-router-dom";
// import useWindowDimensions from './useWindowDimension';

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  // components: {
  //   // Name of the component
  //   AppBar: {
  //     styleOverrides: {
  //       colorPrimary: {
  //         // Some CSS
  //         color: "red",
  //         backgroundColor: "red",
  //       },
  //     },
  //   },
  // },
  root: {
    display: "flex",
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    boxShadow: "none",
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: "none",
  },
  toolbar: {
    justifyContent: "space-between",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    overflowY: "hidden",
    backgroundColor: "#14121C",
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  MuiListItemRoot: {
    textAlign: "center",
  },
  MuiListItemRootProfile: {
    textAlign: "center",
    backgroundColor: "#14121C",
  },
}));

const Guest = (WrappedComponent) => {
  let history = useHistory();
  const classes = useStyles();
  const [showLogo, setShowLogo] = useState(false);
  const localStorageData = localStorage.getItem("user");
  const authorized = (localStorageData) ? true : false;
  const auth = useSelector(selectAuth);

  if (auth?.data === "") {
    history.push("/");
    localStorage.removeItem("user");
    localStorage.removeItem("persist:root");
  }
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
    setShowLogo(false)
  };

  const handleDrawerClose = () => {
    setOpen(false);
    setShowLogo(true)
  };

  const darkTheme = createTheme({
    palette: {
      type: "dark",
    },
  });

  const menuItems = [
    "Search",
    "My Events",
    "Crew",
    "Checklists",
    "Calender",
    "Weather",
    "Expenses",
    "Transporter",
    "Leaderboard",
    "Settings",
    "Account",
    "Pro Shop",
  ];
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("user");
    localStorage.removeItem("user1");
    localStorage.removeItem("crew");
    localStorage.removeItem("eventById");
    localStorage.removeItem("persist:root");
    localStorage.removeItem("searchDatabase");
    localStorage.removeItem("searchUser");
    localStorage.removeItem("vehicleById");
    var token = (gapi) ? gapi?.auth?.getToken() : "";
    if (token) {
      gapi?.auth.setToken(null);
      gapi?.auth.signOut();
    }
    // history.push("/");
  };

  const hocComponent = ({ ...props }) => {
    return (
      <div className={classes.root}>
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <SearchBar />
          <AppBar
            // position="absolute"
            position="fixed"
            className={clsx(classes.appBar, {
              [classes.appBarShift]: open,
            })}
            color="transparent"
          >

            <Toolbar className={classes.toolbar}>
              <div className="d-flex tp-headerlogo">
                <div>
                  <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleDrawerOpen}
                    edge="start"
                    className={clsx(classes.menuButton, open && classes.hide)}
                  >
                    <MenuIcon />
                  </IconButton>
                </div>
                {
                  (showLogo) ?
                    <div className="logo-header">
                      <img src={logowhite} alt="" />
                    </div> : ''
                }
              </div>

              <div>
                {!authorized ? (
                  <>
                    <IconButton className="header-signup-main">
                      <Button className="home-signup" component={Link} to={`/sign-up`}>
                        Sign Up
                      </Button>
                    </IconButton>
                    <IconButton className="home-signin" variant="contained">
                      <Button component={Link} to={`/sign-in`}>
                        Login
                      </Button>
                    </IconButton>
                  </>
                ) : null}
              </div>
            </Toolbar>
          </AppBar>
          <Drawer
            variant="persistent"
            anchor="left"
            open={open}
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            <div className={classes.drawerHeader}>
              <Typography variant="h6">
                <img src={logowhite} alt="" />
              </Typography>
              <IconButton onClick={handleDrawerClose}>
                <CloseIcon />
              </IconButton>
            </div>
            <List
              className="side-drawer">
              {
                ((authorized) ?
                  <>
                    <ListItem
                      button
                      key={-1}
                      className="profile-section web-profile"
                    >
                      <div className="profile-img">
                        <img src={((auth?.data?.photo?.length) > 0) ? `${auth?.data?.photo}` : "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"} alt="" />
                      </div>
                      <ListItemText
                        primary={(auth?.data?.name) ? auth?.data?.name : `${auth?.data?.first_name} ${auth?.data?.last_name}`}
                        secondary={"Vehicle Year & Model"}
                      />
                      <Link key={-2} to={`/profile`}>
                        <ListItem
                          button
                          key={-2}
                          className={classes.MuiListItemRootProfile}
                        >
                          <ListItemText
                            primary={
                              <Button edge="bottom" variant="outlined">
                                Profile
                              </Button>
                            }
                          />
                        </ListItem>
                      </Link>
                    </ListItem>
                    <Link
                      to={`/my-vehicles`}
                    >
                      <ListItem
                        button
                        key={`My Vehicles`}
                        className={classes.MuiListItemRoot}
                      >
                        <ListItemText primary={`My Vehicles`} />
                      </ListItem>
                    </Link>
                  </>
                  :
                  null)
              }

              {menuItems.map((text, index) => (
                <Link
                  key={index}
                  to={`/${text.replaceAll(" ", "-").toLowerCase()}`}
                >
                  <ListItem
                    button
                    key={text}
                    className={classes.MuiListItemRoot}
                  >
                    <ListItemText primary={text} />
                  </ListItem>
                </Link>
              ))}
              {(!authorized) ?
                <>
                  <ListItem
                    button
                    key={`SIGN UP`}
                    className="drawer-signin main-signup"
                  >
                    <ListItemIcon>
                      <IconButton className="home-signup-main header-signup-main">
                        <Button className="home-signup" component={Link} to={`/sign-up`}>
                          Sign Up
                        </Button>
                      </IconButton>
                    </ListItemIcon>
                  </ListItem>

                  <ListItem
                    button
                    key={`LOG IN`}
                    className="drawer-signup main-signin"
                  >
                    <ListItemIcon className="home-signin-main">
                      <IconButton className="home-signin" variant="contained">
                        <Button component={Link} to={`/sign-in`}>
                          Login
                        </Button>
                      </IconButton>
                    </ListItemIcon>
                  </ListItem>
                </> : ''}
              {
                (authorized) ?
                  <>
                    <Link
                      to={`/`}
                    >
                      <ListItem
                        button
                        key={`Upgrade Account`}
                        className={classes.MuiListItemRoot}
                        style={{ color: 'yellow' }}
                      >
                        <ListItemText primary={`Upgrade Account`} />
                      </ListItem>
                    </Link>
                    <Link
                      to={`/`}
                      className="logout-button"
                    >
                      <ListItem
                        button
                        key={`Logout`}
                        onClick={handleLogout}
                        className={classes.MuiListItemRoot}
                        style={{ color: 'red' }}
                      >
                        <ListItemText primary={`Log Out`} />
                      </ListItem>
                    </Link>
                  </>
                  : null
              }
            </List>
            <Divider />
          </Drawer>

          <main
            className={clsx(classes.content, (open) ? `menu-open` : `menu-close`, {
              [classes.contentShift]: open,
            })}
          >

            <div className="drawer-inner-content">
              <div className={classes.drawerHeader} />
              <WrappedComponent {...props} />
            </div>
            {
              (authorized) ?
                <div className="lg-profile">

                  <ListItem
                    button
                    key={-1}
                    className="profile-section"
                  >
                    <h3>welcome back!</h3>
                    <div className="profile-img">
                      <img src={(auth?.data?.photo?.length > 0) ? `${auth?.data?.photo}` : "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"} alt="" />
                    </div>
                    <ListItemText
                      primary={(auth?.data?.name) ? auth?.data?.name : `${auth?.data?.first_name} ${auth?.data?.last_name}`}
                      secondary={"Vehicle Year & Model"}
                    />
                    <Link key={-2} to={`/profile`}>
                      <ListItem
                        button
                        key={-2}
                        className={classes.MuiListItemRootProfile}
                      >
                        <ListItemText
                          primary={
                            <Button edge="bottom" variant="outlined">
                              Profile
                            </Button>
                          }
                        />
                      </ListItem>
                      <button className="btn-chnage" >change vehicle</button>
                    </Link>
                  </ListItem>
                </div>
                : ''
            }

          </main>

        </ThemeProvider>
      </div>
    );
  };

  hocComponent.propTypes = {};

  return hocComponent;
};

export default Guest;