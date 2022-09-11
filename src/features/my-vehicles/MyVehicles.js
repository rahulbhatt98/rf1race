import { useEffect } from "react";
import Box from "@mui/material/Box";
import { MdFilterList } from 'react-icons/md';
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import VehicleCard from "./VehicleCard";
import { useSelector, useDispatch } from "react-redux";
import { selectAuth } from "../auth/authSlice";
import { vehicleAsync, fetchVehicleList } from "../my-events/myEventsSlice"
import { Link } from "react-router-dom";

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
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

export default function MyVehicles() {

  const dispatch = useDispatch();
  const auth = useSelector(selectAuth);
  const vehicleList = useSelector(fetchVehicleList);
  const authId = auth?.data?.user_id

  useEffect(() => {
    dispatch(vehicleAsync(authId))
  }, [dispatch, authId])

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Link to="my-vehicles" className="track-event-tab">VEHICLES</Link><br /><br />
          <MdFilterList /><span style={{ color: 'white' }}> FILTER BY...</span>
        </Box>
        <div className="search-event">
          <input type="text" placeholder="Search Here" />
        </div>
        <TabPanel className="tab-card-outer">
          <Grid container spacing={4}>
            <VehicleCard message={"Vehicles"} data={vehicleList} />
          </Grid>
        </TabPanel>
      </Box>
    </>
  )
}