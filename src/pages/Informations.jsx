import { Container, Grid } from "@mui/material";
import React from "react";
import Header from "../components/Header";
import MainTitle from "../components/MainTitle";
import Map from "../components/Map";

const Informations = () => {
  return (
    <Container component='main' maxWidth='lg'>
      <header>
        <Header />
      </header>
      <MainTitle title='Informations utiles' />
      <Grid>
        <Map />
      </Grid>
    </Container>
  );
};

export default Informations;
