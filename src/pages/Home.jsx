import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../components/Auth";
import Header from "../components/Header";
import NavBar from "../components/NavBar";
import { Stack, Typography, Divider, Grid } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { oswaldRegular as OswaldR } from "../core/theme/CustomTheme";
import { alexBrushRegular as alexBrush } from "../core/theme/CustomTheme";
import theme from "../core/theme/MuiTheme";
import Cards from "../components/Card";
import Countdown from "react-countdown";
import WeddingAvatar from "../components/WeddingAvatar";
import ImageResponse from "../components/ImageResponse";

const Home = () => {
  const { currentUser } = useContext(AuthContext);
  console.log(currentUser);

  if (!currentUser) {
    return <Redirect to='/' />;
  }

  return (
    <Grid mb={4} container justifyContent='center'>
      <Header />
      <Stack
        mb={10}
        justifyContent={"center"}
        alignItems={"center"}
        spacing={5}
      >
        <Typography
          sx={{
            fontSize: { md: 66, xs: 40 },
            fontFamily: alexBrush.fontFamily,
            fontWeight: alexBrush.fontWeight,
            fontStyle: alexBrush.fontStyle,
            color: theme.palette.primary.main,
          }}
          variant='h1'
        >
          Nous avons choisi une date
        </Typography>
        <Typography
          sx={{
            fontSize: 25,
            fontFamily: OswaldR.fontFamily,
            fontWeight: OswaldR.fontWeight,
            fontStyle: OswaldR.fontStyle,
            color: theme.palette.secondary.main,
          }}
          variant='h2'
        >
          Et nous comptons les jours!
        </Typography>
        <Grid>
          <Divider
            sx={{
              width: 617,
            }}
            orientation='horizontal'
          >
            <FavoriteIcon
              sx={{
                color: theme.palette.primary.main,
                width: 36,
                height: 31.5,
              }}
            />
          </Divider>
        </Grid>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent={"center"}
          alignItems={"center"}
          spacing={6}
        >
          <Cards
            number={
              <Countdown
                date={Date.now() + (new Date(2022, 4, 26) - new Date())}
                renderer={({ days }) => {
                  return <span>{days}</span>;
                }}
              />
            }
            time={"Jours"}
          />
          <Cards
            number={
              <Countdown
                date={Date.now() + (new Date(2022, 4, 26) - new Date())}
                renderer={({ hours }) => {
                  return <span>{hours}</span>;
                }}
              />
            }
            time={"Heures"}
          />
          <Cards
            number={
              <Countdown
                date={Date.now() + (new Date(2022, 4, 26) - new Date())}
                renderer={({ minutes }) => {
                  return <span>{minutes}</span>;
                }}
              />
            }
            time={"minutes"}
          />
          <Cards
            number={
              <Countdown
                date={Date.now() + (new Date(2022, 5, 25) - new Date())}
                renderer={({ seconds }) => {
                  return <span>{seconds}</span>;
                }}
              />
            }
            time={"Secondes"}
          />
        </Stack>
        <Stack>
          <Typography
            sx={{
              fontSize: 38,
              fontFamily: alexBrush.fontFamily,
              fontWeight: alexBrush.fontWeight,
              fontStyle: alexBrush.fontStyle,
              color: theme.palette.primary.main,
            }}
            align='center'
            variant='h3'
          >
            25 mai 2022
          </Typography>
        </Stack>
        <Stack>
          <Typography
            sx={{
              fontSize: { xs: 52, md: 90 },
              fontFamily: alexBrush.fontFamily,
              fontWeight: alexBrush.fontWeight,
              fontStyle: alexBrush.fontStyle,
              color: theme.palette.primary.main,
            }}
            align='center'
            variant='h1'
          >
            L'heureux couple
          </Typography>
        </Stack>
        <WeddingAvatar />
      </Stack>
      <ImageResponse />
    </Grid>
  );
};

export default Home;
