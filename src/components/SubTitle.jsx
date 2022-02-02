import React from "react";
import { Typography } from "@mui/material";
import theme from "../core/theme/MuiTheme";
import { alexBrushRegular as alexBrush } from "../core/theme/CustomTheme";

const SubTitle = ({ title, guestCount }) => {
  return (
    <Typography
      sx={{
        fontSize: { md: 30, xs: 20 },
        fontFamily: alexBrush.fontFamily,
        fontWeight: alexBrush.fontWeight,
        fontStyle: alexBrush.fontStyle,
        color: theme.palette.primary.main,
      }}
      align='center'
      variant='h1'
    >
      {`${title} (${guestCount})`}
    </Typography>
  );
};

export default SubTitle;
