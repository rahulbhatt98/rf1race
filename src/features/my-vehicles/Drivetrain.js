import React, { useState } from 'react'
import Grid from "@mui/material/Grid";
import EditIcon from '@mui/icons-material/Edit';
import Box from '@mui/material/Box';
import { Button, TextField } from "@material-ui/core";
import CancelIcon from '@mui/icons-material/Cancel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

const Drivetrain = () => {

  const [transmission, setTransmission] = useState(false)
  const [transmissionType, setTransmissionType] = useState(false)
  const [finalDrive, setFinalDrive] = useState(false)
  const [sequential, setSequential] = useState(false)
  const [transmissionFluid, setTransmissionFluid] = useState(false)
  const [differentialFluid, setDifferentialFluid] = useState(false)
  const [checkboxState, setCheckboxState] = useState(false)

  const [transmissionmake, setTransmissionMake] = useState('')
  const [transmissionmodel, setTransmissionModel] = useState('')
  const [transmissiontypedata, setTransmissionTypeData] = useState('Auto')
  const [finaldrivedata, setFinalDriveData] = useState('')
  const [sequentialData, setSequentialData] = useState(false)
  const [transmissionFluidMake, setTransmissionFluidMake] = useState('')
  const [transmissionFluidModel, setTransmissionFluidModel] = useState('')
  const [differentialFluidMake, setDifferentialFluidMake] = useState('')
  const [differentialFluidModel, setDifferentialFluidModel] = useState('')

  const transmissionEditOpen = () => {
    setTransmission(prevCheck => !prevCheck)
  }
  const transmissionTypeEditOpen = () => {
    setTransmissionType(prevCheck => !prevCheck)
  }
  const finalDriveTypeEditOpen = () => {
    setFinalDrive(prevCheck => !prevCheck)
  }
  const sequentialEditOpen = () => {
    setSequential(prevCheck => !prevCheck)
  }
  const transmissionFluidEditOpen = () => {
    setTransmissionFluid(prevCheck => !prevCheck)
  }
  const differentialFluidEditOpen = () => {
    setDifferentialFluid(prevCheck => !prevCheck)
  }


  const handleTransmissionType = (event) => {
    setTransmissionTypeData(event.target.value);
  };


  const handleSequential = () => {
    setSequentialData(prevCheck => !prevCheck)
  }
  const handleCheckbox = (e) => {
    setCheckboxState(e.target.checked ? true : false)
  }
  return (
    <>
      <Grid container>
        <Grid item xs={8}>
          <Grid item xs={6}>
            <Button onClick={transmissionEditOpen} className="btn-grey">
              TRANSMISSION{transmission ? <CancelIcon /> : <EditIcon />}
            </Button>
          </Grid>
          {transmission ?
            <>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    hiddenLabel
                    className='input-outer'
                    value={transmissionmake}
                    onChange={e => setTransmissionMake(e.target.value)}
                    id="filled-hidden-label-small"
                    placeholder="MODEL"
                    variant="filled"
                    size="small"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    hiddenLabel
                    className='input-outer'
                    value={transmissionmodel}
                    onChange={e => setTransmissionModel(e.target.value)}
                    id="filled-hidden-label-small"
                    placeholder="MODEL"
                    variant="filled"
                    size="small"
                  />
                </Grid>
              </Grid>
            </>
            : ''}
          <Grid item xs={6}>
            <Button onClick={transmissionTypeEditOpen} className="btn-grey">
              TRANSMISSION TYPE{transmissionType ? <CancelIcon /> : <EditIcon />}
            </Button>
          </Grid>
          {transmissionType ?
            <>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Select
                    fullWidth
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={transmissiontypedata}
                    label="TRANSMISSION TYPE"
                    onChange={handleTransmissionType}
                    style={{ color: '#fff', background: '#1B1D25' }}
                  >
                    <MenuItem value="Auto">Auto</MenuItem>
                    <MenuItem value="3-Speed">3-Speed</MenuItem>
                    <MenuItem value="4-Speed">4-Speed</MenuItem>
                    <MenuItem value="5-Speed">5-Speed</MenuItem>
                    <MenuItem value="6-Speed">6-Speed</MenuItem>
                    <MenuItem value="7-Speed">7-Speed</MenuItem>
                    <MenuItem value="8-Speed">8-Speed</MenuItem>
                  </Select>
                </Grid>
              </Grid>
            </>
            : ''}
          <Grid item xs={6}>
            <Button onClick={finalDriveTypeEditOpen} className="btn-grey">
              GEAR RATION AND FINAL DRIVE{finalDrive ? <CancelIcon /> : <EditIcon />}
            </Button>
          </Grid>
          {finalDrive ?
            <>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    hiddenLabel
                    className='input-outer'
                    value={finaldrivedata}
                    onChange={e => setFinalDriveData(e.target.value)}
                    id="filled-hidden-label-small"
                    placeholder="FINAL DRIVE"
                    variant="filled"
                    size="small"
                  />
                </Grid>
              </Grid>
            </>
            : ''}
          <Grid item xs={6}>
            <Button onClick={sequentialEditOpen} className="btn-grey">
              SEQUENTIAL{sequential ? <CancelIcon /> : <EditIcon />}
            </Button>
          </Grid>
          {sequential ?
            <>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Button onClick={handleSequential} className={sequentialData ? 'sequential-button sequential-border' : 'sequential-button'}>
                    {sequentialData ? 'YES' : 'NO'}
                  </Button>
                </Grid>
              </Grid>
            </>
            : ''}
          <Grid item xs={6}>
            <Button onClick={transmissionFluidEditOpen} className="btn-grey">
              TRANSMISSION FLUID{transmissionFluid ? <CancelIcon /> : <EditIcon />}
            </Button>
          </Grid>
          {transmissionFluid ?
            <>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    hiddenLabel
                    className='input-outer'
                    value={transmissionFluidMake}
                    onChange={e => setTransmissionFluidMake(e.target.value)}
                    id="filled-hidden-label-small"
                    placeholder="MODEL"
                    variant="filled"
                    size="small"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    hiddenLabel
                    className='input-outer'
                    value={transmissionFluidModel}
                    onChange={e => setTransmissionFluidModel(e.target.value)}
                    id="filled-hidden-label-small"
                    placeholder="MODEL"
                    variant="filled"
                    size="small"
                  />
                </Grid>
              </Grid>
            </>
            : ''}
          <Grid item xs={6}>
            <Button onClick={differentialFluidEditOpen} className="btn-grey">
              DIFFERENTIAL FLUID{differentialFluid ? <CancelIcon /> : <EditIcon />}
            </Button>
          </Grid>
          {differentialFluid ?
            <>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    hiddenLabel
                    className='input-outer'
                    value={differentialFluidMake}
                    onChange={e => setDifferentialFluidMake(e.target.value)}
                    id="filled-hidden-label-small"
                    placeholder="MODEL"
                    variant="filled"
                    disabled= {checkboxState? true: false}
                    size="small"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    hiddenLabel
                    className='input-outer'
                    value={differentialFluidModel}
                    onChange={e => setDifferentialFluidModel(e.target.value)}
                    id="filled-hidden-label-small"
                    placeholder="MODEL"
                    variant="filled"
                    disabled= {checkboxState? true: false}
                    size="small"
                  />
                </Grid>
                <Grid item xs={12}>
                  <input type="checkbox" onChange={handleCheckbox} />
                  <label>Same as transmission fluid</label>
                </Grid>
              </Grid>
            </>
            : ''}
        </Grid>
      </Grid>
    </>
  )
}

export default Drivetrain