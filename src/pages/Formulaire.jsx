import React, { useState } from "react";
import Header from "../components/Header";
import {
  Container,
  Grid,
  Box,
  TextField,
  MenuItem,
  Checkbox,
  FormGroup,
  FormControlLabel,
} from "@mui/material";
import MainTitle from "../components/MainTitle";
import imgForm from "../assets/IMG-20210523-WA0003.jpg";
import theme from "../core/theme/MuiTheme";
import { oswaldLight as oswaldFontLight } from "../core/theme/CustomTheme";

const Formulaire = () => {
  const [responsePresence, setResponsePresence] = useState("null");
  const [isAllergy, setIsAllergy] = useState("");
  const [responseAllergy, setResponseAllergy] = useState("");
  const [engagementCeremony, setEngagementCeremony] = useState(false);
  const [wineReception, setWineReception] = useState(false);
  const [meal, setMeal] = useState(false);
  const [responseChildren, setResponseChildren] = useState("");
  const [numberChildren, setNumberChildren] = useState(0);

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
                value={responsePresence}
                onChange={(event) => setResponsePresence(event.target.value)}
              >
                <MenuItem value={"Ne sais pas"}>Ne sais pas</MenuItem>
                <MenuItem value={"oui"}>Oui</MenuItem>
                <MenuItem value={"non"}>Non</MenuItem>
              </TextField>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={engagementCeremony}
                      onChange={(event) =>
                        setEngagementCeremony(event.target.checked)
                      }
                    />
                  }
                  label='A la cérémonie d’engagement'
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={wineReception}
                      onChange={(event) =>
                        setWineReception(event.target.checked)
                      }
                    />
                  }
                  label='Au vin d’honneur et Apéritif'
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={meal}
                      onChange={(event) => setMeal(event.target.checked)}
                    />
                  }
                  label='Repas et Fiesta'
                />
              </FormGroup>
              <TextField
                id='allergy'
                select
                variant='standard'
                label='Des allergies ?'
                value={responseAllergy}
                onChange={(event) => setResponseAllergy(event.target.value)}
              >
                <MenuItem value={"aucune"}>Aucune</MenuItem>
                <MenuItem value={"oui"}>Oui</MenuItem>
                <MenuItem value={"non"}>Non</MenuItem>
              </TextField>
              <TextField
                id='allergies'
                variant='standard'
                label='Lesquelles ?'
                value={isAllergy}
                onChange={(event) => setIsAllergy(event.target.value)}
              />
              <TextField
                id='children'
                select
                variant='standard'
                label='Avec des enfants ?'
                value={responseChildren}
                onChange={(event) => setResponseChildren(event.target.value)}
              >
                <MenuItem value={"Ne sait pas"}>Ne sais pas</MenuItem>
                <MenuItem value={"oui"}>Oui</MenuItem>
                <MenuItem value={"non"}>Non</MenuItem>
              </TextField>
              <TextField
                id='howManyChildren'
                variant='standard'
                label="Combien d'enfants ?"
                type={"number"}
                value={numberChildren}
                onChange={(event) =>
                  setNumberChildren(
                    parseInt(event.target.value) < 0
                      ? 0
                      : isNaN(parseInt(event.target.value))
                      ? ""
                      : parseInt(event.target.value)
                  )
                }
              />
              {/*numberChildren &&
                numberChildren.map((child, index) => (
                  <TextField
                    id={`child-${index + 1}`}
                    key={index + 1}
                    label='Nom'
                  />
                ))*/}
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Formulaire;
