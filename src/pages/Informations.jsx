import { Container, Grid, Divider } from "@mui/material";
import { Box } from "@mui/system";
import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../components/Auth";
import Header from "../components/Header";
import MainTitle from "../components/MainTitle";
import Map from "../components/Map";
import BenCamImg from "../assets/CB-029.jpeg";
import theme from "../core/theme/MuiTheme";

const Informations = () => {
  const { currentUser } = useContext(AuthContext);

  if (!currentUser) {
    return <Redirect to='/' />;
  }

  return (
    <Container component='main' maxWidth='xl'>
      <header>
        <Header />
      </header>
      <MainTitle title='Informations utiles' />
      <Grid mt={3} mb={5} container justifyContent='center'>
        <Divider textAlign='center' sx={{ width: 433 }} />
      </Grid>
      <Grid>
        <Map />
      </Grid>
      <Grid container justifyContent='center'>
        <MainTitle title='Programme' />
        <Grid mt={3} mb={5} container justifyContent='center'>
          <Divider textAlign='center' sx={{ width: 296 }} />
        </Grid>
        <Box
          height={801}
          width={1319}
          sx={{
            backgroundImage: `url(${BenCamImg})`,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            boxShadow: "0px 0px 20px" + theme.palette.secondary.main,
            borderRadius: 5,
          }}
        />
      </Grid>
    </Container>
  );
};

export default Informations;
