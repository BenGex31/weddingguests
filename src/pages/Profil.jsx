import { Box, Container, Grid, Typography, Stack, Avatar } from "@mui/material";
import React from "react";
import Header from "../components/Header";
import NavTab from "../components/NavTab";
import theme from "../core/theme/MuiTheme";
import { alexBrushRegular } from "../core/theme/CustomTheme";
import { oswaldRegular } from "../core/theme/CustomTheme";
import { oswaldLight } from "../core/theme/CustomTheme";
import { AuthContext } from "../components/Auth";
import weddingLogo from "../assets/weddingLogo.png";
import { Redirect } from "react-router-dom";
import { Person } from "@mui/icons-material";

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
        mb={2}
        container
        justifyContent={"space-around"}
        alignItems={"flex-start"}
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
        <Grid
          sx={{
            boxShadow: "0px 0px 20px" + theme.palette.secondary.main,
            borderRadius: 5,
          }}
          item
          xs={12}
          md={3}
          lg={4}
        >
          <Stack
            sx={{ padding: 5 }}
            alignItems={"center"}
            direction={"column"}
            spacing={2}
          >
            {currentUser.photoURL !== null ? (
              <Avatar
                src={currentUser.photoURL}
                alt={
                  currentUser.displayName !== null
                    ? currentUser.displayName
                    : "User image"
                }
                sx={{
                  width: 120,
                  height: 120,
                  boxShadow: "0px 0px 20px" + theme.palette.secondary.main,
                }}
              />
            ) : (
              <Avatar
                sx={{
                  width: 120,
                  height: 120,
                  boxShadow: "0px 0px 20px" + theme.palette.secondary.main,
                }}
              >
                <Person sx={{ fontSize: 80 }} />
              </Avatar>
            )}
            {currentUser.displayName && (
              <Typography
                sx={{
                  fontFamily: oswaldRegular.fontFamily,
                  fontStyle: oswaldRegular.fontStyle,
                  fontWeight: oswaldRegular.fontWeight,
                  fontSize: 25,
                  color: theme.palette.secondary.main,
                }}
              >
                {currentUser.displayName}
              </Typography>
            )}
            {currentUser.age && (
              <Typography
                sx={{
                  fontFamily: oswaldLight.fontFamily,
                  fontStyle: oswaldLight.fontStyle,
                  fontWeight: oswaldLight.fontWeight,
                  fontSize: 18,
                  color: theme.palette.secondary.main,
                }}
              >
                {currentUser.age}
              </Typography>
            )}
            {currentUser.weddingLink && (
              <Typography
                sx={{
                  fontFamily: oswaldLight.fontFamily,
                  fontStyle: oswaldLight.fontStyle,
                  fontWeight: oswaldLight.fontWeight,
                  fontSize: 18,
                  color: theme.palette.secondary.main,
                }}
              >
                {currentUser.weddingLink}
              </Typography>
            )}
            <img
              alt='wedding logo'
              src={weddingLogo}
              width={120}
              height={120}
            />
          </Stack>
        </Grid>
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
