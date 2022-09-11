import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import ProfileHeader from '../account/ProfileHeader'
import { useSelector, useDispatch } from "react-redux";
import { vehicleAsync, fetchVehicleList } from "../my-events/myEventsSlice"
import { selectAuth } from "../auth/authSlice";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import { Button } from "@material-ui/core";

const VehicleSelected = () => {
    const { id } = useParams()
    const dispatch = useDispatch();
    const vehicleDetail = useSelector(fetchVehicleList);
    const auth = useSelector(selectAuth);
    const authId = auth?.data?.user_id

    const filteredArray = vehicleDetail?.data.filter((val) => {
        return Number(val.vehicle_id) === Number(id)
    })
    var toHHMMSS = (secs) => {
        var sec_num = parseInt(secs, 10)
        var hours = Math.floor(sec_num / 3600)
        var minutes = Math.floor(sec_num / 60) % 60

        return [hours, minutes]
            .map(v => v < 10 ? "0" + v : v)
            .filter((v, i) => v !== "00" || i > 0)
            .join(":")
    }
    useEffect(() => {
        dispatch(vehicleAsync(authId))
    }, [dispatch, authId])
    return (
        <>
            <ProfileHeader />
            {
                filteredArray.map((value, index) => {
                    return (
                        <>
                            <CardContent>
                                <Typography gutterBottom variant="h5" style={{ fontWeight: 800 }}>
                                    {value.vehicle_make} {value.vehicle_model}
                                </Typography>
                                <Typography gutterBottom variant="h6" >
                                    {(value.vehicle_nickname) ? value.vehicle_nickname : '"Vehicle Nickname"'}
                                </Typography>
                            </CardContent>
                            <CardMedia
                                component="img"
                                height="440"
                                image={(value.vehicle_photo) ? value.vehicle_photo : 'https://media.istockphoto.com/photos/red-generic-sedan-car-isolated-on-white-background-3d-illustration-picture-id1189903200?k=20&m=1189903200&s=612x612&w=0&h=L2bus_XVwK5_yXI08X6RaprdFKF1U9YjpN_pVYPgS0o='}
                                alt="green iguana"
                            />
                            <div>
                                <div className="v-detail-main">
                                    <div className="d-box-left">
                                        <div className="v-detail-box">
                                            <h3>BASIC INFO</h3>
                                            <ul>
                                                <li>
                                                    <span className="d-left">{`${value.basic_info.vehicle_make_year}, ${value.basic_info.vehicle_make}, ${value.basic_info.vehicle_model}`}  </span>
                                                    <span className="d-right"> </span>
                                                </li>
                                                <li>
                                                    <span className="d-left">Power  </span>
                                                    <span className="d-right">{(value.basic_info.vehicle_torque_power) ? value.basic_info.vehicle_torque_power : '-'}  </span>
                                                </li>
                                                <li>
                                                    <span className="d-left">Weight  </span>
                                                    <span className="d-right">{(value.basic_info.vehicle_weight) ? value.basic_info.vehicle_weight : '-'}   </span>
                                                </li>
                                                <li>
                                                    <span className="d-left">Ratio(Calculated)  </span>
                                                    <span className="d-right">{(value.basic_info.vehicle_weight) ? (value.basic_info.vehicle_weight / value.basic_info.vehicle_torque_power).toFixed(2) : '-'}  </span>
                                                </li>
                                                <li>
                                                    <span className="d-left">Tyre Make  </span>
                                                    <span className="d-right">{(value.basic_info.tyre_make_name) ? value.basic_info.tyre_make_name : '-'}  </span>
                                                </li>
                                                <li>
                                                    <span className="d-left">Tire Session Time “HH:MM”  </span>
                                                    <span className="d-right">{(value.basic_info.tire_session_time) ? toHHMMSS(value.basic_info.tire_session_time) : '-'}  </span>
                                                </li>
                                                <li>
                                                    <span className="d-left">Engine  </span>
                                                    <span className="d-right">{(value.basic_info.engine_session_time) ? `Engine Session Time "${toHHMMSS(value.basic_info.engine_session_time)}"` : '-'}  </span>
                                                </li>
                                                <li>
                                                    <span className="d-left">Transmission Name  </span>
                                                    <span className="d-right">{(value.basic_info.vehicle_transmission) ? value.basic_info.vehicle_transmission : '-'}  </span>
                                                </li>
                                                <li>
                                                    <span className="d-left">Racing Class </span>
                                                    <span className="d-right">
                                                        {
                                                            (value.basic_info.group_info) ?
                                                                <>
                                                                    {
                                                                        value.basic_info.group_info.map((val) => {
                                                                            return (
                                                                                <>
                                                                                    {val.group_class}
                                                                                </>
                                                                            )
                                                                        })
                                                                    }
                                                                </> : '-'
                                                        }
                                                    </span>
                                                </li>
                                            </ul>
                                        </div>

                                        <div className="v-detail-box">
                                            <h3>SUSPENSION</h3>
                                            <ul>
                                                <li>
                                                    <span className="d-left">Front Springs Make Model</span>
                                                    <span className="d-right">{(value?.suspension?.front_springs_make && (value?.suspension !== null)) ? `${value.suspension.front_springs_make} ${value.suspension.front_springs_make}` : '-'}  </span>
                                                </li>
                                                <li>
                                                    <span className="d-left">Front Spring Rate </span>
                                                    <span className="d-right">{(value?.suspension?.front_springs_rate && (value?.suspension !== null)) ? value.suspension.front_springs_rate : '-'}  </span>
                                                </li>
                                                <li>
                                                    <span className="d-left">Strut Make Model  </span>
                                                    <span className="d-right">{(value?.suspension?.struct_make && (value?.suspension !== null)) ? `${value.suspension.struct_make} ${value.suspension.struct_model}` : '-'} </span>
                                                </li>
                                                <li>
                                                    <span className="d-left">Coilovers Make Model</span>
                                                    <span className="d-right">{(value?.suspension?.coilovers_make && (value?.suspension !== null)) ? `${value.suspension.coilovers_make} ${value.suspension.coilovers_model}` : '-'}  </span>
                                                </li>
                                                <li>
                                                    <span className="d-left">Spring Rate </span>
                                                    <span className="d-right">{(value?.suspension?.coilover_spring_rate && (value?.suspension !== null)) ? value.suspension.coilover_spring_rate : '-'}  </span>
                                                </li>
                                                <li>
                                                    <span className="d-left">Damping  </span>
                                                    <span className="d-right">{(value?.suspension?.damping_fl && (value?.suspension !== null)) ? <>{
                                                        `${value.suspension.damping_fl} / ${value.suspension.damping_fr}`
                                                    }<br />
                                                        {
                                                            `${value.suspension.damping_rl} / ${value.suspension.damping_rr}`
                                                        }</> : '-'}  </span>
                                                </li>
                                                <li>
                                                    <span className="d-left">Bump  </span>
                                                    <span className="d-right">
                                                        {(value?.suspension?.bump_fl && (value?.suspension !== null)) ? <>{
                                                            ` ${value.suspension.bump_fl} / ${value.suspension.bump_fr}`
                                                        }<br />
                                                            {
                                                                `${value.suspension.bump_rl} / ${value.suspension.bump_rr}`
                                                            }</> : '-'}
                                                    </span>
                                                </li> <li>
                                                    <span className="d-left">Rebound </span>
                                                    <span className="d-right">
                                                        {(value?.suspension?.rebound_fl && (value?.suspension !== null)) ? <>{
                                                            `${value.suspension.rebound_fl} / ${value.suspension.rebound_fr}`
                                                        }<br />
                                                            {
                                                                `${value.suspension.rebound_rl} / ${value.suspension.rebound_rr}`
                                                            }</> : '-'}
                                                    </span>
                                                </li>
                                                <li>
                                                    <span className="d-left">Front Top Hats Make Model  </span>
                                                    <span className="d-right">{(value?.suspension?.front_top_hats_make && (value?.suspension !== null)) ? `${value.suspension.front_top_hats_make} ${value.suspension.front_top_hats_model}` : '-'}</span>
                                                </li>
                                                <li>
                                                    <span className="d-left">Front Upper Control Arms  </span>
                                                    <span className="d-right">{(value?.suspension?.front_upper_control_arms_make && (value?.suspension !== null)) ? `${value.suspension.front_upper_control_arms_make} ${value.suspension.front_upper_control_arms_model}` : '-'}  </span>
                                                </li>
                                                <li>
                                                    <span className="d-left">Front Lower Control Arms  </span>
                                                    <span className="d-right">{(value?.suspension?.front_lower_control_arms_make && (value?.suspension !== null)) ? `${value.suspension.front_lower_control_arms_make} ${value.suspension.front_lower_control_arms_model}` : '-'}  </span>
                                                </li>
                                                <li>
                                                    <span className="d-left">Front Trailing Arm  </span>
                                                    <span className="d-right">{(value?.suspension?.front_trailing_arm_make && (value?.suspension !== null)) ? `${value.suspension.front_trailing_arm_make} ${value.suspension.front_trailing_arm_model}` : '-'}  </span>
                                                </li>
                                                <li>
                                                    <span className="d-left">Front Sway Bar Make Model  </span>
                                                    <span className="d-right">{(value?.suspension?.front_sway_bar_make && (value?.suspension !== null)) ? `${value.suspension.front_sway_bar_make} ${value.suspension.front_sway_bar_model}` : '-'}  </span>
                                                </li>
                                                <li>
                                                    <span className="d-left">Front Sway Bar Diameter (mm) </span>
                                                    <span className="d-right">{(value?.suspension?.front_sway_bar_diameter && (value?.suspension !== null)) ? `${value.suspension.front_sway_bar_diameter}` : '-'}   </span>
                                                </li>
                                                <li>
                                                    <span className="d-left">Front Sway Bar Adjustment  </span>
                                                    <span className="d-right">{(value?.suspension?.front_sway_bar_adjustment && (value?.suspension !== null)) ? `${value.suspension.front_sway_bar_adjustment}` : '-'}  </span>
                                                </li>
                                            </ul>
                                        </div>

                                        <div className="v-detail-box">
                                            <h3>BRAKES</h3>
                                            <ul>
                                                <li>
                                                    <span className="d-left">Brake Fluid make model </span>
                                                    <span className="d-right">{(value?.brakes?.brake_fluid_make && (value?.brakes !== null)) ? `${value.brakes.brake_fluid_make} ${value.brakes.brake_fluid_model}` : '-'}  </span>
                                                </li>
                                                <li>
                                                    <span className="d-left">Front Pads make model  </span>
                                                    <span className="d-right">{(value?.brakes?.front_pads_make && (value?.brakes !== null)) ? `${value.brakes.front_pads_make} ${value.brakes.front_pads_model} ` : '-'}</span>
                                                </li>
                                                <li>
                                                    <span className="d-left">Rear Pads make model  </span>
                                                    <span className="d-right">{(value?.brakes?.rear_pads_make && (value?.brakes !== null)) ? `${value.brakes.rear_pads_make} ${value.brakes.rear_pads_model} ` : '-'}  </span>
                                                </li>
                                                <li>
                                                    <span className="d-left">Front Rotors make model  </span>
                                                    <span className="d-right">{(value?.brakes?.front_rotors_make && (value?.brakes !== null)) ? `${value.brakes.front_rotors_make} ${value.brakes.front_rotors_model} ` : '-'} </span>
                                                </li>
                                                <li>
                                                    <span className="d-left">Rear Rotors make model  </span>
                                                    <span className="d-right">{(value?.brakes?.rear_rotors_make && (value?.brakes !== null)) ? `${value.brakes.rear_rotors_make} ${value.brakes.rear_rotors_model} ` : '-'}</span>
                                                </li>
                                                <li>
                                                    <span className="d-left">Front Calipers make model  </span>
                                                    <span className="d-right">{(value?.brakes?.front_calipers_make && (value?.brakes !== null)) ? `${value.brakes.front_calipers_make} ${value.brakes.front_calipers_model} ` : '-'}  </span>
                                                </li>
                                                <li>
                                                    <span className="d-left">Rear Calipers make model  </span>
                                                    <span className="d-right">{(value?.brakes?.rear_calipers_make && (value?.brakes !== null)) ? `${value.brakes.rear_calipers_make} ${value.brakes.rear_calipers_model} ` : '-'}  </span>
                                                </li>
                                                <li>
                                                    <span className="d-left">Brake Ducts</span>
                                                    <span className="d-right">{(value?.brakes?.brake_duct_per_open && (value?.brakes !== null)) ? `Brake Ducts ${value.brakes.brake_duct_per_open}% open ` : '-'}  </span>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="v-detail-box">
                                            <h3>DRIVETRAIN</h3>
                                            <ul>
                                                <li>
                                                    <span className="d-left">Transmission Make Model </span>
                                                    <span className="d-right">{(value?.drivetrain?.transmission_make && (value?.drivetrain !== null)) ? `${value.drivetrain.transmission_make} ${value.drivetrain.transmission_model} ` : '-'}</span>
                                                </li>
                                                <li>
                                                    <span className="d-left">Transmission Type (auto/5sp man, etc)  </span>
                                                    <span className="d-right">-</span>
                                                </li>
                                                <li>
                                                    <span className="d-left">Final Drive Ratio  </span>
                                                    <span className="d-right">{(value?.drivetrain?.ratio_final_drive && (value?.drivetrain !== null)) ? `${value.drivetrain.ratio_final_drive}` : '-'} </span>
                                                </li>
                                                <li>
                                                    <span className="d-left">Sequential yes/no  </span>
                                                    <span className="d-right">{(value?.drivetrain?.sequential && (value?.drivetrain !== null)) ? `${value.drivetrain.sequential}` : '-'}  </span>
                                                </li>
                                                <li>
                                                    <span className="d-left">Transmission Fluid make model  </span>
                                                    <span className="d-right">{(value?.drivetrain?.transmission_fluid_make && (value?.drivetrain !== null)) ? `${value.drivetrain.transmission_fluid_make} ${value.drivetrain.transmission_fluid_model} ` : '-'} </span>
                                                </li>
                                                <li>
                                                    <span className="d-left">Differential Fluid make mode (if different from trans)  </span>
                                                    <span className="d-right">{(value?.drivetrain?.differntial_fluid_make && (value?.drivetrain !== null)) ? `${value.drivetrain.differntial_fluid_make} ${value.drivetrain.differntial_fluid_model} ` : '-'}  </span>
                                                </li>
                                                <li>
                                                    <span className="d-left">Front Differential make model  </span>
                                                    <span className="d-right">{(value?.drivetrain?.front_differential_make && (value?.drivetrain !== null)) ? `${value.drivetrain.front_differential_make} ${value.drivetrain.front_differential_make} ` : '-'}  </span>
                                                </li>
                                                <li>
                                                    <span className="d-left">Center Differential make model  </span>
                                                    <span className="d-right">{(value?.drivetrain?.center_differential_make && (value?.drivetrain !== null)) ? `${value.drivetrain.center_differential_make} ${value.drivetrain.center_differential_make} ` : '-'}   </span>
                                                </li>
                                                <li>
                                                    <span className="d-left">Rear Differential make model </span>
                                                    <span className="d-right">{(value?.drivetrain?.rear_differential_make && (value?.drivetrain !== null)) ? `${value.drivetrain.rear_differential_make} ${value.drivetrain.rear_differential_make} ` : '-'}    </span>
                                                </li>
                                                <li>
                                                    <span className="d-left">Driveshaft make model </span>
                                                    <span className="d-right">{(value?.drivetrain?.differntial_fluid_make && (value?.drivetrain !== null)) ? `${value.drivetrain.differntial_fluid_make} ${value.drivetrain.differntial_fluid_model} ` : '-'}    </span>
                                                </li>
                                                <li>
                                                    <span className="d-left">Front Axles make model  </span>
                                                    <span className="d-right">{(value?.drivetrain?.driveshaft_make && (value?.drivetrain !== null)) ? `${value.drivetrain.driveshaft_make} ${value.drivetrain.driveshaft_model} ` : '-'}    </span>
                                                </li>
                                                <li>
                                                    <span className="d-left">Rear Axles make model </span>
                                                    <span className="d-right">{(value?.drivetrain?.rear_axles_make && (value?.drivetrain !== null)) ? `${value.drivetrain.rear_axles_make} ${value.drivetrain.rear_axles_make} ` : '-'}    </span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="d-box-right">
                                        <div className="v-detail-box">
                                            <h3>SETUP INFO</h3>
                                            <ul>
                                                <li>
                                                    <span className="d-left">Tyre Pressure Target </span>
                                                    <span className="d-right">{(value?.basic_setup_info?.tire_pressure_front_left && (value?.basic_setup_info !== null)) ? `${Number((value.basic_setup_info.tire_pressure_front_left) + (value.basic_setup_info.tire_pressure_front_right)) / Number((value.basic_setup_info.tire_pressure_rear_left) + (value.basic_setup_info.tire_pressure_rear_right))}` : '-'}  </span>
                                                </li>
                                                <li>
                                                    <span className="d-left">Last Hot Tyre Pressures  </span>
                                                    <span className="d-right">{(value?.basic_setup_info?.tire_pressure_front_left && (value?.basic_setup_info !== null)) ? <>{
                                                        `${value?.basic_setup_info?.tire_pressure_front_left} / ${value?.basic_setup_info?.tire_pressure_front_right}`
                                                    }<br />
                                                        {
                                                            `${value?.basic_setup_info?.tire_pressure_rear_left} / ${value?.basic_setup_info?.tire_pressure_rear_right}`
                                                        }</> : '-'}</span>
                                                </li>
                                                <li>
                                                    <span className="d-left">Camber </span>
                                                    <span className="d-right">{(value?.basic_setup_info?.tire_camber_front_left && (value?.basic_setup_info !== null)) ? <>{
                                                        `${value?.basic_setup_info?.tire_camber_front_left} / ${value?.basic_setup_info?.tire_camber_front_right}`
                                                    }<br />
                                                        {
                                                            `${value?.basic_setup_info?.tire_camber_rear_left} / ${value?.basic_setup_info?.tire_camber_rear_right}`
                                                        }</> : '-'}  </span>
                                                </li>
                                                <li>
                                                    <span className="d-left">Caster  </span>
                                                    <span className="d-right">{(value?.basic_setup_info?.tire_caster_front_left && (value?.basic_setup_info !== null)) ? `${value?.basic_setup_info?.tire_caster_front_left} / ${value?.basic_setup_info?.tire_caster_front_left}` : '-'}</span>
                                                </li>
                                                <li>
                                                    <span className="d-left">Toe </span>
                                                    <span className="d-right">{(value?.basic_setup_info?.tire_toe_front_left && (value?.basic_setup_info !== null)) ? `${value?.basic_setup_info?.tire_toe_front_left} / ${value?.basic_setup_info?.tire_toe_front_right}` : '-'} </span>
                                                </li>
                                                <li>
                                                    <span className="d-left">Ride Height  </span>
                                                    <span className="d-right">{(value?.basic_setup_info?.front && (value?.basic_setup_info !== null)) ? `${value?.basic_setup_info?.front} / ${value?.basic_setup_info?.rear}` : '-'}  </span>
                                                </li>
                                            </ul>
                                        </div>

                                        <div className="v-detail-box">
                                            <h3>ENGINE</h3>
                                            <ul>
                                                <li>
                                                    <span className="d-left">“Time on Motor” </span>
                                                    <span className="d-right">{(value?.engine?.motor_build_time_on_motor && (value?.engine !== null)) ? value?.engine?.motor_build_time_on_motor : '-'}</span>
                                                </li>
                                                <li>
                                                    <span className="d-left">“Fuel”<br />
                                                        Max Fuel Capacity  </span>
                                                    <span className="d-right">{(value?.engine?.fuel_type && (value?.engine !== null)) ? <>
                                                        {value?.engine?.fuel_type}<br />
                                                        {
                                                            value?.engine?.max_fuel_capacity_gallon ? `${value?.engine?.max_fuel_capacity_gallon}gallon` : '-'
                                                        }
                                                    </> : '-'}</span>
                                                </li>
                                                <li>
                                                    <span className="d-left">Engine Oil Make Model </span>
                                                    <span className="d-right">{(value?.engine?.engin_oil_model && (value?.engine !== null)) ? `${value?.engine?.engine_oil_make} ${value?.engine?.engin_oil_model}` : '-'} </span>
                                                </li>
                                                <li>
                                                    <span className="d-left">Aspiration Type  </span>
                                                    <span className="d-right">{(value?.engine?.aspiration && (value?.engine !== null)) ? value?.engine?.aspiration : '-'}  </span>
                                                </li>
                                                <li>
                                                    <span className="d-left">Exhaust - Up-pipe make model </span>
                                                    <span className="d-right">{(value?.engine?.exhaust_up_pipe_make && (value?.engine !== null)) ? `${value?.engine?.exhaust_up_pipe_make} ${value?.engine?.exhaust_up_pipe_model}` : '-'}  </span>
                                                </li>
                                                <li>
                                                    <span className="d-left">Exhaust - Downpipe make model  </span>
                                                    <span className="d-right">{(value?.engine?.exhaust_downpipe_make && (value?.engine !== null)) ? `${value?.engine?.exhaust_downpipe_make} ${value?.engine?.exhaust_downpipe_model}` : '-'} </span>
                                                </li>
                                                <li>
                                                    <span className="d-left">Exhaust - Midpipe
                                                        make model </span>
                                                    <span className="d-right">{(value?.engine?.exhaust_midpipe_make && (value?.engine !== null)) ? `${value?.engine?.exhaust_midpipe_make} ${value?.engine?.exhaust_midpipe_model}` : '-'}</span>
                                                </li>
                                                <li>
                                                    <span className="d-left">Exhaust - Axle-back
                                                        make model </span>
                                                    <span className="d-right">{(value?.engine?.exhaust_axle_back_make && (value?.engine !== null)) ? `${value?.engine?.exhaust_axle_back_make} ${value?.engine?.exhaust_axle_back_model}` : '-'}</span>
                                                </li>
                                                <li>
                                                    <span className="d-left">Air Intake
                                                        make model </span>
                                                    <span className="d-right">{(value?.engine?.air_intake_make && (value?.engine !== null)) ? `${value?.engine?.air_intake_make} ${value?.engine?.air_intake_model}` : '-'} </span>
                                                </li>
                                                <li>
                                                    <span className="d-left">Intake Manifold make model  </span>
                                                    <span className="d-right">{(value?.engine?.intake_manifold_make && (value?.engine !== null)) ? `${value?.engine?.intake_manifold_make} ${value?.engine?.intake_manifold_model}` : '-'} </span>
                                                </li>
                                                <li>
                                                    <span className="d-left">Spark Plug make model </span>
                                                    <span className="d-right">{(value?.engine?.spark_plugs_make && (value?.engine !== null)) ? `${value?.engine?.spark_plugs_make} ${value?.engine?.spark_plugs_model}` : '-'}  </span>
                                                </li>
                                                <li>
                                                    <span className="d-left">Pistons
                                                        make model </span>
                                                    <span className="d-right">{(value?.engine?.pistons_make && (value?.engine !== null)) ? `${value?.engine?.pistons_make} ${value?.engine?.pistons_model}` : '-'}  </span>
                                                </li>
                                                <li>
                                                    <span className="d-left">Rods
                                                        make model </span>
                                                    <span className="d-right">{(value?.engine?.rods_make && (value?.engine !== null)) ? `${value?.engine?.rods_make} ${value?.engine?.rods_model}` : '-'}</span>
                                                </li>
                                                <li>
                                                    <span className="d-left">Bearings
                                                        make model  </span>
                                                    <span className="d-right">{(value?.engine?.bearings_make && (value?.engine !== null)) ? `${value?.engine?.bearings_make} ${value?.engine?.bearings_model}` : '-'}</span>
                                                </li>
                                                <li>
                                                    <span className="d-left">Crankshaft
                                                        make model </span>
                                                    <span className="d-right">{(value?.engine?.crankshaft_make && (value?.engine !== null)) ? `${value?.engine?.crankshaft_make} ${value?.engine?.crankshaft_model}` : '-'} </span>
                                                </li>
                                                <li>
                                                    <span className="d-left">Intake Camshaft
                                                        make model  </span>
                                                    <span className="d-right">{(value?.engine?.intake_camshaft_make && (value?.engine !== null)) ? `${value?.engine?.intake_camshaft_make} ${value?.engine?.intake_camshaft_model}` : '-'} </span>
                                                </li>
                                                <li>
                                                    <span className="d-left">
                                                        Exhaust Camshaft
                                                        make model </span>
                                                    <span className="d-right">{(value?.engine?.exhaust_camshaft_make && (value?.engine !== null)) ? `${value?.engine?.exhaust_camshaft_make} ${value?.engine?.exhaust_camshaft_model}` : '-'} </span>
                                                </li>
                                                <li>
                                                    <span className="d-left">Intake Valves
                                                        make model </span>
                                                    <span className="d-right">{(value?.engine?.intake_valves_make && (value?.engine !== null)) ? `${value?.engine?.intake_valves_make} ${value?.engine?.intake_valves_model}` : '-'} </span>
                                                </li>
                                                <li>
                                                    <span className="d-left">Exhaust Valves
                                                        make model </span>
                                                    <span className="d-right">{(value?.engine?.exhaust_valves_make && (value?.engine !== null)) ? `${value?.engine?.exhaust_valves_make} ${value?.engine?.exhaust_valves_model}` : '-'}</span>
                                                </li>
                                                <li>
                                                    <span className="d-left">Fuel Injectors
                                                        make model  </span>
                                                    <span className="d-right">{(value?.engine?.fuel_injectors_make && (value?.engine !== null)) ? `${value?.engine?.fuel_injectors_make} ${value?.engine?.fuel_injectors_model}` : '-'}</span>
                                                </li>
                                                <li>
                                                    <span className="d-left">Fuel Rails
                                                        make model </span>
                                                    <span className="d-right">{(value?.engine?.fuel_rails_make && (value?.engine !== null)) ? `${value?.engine?.fuel_rails_make} ${value?.engine?.fuel_rails_model}` : '-'} </span>
                                                </li>
                                                <li>
                                                    <span className="d-left">Fuel Pump
                                                        make model </span>
                                                    <span className="d-right">{(value?.engine?.fuel_pump_make && (value?.engine !== null)) ? `${value?.engine?.fuel_pump_make} ${value?.engine?.fuel_pump_model}` : '-'} </span>
                                                </li>
                                                <li>
                                                    <span className="d-left">Carburetor
                                                        make model </span>
                                                    <span className="d-right">{(value?.engine?.carburetor_make && (value?.engine !== null)) ? `${value?.engine?.carburetor_make} ${value?.engine?.carburetor_model}` : '-'} </span>
                                                </li>
                                                <li>
                                                    <span className="d-left">Jets
                                                        Air Main  </span>
                                                    <span className="d-right">{(value?.engine?.jets_air && (value?.engine !== null)) ? `${value?.engine?.jets_air} ${value?.engine?.jets_main}` : '-'} </span>
                                                </li>
                                                <li>
                                                    <span className="d-left">Red Line
                                                    </span>
                                                    <span className="d-right">{(value?.engine?.red_line_rpm && (value?.engine !== null)) ? `${value?.engine?.red_line_rpm}` : '-'} </span>
                                                </li>
                                                <li>
                                                    <span className="d-left">Oil Cooler make model </span>
                                                    <span className="d-right">{(value?.engine?.oil_cooler_make && (value?.engine !== null)) ? `${value?.engine?.oil_cooler_make} ${value?.engine?.oil_cooler_model}` : '-'} </span>
                                                </li>
                                                <li>
                                                    <span className="d-left">Transmission Cooler make model</span>
                                                    <span className="d-right">{(value?.engine?.transmission_cooler_make && (value?.engine !== null)) ? `${value?.engine?.transmission_cooler_make} ${value?.engine?.transmission_cooler_model}` : '-'}  </span>
                                                </li>
                                                <li>
                                                    <span className="d-left">Ground</span>
                                                    <span className="d-right">{(value?.engine?.ground && (value?.engine !== null)) ? `${value?.engine?.ground}` : '-'} </span>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="v-detail-box">
                                            <h3>AERODYNAMIC</h3>
                                            <ul>
                                                <li>
                                                    <span className="d-left">Front Splitter
                                                        make model </span>
                                                    <span className="d-right">{(value?.aero?.front_splitter_make && (value?.aero !== null)) ? `${value?.aero?.front_splitter_make} ${value?.aero?.front_splitter_model}` : '-'}</span>
                                                </li>
                                                <li>
                                                    <span className="d-left">Rear Wing
                                                        make model  </span>
                                                    <span className="d-right">{(value?.aero?.rear_wing_make && (value?.aero !== null)) ? `${value?.aero?.rear_wing_make} ${value?.aero?.rear_wing_model}` : '-'}</span>
                                                </li>
                                                <li>
                                                    <span className="d-left">Front Fenders
                                                        make model </span>
                                                    <span className="d-right">{(value?.aero?.front_fenders_make && (value?.aero !== null)) ? `${value?.aero?.front_fenders_make} ${value?.aero?.front_fenders_model}` : '-'}  </span>
                                                </li>
                                                <li>
                                                    <span className="d-left">Rear Fenders
                                                        make model  </span>
                                                    <span className="d-right">{(value?.aero?.rear_fenders_make && (value?.aero !== null)) ? `${value?.aero?.rear_fenders_make} ${value?.aero?.rear_fenders_model}` : '-'} </span>
                                                </li>
                                                <li>
                                                    <span className="d-left">Rear Diffuser
                                                        make model </span>
                                                    <span className="d-right">{(value?.aero?.rear_diffuser_make && (value?.aero !== null)) ? `${value?.aero?.rear_diffuser_make} ${value?.aero?.rear_diffuser_model}` : '-'}  </span>
                                                </li>
                                                <li>
                                                    <span className="d-left">Flat Floor
                                                        make model  </span>
                                                    <span className="d-right">{(value?.aero?.flat_floor_make && (value?.aero !== null)) ? `${value?.aero?.flat_floor_make} ${value?.aero?.flat_floor_model}` : '-'}  </span>
                                                </li>
                                                <li>
                                                    <span className="d-left">Canards make model  </span>
                                                    <span className="d-right">{(value?.aero?.canards_make && (value?.aero !== null)) ? `${value?.aero?.canards_make} ${value?.aero?.canards_make}` : '-'}</span>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="v-detail-box">
                                            <h3>SAFETY</h3>
                                            <ul>
                                                <li>
                                                    <span className="d-left">Roll Cage
                                                        make model </span>
                                                    <span className="d-right">{(value?.safety?.roll_cage_make && (value?.safety !== null)) ? `${value?.safety?.roll_cage_make} ${value?.safety?.roll_cage_model}` : '-'}</span>
                                                </li>
                                                <li>
                                                    <span className="d-left">Fire Extinguisher
                                                        make model  </span>
                                                    <span className="d-right">{(value?.safety?.fire_extinguisher_make && (value?.safety !== null)) ? `${value?.safety?.fire_extinguisher_make} ${value?.safety?.fire_extinguisher_model}` : '-'}</span>
                                                </li>
                                                <li>
                                                    <span className="d-left">Fire Supression
                                                        make model </span>
                                                    <span className="d-right">{(value?.safety?.fire_suspension_make && (value?.safety !== null)) ? `${value?.safety?.fire_suspension_make} ${value?.safety?.fire_suspension_model}` : '-'} </span>
                                                </li>
                                                <li>
                                                    <span className="d-left">Fuel Cell make model  </span>
                                                    <span className="d-right">{(value?.safety?.fuel_cell_make && (value?.safety !== null)) ? `${value?.safety?.fuel_cell_make} ${value?.safety?.fuel_cell_model}` : '-'} </span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    )
                })
            }
            <div className="edit-vehicle">
                <Button className="edit-button">
                    EDIT VEHICLE
                </Button>
            </div>
        </>
    )
}

export default VehicleSelected