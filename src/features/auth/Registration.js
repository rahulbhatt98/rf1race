import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { Form as FinalForm, Field } from "react-final-form";
import { selectRegisterAuth, updateAsync } from "./authSlice";
import { DropzoneArea } from 'material-ui-dropzone';
import trackNinja from '../../img/track-ninja-logo.svg';

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
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Registration({ history }) {

  const [showError1, setShowError1] = useState(false)
  const [image, setImage] = useState("")
  const classes = useStyles();
  const auth = useSelector(selectRegisterAuth);
  const dispatch = useDispatch();
  const localStorageData = localStorage.getItem("user");
  const authorized = localStorageData === null ? false : true;
  if (authorized) {
    history.push("/");
  }

  const handleFinalFormSubmit = (data) => {
    var firstName = data?.full_name.split(" ").slice(0, -1).join(" ");
    var lastName = data?.full_name.split(" ").slice(-1).join(" ");
    data.first_name = firstName.charAt(0).toUpperCase() + firstName.slice(1);
    data.last_name = lastName.charAt(0).toUpperCase() + lastName.slice(1);
    data.user_id = auth?.data?.user_id;
    data.email = auth?.data?.email;
    data.name = data?.full_name
    data.photo = image;
    delete data.full_name;
    dispatch(updateAsync(data));
  }

  const errorShow1 = () => {
    setShowError1(true)
  }
  return (
    <>

      <FinalForm
        onSubmit={handleFinalFormSubmit}
        validate={(values) => {
          const errors = {};

          if (!values.full_name) {
            errors.full_name = "Required Fullname";
          }
          if (!values.driver_nick) {
            errors.driver_nick = "Required Driver Nickname";
          }
          if (!values.insta_name) {
            errors.insta_name = "Required Instagram Username";
          }
          if (!values.hometown) {
            errors.hometown = "Required Hometown";
          }

          console.log(errors)
          return errors;
        }}

        render={({ handleSubmit, values, errors }) => (
          <>

            <img src={trackNinja} alt="" />

            <form className={classes.form} onSubmit={handleSubmit} noValidate>
              <div className="register-form-2">
                You've almost done!
              </div>
              <Grid container spacing={2}>
                <Grid item xs={12} className="input-custom">
                  <Field name="full_name" >
                    {(fieldProps) => (
                      <TextField
                        autoComplete="fullname"
                        variant="outlined"
                        required
                        fullWidth
                        id="full_name"
                        placeholder="Full Name"
                        autoFocus
                        name={fieldProps.input.name}
                        value={fieldProps.input.value}
                        onChange={fieldProps.input.onChange}
                      />
                    )}
                  </Field>
                  {(errors && errors.full_name && showError1) ?
                    <span style={{ color: "red" }}>
                      {errors.full_name}
                    </span>
                    : ''}
                </Grid>

                <Grid item xs={12} className="input-custom">
                  <Field name="driver_nick" >
                    {(fieldProps) => (
                      <TextField
                        autoComplete="drivername"
                        variant="outlined"
                        required
                        fullWidth
                        id="driver_nick"
                        placeholder="Driver Nickname"
                        autoFocus
                        name={fieldProps.input.name}
                        value={fieldProps.input.value}
                        onChange={fieldProps.input.onChange}
                      />
                    )}
                  </Field>
                  {(errors && errors.driver_nick && showError1) ?
                    <span style={{ color: "red" }}>
                      {errors.driver_nick}
                    </span>
                    : ''}
                </Grid>

                <Grid item xs={12} className="input-custom">
                  <Field name="insta_name" >
                    {(fieldProps) => (
                      <TextField
                        autoComplete="instaname"
                        variant="outlined"
                        required
                        fullWidth
                        id="insta_name"
                        placeholder="Instagram Username"
                        autoFocus
                        name={fieldProps.input.name}
                        value={fieldProps.input.value}
                        onChange={fieldProps.input.onChange}
                      />
                    )}
                  </Field>
                  {(errors && errors.insta_name && showError1) ?
                    <span style={{ color: "red" }}>
                      {errors.insta_name}
                    </span>
                    : ''}
                </Grid>

                <Grid item xs={12} className="input-custom">
                  <Field name="hometown" >
                    {(fieldProps) => (
                      <TextField
                        autoComplete="hometown"
                        variant="outlined"
                        required
                        fullWidth
                        id="hometown"
                        placeholder="Hometown"
                        autoFocus
                        name={fieldProps.input.name}
                        value={fieldProps.input.value}
                        onChange={fieldProps.input.onChange}
                      />
                    )}
                  </Field>
                  {(errors && errors.hometown && showError1) ?
                    <span style={{ color: "red" }}>
                      {errors.hometown}
                    </span>
                    : ''}
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
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className="custom-primary"
                onClick={errorShow1}
              >
                SAVE AND CONTINUE
              </Button>
            </form>
          </>
        )}
      />
    </>
  );
}