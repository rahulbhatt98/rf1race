import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { Grid } from "@mui/material";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { Button } from "@mui/material";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const VehicleCard = ({ data }) => {
    let history = useHistory();
    const handleAddVehicle = () => {
        history.push("/add-vehicle")
    }
    return (
        <>
            {data?.data?.map((value, index) => {
                return (
                    <Grid item xs={12} sm={6} md={3} lg={3} key={index}>
                        <Card>
                            <CardActionArea>
                                <Link
                                    to={`/vehicle-selected/${value.vehicle_id}`}
                                >
                                    <CardMedia
                                        component="img"
                                        height="140"
                                        image={(value.photo) ? value.vehicle_photo : 'https://media.istockphoto.com/photos/red-generic-sedan-car-isolated-on-white-background-3d-illustration-picture-id1189903200?k=20&m=1189903200&s=612x612&w=0&h=L2bus_XVwK5_yXI08X6RaprdFKF1U9YjpN_pVYPgS0o='}
                                        alt="green iguana"
                                    />
                                </Link>
                                <CardContent>
                                    <Link
                                        to={`/vehicle-selected/${value.vehicle_id}`}
                                        style={{ textDecoration: 'none' }}
                                    >
                                        <Typography gutterBottom variant="h5" style={{ fontWeight: 800 }}>
                                            {value.vehicle_make} {value.vehicle_model}
                                        </Typography>
                                        <Typography gutterBottom variant="h5">
                                            {value.vehicle_nickname}
                                        </Typography>
                                    </Link>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                )
            })
            }
            <Button className='add-vehicles' onClick={handleAddVehicle}>
                Add
                <AddCircleOutlineIcon />
            </Button>
        </>
    )
}

export default VehicleCard