import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { getVehcileMakeModelAsync, selectedVehicleMakeModelDetails, getCarMakeModelAsync, selectedCarMakeModelDetails, vehicleDetailAddAsync } from "./myVehiclesSlice"
import ProfileHeader from '../account/ProfileHeader'
import Grid from "@mui/material/Grid";
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Switch from '@mui/material/Switch';
import Select from '@mui/material/Select';
import { Button, TextField } from "@material-ui/core";
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { styled } from '@mui/material/styles';
import { DropzoneArea } from 'material-ui-dropzone';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import safety from '../../img/safety.png'
import aero from '../../img/aero.png'
import brakes from '../../img/brakes.png'
import drivetrain from '../../img/drivetrain.png'
import engine1 from '../../img/engine.png'
import suspension from '../../img/suspension.png'
import Tabs from "@mui/material/Tabs";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import Tab from "@mui/material/Tab";
import ModifyVehicle from './ModfyVehicle'
import MultiselectCheckbox from './MultiselectCheckbox'
import { selectAuth } from "../auth/authSlice";

const Android12Switch = styled(Switch)(({ theme }) => ({
    padding: 8,
    '& .MuiSwitch-track': {
        borderRadius: 22 / 2,
        '&:before, &:after': {
            content: '""',
            position: 'absolute',
            top: '50%',
            transform: 'translateY(-50%)',
            width: 16,
            height: 16,
        },
        '&:before': {
            backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
                theme.palette.getContrastText(theme.palette.primary.main),
            )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
            left: 12,
        },
        '&:after': {
            backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
                theme.palette.getContrastText(theme.palette.primary.main),
            )}" d="M19,13H5V11H19V13Z" /></svg>')`,
            right: 12,
        },
    },
    '& .MuiSwitch-thumb': {
        boxShadow: 'none',
        width: 16,
        height: 16,
        margin: 2,
    },
}));

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

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    background: '#25262D',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const AddVehicle = () => {

    const [car, setCar] = React.useState(false);
    const [motorcycle, setMotorCycle] = React.useState(false);
    const [atv, setAtv] = React.useState(false);
    const [selectedName, setSelectedName] = React.useState("");
    const [image, setImage] = useState("")
    const auth = useSelector(selectAuth);
    const authId = auth?.data?.user_id

    const [camberfl, setCamberFL] = useState("")
    const [camberfr, setCamberFR] = useState("")
    const [camberrl, setCamberRL] = useState("")
    const [camberrr, setCamberRR] = useState("")
    const [toerl, setToeRL] = useState("")
    const [toerr, setToeRR] = useState("")
    const [toefl, setToeFL] = useState("")
    const [toefr, setToeFR] = useState("")
    const [casterfl, setCasterFL] = useState("")
    const [casterfr, setCasterFR] = useState("")
    const [ridefront, setRideFront] = useState("")
    const [riderear, setRideRear] = useState("")

    const [open, setOpen] = React.useState(false);
    const [openTyre, setTyreOpen] = React.useState(false);

    const circuitArray = [
        {
            "name": "drag",
        },
        {
            "name": "drift",
        },
        {
            "name": "circuit",
        },
        {
            "name": "autox",
        },
        {
            "name": "rally",
        },
        {
            "name": "off-road",
        }
    ]

    const [circuitMode, setCircuitMode] = useState([]);

    const handleCircuitMode = (data) => {
        setCircuitMode(data)
    }

    let checkName = []
     checkName = circuitMode.map((val)=>{
        return(
            `${val.name}`
        )
    })

    // console.log(checkName)
    const [tyremake, setTyreMake] = React.useState("");
    const [tyremodel, setTyreModel] = React.useState("");

    const [hp, setHp] = React.useState("");
    const [tq, setTq] = React.useState("");
    const [weight, setWeight] = React.useState("");
    const [engine, setEngine] = React.useState("");
    const [transmission, setTransmission] = React.useState("");
    const [nickname, setNickname] = React.useState("");
    const [fwidth, setFWidth] = React.useState("");
    const [fsidewall, setFSidewall] = React.useState("");
    const [fwheelsize, setFWheelsize] = React.useState("");
    const [futog, setFUtog] = React.useState("");
    const [rwidth, setRWidth] = React.useState("");
    const [rsidewall, setRSidewall] = React.useState("");
    const [rwheelsize, setRWheelsize] = React.useState("");
    const [rutog, setRUtog] = React.useState("");

    const [value, setValue] = React.useState(0);
    const handleChange1 = (event, newValue) => {
        setValue(newValue);
    };


    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleTyreOpen = () => setTyreOpen(true);
    const handleTyreClose = () => setTyreOpen(false);

    const saveVehicleInfo = () => {
        setOpen(false)
    }
    const unsaveVehicleInfo = () => {
        setOpen(false)
        setYear("")
        setMake("")
        setModel("")
    }
    const saveTyreInfo = () => {
        setOpen(false)
    }
    const unsaveTyreInfo = () => {
        setTyreOpen(false)
        setTyreMake("")
        setTyreModel("")
    }

    const handleCarChange = (event) => {
        if (event.target.checked) {
            setSelectedName("car")
        }
        else {
            setSelectedName("")
        }
        setCar(event.target.checked);
        setMotorCycle(false);
        setAtv(false);
    };
    const handleMotorcycleChange = (event) => {
        if (event.target.checked) {
            setSelectedName("motorcycle")
        }
        else {
            setSelectedName("")
        }
        setMotorCycle(event.target.checked);
        setCar(false);
        setAtv(false);
    };
    const handleAtvChange = (event) => {
        if (event.target.checked) {
            setSelectedName("atv")
        }
        else {
            setSelectedName("")
        }
        setAtv(event.target.checked);
        setCar(false);
        setMotorCycle(false);
    };
    const [year, setYear] = React.useState('');
    const [make, setMake] = React.useState('');
    const [model, setModel] = React.useState('');
    const handleYear = (event) => {
        setYear(event.target.value);
    };
    const handleMake = (event) => {
        setMake(event.target.value);
    };
    const handleModel = (event) => {
        setModel(event.target.value);
    };

    const handleTyreMake = (event) => {
        setTyreMake(event.target.value);
    };
    const handleTyreModel = (event) => {
        setTyreModel(event.target.value);
    }

    const [formValues, setFormValues] = useState([{ group_class: "", group_model: "" }])

    let handleChange = (i, e) => {
        let newFormValues = [...formValues];
        newFormValues[i][e.target.name] = e.target.value;
        setFormValues(newFormValues);
    }

    let addFormFields = () => {
        setFormValues([...formValues, { }])
    }

    let removeFormFields = (i) => {
        let newFormValues = [...formValues];
        newFormValues.splice(i, 1);
        setFormValues(newFormValues)
    }
    const [camberchecked, setCamberChecked] = React.useState(false);
    const handleCamberChange = (event) => {
        setCamberChecked(event.target.checked);
    };
    const [casterchecked, setCasterChecked] = React.useState(false);
    const handleCasterChange = (event) => {
        setCasterChecked(event.target.checked);
    };
    const [toechecked, setToeChecked] = React.useState(false);
    const handleToeChange = (event) => {
        setToeChecked(event.target.checked);
    };
    const [ridechecked, setRideChecked] = React.useState(false);
    const handleRideChange = (event) => {
        setRideChecked(event.target.checked);
    };

    const dispatch = useDispatch();
    const vehicleMakeListing = useSelector(selectedVehicleMakeModelDetails);
    const tireMakeListing = useSelector(selectedCarMakeModelDetails);

    const filteredModelArray = vehicleMakeListing?.data.filter((val) => {
        return val.car_make === make
    })

    const filteredTyreModelArray = tireMakeListing?.data.filter((val) => {
        return val.name === tyremake
    })

    let dropdownYear = [];

    let currentYear = new Date().getFullYear();
    for (var i = 1900; i < currentYear; i++) {
        dropdownYear.push(String(i));
    }
    dropdownYear.push(currentYear);


    const vehicleInfo = {
        "circuit_mode" : checkName,
        "user_id": authId,
        "vehicle_engine": engine,
        "vehicle_horse_power": hp,
        "vehicle_make_name": make,
        "vehicle_make_year": year,
        "vehicle_model_name": model,
        "vehicle_nickname": nickname,
        "vehicle_photo": image,
        "vehicle_torque_power": tq,
        "vehicle_transmission": transmission,
        "vehicle_unique_id": "9000962",
        "vehicle_weight": weight,
        "camber_unit": camberchecked ? 'IN' : 'DEG',
        "caster_unit": casterchecked ? 'IN' : 'DEG',
        "ride_height_unit": ridechecked ? 'IN' : 'MM',
        "tire_camber_front_left": camberfl,
        "tire_camber_front_right": camberfr,
        "tire_camber_rear_left": camberrl,
        "tire_camber_rear_right": camberrr,
        "tire_caster_front_left": casterfl,
        "tire_caster_front_right": casterfr,
        "tire_ride_height_front_left": ridefront,
        "tire_ride_height_front_right": riderear,
        "tire_toe_front_left": toefl,
        "tire_toe_front_right": toefr,
        "tire_toe_rear_left": toerl,
        "tire_toe_rear_right": toerr,
        "toe_unit": toechecked ? 'IN' : 'DEG',
        "tyre_make": tyremake,
        "tyre_model": tyremodel,
        "is_delete": 0,
        "group_info": formValues,
        "front_tire_rim_size": fwheelsize,
        "front_tire_sidewall": fsidewall,
        "front_tire_utqg": futog,
        "front_tire_width": fwidth,
        "rear_tire_rim_size": rwidth,
        "rear_tire_sidewall": rsidewall,
        "rear_tire_utqg": rutog,
        "rear_tire_width": rwidth,
    }

    // console.log(vehicleInfo)

    const handleVehicleAdd = () => {
        console.log('api hit')
        dispatch(vehicleDetailAddAsync(vehicleInfo))
    }

    useEffect(() => {
        dispatch(getVehcileMakeModelAsync())
        dispatch(getCarMakeModelAsync())
    }, [dispatch])

    return (
        <>
            <ProfileHeader />
            <div className='heading'>
                <h1>NEW VEHICLE</h1>
            </div>

            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <h3 className="subheading line">
                        What type of vehicle do you want to add?
                    </h3>

                    <FormGroup>
                        <FormControlLabel control={
                            <Checkbox
                                checked={car}
                                onChange={handleCarChange}
                            />
                        } label="Car/Truck" />
                        <FormControlLabel control={
                            <Checkbox
                                checked={motorcycle}
                                onChange={handleMotorcycleChange}
                            />
                        } label="Motocycle" />
                        <FormControlLabel control={
                            <Checkbox
                                checked={atv}
                                onChange={handleAtvChange}
                            />
                        } label="ATV/UTV" />
                    </FormGroup>

                    <h3 className="subheading line">
                        Vehicle details
                    </h3>
                    <div className='vehicle-detail-select'>
                        <Grid container spacing={2}>
                            <Grid item xs={4}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label" style={{ color: '#fff' }}>YEAR</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={year}
                                        label="YEAR"
                                        onChange={handleYear}
                                        style={{ color: '#fff', background: '#1B1D25' }}
                                    >
                                        <MenuItem value={year} disabled>{year}</MenuItem>
                                        {dropdownYear.map((val, index) => {
                                            return (
                                                <MenuItem value={val} key={index}>{val}</MenuItem>
                                            )
                                        })}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={8}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label" style={{ color: '#fff' }}>MAKE</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={make}
                                        label="MAKE"
                                        onChange={handleMake}
                                        style={{ color: '#fff', background: '#1B1D25' }}
                                    >
                                        <MenuItem value={make} disabled>{make}</MenuItem>
                                        {vehicleMakeListing?.data.map((val, index) => {
                                            return (
                                                <MenuItem value={val?.car_make} key={index}>{val?.car_make}</MenuItem>
                                            )
                                        })}
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                    </div>
                    <div style={{ margin: '20px 0px' }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label" style={{ color: '#fff' }}>MODEL</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={model}
                                        label="MODEL"
                                        onChange={handleModel}

                                        style={{ color: '#fff', background: '#1B1D25' }}
                                    >
                                        <MenuItem value={model} disabled>{model}</MenuItem>
                                        {filteredModelArray[0]?.car_model.map((val, index) => {
                                            return (
                                                <MenuItem value={val?.car_make_model} key={index}>{val?.car_make_model}</MenuItem>
                                            )
                                        })}
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                    </div>
                    <div className="vehicle-detail-button">
                        <Button className="find-crew-button" onClick={handleOpen}>
                            DON'T SEE YOUR CAR? ADD IT
                        </Button>
                    </div>

                </Grid>
                <Grid item xs={6}>
                    <h3 className="subheading line">
                        Which disciplane is this vehicle built for ?
                    </h3>

                    <MultiselectCheckbox
                        options={circuitArray}
                        onChange={data => handleCircuitMode(data)}
                    />
                    <div className='extra-vehicle-details'>
                        <h1 className="subheading line">Extra Vehicle Details</h1>
                    </div>
                    <Grid container spacing={2}>
                        <Grid item xs={4}>
                            <TextField
                                fullWidth
                                hiddenLabel
                                className='input-outer'
                                value={hp}
                                onChange={e => setHp(e.target.value)}
                                id="filled-hidden-label-small"
                                placeholder="POWER(HP)"
                                variant="filled"
                                size="small"
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                fullWidth
                                hiddenLabel
                                value={tq}
                                onChange={e => setTq(e.target.value)}
                                className='input-outer'
                                id="filled-hidden-label-small"
                                placeholder="POWER(TQ)"
                                variant="filled"
                                size="small"
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                fullWidth
                                hiddenLabel
                                value={weight}
                                onChange={e => setWeight(e.target.value)}
                                className='input-outer'
                                id="filled-hidden-label-small"
                                placeholder="weight(LBS)"
                                variant="filled"
                                size="small"
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                hiddenLabel
                                value={engine}
                                onChange={e => setEngine(e.target.value)}
                                className='input-outer'
                                id="filled-hidden-label-small"
                                placeholder="ENGINE"
                                variant="filled"
                                size="small"
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                className='input-outer'
                                hiddenLabel
                                value={transmission}
                                onChange={e => setTransmission(e.target.value)}
                                id="filled-hidden-label-small"
                                placeholder="TRANSMISSION"
                                variant="filled"
                                size="small"
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                className='input-outer'
                                fullWidth
                                hiddenLabel
                                value={nickname}
                                onChange={e => setNickname(e.target.value)}
                                id="filled-hidden-label-small"
                                placeholder="NICKNAME"
                                variant="filled"
                                size="small"
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>

            <Grid container spacing={2}>
                <Grid item xs={12} className="input-custom">
                    <div className="upload-custom add-vehicle-upload">
                        <DropzoneArea
                            name="photo"
                            dropzoneClass="custom-dropzone"
                            dropzoneParagraphClass="custom-paragraph-class"
                            previewGridClasses={{ container: 'preview-container-custom', item: 'preview-item-custom' }}
                            acceptedFiles={['image/*']}
                            filesLimit={1}
                            dropzoneText={"ADD PHOTO"}
                            onChange={(files) => setImage(files)}
                        />
                    </div>
                </Grid>
            </Grid>

            <Grid container spacing={2} direction="row"
                justifyContent="center"
                alignItems="center">
                <Grid item xs={6}>
                    <Grid item xs={12} >
                        <h3 className="subheading">
                            What tyre are on this vehicle?
                        </h3>
                    </Grid>

                    <Grid item xs={12}
                    >
                        <FormControl fullWidth className='input-outer'>
                            <InputLabel id="demo-simple-select-label" style={{ color: '#fff' }}>TYRE MAKE</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"

                                value={tyremake}
                                label="MAKE"
                                onChange={handleTyreMake}
                                style={{ color: '#fff', background: '#1B1D25' }}
                            >
                                <MenuItem value={tyremake} disabled>{tyremake}</MenuItem>
                                {tireMakeListing?.data.map((val, index) => {
                                    return (
                                        <MenuItem value={val.name} key={index}>{val.name}</MenuItem>
                                    )
                                })}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth className='input-outer'>
                            <InputLabel id="demo-simple-select-label" style={{ color: '#fff' }}>TYRE MODEL</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={tyremodel}
                                label="MAKE"
                                onChange={handleTyreModel}
                                style={{ color: '#fff', background: '#1B1D25' }}
                            >
                                <MenuItem value={tyremodel} disabled>{tyremodel}</MenuItem>
                                {filteredTyreModelArray[0]?.tire_model.map((val, index) => {
                                    return (
                                        <MenuItem value={val?.tire_model} key={index}>{val?.tire_model}</MenuItem>
                                    )
                                })}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <Box mb={3} >
                            <Button className="find-crew-button " onClick={handleTyreOpen}>
                                DON'T SEE YOUR Tyre?<br />
                                ADD IT
                            </Button>
                        </Box>
                    </Grid>

                    <Grid item xs={12}>
                        <h6 className='fs-14 text-grey-1'>FRONT TYRES</h6>
                    </Grid>

                    <Grid container spacing={2}>
                        <Grid item xs={3}>
                            <TextField
                                fullWidth
                                hiddenLabel
                                value={fwidth}
                                onChange={e => setFWidth(e.target.value)}
                                className='input-outer'
                                id="filled-hidden-label-small"
                                placeholder="WIDTH"
                                variant="filled"
                                size="small"
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <TextField
                                fullWidth
                                hiddenLabel
                                value={fsidewall}
                                onChange={e => setFSidewall(e.target.value)}
                                className='input-outer'
                                id="filled-hidden-label-small"
                                placeholder="SIDEWALL"
                                variant="filled"
                                size="small"
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <TextField
                                fullWidth
                                hiddenLabel
                                value={fwheelsize}
                                onChange={e => setFWheelsize(e.target.value)}
                                className='input-outer'
                                id="filled-hidden-label-small"
                                placeholder="WHEEL SIZE"
                                variant="filled"
                                size="small"
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <TextField
                                fullWidth
                                hiddenLabel
                                value={futog}
                                onChange={e => setFUtog(e.target.value)}
                                className='input-outer'
                                id="filled-hidden-label-small"
                                placeholder="UTOG"
                                variant="filled"
                                size="small"
                            />
                        </Grid>
                    </Grid>

                    <Grid item xs={12}>
                        <h6 className='fs-14 text-grey-1'>REAR TYRES</h6>
                    </Grid>

                    <Grid container spacing={2}>
                        <Grid item xs={3}>
                            <TextField
                                fullWidth
                                hiddenLabel
                                value={rwidth}
                                onChange={e => setRWidth(e.target.value)}
                                className='input-outer'
                                id="filled-hidden-label-small"
                                placeholder="WIDTH"
                                variant="filled"
                                size="small"
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <TextField
                                fullWidth
                                hiddenLabel
                                value={rsidewall}
                                onChange={e => setRSidewall(e.target.value)}
                                className='input-outer'
                                id="filled-hidden-label-small"
                                placeholder="SIDEWALL"
                                variant="filled"
                                size="small"
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <TextField
                                fullWidth
                                hiddenLabel
                                value={rwheelsize}
                                onChange={e => setRWheelsize(e.target.value)}
                                className='input-outer'
                                id="filled-hidden-label-small"
                                placeholder="WHEEL SIZE"
                                variant="filled"
                                size="small"
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <TextField
                                fullWidth
                                hiddenLabel
                                value={rutog}
                                onChange={e => setRUtog(e.target.value)}
                                className='input-outer'
                                id="filled-hidden-label-small"
                                placeholder="UTOG"
                                variant="filled"
                                size="small"
                            />
                        </Grid>
                    </Grid>

                    <Grid item xs={12}>
                        <h6 className='fs-14 text-grey-1'>GROUP INFO</h6>
                    </Grid>

                    {formValues.map((element, index) => {
                        return (
                            <>
                                <Grid container spacing={2}>
                                    <Grid item xs={11}>
                                        <Grid item xs={11}>
                                            <TextField
                                                fullWidth
                                                hiddenLabel
                                                name="group_class"
                                                value={element.group_class || ""}
                                                onChange={e => handleChange(index, e)}
                                                className='input-outer'
                                                id="filled-hidden-label-small"
                                                placeholder="ORGANISATION IE:SCCA"
                                                variant="filled"
                                                size="small"
                                            />
                                        </Grid>
                                        <Grid item xs={11}>
                                            <TextField
                                                fullWidth
                                                hiddenLabel
                                                className='input-outer'
                                                name="group_model"
                                                value={element.group_model || ""}
                                                onChange={e => handleChange(index, e)}
                                                id="filled-hidden-label-small"
                                                placeholder="VEHICLE CLASS IE:MODIFIED"
                                                variant="filled"
                                                size="small"
                                            />
                                        </Grid>
                                    </Grid>
                                    {
                                        index ?
                                            <Grid item xs={1}>
                                                <Button onClick={() => removeFormFields(index)}>
                                                    delete
                                                </Button>
                                            </Grid>
                                            : null
                                    }
                                </Grid>
                            </>
                        )
                    }

                    )}
                    <Grid item xs={12}>
                        <AddCircleOutlineIcon onClick={() => addFormFields()} /><span>ADD GROUP</span>
                    </Grid>

                    <Grid item xs={12}>
                        <h6 className='subheading'>What is the basic setup?(You can adjust this later)</h6>
                    </Grid>

                    <Grid container spacing={2}>
                        <Grid item xs={10} className="group-heading">
                            <h6 className='fs-14 text-grey-2'>CAMBER</h6>
                        </Grid>
                        <Grid item xs={2}>
                            <FormControlLabel
                                className="switch-toggle"
                                control={<Android12Switch
                                    checked={camberchecked}
                                    onChange={handleCamberChange} />}
                                label=""
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item xs={3}>
                            <TextField
                                fullWidth
                                hiddenLabel
                                className='input-outer'
                                id="filled-hidden-label-small"
                                placeholder="FL"
                                value={camberfl}
                                onChange={e => setCamberFL(e.target.value)}
                                variant="filled"
                                size="small"
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <TextField
                                fullWidth
                                hiddenLabel
                                className='input-outer'
                                id="filled-hidden-label-small"
                                placeholder="FR"
                                value={camberfr}
                                onChange={e => setCamberFR(e.target.value)}
                                variant="filled"
                                size="small"
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <TextField
                                fullWidth
                                hiddenLabel
                                className='input-outer'
                                id="filled-hidden-label-small"
                                placeholder="RL"
                                value={camberrl}
                                onChange={e => setCamberRL(e.target.value)}
                                variant="filled"
                                size="small"
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <TextField
                                fullWidth
                                hiddenLabel
                                className='input-outer'
                                id="filled-hidden-label-small"
                                placeholder="RR"
                                value={camberrr}
                                onChange={e => setCamberRR(e.target.value)}
                                variant="filled"
                                size="small"
                            />
                        </Grid>
                    </Grid>

                    <Grid container spacing={2}>
                        <Grid item xs={10} className="group-heading">
                            <h6 className='fs-14 text-grey-2'>TOE</h6>
                        </Grid>
                        <Grid item xs={2}>
                            <FormControlLabel
                                className="switch-toggle"
                                control={<Android12Switch
                                    checked={toechecked}
                                    onChange={handleToeChange} />}
                                label=""
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item xs={3}>
                            <TextField
                                fullWidth
                                hiddenLabel
                                value={toefl}
                                onChange={e => setToeFL(e.target.value)}
                                className='input-outer'
                                id="filled-hidden-label-small"
                                placeholder="FL"
                                variant="filled"
                                size="small"
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <TextField
                                fullWidth
                                hiddenLabel
                                className='input-outer'
                                id="filled-hidden-label-small"
                                value={toefr}
                                onChange={e => setToeFR(e.target.value)}
                                placeholder="FR"
                                variant="filled"
                                size="small"
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <TextField
                                fullWidth
                                hiddenLabel
                                className='input-outer'
                                value={toerl}
                                onChange={e => setToeRL(e.target.value)}
                                id="filled-hidden-label-small"
                                placeholder="RL"
                                variant="filled"
                                size="small"
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <TextField
                                fullWidth
                                hiddenLabel
                                className='input-outer'
                                value={toerr}
                                onChange={e => setToeRR(e.target.value)}
                                id="filled-hidden-label-small"
                                placeholder="RR"
                                variant="filled"
                                size="small"
                            />
                        </Grid>
                    </Grid>

                    <Grid container spacing={2}>
                        <Grid item xs={10} className="group-heading">
                            <h6 className='fs-14 text-grey-2'>CASTER</h6>
                        </Grid>
                        <Grid item xs={2}>
                            <FormControlLabel
                                className="switch-toggle"
                                control={<Android12Switch
                                    checked={casterchecked}
                                    onChange={handleCasterChange} />}
                                label=""
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                hiddenLabel
                                className='input-outer'
                                id="filled-hidden-label-small"
                                value={casterfl}
                                onChange={e => setCasterFL(e.target.value)}
                                placeholder="FL"
                                variant="filled"
                                size="small"
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                hiddenLabel
                                className='input-outer'
                                value={casterfr}
                                onChange={e => setCasterFR(e.target.value)}
                                id="filled-hidden-label-small"
                                placeholder="FR"
                                variant="filled"
                                size="small"
                            />
                        </Grid>
                    </Grid>

                    <Grid container spacing={2}>
                        <Grid item xs={10} className="group-heading">
                            <h6 className='fs-14 text-grey-2'>RIDE HEIGHT</h6>
                        </Grid>
                        <Grid item xs={2}>
                            <FormControlLabel
                                className="switch-toggle"
                                control={<Android12Switch
                                    checked={ridechecked}
                                    onChange={handleRideChange} />}
                                label=""
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                hiddenLabel
                                className='input-outer'
                                id="filled-hidden-label-small"
                                value={ridefront}
                                onChange={e => setRideFront(e.target.value)}
                                placeholder="FRONT"
                                variant="filled"
                                size="small"
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                hiddenLabel
                                className='input-outer'
                                value={riderear}
                                onChange={e => setRideRear(e.target.value)}
                                id="filled-hidden-label-small"
                                placeholder="REAR"
                                variant="filled"
                                size="small"
                            />
                        </Grid>
                    </Grid>

                    <Grid item xs={11}>
                        <Box sx={{ justifyContent: 'center', display: 'flex' }}>
                            <Button className="create-crew-button" onClick={handleVehicleAdd}>
                                SAVE
                            </Button>
                        </Box>
                    </Grid>

                </Grid>
            </Grid>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <Box sx={style}>

                        <h1>ADD VEHICLE</h1>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    hiddenLabel
                                    className='input-outer'
                                    value={year}
                                    onChange={e => setYear(e.target.value)}
                                    id="filled-hidden-label-small"
                                    placeholder='YEAR'
                                    variant="filled"
                                    size="small"
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    hiddenLabel
                                    value={make}
                                    onChange={e => setMake(e.target.value)}
                                    className='input-outer'
                                    id="filled-hidden-label-small"
                                    placeholder='MAKE'
                                    variant="filled"
                                    size="small"
                                />
                            </Grid>
                        </Grid>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    hiddenLabel
                                    className='input-outer'
                                    value={model}
                                    onChange={e => setModel(e.target.value)}
                                    id="filled-hidden-label-small"
                                    placeholder='MODEL'
                                    variant="filled"
                                    size="small"
                                />
                            </Grid>
                        </Grid>
                        <div>
                            <Button className="save-vehicle-add" onClick={saveVehicleInfo}>
                                SAVE
                            </Button>
                        </div>
                        <div className='nevermind-box'>
                            <Button className="nevemind-add-vehicle" onClick={unsaveVehicleInfo}>
                                &lt; NEVERMIND
                            </Button>
                        </div>
                    </Box>
                </Fade>
            </Modal>

            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={openTyre}
                onClose={handleTyreClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={openTyre}>
                    <Box sx={style}>

                        <h1>ADD TYRE</h1>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    hiddenLabel
                                    className='input-outer'
                                    value={tyremake}
                                    onChange={e => setTyreMake(e.target.value)}
                                    id="filled-hidden-label-small"
                                    placeholder='MAKE'
                                    variant="filled"
                                    size="small"
                                />
                            </Grid>
                        </Grid>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    hiddenLabel
                                    className='input-outer'
                                    value={tyremodel}
                                    onChange={e => setTyreModel(e.target.value)}
                                    id="filled-hidden-label-small"
                                    placeholder='MODEL'
                                    variant="filled"
                                    size="small"
                                />
                            </Grid>
                        </Grid>
                        <div>
                            <Button className="save-vehicle-add" onClick={saveTyreInfo}>
                                SAVE
                            </Button>
                        </div>
                        <div className='nevermind-box'>
                            <Button className="nevemind-add-vehicle" onClick={unsaveTyreInfo}>
                                &lt; NEVERMIND
                            </Button>
                        </div>
                    </Box>
                </Fade>
            </Modal>

            <Grid container spacing={2}>
                <Grid item xs={11} sx={{ justifyContent: 'center', display: 'flex' }}>
                    <h6 className='subheading' >What modifications have you done?</h6>
                </Grid>
                <Grid container spacing={2} sx={{ justifyContent: 'center', display: 'flex' }}>
                    <Grid item xs={11} sx={{ justifyContent: 'center', display: 'flex' }}>
                        <Tabs
                            className="search-tab1 modify-details"
                            value={value}
                            onChange={handleChange1}
                            aria-label="basic tabs example"
                        >
                            <Tab label="ENGINE" icon={<img src={engine1} alt="" />} {...a11yProps(0)} />
                            <Tab label="SUSPENSION" icon={<img src={suspension} alt="" />} {...a11yProps(1)} />
                            <Tab label="DRIVETRAIN" icon={<img src={drivetrain} alt="" />} {...a11yProps(2)} />
                            <Tab label="BRAKES" icon={<img src={brakes} alt="" />} {...a11yProps(3)} />
                            <Tab label="AERO" icon={<img src={aero} alt="" />} {...a11yProps(4)} />
                            <Tab label="SAFETY" icon={<img src={safety} alt="" />} {...a11yProps(5)} />
                        </Tabs>
                    </Grid>
                </Grid>
            </Grid>

            <Grid container spacing={2}>
                <Grid item xs={11}>
                    <TabPanel className="tab-card-outer" value={value} index={0}>
                        <ModifyVehicle message="1" indexValue={0} />
                    </TabPanel>
                    <TabPanel className="tab-card-outer" value={value} index={1}>
                        <ModifyVehicle message="2" indexValue={1} />
                    </TabPanel>
                    <TabPanel className="tab-card-outer" value={value} index={2}>
                        <ModifyVehicle message="3" indexValue={2} />
                    </TabPanel>
                    <TabPanel className="tab-card-outer" value={value} index={3}>
                        <ModifyVehicle message="4" indexValue={3} />
                    </TabPanel>
                    <TabPanel className="tab-card-outer" value={value} index={4}>
                        <ModifyVehicle message="5" indexValue={4} />
                    </TabPanel>
                    <TabPanel className="tab-card-outer" value={value} index={5}>
                        <ModifyVehicle message="6" indexValue={5} />
                    </TabPanel>
                </Grid>
            </Grid>

        </>
    )
}

export default AddVehicle