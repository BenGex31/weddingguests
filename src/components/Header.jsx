import React, { useContext } from "react";
import { AuthContext } from "./Auth";
import weddingOfficial from "../assets/weddingOfficial.jpeg";
import { Box } from "@mui/material";

const Header = () => {
  const { currentUser } = useContext(AuthContext);
  console.log(currentUser);
  return (
    <Box
      height={801}
      width={1300}
      sx={{
        backgroundImage: `url(${weddingOfficial})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    />
    /* <img
      src={weddingOfficial}
      className='img-fluid'
      width={1319}
      alt='official'
    />*/
  );
};

export default Header;
