import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../components/Auth";
import Header from "../components/Header";
import { Typography, Divider, Grid, Container, Stack } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { oswaldRegular as OswaldR } from "../core/theme/CustomTheme";
import { alexBrushRegular as alexBrush } from "../core/theme/CustomTheme";
import theme from "../core/theme/MuiTheme";
import Cards from "../components/Card";
import Countdown from "react-countdown";
import WeddingAvatar from "../components/WeddingAvatar";
import ImageResponse from "../components/ImageResponse";
import MainTitle from "../components/MainTitle";

const Home = () => {
  const { currentUser } = useContext(AuthContext);
  console.log(currentUser);

  if (!currentUser) {
    return <Redirect to='/' />;
  }

  return (
    <Container component='main' maxWidth='xl'>
      <header>
        <Header />
      </header>
      <Grid mb={5} container justifyContent={"center"}>
        <MainTitle title='Nous avons choisi une date' />
      </Grid>
      <Grid mb={5} container justifyContent={"center"}>
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
      </Grid>
      <Grid mb={5} container justifyContent={"center"} alignItems={"center"}>
        <Divider
          sx={{
            width: 300,
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
        mb={5}
        spacing={{ xs: 3 }}
        justifyContent={"space-evenly"}
        alignItems={"center"}
        direction={{ xs: "column", md: "row" }}
      >
        <Cards
          number={
            <Countdown
              date={Date.now() + (new Date(2022, 4, 25) - new Date())}
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
              date={Date.now() + (new Date(2022, 4, 25) - new Date())}
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
              date={Date.now() + (new Date(2022, 4, 25) - new Date())}
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
              date={Date.now() + (new Date(2022, 4, 25) - new Date())}
              renderer={({ seconds }) => {
                return <span>{seconds}</span>;
              }}
            />
          }
          time={"Secondes"}
        />
      </Stack>
      <Grid mb={5} container justifyContent={"center"}>
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
      </Grid>
      <Grid mb={5} justifyContent={"center"}>
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
      </Grid>
      <WeddingAvatar />
      <ImageResponse />
    </Container>
  );
};

export default Home;
