import React from "react";
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Account from "./features/account/Account";
import Profile from "./features/account/Profile";
import { Auth } from "./features/auth/Auth";
import Calender from "./features/calender/Calender";
import Checklists from "./features/checklists/Checklists";
import ChecklistSelected from "./features/checklists/ChecklistSelected";
import { Counter } from "./features/counter/Counter";
// import { Counter } from "./features/counter/Counter";
import Dashboard from "./features/dashboard/Dashboard";
import Expenses from "./features/expenses/Expenses";
import Home from "./features/home/Home";
import Leaderboard from "./features/leaderboard/Leaderboard";
import MyEvents from "./features/my-events/MyEvents";
import Crew from "./features/crew/Crew";
import CreateCrew from "./features/crew/CreateCrew";
import CrewSelected from "./features/crew/CrewSelected";
import UserSelected from "./features/crew/UserSelected";
import FindCrew from "./features/crew/FindCrew";
import MyVehicles from "./features/my-vehicles/MyVehicles";
import VehicleSelected from "./features/my-vehicles/VehicleSelected";
import AddVehicle from "./features/my-vehicles/AddVehicle";
import ProShop from "./features/pro-shop/ProShop";
import DriverDetail from "./features/search/DriverDetail";
import Search from "./features/search/Search";
import Settings from "./features/settings/Settings";
import Transporter from "./features/transporter/Transporter";
import UpgradeAccount from "./features/upgrade-account/UpgradeAccount";
import Weather from "./features/weather/Weather";
import Guest from "./layouts/Guest";
import EventSession from "./features/my-events/EventSession";
import EventSessionLap from "./features/my-events/EventSessionLap";

export default function Routes(props) {
  const localStorageData = localStorage.getItem("user");
  const authorized = localStorageData === null ? false : true;

  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Guest(Home)} />
        <Route
          exact
          path="/sign-in"
          render={(routeProps) =>
            authorized ? <Redirect to="/" /> : <Auth {...routeProps} />
          }
        />
        <Route
          exact
          path="/sign-up"
          render={(routeProps) =>
            authorized ? <Redirect to="/" /> : <Auth {...routeProps} />
          }
          component={Auth}
        />
        <Route
          exact
          path="/registration"
          render={(routeProps) =>
            authorized ? <Redirect to="/" /> : <Auth {...routeProps} />
          }
          component={Auth}
        />
        <Route exact path="/forget-password" component={Auth} />
        <Route exact path="/change-password" component={Auth} />
        <Route exact path="/calender" component={Guest(Calender)} />
        <Route exact path="/checklists" component={Guest(Checklists)} />
        <Route exact path="/checklist-selected/:id" component={Guest(ChecklistSelected)} />
        <Route exact path="/counter" component={Guest(Counter)} />
        <Route exact path="/dashboard" component={Guest(Dashboard)} />
        <Route exact path="/expenses" component={Guest(Expenses)} />
        <Route exact path="/home" component={Guest(Home)} />
        <Route exact path="/search" component={Guest(Search)} />
        <Route exact path="/leaderboard" component={Guest(Leaderboard)} />
        <Route exact path="/my-events" component={Guest(MyEvents)} />
        <Route exact path="/my-vehicles" component={Guest(MyVehicles)} />
        <Route exact path="/add-vehicle" component={Guest(AddVehicle)} />
        <Route exact path="/pro-shop" component={Guest(ProShop)} />
        <Route exact path="/crew" component={Guest(Crew)} />
        <Route exact path="/create-crew" component={Guest(CreateCrew)} />
        <Route exact path="/crew-selected/:id" component={Guest(CrewSelected)} />
        <Route exact path="/user-selected/:id" component={Guest(UserSelected)} />
        <Route exact path="/find-crew" component={Guest(FindCrew)} />
        <Route exact path="/settings" component={Guest(Settings)} />
        <Route exact path="/transporter" component={Guest(Transporter)} />
        <Route exact path="/account" component={Guest(Account)} />
        <Route exact path="/profile" component={Guest(Profile)} />
        <Route exact path="/:type/detail/:id" component={Guest(DriverDetail)} />
        <Route exact path="/vehicle-selected/:id" component={Guest(VehicleSelected)} />
        <Route exact path="/event-session/:id" component={Guest(EventSession)} />
        <Route exact path="/event-session-lap/:id" component={Guest(EventSessionLap)} />
        <Route
          exact
          path="/upgrade-account"
          component={Guest(UpgradeAccount)}
        />
        <Route exact path="/weather" component={Guest(Weather)} />
      </Switch>
    </Router>
  );
}