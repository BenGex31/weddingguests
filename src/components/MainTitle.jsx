import React from "react";
import { Grid, Typography } from "@mui/material";
import theme from "../core/theme/MuiTheme";
import { alexBrushRegular as alexBrush } from "../core/theme/CustomTheme";
import makeStyles from "@mui/styles/makeStyles";

const useStyles = makeStyles(() => ({
  titleStyle: {
    fontSize: 66,
    fontFamily: alexBrush.fontFamily,
    fontWeight: alexBrush.fontWeight,
    fontStyle: alexBrush.fontStyle,
    color: theme.palette.primary.main,
  },
}));

const MainTitle = ({ title }) => {
  const classes = useStyles();
  return (
    <Grid container justifyContent='center'>
      <Typography className={classes.titleStyle} variant='h1'>
        {title}
      </Typography>
    </Grid>
  );
};

export default MainTitle;
