import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../components/Auth";
import Header from "../components/Header";
import NavBar from "../components/NavBar";
import MainTitle from "../components/MainTitle";
import { Grid, Stack, Typography, Divider } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { oswaldRegular as OswaldR } from "../core/theme/CustomTheme";
import theme from "../core/theme/MuiTheme";

const Home = () => {
  const { currentUser } = useContext(AuthContext);
  console.log(currentUser);

  if (!currentUser) {
    return <Redirect to='/' />;
  }

  return (
    <Grid>
      <header>
        <Header />
        <NavBar />
      </header>
      <MainTitle title='Nous avons choisi une date' />
      <Stack mt={1}>
        <Typography
          sx={{
            fontSize: 25,
            fontFamily: OswaldR.fontFamily,
            fontWeight: OswaldR.fontWeight,
            fontStyle: OswaldR.fontStyle,
            color: theme.palette.secondary.main,
          }}
          align='center'
          variant='h2'
        >
          Et nous comptons les jours!
        </Typography>
      </Stack>
      <Stack alignItems='center' mt={4.5}>
        <Divider sx={{ width: 617 }} orientation='horizontal'>
          <FavoriteIcon
            sx={{ color: theme.palette.primary.main, width: 36, height: 31.5 }}
          />
        </Divider>
      </Stack>
    </Grid>
  );
};

export default Home;
