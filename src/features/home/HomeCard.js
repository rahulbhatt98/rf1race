import React, {useEffect} from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { selectAuth } from "../auth/authSlice";
import { eventAsync, vehicleAsync } from "../my-events/myEventsSlice"
import { crewAsync } from "../crew/crewSlice"

export default function HomeCard() {

  const dispatch = useDispatch();
  const auth = useSelector(selectAuth);
  const userAuth = localStorage.getItem('user');
  const authId = auth?.data?.user_id;
  useEffect(() => {
    if(userAuth){
      dispatch(eventAsync(authId))
      dispatch(vehicleAsync(authId))
      dispatch(crewAsync(authId))
    }
  }, [dispatch, authId, userAuth])
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image="https://source.unsplash.com/random"
          alt="green iguana"
        />
        <CardContent>
          <Typography  className="card-profile-name"  gutterBottom variant="h5" component="div">
            Lizard
          </Typography>
          {/* <Typography variant="body2" color="text.secondary">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography> */}
        </CardContent>
      </CardActionArea>
    </Card>
  );
}