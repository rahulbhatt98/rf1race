import React from 'react'
import ProfileHeader from '../account/ProfileHeader'
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";

const Crew = () => {
    return (
        <>
            <ProfileHeader />
            <div className='crew-head'>
                <h1>
                    CREWS
                </h1>
            </div>
            <div className="create-crew">
                <Link to="/create-crew" variant="body2">
                    <Button className="create-crew-button">
                        CREATE A CREW
                    </Button>
                </Link>
            </div>
            <div className="find-crew">
                <Link to="/find-crew" variant="body2">
                    <Button className="find-crew-button">
                        FIND A CREW
                    </Button>
                </Link>
            </div>
        </>
    )
}

export default Crew