import React, { useState } from "react";
import Header from "../components/Header";
import {
  Container,
  Grid,
  Box,
  TextField,
  MenuItem,
  Checkbox,
  ListItemText,
} from "@mui/material";
import MainTitle from "../components/MainTitle";
import imgForm from "../assets/IMG-20210523-WA0003.jpg";
import theme from "../core/theme/MuiTheme";
import { oswaldLight as oswaldFontLight } from "../core/theme/CustomTheme";

const Formulaire = () => {
  const [schedule, setSchedule] = useState([
    { label: "A la cérémonie d’engagement", checked: false },
    { label: "Au vin d’honneur & Apéritif", checked: false },
    { label: "Repas et Fiesta", checked: false },
  ]);
  const [isAllergy, setIsAllergy] = useState("");
  return (
    <Container component='main' maxWidth='xl'>
      <header>
        <Header />
      </header>
      <MainTitle title='Nous avons besoin de certaines informations' />
      <Grid container>
        <Grid item xs={12} md={6}>
          <img
            style={{
              borderRadius: 50,
              boxShadow: "0px 0px 20px" + theme.palette.secondary.main,
            }}
            width={"100%"}
            src={imgForm}
            alt='wedding fathers'
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Box
            component='form'
            sx={{
              "& .MuiTextField-root": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete='off'
          >
            <Grid container justifyContent={"space-around"}>
              <TextField
                id='presence'
                select
                variant='standard'
                label='Votre présence ?'
                sx={{
                  fontFamily: oswaldFontLight.fontFamily,
                  fontWeight: oswaldFontLight.fontWeight,
                  fontStyle: oswaldFontLight.fontStyle,
                }}
              >
                <MenuItem value={"NSP"}>Ne sais pas</MenuItem>
                <MenuItem value={"oui"}>Oui</MenuItem>
                <MenuItem value={"non"}>Non</MenuItem>
              </TextField>
              <TextField
                id='allergy'
                select
                variant='standard'
                label='Des allergies ?'
              >
                <MenuItem value={"aucune"}>Aucune</MenuItem>
                <MenuItem value={"oui"}>Oui</MenuItem>
                <MenuItem value={"non"}>Non</MenuItem>
              </TextField>
              <Grid>
                {schedule.map((item, index) => (
                  <MenuItem key={index} value={item.label}>
                    <Checkbox />
                    <ListItemText primary={item.label} />
                  </MenuItem>
                ))}
              </Grid>
              <TextField
                id='allergies'
                variant='standard'
                label='Lesquelles ?'
                value={isAllergy}
                onChange={(event) => setIsAllergy(event.target.value)}
              />
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Formulaire;
