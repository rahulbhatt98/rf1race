import React from 'react'
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";
import { selectAuth } from "../auth/authSlice";

const ProfileHeader = () => {
    const auth = useSelector(selectAuth);
    return (
        <>
            <Box className="main-head"
                sx={{
                    bgcolor: "#1B1D25",
                    pt: 8,
                    pb: 6,
                }}
            >
                <Box sx={{ display: 'flex' }}>
                    <div>
                        <img src={(auth?.data?.photo?.length>0) ? `${auth?.data?.photo}` : "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"} alt="" style={{ width: '100px', height: '100px', borderRadius: '50px' }} />
                    </div>
                    <div className="profile-text">
                        <Typography
                            variant="h6"
                            align="left"
                            color="#fff"
                            className="profile-heading">
                        
                            {(auth?.data?.name) ? auth?.data?.name : `${auth?.data?.first_name} ${auth?.data?.last_name}`}
                        </Typography>
                        <Typography> {(auth?.data?.nick_name) ? auth?.data?.nick_name : 'Driver Nickname'}</Typography>
                        <Typography> Hometown, country </Typography>
                    </div>
                </Box>
            </Box>
        </>
    )
}

export default ProfileHeader