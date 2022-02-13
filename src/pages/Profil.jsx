import { Box, Container, Grid, Typography } from "@mui/material";
import React from "react";
import Header from "../components/Header";
import NavTab from "../components/NavTab";
import theme from "../core/theme/MuiTheme";
import { alexBrushRegular } from "../core/theme/CustomTheme";
import { AuthContext } from "../components/Auth";
import { Redirect } from "react-router-dom";
import UserProfil from "../components/UserProfil";

const Profil = () => {
  const { currentUser } = React.useContext(AuthContext);

  if (!currentUser) {
    return <Redirect to='/' />;
  }

  return (
    <Container component='main' maxWidth='xl'>
      <header>
        <Header />
      </header>
      <Grid
        container
        justifyContent={"space-around"}
        alignItems={"center"}
        sx={{
          boxShadow: "0px 0px 20px" + theme.palette.secondary.main,
          borderRadius: 5,
          height: 630,
          marginBottom: 5,
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: 140,
            backgroundColor: theme.palette.primary.main,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          }}
        >
          <Typography
            sx={{
              fontSize: 50,
              fontFamily: alexBrushRegular.fontFamily,
              fontStyle: alexBrushRegular.fontStyle,
              fontWeight: alexBrushRegular.fontWeight,
            }}
            mt={5}
            align='center'
          >
            Votre profil
          </Typography>
        </Box>
        <UserProfil />
        <Grid
          sx={{
            boxShadow: "0px 0px 20px" + theme.palette.secondary.main,
            borderRadius: 5,
          }}
          item
          xs={12}
          md={7}
        >
          <Grid container justifyContent={"space-around"}>
            <NavTab />
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Profil;
