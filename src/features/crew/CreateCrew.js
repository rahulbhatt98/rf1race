import React, { useState, useMemo } from 'react'
import { useDispatch, useSelector } from "react-redux";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { Form as FinalForm, Field } from "react-final-form";
import { DropzoneArea } from 'material-ui-dropzone';
import ProfileHeader from '../account/ProfileHeader'
import Switch from '@mui/material/Switch';
import { selectAuth } from "../auth/authSlice";
import countryList from 'react-select-country-list'
import Select from 'react-select'
import { crewAsync1 } from "./crewSlice";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(0),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: "40%", // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function CreateCrew() {

    const [showError1, setShowError1] = useState(false)
    const [image, setImage] = useState("")
    const classes = useStyles();
    const dispatch = useDispatch();
    const auth = useSelector(selectAuth);
    const authId = auth?.data?.user_id;
    const [checked, setChecked] = React.useState(false);

    const [value, setValue] = useState('')
    let history = useHistory();
    const options = useMemo(() => countryList().getData(), [])

    const changeHandler = value => {
        setValue(value)
    }

    const handleChange = (event) => {
        setChecked(event.target.checked);
    };

    const handleFinalFormSubmit = (data) => {
        data.name = data?.crew_name;
        data.user_id = authId;
        data.nick_name = data?.crew_nick;
        data.new_member_level = data?.level_2;
        data.top_member_level = data?.level_1;
        data.crew_location = value.label;
        data.photo = image;
        data.show_in_search = checked? 1 : 0;
        dispatch(crewAsync1(data))
        history.push("/crew");
    }

    const errorShow1 = () => {
        setShowError1(true)
    }

    return (
        <>
            <ProfileHeader />
            <div className='crew-head'>
                <h1>
                    CREATE A CREW
                </h1>
            </div>
            <FinalForm
                onSubmit={handleFinalFormSubmit}
                validate={(values) => {
                    const errors = {};

                    if (!values.crew_name) {
                        errors.crew_name = "Required Crew Name";
                    }

                    if (!values.crew_nick) {
                        errors.crew_nick = "Required Crew Nickname";
                    }

                    if (values.crew_nick && values.crew_nick.length < 5) {
                        errors.crew_nick = "Crew Nickname Must Be Of 5 Letters";
                    }

                    if (!values.level_2) {
                        errors.level_2 = "Required Crew Member Level 2 Name";
                    }

                    if (!values.level_1) {
                        errors.level_1 = "Required Crew Member Level 1 Name";
                    }

                    // console.log(errors)
                    return errors;
                }}

                render={({ handleSubmit, values, errors }) => (
                    <>
                        <form className={classes.form} onSubmit={handleSubmit} noValidate>
                            <Grid container spacing={2}>
                                <Grid item xs={12} className="input-custom">
                                    <label>CREW NAME</label>
                                    <Field name="crew_name" >
                                        {(fieldProps) => (
                                            <TextField
                                                autoComplete="crewname"
                                                variant="outlined"
                                                required
                                                fullWidth
                                                id="crew_name"
                                                placeholder="Name"
                                                autoFocus
                                                name={fieldProps.input.name}
                                                value={fieldProps.input.value}
                                                onChange={fieldProps.input.onChange}
                                            />
                                        )}
                                    </Field>
                                    {(errors && errors.crew_name && showError1) ?
                                        <span style={{ color: "red" }}>
                                            {errors.crew_name}
                                        </span>
                                        : ''}
                                </Grid>

                                <Grid item xs={12} className="input-custom">
                                    <label>CREW SHORT ABBREVIATION</label>
                                    <Field name="crew_nick" >
                                        {(fieldProps) => (
                                            <TextField
                                                autoComplete="crewnickname"
                                                variant="outlined"
                                                required
                                                fullWidth
                                                id="crew_nick"
                                                placeholder="5 LETTER ABBREVIATION"
                                                autoFocus
                                                name={fieldProps.input.name}
                                                value={fieldProps.input.value}
                                                onChange={fieldProps.input.onChange}
                                            />
                                        )}
                                    </Field>
                                    {(errors && errors.crew_nick && showError1) ?
                                        <span style={{ color: "red" }}>
                                            {errors.crew_nick}
                                        </span>
                                        : ''}
                                </Grid>

                                <Grid item xs={12} className="input-custom">
                                    <label>MEMBER LEVEL 2</label>
                                    <h4>THIS IS THE LEVEL THAT A NEW MEMBER START AT</h4>
                                    <Field name="level_2" >
                                        {(fieldProps) => (
                                            <TextField
                                                autoComplete="memberlevel2"
                                                variant="outlined"
                                                required
                                                fullWidth
                                                id="level_2"
                                                placeholder="I.E. DRIVER, ROOKIE, RACER"
                                                autoFocus
                                                name={fieldProps.input.name}
                                                value={fieldProps.input.value}
                                                onChange={fieldProps.input.onChange}
                                            />
                                        )}
                                    </Field>
                                    {(errors && errors.level_2 && showError1) ?
                                        <span style={{ color: "red" }}>
                                            {errors.level_2}
                                        </span>
                                        : ''}
                                </Grid>

                                <Grid item xs={12} className="input-custom">
                                    <label>MEMBER LEVEL 1</label>
                                    <h4>THIS MEMBER LEVEL HAS MORE ACCESS AND PRIVILEGES THAN A NEW MEMBER</h4>
                                    <Field name="level_1" >
                                        {(fieldProps) => (
                                            <TextField
                                                autoComplete="memberlevel1"
                                                variant="outlined"
                                                required
                                                fullWidth
                                                id="level_1"
                                                placeholder="I.E. ADMIN, CHAMPION, LEADER"
                                                autoFocus
                                                name={fieldProps.input.name}
                                                value={fieldProps.input.value}
                                                onChange={fieldProps.input.onChange}
                                            />
                                        )}
                                    </Field>
                                    {(errors && errors.level_1 && showError1) ?
                                        <span style={{ color: "red" }}>
                                            {errors.level_1}
                                        </span>
                                        : ''}
                                </Grid>

                                <Grid item xs={12} className="input-custom">
                                    <label>CREW LOCATION</label>
                                    <Select options={options} value={value} onChange={changeHandler} />
                                </Grid>
                                <Grid item xs={12} className="input-custom">
                                    <div className="upload-custom">
                                        <DropzoneArea
                                            name="photo"
                                            dropzoneClass="custom-dropzone"
                                            dropzoneParagraphClass="custom-paragraph-class"
                                            previewGridClasses={{container: 'preview-container-custom', item: 'preview-item-custom'}}
                                            acceptedFiles={['image/*']}
                                            filesLimit={1}
                                            // dropzoneText={"Drag and drop an image here or click"}
                                            onChange={(files) => setImage(files)}
                                        />
                                    </div>
                                    {(errors && errors.photo && showError1) ?
                                        <span style={{ color: "red" }}>
                                            {errors.photo}
                                        </span>
                                        : ''}
                                </Grid>
                                <Grid item xs={12} className="input-custom">
                                    <div className="toggle-switch-onoff">
                                        <div>
                                            <label>SHOW CREW IN SEARCH</label>
                                            <h4>MAKE CREW VISIBLE TO PUBLIC</h4>
                                        </div>
                                        <Switch
                                            name="checkedStatus"
                                            checked={checked}
                                            onChange={handleChange}
                                            inputProps={{ 'aria-label': 'controlled' }}
                                        />
                                    </div>
                                </Grid>
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className="custom-primary"
                                onClick={errorShow1}
                            >
                                SAVE
                            </Button>
                        </form>
                    </>
                )}
            />
        </>
    );
}