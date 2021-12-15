import React from "react";
import { Grid, Typography } from "@mui/material";
import theme from "../core/theme/MuiTheme";
import { alexBrushRegular as alexBrush } from "../core/theme/CustomTheme";

const MainTitle = ({ title }) => {
  return (
    <Grid container justifyContent='center'>
      <Typography
        sx={{
          fontSize: 66,
          fontFamily: alexBrush.fontFamily,
          fontWeight: alexBrush.fontWeight,
          fontStyle: alexBrush.fontStyle,
          color: theme.palette.primary.main,
        }}
        variant='h1'
      >
        {title}
      </Typography>
    </Grid>
  );
};

export default MainTitle;
