import * as React from "react";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
// import FreeSoloCreateOption from "../common/SearchInput";
// import SearchBar from "./searchBar";
import ListingCard from "../common/ListingCard";
// import { getCardData } from "../../utils/common";
import { useSelector } from "react-redux";
import { selectSearchUser, selectSearchEvent, selectSearchDatabase, selectSearchUserCreated } from "./searchSlice"

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
          <Typography  component={'div'}>{children}</Typography>
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

// const users = [1, 2, 3, 4, 5, 6, 7, 8, 9];
// const tracks = [1, 2, 3, 4, 5, 6, 7];
// const tracksDatabase = [1, 2, 3];
// const tracksUserCreated = [1, 2];
// const events = [1, 2, 3, 4];

export default function Search() {
  const [value, setValue] = React.useState(0);
  const [value1, setValue1] = React.useState(3);
  const [trackVisible, setTrackVisible] = React.useState(false);

  const searchUser = useSelector(selectSearchUser);
  // const searchTrack = useSelector(selectSearchTrack);
  const searchEvent = useSelector(selectSearchEvent);
  const searchDatabase = useSelector(selectSearchDatabase);
  const searchUserCreated = useSelector(selectSearchUserCreated);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChange1 = (event, newValue) => {
    setValue1(newValue);
  };
  // let type = "users";
  // let count = 0;
  // switch (value) {
  //   case 0:
  //     type = "users";
  //     count = users.length;
  //     break;
  //   case 1:
  //     type = "tracks";
  //     count = tracks.length;
  //     break;
  //   case 2:
  //     type = "events";
  //     count = events.length;
  //     break;
  //   case 3:
  //     type = "database";
  //     count = tracksDatabase.length;
  //     break;
  //   case 4:
  //     type = "user-created";
  //     count = tracksUserCreated.length;
  //     break;
  //   default:
  //     break;
  // }
  // const data = getCardData({ type, count });

  const searchUserfn = () => {
    setTrackVisible(false)
  }

  const searchTrackfn = () => {
    setTrackVisible(true)
  }

  const searchEventfn = () => {
    setTrackVisible(false)
  }

  return (
    <Box sx={{ width: "100%" }}>

      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          className="search-tab"
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          centered
        >
          <Tab className="tab-1" label="Users" {...a11yProps(0)} onClick={searchUserfn} />
          <Tab className="tab-2" label="Tracks" {...a11yProps(1)} onClick={searchTrackfn} />
          <Tab className="tab-3" label="Events" {...a11yProps(2)} onClick={searchEventfn} />
        </Tabs>
      </Box>
      {
        (trackVisible) ? <>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              className="search-tab"
              value={value1}
              onChange={handleChange1}
              textColor="secondary"
              indicatorColor="secondary"
              aria-label="secondary tabs example"
              centered
            >
              <Tab value={3} label="Database" {...a11yProps(3)} />
              <Tab value={4} label="User-Created" {...a11yProps(4)} />
            </Tabs>
          </Box>
        </> : null}
      {(!trackVisible) ? <>
        <TabPanel className="tab-card-outer" value={value} index={0}>
          <Box
            sx={{
              pt: 4,
              pb: 3,
            }}
          >
            {searchUser && searchUser?.data?.length >= 0 ?
              <Container maxWidth="sm" className="text-center">
                <Typography className="text-center"
                  sx={{ margin: "auto", textAlign: "center" }}
                >{searchUser.data.length} Drivers Found</Typography>{" "}
              </Container>
              : ""}
          </Box>
          <Grid container spacing={4}>
            <ListingCard  searchData={searchUser} indexValue={0} />
          </Grid>
        </TabPanel>
        {/* <TabPanel className="tab-card-outer" value={value} index={1}>
          <Box
            sx={{
              pt: 4,
              pb: 3,
            }}
          >
            {searchTrack && searchTrack?.data?.length >= 0 ?
              <Container maxWidth="sm">
                <Typography
                  sx={{ margin: "auto", textAlign: "center" }}
                >{searchTrack.data.length} Tracks Found</Typography>{" "}
              </Container>
              : ""}
          </Box>
          <Grid container spacing={4}>
            <ListingCard searchData={searchTrack} indexValue={1} />
          </Grid>
        </TabPanel> */}
        <TabPanel className="tab-card-outer" value={value} index={2}>
          <Box
            sx={{
              pt: 4,
              pb: 3,
            }}
          >
            {searchEvent && searchEvent?.data?.length >= 0 ?
              <Container maxWidth="sm">
                <Typography
                  sx={{ margin: "auto", textAlign: "center" }}
                >{searchEvent.data.length} Events Found</Typography>{" "}
              </Container>
              : ""}
          </Box>
          <Grid container spacing={4}>
            <ListingCard searchData={searchEvent} indexValue={2} />
          </Grid>
        </TabPanel>
      </> :
        <>
          <TabPanel className="tab-card-outer" value={value1} index={3}>
            <Box
              sx={{
                pt: 4,
                pb: 3,
              }}
            >
              {searchDatabase && searchDatabase?.data?.length >= 0 ?
                <Container maxWidth="sm">
                  <Typography
                    sx={{ margin: "auto", textAlign: "center" }}
                  >{searchDatabase.data.length} Tracks Found</Typography>{" "}
                </Container>
                : ""}
            </Box>
            <Grid container spacing={4}>
              <ListingCard searchData={searchDatabase} indexValue={3} />
            </Grid>
          </TabPanel>
          <TabPanel className="tab-card-outer" value={value1} index={4}>
            <Box
              sx={{
                pt: 4,
                pb: 3,
              }}
            >
              {searchUserCreated && searchUserCreated?.data?.length >= 0 ?
                <Container maxWidth="sm">
                  <Typography
                    sx={{ margin: "auto", textAlign: "center" }}
                  >{searchUserCreated.data.length} Tracks Found</Typography>{" "}
                </Container>
                : ""}
            </Box>
            <Grid container spacing={4}>
              <ListingCard searchData={searchUserCreated} indexValue={4} />
            </Grid>
          </TabPanel>
        </>}
    </Box>
  );
}