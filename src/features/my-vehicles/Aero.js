import React, { useState } from 'react'
import Grid from "@mui/material/Grid";
import EditIcon from '@mui/icons-material/Edit';
import Box from '@mui/material/Box';
import { Button, TextField } from "@material-ui/core";
import CancelIcon from '@mui/icons-material/Cancel';

const Aero = () => {
  const [frontsplitter, setFrontSplitter] = useState(false)
  const [rearwing, setRearWing] = useState(false)
  const [frontfenders, setFrontFenders] = useState(false)
  const [rearfenders, setRearFenders] = useState(false)
  const [reardiffuser, setRearDiffuser] = useState(false)
  const [flatfloor, setFlatFloor] = useState(false)
  const [canards, setCanards] = useState(false)

  const [frontSplitterMake, setFrontSplitterMake] = useState('')
  const [frontSplitterModel, setFrontSplitterModel] = useState('')
  const [frontSplitterAdjustment, setFrontSplitterAdjustment] = useState('')
  const [rearwingMake, setRearwingMake] = useState('')
  const [rearwingModel, setRearwingModel] = useState('')
  const [rearwingAdjustment, setRearwingAdjustment] = useState('')
  const [frontfendersMake, setFrontFendersMake] = useState('')
  const [frontfendersModel, setFrontFendersModel] = useState('')
  const [rearfendersMake, setRearFendersMake] = useState('')
  const [rearfendersModel, setRearFendersModel] = useState('')
  const [reardiffuserMake, setRearDiffuserMake] = useState('')
  const [reardiffuserModel, setRearDiffuserModel] = useState('')
  const [flatfloorMake, setFlatFloorMake] = useState('')
  const [flatfloorModel, setFlatfloorModel] = useState('')
  const [canardsMake, setCanardsMake] = useState('')
  const [canardsModel, setCanardsModel] = useState('')

  const frontSplitterOpen = () => {
    setFrontSplitter(prevCheck => !prevCheck)
  }
  const rearwingEditOpen = () => {
    setRearWing(prevCheck => !prevCheck)
  }
  const frontFenderOpen = () => {
    setFrontFenders(prevCheck => !prevCheck)
  }
  const rearFenderOpen = () => {
    setRearFenders(prevCheck => !prevCheck)
  }
  const rearDiffuserOpen = () => {
    setRearDiffuser(prevCheck => !prevCheck)
  }
  const flatFloorOpen = () => {
    setFlatFloor(prevCheck => !prevCheck)
  }
  const canardsOpen = () => {
    setCanards(prevCheck => !prevCheck)
  }


  return (
    <>
      <Grid container>
        <Grid item xs={8}>
          <Grid item xs={6}>
            <Button onClick={frontSplitterOpen} className="btn-grey">
              FRONT SPLITTER{frontsplitter ? <CancelIcon /> : <EditIcon />}
            </Button>
          </Grid>
          {frontsplitter ?
            <>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    hiddenLabel
                    className='input-outer'
                    id="filled-hidden-label-small"
                    value={frontSplitterMake}
                    onChange={e => setFrontSplitterMake(e.target.value)}
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
                    value={frontSplitterModel}
                    onChange={e => setFrontSplitterModel(e.target.value)}
                    id="filled-hidden-label-small"
                    placeholder="MODEL"
                    variant="filled"
                    size="small"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    hiddenLabel
                    className='input-outer'
                    value={frontSplitterAdjustment}
                    onChange={e => setFrontSplitterAdjustment(e.target.value)}
                    id="filled-hidden-label-small"
                    placeholder="ADJUSTMENT"
                    variant="filled"
                    size="small"
                  />
                </Grid>
              </Grid>
            </>
            : ''}
          <Grid item xs={6}>
            <Button onClick={rearwingEditOpen} className="btn-grey">
              rearwing{rearwing ? <CancelIcon /> : <EditIcon />}
            </Button>
          </Grid>
          {rearwing ?
            <>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    hiddenLabel
                    className='input-outer'
                    id="filled-hidden-label-small"
                    value={rearwingMake}
                    onChange={e => setRearwingMake(e.target.value)}
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
                    value={rearwingModel}
                    onChange={e => setRearwingModel(e.target.value)}
                    id="filled-hidden-label-small"
                    placeholder="MODEL"
                    variant="filled"
                    size="small"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    hiddenLabel
                    className='input-outer'
                    value={rearwingAdjustment}
                    onChange={e => setRearwingAdjustment(e.target.value)}
                    id="filled-hidden-label-small"
                    placeholder="ADJUSTMENT"
                    variant="filled"
                    size="small"
                  />
                </Grid>
              </Grid>
            </>
            : ''}
          <Grid item xs={6}>
            <Button onClick={frontFenderOpen} className="btn-grey">
              FRONT FENDERS{frontfenders ? <CancelIcon /> : <EditIcon />}
            </Button>
          </Grid>
          {frontfenders ?
            <>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    hiddenLabel
                    className='input-outer'
                    id="filled-hidden-label-small"
                    value={frontfendersMake}
                    onChange={e => setFrontFendersMake(e.target.value)}
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
                    value={frontfendersModel}
                    onChange={e => setFrontFendersModel(e.target.value)}
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
            <Button onClick={rearFenderOpen} className="btn-grey">
              REAR FENDERS{rearfenders ? <CancelIcon /> : <EditIcon />}
            </Button>
          </Grid>
          {rearfenders ?
            <>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    hiddenLabel
                    className='input-outer'
                    id="filled-hidden-label-small"
                    value={rearfendersMake}
                    onChange={e => setRearFendersMake(e.target.value)}
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
                    value={rearfendersModel}
                    onChange={e => setRearFendersModel(e.target.value)}
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
            <Button onClick={rearDiffuserOpen} className="btn-grey">
              REAR DIFFUSER{reardiffuser ? <CancelIcon /> : <EditIcon />}
            </Button>
          </Grid>
          {reardiffuser ?
            <>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    hiddenLabel
                    className='input-outer'
                    id="filled-hidden-label-small"
                    value={reardiffuserMake}
                    onChange={e => setRearDiffuserMake(e.target.value)}
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
                    value={reardiffuserModel}
                    onChange={e => setRearDiffuserModel(e.target.value)}
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
            <Button onClick={flatFloorOpen} className="btn-grey">
              FLAT FLOOR{flatfloor ? <CancelIcon /> : <EditIcon />}
            </Button>
          </Grid>
          {flatfloor ?
            <>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    hiddenLabel
                    className='input-outer'
                    id="filled-hidden-label-small"
                    value={flatfloorMake}
                    onChange={e => setFlatFloorMake(e.target.value)}
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
                    value={flatfloorModel}
                    onChange={e => setFlatfloorModel(e.target.value)}
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
            <Button onClick={canardsOpen} className="btn-grey">
              CANARDS{canards ? <CancelIcon /> : <EditIcon />}
            </Button>
          </Grid>
          {canards ?
            <>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    hiddenLabel
                    className='input-outer'
                    id="filled-hidden-label-small"
                    value={canardsMake}
                    onChange={e => setCanardsMake(e.target.value)}
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
                    value={canardsModel}
                    onChange={e => setCanardsModel(e.target.value)}
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

export default Aero