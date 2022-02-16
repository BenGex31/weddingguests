import React from "react";
import { Avatar, Typography, Grid } from "@mui/material";
import theme from "../core/theme/MuiTheme";
import camille from "../assets/CB-078.jpg";
import benjamin from "../assets/CB-079.jpeg";
import { alexBrushRegular as alexBrush } from "../core/theme/CustomTheme";
import { oswaldRegular as OswaldR } from "../core/theme/CustomTheme";

const WeddingAvatar = () => {
  const profiles = [
    {
      image: camille,
      firstName: "Camille",
      text: "Tombée sous le charme renversant d'un beau Marseillais, la belle au bar dansant a su faire les yeux de biches à celui-ci et a réussi à faire chavirer son coeur pour qu'il puisse la rejoindre dans la ville Rose pour mener une vie à deux... enfin à quatre !",
    },
    {
      image: benjamin,
      firstName: "Benjamin",
      text: "Charmant Comptable-footeux Marseillais, venu se perdre il y a huit ans dans un bar toulousain pour rencontrer la femme de sa vie. Depuis, il est devenu toulousain, papa-sitter et développeur.",
    },
  ];
  return (
    <Grid
      container
      mb={10}
      direction={{ xs: "column", md: "row" }}
      spacing={10}
    >
      {profiles.map((profil, index) => (
        <Grid
          item
          key={index}
          xs={6}
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
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
              paddingRight: 10,
              paddingLeft: 10,
              lineHeight: 2,
            }}
            variant='body1'
            align='center'
          >
            {profil.text}
          </Typography>
        </Grid>
      ))}
    </Grid>
  );
};

export default WeddingAvatar;
