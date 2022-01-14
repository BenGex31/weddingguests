import React, { useState, useEffect } from "react";
import theme from "../core/theme/MuiTheme";
import weddingOfficial from "../assets/weddingOfficial.jpeg";
import { Box, Container, Divider, Typography } from "@mui/material";
import { oswaldExtraLight as oswaldExtra } from "../core/theme/CustomTheme";
import { alexBrushRegular as alexBrush } from "../core/theme/CustomTheme";
import NavBar from "./NavBar";

const Header = () => {
  const [mobileView, setMobileView] = useState(false);

  useEffect(() => {
    const setResponsiveness = () => {
      return window.innerWidth < 900
        ? setMobileView(true)
        : setMobileView(false);
    };

    setResponsiveness();
    window.addEventListener("resize", () => setResponsiveness());

    return () => {
      window.removeEventListener("resize", () => setResponsiveness());
    };
  }, []);

  return (
    <>
      {!mobileView ? (
        <>
          <Container
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            maxWidth='xl'
          >
            <Box
              height={801}
              width='100%'
              sx={{
                backgroundImage: `url(${weddingOfficial})`,
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                boxShadow: "0px 0px 20px" + theme.palette.secondary.main,
                borderRadius: 5,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <Divider
                sx={{ width: 656, backgroundColor: "#FFFFFF" }}
                orientation='horizontal'
              />
              <Typography
                sx={{
                  fontSize: 30,
                  fontFamily: oswaldExtra.fontFamily,
                  fontWeight: oswaldExtra.fontWeight,
                  fontStyle: oswaldExtra.fontStyle,
                  color: "#FFFFFF",
                }}
              >
                Le mariage de
              </Typography>
              <Typography
                variant='h1'
                sx={{
                  fontFamily: alexBrush.fontFamily,
                  fontWeight: alexBrush.fontWeight,
                  fontStyle: alexBrush.fontStyle,
                  color: "#FFFFFF",
                }}
              >
                Camille & Benjamin
              </Typography>
              <Divider
                sx={{ width: 656, backgroundColor: "#FFFFFF" }}
                orientation='horizontal'
              />
            </Box>
          </Container>
          <NavBar />
        </>
      ) : (
        <NavBar />
      )}
    </>
  );
};

export default Header;
