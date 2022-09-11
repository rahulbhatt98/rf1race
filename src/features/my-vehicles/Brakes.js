import React, { useState } from 'react'
import Grid from "@mui/material/Grid";
import EditIcon from '@mui/icons-material/Edit';
import Box from '@mui/material/Box';
import { Button, TextField } from "@material-ui/core";
import CancelIcon from '@mui/icons-material/Cancel';

const Brakes = () => {

  const [brakefluid, setBrakeFluid] = useState(false)
  const [frontpads, setFrontPads] = useState(false)
  const [rearpads, setRearPads] = useState(false)
  const [frontrotators, setFrontRotators] = useState(false)
  const [rearrotators, setRearRotators] = useState(false)
  const [frontcalipers, setFrontCalipers] = useState(false)
  const [rearcalipers, setRearCalipers] = useState(false)
  const [brakeducts, setBrakeDucts] = useState(false)

  const [brakeFluidMake, setBrakeFluidMake] = useState('')
  const [brakeFluidModel, setBrakeFluidModel] = useState('')
  const [frontPadsMake, setFrontPadsMake] = useState('')
  const [frontPadsModel, setFrontPadsModel] = useState('')
  const [frontPadsSession, setFrontPadsSession] = useState('')
  const [rearPadsMake, setRearPadsMake] = useState('')
  const [rearPadsModel, setRearPadsModel] = useState('')
  const [rearPadsSession, setRearPadsSession] = useState('')
  const [frontRotatorsMake, setFrontRotatorsMake] = useState('')
  const [frontRotatorsModel, setFrontRotatorsModel] = useState('')
  const [frontRotatorsSession, setFrontRotatorsSession] = useState('')
  const [rearRotatorsMake, setRearRotatorsMake] = useState('')
  const [rearRotatorsModel, setRearRotatorsModel] = useState('')
  const [rearRotatorsSession, setRearRotatorsSession] = useState('')
  const [frontCalipersMake, setFrontCalipersMake] = useState('')
  const [frontCalipersModel, setFrontCalipersModel] = useState('')
  const [rearCalipersMake, setRearCalipersMake] = useState('')
  const [rearCalipersModel, setRearCalipersModel] = useState('')
  const [brakeDuctsPercentage, setBrakeDuctsPercentage] = useState('')
  const [checkboxState, setCheckboxState] = useState(false)

  const brakeFluidEditOpen = () => {
    setBrakeFluid(prevCheck => !prevCheck)
  }
  const frontPadsEditOpen = () => {
    setFrontPads(prevCheck => !prevCheck)
  }
  const rearPadsEditOpen = () => {
    setRearPads(prevCheck => !prevCheck)
  }
  const frontRotatorsEditOpen = () => {
    setFrontRotators(prevCheck => !prevCheck)
  }
  const rearRotatorsEditOpen = () => {
    setRearRotators(prevCheck => !prevCheck)
  }
  const frontCalipersEditOpen = () => {
    setFrontCalipers(prevCheck => !prevCheck)
  }
  const rearCalipersEditOpen = () => {
    setRearCalipers(prevCheck => !prevCheck)
  }
  const brakeDuctsEditOpen = () => {
    setBrakeDucts(prevCheck => !prevCheck)
  }

  const handleCheckbox = (e) => {
    setCheckboxState(e.target.checked ? true : false)
  }
  console.log(checkboxState)
  return (
    <>
      <Grid container>
        <Grid item xs={8}>
          <Grid item xs={6}>
            <Button onClick={brakeFluidEditOpen} className="btn-grey">
              BRAKE FLUID{brakefluid ? <CancelIcon /> : <EditIcon />}
            </Button>
          </Grid>
          {brakefluid ?
            <>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    hiddenLabel
                    className='input-outer'
                    id="filled-hidden-label-small"
                    value={brakeFluidMake}
                    onChange={e => setBrakeFluidMake(e.target.value)}
                    placeholder="MAKE"
                    variant="filled"
                    size="small"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    hiddenLabel
                    className='input-outer'
                    value={brakeFluidModel}
                    onChange={e => setBrakeFluidModel(e.target.value)}
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
            <Button onClick={frontPadsEditOpen} className="btn-grey">
              FRONT PADS{frontpads ? <CancelIcon /> : <EditIcon />}
            </Button>
          </Grid>
          {frontpads ?
            <>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    hiddenLabel
                    className='input-outer'
                    id="filled-hidden-label-small"
                    value={frontPadsMake}
                    onChange={e => setFrontPadsMake(e.target.value)}
                    placeholder="MAKE"
                    variant="filled"
                    size="small"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    hiddenLabel
                    className='input-outer'
                    value={frontPadsModel}
                    onChange={e => setFrontPadsModel(e.target.value)}
                    id="filled-hidden-label-small"
                    placeholder="MODEL"
                    variant="filled"
                    size="small"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    disabled
                    hiddenLabel
                    className='input-outer'
                    value=""
                    id="filled-hidden-label-small"
                    placeholder="TIME(HH:MM)"
                    variant="filled"
                    size="small"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    hiddenLabel
                    className='input-outer'
                    value={frontPadsSession}
                    onChange={e => setFrontPadsSession(e.target.value)}
                    id="filled-hidden-label-small"
                    placeholder="SESSIONS"
                    variant="filled"
                    size="small"
                  />
                </Grid>
              </Grid>
            </>
            : ''}
          <Grid item xs={6}>
            <Button onClick={rearPadsEditOpen} className="btn-grey">
              REAR PADS{rearpads ? <CancelIcon /> : <EditIcon />}
            </Button>
          </Grid>
          {rearpads ?
            <>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    hiddenLabel
                    className='input-outer'
                    id="filled-hidden-label-small"
                    value={rearPadsMake}
                    onChange={e => setRearPadsMake(e.target.value)}
                    placeholder="MAKE"
                    variant="filled"
                    size="small"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    hiddenLabel
                    className='input-outer'
                    value={rearPadsModel}
                    onChange={e => setRearPadsModel(e.target.value)}
                    id="filled-hidden-label-small"
                    placeholder="MODEL"
                    variant="filled"
                    size="small"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    disabled
                    hiddenLabel
                    className='input-outer'
                    value=""
                    id="filled-hidden-label-small"
                    placeholder="TIME(HH:MM)"
                    variant="filled"
                    size="small"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    hiddenLabel
                    className='input-outer'
                    value={rearPadsSession}
                    onChange={e => setRearPadsSession(e.target.value)}
                    id="filled-hidden-label-small"
                    placeholder="SESSIONS"
                    variant="filled"
                    size="small"
                  />
                </Grid>
              </Grid>
            </>
            : ''}
          <Grid item xs={6}>
            <Button onClick={frontRotatorsEditOpen} className="btn-grey">
              FRONT ROTATORS{frontrotators ? <CancelIcon /> : <EditIcon />}
            </Button>
          </Grid>
          {frontrotators ?
            <>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    hiddenLabel
                    className='input-outer'
                    id="filled-hidden-label-small"
                    value={frontRotatorsMake}
                    onChange={e => setFrontRotatorsMake(e.target.value)}
                    placeholder="MAKE"
                    variant="filled"
                    size="small"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    hiddenLabel
                    className='input-outer'
                    value={frontRotatorsModel}
                    onChange={e => setFrontRotatorsModel(e.target.value)}
                    id="filled-hidden-label-small"
                    placeholder="MODEL"
                    variant="filled"
                    size="small"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    disabled
                    hiddenLabel
                    className='input-outer'
                    value=""
                    id="filled-hidden-label-small"
                    placeholder="TIME(HH:MM)"
                    variant="filled"
                    size="small"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    hiddenLabel
                    className='input-outer'
                    value={frontRotatorsSession}
                    onChange={e => setFrontRotatorsSession(e.target.value)}
                    id="filled-hidden-label-small"
                    placeholder="SESSIONS"
                    variant="filled"
                    size="small"
                  />
                </Grid>
              </Grid>
            </>
            : ''}
          <Grid item xs={6}>
            <Button onClick={rearRotatorsEditOpen} className="btn-grey">
              REAR ROTATORS{rearrotators ? <CancelIcon /> : <EditIcon />}
            </Button>
          </Grid>
          {rearrotators ?
            <>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    hiddenLabel
                    className='input-outer'
                    id="filled-hidden-label-small"
                    value={rearRotatorsMake}
                    onChange={e => setRearRotatorsMake(e.target.value)}
                    placeholder="MAKE"
                    variant="filled"
                    size="small"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    hiddenLabel
                    className='input-outer'
                    value={rearRotatorsModel}
                    onChange={e => setRearRotatorsModel(e.target.value)}
                    id="filled-hidden-label-small"
                    placeholder="MODEL"
                    variant="filled"
                    size="small"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    disabled
                    hiddenLabel
                    className='input-outer'
                    value=""
                    id="filled-hidden-label-small"
                    placeholder="TIME(HH:MM)"
                    variant="filled"
                    size="small"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    hiddenLabel
                    className='input-outer'
                    value={rearRotatorsSession}
                    onChange={e => setRearRotatorsSession(e.target.value)}
                    id="filled-hidden-label-small"
                    placeholder="SESSIONS"
                    variant="filled"
                    size="small"
                  />
                </Grid>
              </Grid>
            </>
            : ''}
          <Grid item xs={6}>
            <Button onClick={frontCalipersEditOpen} className="btn-grey">
              FRONT CALIPERS{frontcalipers ? <CancelIcon /> : <EditIcon />}
            </Button>
          </Grid>
          {frontcalipers ?
            <>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    hiddenLabel
                    className='input-outer'
                    id="filled-hidden-label-small"
                    value={frontCalipersMake}
                    onChange={e => setFrontCalipersMake(e.target.value)}
                    placeholder="MAKE"
                    variant="filled"
                    size="small"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    hiddenLabel
                    className='input-outer'
                    value={frontCalipersModel}
                    onChange={e => setFrontCalipersModel(e.target.value)}
                    id="filled-hidden-label-small"
                    placeholder="MODEL"
                    variant="filled"
                    size="small"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    disabled
                    hiddenLabel
                    className='input-outer'
                    value=""
                    id="filled-hidden-label-small"
                    placeholder="TIME(HH:MM)"
                    variant="filled"
                    size="small"
                  />
                </Grid>
              </Grid>
            </>
            : ''}
          <Grid item xs={6}>
            <Button onClick={rearCalipersEditOpen} className="btn-grey">
              REAR CALIPERS{rearcalipers ? <CancelIcon /> : <EditIcon />}
            </Button>
          </Grid>
          {rearcalipers ?
            <>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    hiddenLabel
                    className='input-outer'
                    id="filled-hidden-label-small"
                    value={rearCalipersMake}
                    onChange={e => setRearCalipersMake(e.target.value)}
                    placeholder="MAKE"
                    variant="filled"
                    size="small"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    hiddenLabel
                    className='input-outer'
                    value={rearCalipersModel}
                    onChange={e => setRearCalipersModel(e.target.value)}
                    id="filled-hidden-label-small"
                    placeholder="MODEL"
                    variant="filled"
                    size="small"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    disabled
                    hiddenLabel
                    className='input-outer'
                    value=""
                    id="filled-hidden-label-small"
                    placeholder="TIME(HH:MM)"
                    variant="filled"
                    size="small"
                  />
                </Grid>
              </Grid>
            </>
            : ''}
          <Grid item xs={6}>
            <Button onClick={brakeDuctsEditOpen} className="btn-grey">
              BRAKE DUCTS{brakeducts ? <CancelIcon /> : <EditIcon />}
            </Button>
          </Grid>
          {brakeducts ?
            <>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <input type="checkbox" onChange={handleCheckbox} />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    hiddenLabel
                    className='input-outer'
                    value={brakeDuctsPercentage}
                    onChange={e => setBrakeDuctsPercentage(e.target.value)}
                    id="filled-hidden-label-small"
                    placeholder="Please enter number between 0-100%"
                    variant="filled"
                    size="small"
                  />
                </Grid>
              </Grid>
            </>
            : ''}
          <Grid item xs={6}>
            <Box sx={{ display: 'flex' }}>
              <Button className="create-crew-button" >
                SAVE
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}

export default Brakes