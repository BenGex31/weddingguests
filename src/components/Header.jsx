import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "./Auth";
import theme from "../core/theme/MuiTheme";
import weddingOfficial from "../assets/weddingOfficial.jpeg";
import { Box } from "@mui/material";

const Header = () => {
  const { currentUser } = useContext(AuthContext);
  const [mobileView, setMobileView] = useState(false);
  console.log(currentUser);

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
        <Box
          height={801}
          width={1300}
          sx={{
            backgroundImage: `url(${weddingOfficial})`,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            boxShadow: "0px 0px 20px" + theme.palette.secondary.main,
          }}
        />
      ) : (
        <></>
      )}
    </>
  );
};

export default Header;
