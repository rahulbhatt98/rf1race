import { useState } from "react";
// import { makeStyles } from "@material-ui/core/styles";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import EventCard from "./EventCard";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import { MdFilterList } from 'react-icons/md';
import { useSelector } from "react-redux";
import { selectAuth } from "../auth/authSlice";
import { fetchEventList, fetchVehicleList } from "./myEventsSlice"
import { Link } from "react-router-dom";

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
        <Box sx={{ p: 2 }}>
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

export default function MyEvents() {

  const [value, setValue] = useState(0);

  // const eventTrack1= JSON.parse(localStorage.getItem('eventById'))

  const handleChange = (event, newValue) => {
    setValue(newValue);
    console.log(newValue)
  };

  const auth = useSelector(selectAuth);
  const eventTrack = useSelector(fetchEventList);
  const vehicleList = useSelector(fetchVehicleList);

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Link to="/my-events" className="track-event-tab">EVENTS</Link><br /><br />
          <MdFilterList /><span style={{ color: 'white' }}> FILTER BY...</span>
          <Tabs
            className="search-tab1"
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="TRACKS" {...a11yProps(0)} className="track-category"/>
            <Tab label="VEHICLES" {...a11yProps(1)} className="track-category"/>
          </Tabs>
        </Box>
        <div className="search-event">
          <input type="text" placeholder="SEARCH" ></input>
        </div>
        {
          (auth) ?
            <>
              <TabPanel className="tab-card-outer" value={value} index={0}>
                <Grid container>
                  <EventCard message={"TRACKS"} data={eventTrack} indexValue={0} />
                </Grid>
              </TabPanel>

              <TabPanel className="tab-card-outer" value={value} index={1}>
                <Grid container spacing={4}>
                  <EventCard message={"VEHICLES"} data={vehicleList} indexValue={1} />
                </Grid>
              </TabPanel>
            </>
            : null
        }
      </Box>
    </>
  )
}