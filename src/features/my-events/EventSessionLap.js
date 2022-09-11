import React from 'react'
import ProfileHeader from '../account/ProfileHeader'
import { useParams } from 'react-router-dom'
import { useSelector } from "react-redux";
import { fetchEventSessionLap } from "../my-events/myEventsSlice"
import { TiWeatherPartlySunny } from 'react-icons/ti';
import { BsCameraVideoFill } from 'react-icons/bs';
import { RiSave3Line } from 'react-icons/ri';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from "@mui/material/Typography";

const EventSessionLap = () => {
    const { id } = useParams()
    const eventSessionLap = useSelector(fetchEventSessionLap)

    const filteredLapArray = eventSessionLap?.data.filter((val) => {
        return Number(val.id) === Number(id)
    })
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
            {
                filteredLapArray.map((val) => {
                    return (
                        <>
                            <div className="previous-session-lap">
                                <ul className='previous-session-list'>
                                    <li>
                                        {new Intl.DateTimeFormat('en-GB', {
                                            month: 'long',
                                            day: '2-digit',
                                            year: 'numeric',
                                        }).format(new Date(val?.created_at))}
                                    </li>
                                    <li>
                                        {val?.sessions[0]?.session_name}
                                    </li>
                                    <li>
                                        {(val?.location) ? val?.location : 'location'}
                                    </li>
                                </ul>
                            </div>

                            <div className='weather-details'>
                                {val.track_time}| {eventSessionLap?.data.length} Lap| TRACK VARIANT| 95<span>&#176;</span>| <TiWeatherPartlySunny /> | <BsCameraVideoFill /> | <RiSave3Line />
                            </div>

                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 650 }} aria-label="simple table" style={{ backgroundColor: '#14121c', borderBottom: '2px solid gray', borderTop: '2px solid gray' }}>

                                    <TableBody>
                                        <TableRow
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell style={{ color: 'white' }}>Lap {val?.id}</TableCell>
                                            <TableCell style={{ color: 'white' }}>{toHHMMSS(val?.lap_time)}</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <div className="hot-pit-data">
                                <Typography variant="h5" >
                                    Hot Pit Data
                                </Typography>
                                <div className="v-detail-main">
                                    <div className="d-box-left">
                                        {val?.sessions.map((data, index) => {
                                            return (
                                                <>
                                                    <div className="v-detail-box">
                                                        <ul>
                                                            <li>
                                                                <span className="d-left">TYRE PRESSURE TARGET</span>
                                                                <span className="d-right">{(data?.hot_pits?.front_left_hot_pressure) ? `${Number(data?.hot_pits?.front_left_hot_pressure) + Number(data?.hot_pits?.front_right_hot_pressure)} / ${Number(data?.hot_pits?.rear_left_hot_pressure) + Number(data?.hot_pits?.rear_right_hot_pressure)}` : '-'}</span>
                                                            </li>
                                                            <li>
                                                                <span className="d-left">LAST HOT TYRE PRESSURE </span>
                                                                <span className="d-right"><>
                                                                    {(data?.hot_pits?.front_left_hot_pressure) ? `${Number(data?.hot_pits?.front_left_hot_pressure)} / ${Number(data?.hot_pits?.front_right_hot_pressure)}` : '-'}<br />
                                                                    {(data?.hot_pits?.rear_left_hot_pressure) ? `${Number(data?.hot_pits?.rear_left_hot_pressure)} / ${Number(data?.hot_pits?.rear_right_hot_pressure)}` : '-'}
                                                                </>
                                                                </span>
                                                            </li>
                                                            <li>
                                                                <span className="d-left">HOT TYRE TEMPERATURE </span>
                                                                <span className="d-right">
                                                                    {(data?.hot_pits?.front_left_inner_tire_temperature || data?.hot_pits?.front_left_middle_tire_temperature || data?.hot_pits?.front_left_outside_tire_temperature || data?.hot_pits?.front_right_inner_tire_temperature || data?.hot_pits?.front_right_middle_tire_temperature || data?.hot_pits?.front_right_outside_tire_temperature) ?
                                                                        `${Number(data?.hot_pits?.front_left_inner_tire_temperature)} / ${Number(data?.hot_pits?.front_left_middle_tire_temperature)} / ${Number(data?.hot_pits?.front_left_outside_tire_temperature)} / ${Number(data?.hot_pits?.front_right_inner_tire_temperature)} / ${Number(data?.hot_pits?.front_right_middle_tire_temperature)} / ${Number(data?.hot_pits?.front_right_outside_tire_temperature)}` : '-'}<br />
                                                                    {(data?.hot_pits?.rear_left_inner_tire_temperature || data?.hot_pits?.rear_left_middle_tire_temperature || data?.hot_pits?.rear_left_outside_tire_temperature || data?.hot_pits?.rear_right_inner_tire_temperature || data?.hot_pits?.rear_right_middle_tire_temperature || data?.hot_pits?.rear_right_outside_tire_temperature) ?
                                                                        `${Number(data?.hot_pits?.rear_left_inner_tire_temperature)} / ${Number(data?.hot_pits?.rear_left_middle_tire_temperature)} / ${Number(data?.hot_pits?.rear_left_outside_tire_temperature)} / ${Number(data?.hot_pits?.rear_right_inner_tire_temperature)} / ${Number(data?.hot_pits?.rear_right_middle_tire_temperature)} / ${Number(data?.hot_pits?.rear_right_outside_tire_temperature)}` : '-'}
                                                                </span>
                                                            </li>
                                                            <li>
                                                                <span className="d-left">TIME ON ENGINE HH:MM  </span>
                                                                <span className="d-right">{(data?.hot_pits?.engine_time) ? data?.hot_pits?.engine_time : '-'}</span>
                                                            </li>
                                                            <li>
                                                                <span className="d-left">CAMBER </span>
                                                                <span className="d-right">{(data?.hot_pits?.camber) ? data?.hot_pits?.camber : '-'}</span>
                                                            </li>
                                                            <li>
                                                                <span className="d-left">CASTER  </span>
                                                                <span className="d-right">{(data?.hot_pits?.caster) ? data?.hot_pits?.caster : '-'}</span>
                                                            </li>
                                                            <li>
                                                                <span className="d-left">TOE </span>
                                                                <span className="d-right">{(data?.hot_pits?.toe) ? data?.hot_pits?.toe : '-'}</span>
                                                            </li>
                                                            <li>
                                                                <span className="d-left">RIDE HEIGHT  </span>
                                                                <span className="d-right">{(data?.hot_pits?.ride_height) ? data?.hot_pits?.ride_height : '-'}</span>
                                                            </li>
                                                            <li>
                                                                <span className="d-left">FRONT SPRING RATE </span>
                                                                <span className="d-right">{(data?.hot_pits?.front_springs_rate) ? data?.hot_pits?.front_springs_rate : '-'}</span>
                                                            </li>
                                                            <li>
                                                                <span className="d-left">DAMPING  </span>
                                                                <span className="d-right">
                                                                    {(data?.hot_pits?.damping_fl) ? `${Number(data?.hot_pits?.damping_fl)} / ${Number(data?.hot_pits?.damping_fr)}` : '-'}<br />
                                                                    {(data?.hot_pits?.damping_rl) ? `${Number(data?.hot_pits?.damping_rl)} / ${Number(data?.hot_pits?.damping_rr)}` : '-'}
                                                                </span>
                                                            </li>
                                                            <li>
                                                                <span className="d-left">BUMP </span>
                                                                <span className="d-right">
                                                                    {(data?.hot_pits?.bump_fl) ? `${Number(data?.hot_pits?.bump_fl)} / ${Number(data?.hot_pits?.bump_fr)}` : '-'}<br />
                                                                    {(data?.hot_pits?.bump_rl) ? `${Number(data?.hot_pits?.bump_rl)} / ${Number(data?.hot_pits?.bump_rr)}` : '-'}
                                                                </span>
                                                            </li>
                                                            <li>
                                                                <span className="d-left">REBOUND </span>
                                                                <span className="d-right">
                                                                    {(data?.hot_pits?.rebound_fl) ? `${Number(data?.hot_pits?.rebound_fl)} / ${Number(data?.hot_pits?.rebound_fr)}` : '-'}<br />
                                                                    {(data?.hot_pits?.rebound_rl) ? `${Number(data?.hot_pits?.rebound_rl)} / ${Number(data?.hot_pits?.rebound_rr)}` : '-'}
                                                                </span>
                                                            </li>
                                                            <li>
                                                                <span className="d-left">FRONT SWAY BAR ADJUSTMENT </span>
                                                                <span className="d-right">
                                                                    {(data?.hot_pits?.front_sway_bar_adjustment) ? data?.hot_pits?.front_sway_bar_adjustment : '-'}
                                                                </span>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                        </>
                    )
                })
            }
        </>
    )
}

export default EventSessionLap