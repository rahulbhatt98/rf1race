import React, { useEffect } from 'react'
import ProfileHeader from './ProfileHeader'
import { Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import { FaFlagCheckered } from 'react-icons/fa';
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchCrewList, crewAsync } from "../crew/crewSlice"
import { eventAsync, fetchEventList, vehicleAsync, fetchVehicleList } from "../my-events/myEventsSlice"
import { selectAuth } from "../auth/authSlice";

const Profile = () => {
    let iconStyles = { color: "white", fontSize: "2.5em" };

    const dispatch = useDispatch();
    const auth = useSelector(selectAuth);
    const authId = auth?.data?.user_id;
    const crew = useSelector(fetchCrewList)
    const vehicleList = useSelector(fetchVehicleList)
    const eventList = useSelector(fetchEventList)

    const dateFormat = eventList?.data.slice().sort(function (a, b) {
        if (a.created_at > b.created_at) return -1;
        if (a.created_at < b.created_at) return 1;
        return 0;
    });

    console.log(eventList, authId, crew)

    useEffect(() => {
        dispatch(crewAsync(authId))
        dispatch(eventAsync(authId))
        dispatch(vehicleAsync(authId))
    }, [authId])
    return (
        <>
            <ProfileHeader />
            <Grid container spacing={4}>
                <Grid item xs={12} sm={6} md={3} lg={3}>
                    <div className='pl-2 main-flex'>
                        <Typography
                            variant="h6"
                            align="left"
                            color="#fff"
                            paragraph
                            className="profile-text ml-0 profile-vehicle"
                        >
                            MOST USED VEHICLE
                        </Typography>
                        {
                            vehicleList?.data.map((val) => {
                                return (
                                    <>
                                        <Typography color="#D3D3D3">
                                            <p className="lavel-text"> Year Make Model</p>
                                            <p className="lavel-text"> "Vehicle Nickname"</p>
                                            <Link className='td-none' to={`/account#vehicle`}> <input type="button" value="SEE ALL" className="button-profile-tab-show" style={{ backgroundColor: "#7F0CE5" }} /></Link>
                                        </Typography>
                                    </>
                                )
                            })
                        }
                    </div>
                </Grid>

                <Grid item xs={12} sm={6} md={3} lg={3}>
                    <div className='pl-2 main-flex'>
                        <Typography
                            variant="h6"
                            align="left"
                            color="#fff"
                            paragraph
                            className="profile-text ml-0 profile-event"
                        >
                            RECENT EVENT
                        </Typography>
                        <Typography color="#D3D3D3" className="sm-text">
                            {new Intl.DateTimeFormat('en-GB', {
                                month: 'long',
                                day: '2-digit',
                                year: 'numeric',
                            }).format(new Date(dateFormat[0].created_at))}
                        </Typography>
                        <Typography color="white" className="lavel-text">
                            {dateFormat[0].track_name}
                        </Typography>
                        <Typography color="#D3D3D3" className="sm-text">
                            CIRCUIT VARIANT
                        </Typography>
                        <Typography color="#179C52" className="sm-text">
                            2.43.146
                        </Typography>
                        <Link className='td-none' to={`/account#event`}><input type="button" value="SEE ALL" className="button-profile-tab-show" style={{ backgroundColor: "#13D9EE" }} /></Link>
                    </div>
                </Grid>

                <Grid item xs={12} sm={6} md={3} lg={3}>
                    <div className='pl-2 main-flex'>
                        <Typography
                            variant="h6"
                            align="left"
                            color="#fff"
                            paragraph
                            className="profile-text ml-0 profile-crews "
                        >
                            CREWS
                        </Typography>
                        <Typography gutterBottom variant="h5" component="div">
                            <div style={{ display: 'flex', paddingTop: '10px' }}>
                                <div style={{ padding: '8px 15px 0px 0px' }}>
                                    <img src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png" alt="" style={{ width: '30px', height: '30px', borderRadius: '50px' }} />
                                </div>
                                <div>
                                    {
                                        crew?.data.map((val) => {
                                            return (
                                                <>
                                                    <Typography
                                                        variant="h6"
                                                        align="left"
                                                        color="#fff"
                                                        class="text-18"
                                                    >
                                                        {val.name}
                                                    </Typography>
                                                    <Typography color="#757575" class="text-10">
                                                        {val.member_details.length} MEMBER, UNITED STATES
                                                    </Typography>
                                                </>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </Typography>
                        <br />
                        <Link className='td-none' to={`/account#crew`}> <input type="button" value="SEE ALL" className="button-profile-tab-show" style={{ backgroundColor: "#7F0CE5" }} /></Link>
                    </div>
                </Grid>

                <Grid item xs={12} sm={6} md={3} lg={3}>
                    <div className='pl-2 main-flex'>
                        <Typography
                            variant="h6"
                            align="left"
                            color="#fff"
                            paragraph
                            className="profile-text ml-0 profile-achievements"
                        >
                            ACHIEVEMENTS
                        </Typography>
                        <Typography className='svg-icon'>
                            <FaFlagCheckered style={iconStyles} /><FaFlagCheckered style={iconStyles} />
                        </Typography><br /><br />
                        <Link className='td-none' to={`/account#achievement`}> <input type="button" value="SEE ALL" className="button-profile-tab-show" style={{ backgroundColor: "#18DB6B" }} /></Link>
                    </div>
                </Grid>
            </Grid>
        </>
    )
}

export default Profile
