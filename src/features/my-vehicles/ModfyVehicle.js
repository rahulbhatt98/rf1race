import React from 'react'
import Safety from './Safety'
import Engine from './Engine'
import Aero from './Aero'
import Brakes from './Brakes'
import Suspension from './Suspension'
import Drivetrain from './Drivetrain'

const ModfyVehicle = ({ indexValue, message }) => {
    return (
        <>
            {(indexValue === 0) ?
                <>
                    <Engine />
                </>
                :
                (indexValue === 1) ?
                    <>
                        <Suspension />
                    </>
                    :
                    (indexValue === 2) ?
                        <>
                            <Drivetrain />
                        </>
                        :
                        (indexValue === 3) ?
                            <>
                                <Brakes />
                            </>
                            :
                            (indexValue === 4) ?
                                <>
                                    <Aero />
                                </>
                                :
                                <>
                                    <Safety />
                                </>}
        </>
    )
}

export default ModfyVehicle