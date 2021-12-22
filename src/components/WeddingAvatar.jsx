import React from "react";
import { Avatar, Typography, Stack } from "@mui/material";
import theme from "../core/theme/MuiTheme";
import camille from "../assets/CB-078.jpg";
import benjamin from "../assets/CB-079.jpeg";
import { alexBrushRegular as alexBrush } from "../core/theme/CustomTheme";
import { oswaldRegular as OswaldR } from "../core/theme/CustomTheme";

const WeddingAvatar = () => {
  const profiles = [
    { image: camille, firstName: "Camille", text: "Présentation" },
    { image: benjamin, firstName: "Benjamin", text: "Présentation" },
  ];
  return (
    <Stack
      direction={{ xs: "column", md: "row" }}
      justifyContent='space-between'
      spacing={36}
    >
      {profiles.map((profil, index) => (
        <Stack spacing={3} key={index}>
          <Avatar
            alt={profil.firstName}
            src={profil.image}
            sx={{
              width: 300,
              height: 300,
              boxShadow: "0px 0px 20px" + theme.palette.secondary.main,
            }}
          />
          <Typography
            align='center'
            variant='h3'
            sx={{
              fontSize: 60,
              fontFamily: alexBrush.fontFamily,
              fontWeight: alexBrush.fontWeight,
              fontStyle: alexBrush.fontStyle,
              color: theme.palette.primary.main,
            }}
          >
            {profil.firstName}
          </Typography>
          <Typography
            sx={{
              fontSize: 12,
              fontFamily: OswaldR.fontFamily,
              fontWeight: OswaldR.fontWeight,
              fontStyle: OswaldR.fontStyle,
              color: theme.palette.secondary.main,
            }}
            variant='body1'
          >
            {profil.text}
          </Typography>
        </Stack>
      ))}
    </Stack>
  );
};

export default WeddingAvatar;
