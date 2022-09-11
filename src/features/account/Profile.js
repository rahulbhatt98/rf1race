import React from 'react'
import ProfileHeader from './ProfileHeader'
import { Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import { FaFlagCheckered } from 'react-icons/fa';
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { fetchCrewList } from "../crew/crewSlice"
import { fetchEventList, fetchVehicleList } from "../my-events/myEventsSlice"
import * as moment from 'moment'

const Profile = () => {
    let iconStyles = { color: "white", fontSize: "2.5em" };

    const crew = useSelector(fetchCrewList)
    const vehicleList = useSelector(fetchVehicleList)
    const eventList = useSelector(fetchEventList)

    const dateFormat = eventList?.data.slice().sort(function (a, b) {
        if (a?.created_at > b?.created_at) return -1;
        if (a?.created_at < b?.created_at) return 1;
        return 0;
    });

    var toHHMMSS = (secs) => {
        var sec_num = parseInt(secs, 10)
        var hours = Math.floor(sec_num / 3600)
        var minutes = Math.floor(sec_num / 60) % 60
        var seconds = sec_num % 60

        return [hours, minutes, seconds]
            .map(v => v < 10 ? "0" + v : v)
            .filter((v, i) => v !== "00" || i > 0)
            .join(":")
    }

    return (
        <>
            <ProfileHeader />
            <Grid container spacing={4} className='profile-tab'>
                <Grid item xs={12} sm={6} md={3} lg={3}>
                    <div className='pl-2 main-flex'>
                        <Typography
                            variant="h6"
                            align="left"
                            color="#fff"
                            className="profile-text ml-0 profile-vehicle"
                        >
                            MOST USED VEHICLE
                        </Typography>

                        <div style={{ color: "#D3D3D3" }}>
                            <Typography className="lavel-text">{vehicleList?.data[0]?.vehicle_make} {vehicleList?.data[0]?.vehicle_model}</Typography>
                            <Typography className="lavel-text"> "Vehicle Nickname"</Typography>
                        </div>

                        <Link className='td-none' to={`/account#vehicle`}> <input type="button" value="SEE ALL" className="button-profile-tab-show" style={{ backgroundColor: "#7F0CE5" }} /></Link>
                    </div>
                </Grid>

                <Grid item xs={12} sm={6} md={3} lg={3}>
                    <div className='pl-2 main-flex'>
                        <Typography
                            variant="h6"
                            align="left"
                            color="#fff"
                            className="profile-text ml-0 profile-event"
                        >
                            RECENT EVENT
                        </Typography>
                        <Typography color="#D3D3D3" className="sm-text">
                            {dateFormat ? moment(dateFormat[0]?.created_at).format(' MMMM DD, YYYY ') : null}
                        </Typography>
                        <Typography color="white" className="lavel-text">
                            {dateFormat ? dateFormat[0]?.track_name : null}
                        </Typography>
                        <Typography color="#D3D3D3" className="sm-text">
                            CIRCUIT VARIANT
                        </Typography>
                        <Typography color="#179C52" className="sm-text">
                            {(dateFormat[0]?.lap_time) ? toHHMMSS(dateFormat[0]?.lap_time) : ''}
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
                            className="profile-text ml-0 profile-crews "
                        >
                            CREWS
                        </Typography>
                        <Typography gutterBottom variant="h5" component="div">
                            {
                                crew?.data.map((val, index) => {
                                    return (
                                        <div key={index} style={{ display: 'flex', paddingTop: '10px' }}>
                                            <div style={{ padding: '0px 15px 0px 0px' }}>
                                                <img src={(val?.data?.photo) ? `${val?.data.photo}` : `https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png`} alt="" style={{ width: '30px', height: '30px', borderRadius: '50px' }} />
                                            </div>
                                            <div>
                                                <Typography
                                                    variant="h6"
                                                    align="left"
                                                    color="#fff"
                                                    className="text-18"
                                                >
                                                    {val?.name}
                                                </Typography>
                                                <Typography color="#757575" className="text-10">
                                                    {val?.member_details.length} MEMBER, UNITED STATES
                                                </Typography>
                                            </div>
                                        </div>
                                    )
                                })
                            }
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