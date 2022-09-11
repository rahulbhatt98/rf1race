import * as React from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
// import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  height: "186px",
  backgroundColor: "inherit",
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

export default function DriverDetail() {
  return (
    <Box
      sx={{
        // bgcolor: "background.paper",
        pt: 8,
        pb: 6,
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Item>Driver name</Item>
        </Grid>
        <Grid item xs={3}>
          <Item>Most used vehicle</Item>
        </Grid>
        <Grid item xs={3}>
          <Item>Recent event</Item>
        </Grid>
        <Grid item xs={3}>
          <Item>Crews</Item>
        </Grid>
        <Grid item xs={3}>
          <Item>Achievements</Item>
        </Grid>
      </Grid>
    </Box>
  );
}
