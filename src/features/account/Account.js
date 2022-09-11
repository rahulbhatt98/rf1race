import { useState, useEffect } from "react";
// import { makeStyles } from "@material-ui/core/styles";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import AccountCard from "./AccountCard";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import { useSelector } from "react-redux";
import { fetchCrewList } from "../crew/crewSlice"
import { fetchEventList, fetchVehicleList } from "../my-events/myEventsSlice"
import ProfileHeader from '../account/ProfileHeader'

// const useStyles = makeStyles((theme) => ({
//   root: {
//     display: "flex",
//   },
// }));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component={'div'}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function Account() {
  // const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const eventTrack = useSelector(fetchEventList);
  const crew = useSelector(fetchCrewList);
  const vehicleList = useSelector(fetchVehicleList);

  useEffect(() => {
    if(window.location.hash === '#/account#vehicle'){
      setValue(0)
    }
    if(window.location.hash === '#/account#event'){
      setValue(1)
    }
    if(window.location.hash === '#/account#achievement'){
      setValue(2)
    }
    if(window.location.hash === '#/account#crew'){
      setValue(3)
    }
  }, [])

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <ProfileHeader/>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            className="search-tab"
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            centered
          >
            <Tab label="VEHICLES" {...a11yProps(0)}/>
            <Tab label="EVENTS" {...a11yProps(1)}/>
            <Tab label="ACHIEVEMENTS" {...a11yProps(2)}/>
            <Tab label="CREWS" {...a11yProps(3)}/>
          </Tabs>
        </Box>

        <TabPanel className="tab-card-outer" value={value} index={0}>
          <Grid container spacing={4}>
            <AccountCard message={"Vehicles"} indexValue={0} data={vehicleList}/>
          </Grid>
        </TabPanel>

        <TabPanel className="tab-card-outer" value={value} index={1}>
          <Grid container>
            <AccountCard message={"Events"} indexValue={1} data={eventTrack}/>
          </Grid>
        </TabPanel>

        <TabPanel className="tab-card-outer" value={value} index={2}>
          <Grid container>
            <AccountCard message={"Achievements"} indexValue={2} data={[]}/>
          </Grid>
        </TabPanel>

        <TabPanel className="tab-card-outer" value={value} index={3}>
          <Grid container spacing={4}>
            <AccountCard message={"Crews"} data={crew} indexValue={3} />
          </Grid>
        </TabPanel>
      </Box>
    </>
  )
}