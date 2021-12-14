import React, { useContext } from "react";
import { AuthContext } from "./Auth";
import weddingOfficial from "../assets/weddingOfficial.svg";
import Grid from "@mui/material/Grid";

const Header = () => {
  const { currentUser } = useContext(AuthContext);
  console.log(currentUser);
  return (
    <Grid container>
      <img src={weddingOfficial} alt='wedding-official' />
    </Grid>
  );
};

export default Header;
