import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { Grid } from "@mui/material";
import { Button } from "@material-ui/core";

export default function ListingCard({ data, i, searchData, indexValue }) {
  const [visible, setVisible] = useState(24)

  const loadMore = () => {
    setVisible(visible + 24)
  }

  return (
    <>
      {searchData?.data.slice(0, visible).map((value, index) => {
        return (
          <React.Fragment key={index}>
            <Grid item xs={12} sm={6} md={3} lg={3} key={index}>
              <Card>
                {(indexValue === 0) ?
                  <>
                    {
                      (value !== null) ?
                        <CardActionArea>
                          <CardMedia
                            component="img"
                            height="140"
                            image={(value.photo) ? value.photo : 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png'}
                            alt="green iguana"
                          />
                          <CardContent>
                            <Typography gutterBottom variant="h5" style={{ fontWeight: 800 }}>
                              {value.name}
                            </Typography>
                            <Typography gutterBottom variant="h5" >
                              {value.nick_name}
                            </Typography>
                          </CardContent>
                        </CardActionArea>
                        : 'No Result Found'
                    }

                  </> :
                  (indexValue === 1) ?
                    <>
                      <CardActionArea>
                        <CardMedia
                          component="img"
                          height="140"
                          image={(value.user_photo) ? value.photo : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxQb-7FpQsgPRf_dpux0gNlhGLkVKZ1cizqQ&usqp=CAU'}
                          alt="green iguana"
                        />
                        <CardContent>
                          <Typography gutterBottom variant="h5" style={{ fontWeight: 800 }}>
                            {value.name}
                          </Typography>
                          <Typography gutterBottom variant="h5">
                            CIRCUIT VARIANT IE. SHORT
                          </Typography>
                          <Typography gutterBottom variant="h5">
                            {value.address}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </>
                    :
                    (indexValue === 2) ?
                      <>
                        <CardActionArea>
                          <CardMedia
                            component="img"
                            height="140"
                            image={(value.photo) ? value.photo : 'https://previews.123rf.com/images/longquattro/longquattro1908/longquattro190800267/129219757-race-track-circuit-map-banner.jpg'}
                            alt="green iguana"
                          />
                          <CardContent>
                            <Typography gutterBottom variant="h5" style={{ fontWeight: 800 }}>
                              {value.event_name}
                            </Typography>
                            <Typography gutterBottom variant="h5">
                              {new Intl.DateTimeFormat('en-GB', {
                                month: 'long',
                                day: '2-digit',
                                year: 'numeric',
                              }).format(new Date(value.created_at))}
                            </Typography>
                            <Typography gutterBottom variant="h5">
                              {value.track_name}
                            </Typography>
                            <Typography gutterBottom variant="h5">
                              CIRCUIT VARIANT IE. SHORT
                            </Typography>
                            <Typography gutterBottom variant="h5">
                              CITY, COUNTRY
                            </Typography>
                          </CardContent>
                        </CardActionArea>
                      </>
                      :
                      (indexValue === 3) ? <>
                        <Card>
                          <CardActionArea>
                            <CardMedia
                              component="img"
                              height="140"
                              image={(value.photo) ? value.photo : 'https://img.dtcn.com/image/themanual/bahrain-international-circuit-fia-500x500.jpg'}
                              alt="green iguana"
                            />
                            <CardContent>
                              <Typography gutterBottom variant="h5" style={{ fontWeight: 800 }}>
                                {value.name}
                              </Typography>
                              <Typography gutterBottom variant="h5">
                                {value.nick_name}
                              </Typography>
                            </CardContent>
                          </CardActionArea>
                        </Card>
                      </>
                        :
                        <>
                          <CardActionArea>
                            <CardMedia
                              component="img"
                              height="140"
                              image={(value.user_image) ? value.user_image : 'https://img.dtcn.com/image/themanual/bahrain-international-circuit-fia-500x500.jpg'}
                              alt="green iguana"
                            />
                            <CardContent>
                              <Typography gutterBottom variant="h5" style={{ fontWeight: 800 }}>
                                {value.user_name}
                              </Typography>
                              <Typography gutterBottom variant="h5">
                                {value.name}
                              </Typography>
                            </CardContent>
                          </CardActionArea>
                        </>
                }
              </Card>
            </Grid>
          </React.Fragment>
        )
      })}
      {(searchData?.data.length >= 24)?
        <div className="load-more-content">
          <Button className="load-more" onClick={loadMore}>
              Load More
          </Button>
        </div>
        :''
      }
    </>
  );
}