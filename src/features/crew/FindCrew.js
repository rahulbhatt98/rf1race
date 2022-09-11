import React, { useState, useEffect } from 'react'
import ProfileHeader from '../account/ProfileHeader'
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import CrewCard from './CrewCard'
import { useSelector, useDispatch } from "react-redux";
import { selectAuth } from "../auth/authSlice";
import { fetchSearchCrewList, searchCrewAsync, fetchSearchUserList, searchUserAsync } from "./crewSlice"

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

const FindCrew = () => {
    const [value, setValue] = useState(0);
    const auth = useSelector(selectAuth);
    const crewList = useSelector(fetchSearchCrewList);
    const userList = useSelector(fetchSearchUserList);
    const authId = auth?.data?.user_id;

    const [keyword, setKeyword] = useState('')

    const dispatch = useDispatch();

    const handleSearchValue = (e) => {
        setKeyword(e.target.value)
    }

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        const searchObj = {
            'key': keyword,
            "user_id": authId
        }

        dispatch(searchCrewAsync(searchObj))
        dispatch(searchUserAsync(keyword))
    }, [dispatch, keyword, authId])

    return (
        <>
            <ProfileHeader />
            <div className='crew-head'>
                <h1>
                    FIND A CREW
                </h1>
            </div>
            <Box sx={{ width: "100%" }}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                    <Tabs
                        className="crew-tab1"
                        value={value}
                        onChange={handleChange}
                        aria-label="basic tabs example"
                    >
                        <Tab label="USER NAME" {...a11yProps(0)} />
                        <Tab label="CREW NAME" {...a11yProps(1)} />
                    </Tabs>
                </Box>
            </Box>
            <div className="search-crew">
                <input type="text" placeholder="SEARCH" onChange={handleSearchValue}></input>
            </div>

            <TabPanel className="tab-card-outer" value={value} index={0}>
                <Grid>
                    <CrewCard message={"users"} indexValue={0} data={userList} />
                </Grid>
            </TabPanel>

            <TabPanel className="tab-card-outer" value={value} index={1}>
                <Grid>
                    <CrewCard message={"crews"} indexValue={1} data={crewList} />
                </Grid>
            </TabPanel>
        </>
    )
}

export default FindCrew