import { Container, Grid, Divider } from "@mui/material";
import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../components/Auth";
import Header from "../components/Header";
import MainTitle from "../components/MainTitle";
import Map from "../components/Map";

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
    </Container>
  );
};

export default Informations;
