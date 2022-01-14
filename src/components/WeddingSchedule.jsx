import { Stack, Typography, Divider } from "@mui/material";
import React from "react";
import theme from "../core/theme/MuiTheme";
import { oswaldExtraLight as oswaldExtra } from "../core/theme/CustomTheme";
import { alexBrushRegular as alexBrush } from "../core/theme/CustomTheme";

const WeddingSchedule = ({ hour, text }) => {
  return (
    <Stack
      spacing={1}
      justifyContent={"center"}
      alignItems={"center"}
      direction='column'
      divider={
        <Divider
          sx={{
            backgroundColor: theme.palette.primary.light,
            width: 46,
            alignSelf: "center",
          }}
          orientation='horizontal'
          flexItem
        />
      }
    >
      <Typography
        sx={{
          fontFamily: oswaldExtra.fontFamily,
          fontSize: 20,
          fontStyle: oswaldExtra.fontStyle,
          fontWeight: oswaldExtra.fontWeight,
          color: theme.palette.primary.light,
        }}
      >
        {hour}
      </Typography>
      <Typography
        sx={{
          fontFamily: alexBrush.fontFamily,
          fontSize: 32,
          fontStyle: alexBrush.fontStyle,
          fontWeight: alexBrush.fontWeight,
          color: theme.palette.primary.light,
        }}
      >
        {text}
      </Typography>
    </Stack>
  );
};

export default WeddingSchedule;
