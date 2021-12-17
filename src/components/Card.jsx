import React from "react";
import { oswaldRegular as OswaldR } from "../core/theme/CustomTheme";
import theme from "../core/theme/MuiTheme";
import { Card, Typography, Stack } from "@mui/material";

const Cards = ({ number, time }) => {
  return (
    <Card
      sx={{
        width: 146,
        height: 104,
        backgroundColor: theme.palette.primary.main,
        fontFamily: OswaldR.fontFamily,
        fontWeight: OswaldR.fontWeight,
        fontStyle: OswaldR.fontStyle,
        padding: 0,
      }}
    >
      <Stack spacing={2}>
        <Typography
          sx={{ fontSize: 53, color: theme.palette.primary.light }}
          variant='h3'
          align='center'
        >
          {number}
        </Typography>
        <Typography
          sx={{ fontSize: 15, color: theme.palette.primary.light }}
          variant='body2'
          align='center'
        >
          {time}
        </Typography>
      </Stack>
    </Card>
  );
};

export default Cards;
