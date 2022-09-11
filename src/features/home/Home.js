import * as React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import HomeCard from "./HomeCard";
import trackNinja from '../../img/track-ninja-logo.svg';

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export default function Home() {
  return (
    <>
      <Box className="main-head"
        sx={{
          // bgcolor: "#1B1D25",
          pt: 8,
          pb: 6,
        }}
      >
        <Container maxWidth="sm">
          <Typography variant="h5" align="center" className="home-head">
            WELCOME TO
          </Typography>
          <Typography variant="h5" align="center">

          <img src={trackNinja} alt="" />
            
          </Typography>
          <Typography
            variant="h4"
            align="center"
            color="#fff"
            gutterBottom
          >
            WHAT'S HAPPENING...
          </Typography>
          <Typography
            variant="h6"
            align="center"
            color="#fff"
            fontWeight={300}
          >
            AT A TRACK NEAR YOU
          </Typography>
        </Container>
      </Box>
      <Grid container spacing={4}>
        {cards.map((card) => (
          <Grid item key={card} xs={12} sm={6} md={3}>
            <HomeCard />
          </Grid>
        ))}
      </Grid>
    </>
  );
}