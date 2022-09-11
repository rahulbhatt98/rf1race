import React, { useState } from 'react'
import Grid from "@mui/material/Grid";
import EditIcon from '@mui/icons-material/Edit';
import Box from '@mui/material/Box';
import { Button, TextField } from "@material-ui/core";
import CancelIcon from '@mui/icons-material/Cancel';

const Safety = () => {
    const [roll, setRoll] = useState(false)
    const [firee, setFireE] = useState(false)
    const [fires, setFireS] = useState(false)
    const [fuel, setFuel] = useState(false)

    const [rollMake, setRollMake] = useState('')
    const [rollModel, setRollModel] = useState('')
    const [fireeMake, setFireeMake] = useState('')
    const [firerModel, setFireeModel] = useState('')
    const [firesMake, setFiresMake] = useState('')
    const [firesModel, setFiresModel] = useState('')
    const [fuelMake, setFuelMake] = useState('')
    const [fuelModel, setFuelModel] = useState('')


    const rollEditOpen = () => {
        setRoll(prevCheck => !prevCheck)
    }
    const fireEEditOpen = () => {
        setFireE(prevCheck => !prevCheck)
    }
    const fireSEditOpen = () => {
        setFireS(prevCheck => !prevCheck)
    }
    const fuelEditOpen = () => {
        setFuel(prevCheck => !prevCheck)
    }
    return (
        <>
            <Grid container>
                <Grid item xs={8}>
                    <Grid item xs={6}>
                        <Button onClick={rollEditOpen} className="btn-grey">
                            ROLL CAGE{roll ? <CancelIcon /> : <EditIcon />}
                        </Button>
                    </Grid>
                    {roll ?
                        <>
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <TextField
                                        fullWidth
                                        hiddenLabel
                                        className='input-outer'
                                        id="filled-hidden-label-small"
                                        value={rollMake}
                                        onChange={e => setRollMake(e.target.value)}
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
                                        value={rollModel}
                                        onChange={e => setRollModel(e.target.value)}
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
                        <Button onClick={fireEEditOpen} className="btn-grey">
                            FIRE EXTINGUISHER{firee ? <CancelIcon /> : <EditIcon />}
                        </Button>
                    </Grid>
                    {firee ?
                        <>
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <TextField
                                        fullWidth
                                        hiddenLabel
                                        className='input-outer'
                                        id="filled-hidden-label-small"
                                        value={fireeMake}
                                        onChange={e => setFireeMake(e.target.value)}
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
                                        id="filled-hidden-label-small"
                                        value={firerModel}
                                        onChange={e => setFireeModel(e.target.value)}
                                        placeholder="MODEL"
                                        variant="filled"
                                        size="small"
                                    />
                                </Grid>
                            </Grid>
                        </>
                        : ''}
                    <Grid item xs={6}>
                        <Button onClick={fireSEditOpen} className="btn-grey">
                            FIRE SUPRESSION{fires ? <CancelIcon /> : <EditIcon />}
                        </Button>
                    </Grid>
                    {fires ?
                        <>
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <TextField
                                        fullWidth
                                        hiddenLabel
                                        value={firesMake}
                                        onChange={e => setFiresMake(e.target.value)}
                                        className='input-outer'
                                        id="filled-hidden-label-small"
                                        placeholder="MAKE"
                                        variant="filled"
                                        size="small"
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        fullWidth
                                        hiddenLabel
                                        value={firesModel}
                                        onChange={e => setFiresModel(e.target.value)}
                                        className='input-outer'
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
                        <Button onClick={fuelEditOpen} className="btn-grey">
                            FUEL CELL{fuel ? <CancelIcon /> : <EditIcon />}
                        </Button>
                    </Grid>
                    {fuel ?
                        <>
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <TextField
                                        fullWidth
                                        hiddenLabel
                                        value={fuelMake}
                                        onChange={e => setFuelMake(e.target.value)}
                                        className='input-outer'
                                        id="filled-hidden-label-small"
                                        placeholder="MAKE"
                                        variant="filled"
                                        size="small"
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        fullWidth
                                        hiddenLabel
                                        value={fuelModel}
                                        onChange={e => setFuelModel(e.target.value)}
                                        className='input-outer'
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

export default Safety