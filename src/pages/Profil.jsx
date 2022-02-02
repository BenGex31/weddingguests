import { Box, Container, Grid, Typography } from "@mui/material";
import React from "react";
import Header from "../components/Header";
import theme from "../core/theme/MuiTheme";
import { alexBrushRegular } from "../core/theme/CustomTheme";

const Profil = () => {
  return (
    <Container component='main' maxWidth='xl'>
      <header>
        <Header />
      </header>
      <Grid
        mb={2}
        container
        sx={{
          boxShadow: "0px 0px 20px" + theme.palette.secondary.main,
          borderRadius: 5,
          height: 731,
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: 222,
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
      </Grid>
    </Container>
  );
};

export default Profil;
