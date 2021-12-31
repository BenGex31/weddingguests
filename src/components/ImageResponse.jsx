import { Grid, Container, Box } from "@mui/material";
import React from "react";
import invitation from "../assets/CB-102.jpg";
import theme from "../core/theme/MuiTheme";
import CustomButton from "./CustomButton";

const ImageResponse = () => {
  return (
    <Grid
      container
      alignItems='center'
      justifyContent='center'
      justifyItems='center'
    >
      <Container
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            height: 1000,
            width: 1238,
            backgroundImage: `url(${invitation})`,
            backgroundPosition: "bottom",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            borderRadius: 5,
            boxShadow: "0px 0px 20px" + theme.palette.secondary.main,
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-end",
            paddingBottom: 10,
          }}
        >
          <CustomButton text='Votre réponse' />
        </Box>
      </Container>
    </Grid>
  );
};

export default ImageResponse;
