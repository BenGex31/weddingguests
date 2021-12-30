import React from "react";
import { Avatar, Typography, Stack, Grid } from "@mui/material";
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
      text: "Lorem ipsum dolor sit amet. Ea sint dolores qui architecto harum qui dolor reiciendis a dolorum nihil qui eaque maxime. Et officia tenetur et quis vitae eos similique mollitia ut delectus atque et nobis praesentium est dolores labore et vero quisquam. At fugit voluptatem eum vitae beatae aut explicabo recusandae et aspernatur iusto eos autem molestias ut omnis sint rem rerum minima!",
    },
    {
      image: benjamin,
      firstName: "Benjamin",
      text: "Lorem ipsum dolor sit amet. Ea sint dolores qui architecto harum qui dolor reiciendis a dolorum nihil qui eaque maxime. Et officia tenetur et quis vitae eos similique mollitia ut delectus atque et nobis praesentium est dolores labore et vero quisquam. At fugit voluptatem eum vitae beatae aut explicabo recusandae et aspernatur iusto eos autem molestias ut omnis sint rem rerum minima!",
    },
  ];
  return (
    <Grid
      container
      height={1000}
      direction='row'
      justifyContent='space-between'
    >
      {profiles.map((profil, index) => (
        <Grid direction='column' container alignItems='center' key={index}>
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
