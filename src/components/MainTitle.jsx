import React from "react";
import { Typography } from "@mui/material";
import theme from "../core/theme/MuiTheme";
import { alexBrushRegular as alexBrush } from "../core/theme/CustomTheme";

const MainTitle = ({ title }) => {
  return (
    <Typography
      sx={{
        fontSize: { md: 66, xs: 40 },
        fontFamily: alexBrush.fontFamily,
        fontWeight: alexBrush.fontWeight,
        fontStyle: alexBrush.fontStyle,
        color: theme.palette.primary.main,
      }}
      align='center'
      variant='h1'
    >
      {title}
    </Typography>
  );
};

export default MainTitle;
