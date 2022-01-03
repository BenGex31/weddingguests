import { Container, Grid } from "@mui/material";
import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../components/Auth";
import Header from "../components/Header";
import MainTitle from "../components/MainTitle";
import Map from "../components/Map";

const Informations = () => {
  /*const configHotel = {
    method: "get",
    mode: "no-cors",
    url:
      "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522%2C151.1957362&radius=1500&type=hotel&key=" +
      reactMapConfig.REACT_APP_MAP_API_KEY,
    headers: {
      "Access-Control-Allow-Origin": " https://maps.googleapis.com/maps/api/",
    },
  };

  useEffect(() => {
    axios(configHotel)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  });*/

  const { currentUser } = useContext(AuthContext);

  if (!currentUser) {
    return <Redirect to='/' />;
  }

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
