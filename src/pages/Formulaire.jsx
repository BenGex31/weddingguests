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
import Button from "../components/Button";
import MainTitle from "../components/MainTitle";
import imgForm from "../assets/IMG-20210523-WA0003.jpg";
import theme from "../core/theme/MuiTheme";
import { oswaldLight as oswaldFontLight } from "../core/theme/CustomTheme";
import { AddReaction } from "@mui/icons-material";
import firebaseConfig from "../config/firebase";

const Formulaire = () => {
  const [responsePresence, setResponsePresence] = useState("null");
  const [isAllergy, setIsAllergy] = useState("");
  const [responseAllergy, setResponseAllergy] = useState("");
  const [engagementCeremony, setEngagementCeremony] = useState(false);
  const [wineReception, setWineReception] = useState(false);
  const [meal, setMeal] = useState(false);
  const [responseChildren, setResponseChildren] = useState("");
  const [childrenList, setChildrenList] = useState([]);

  const onLastNameChange = (event, index) => {
    let array = [...childrenList];
    array[index].lastName = event.target.value;
    setChildrenList(array);
  };

  const onFirstNameChange = (event, index) => {
    let array = [...childrenList];
    array[index].firstName = event.target.value;
    setChildrenList(array);
  };

  const onAgeChange = (event, index) => {
    let array = [...childrenList];
    array[index].age =
      parseInt(event.target.value) < 0
        ? 0
        : isNaN(parseInt(event.target.value))
        ? ""
        : parseInt(event.target.value);
    setChildrenList(array);
  };

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
            <Grid
              container
              alignItems={"center"}
              justifyContent={"space-around"}
            >
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
              {responseChildren === "oui" && (
                <Button
                  text={"Ajouter un enfant"}
                  variant={"contained"}
                  startIcon={<AddReaction />}
                  size={"small"}
                  style={{
                    height: 35,
                    backgroundColor: theme.palette.primary.main,
                    color: theme.palette.primary.light,
                  }}
                  onClick={() =>
                    setChildrenList((childrenList) => [
                      ...childrenList,
                      {
                        firstName: "",
                        lastName: "",
                        age: "",
                        isAllergy: false,
                        allergies: "",
                      },
                    ])
                  }
                />
              )}
              <Grid container direction={"column"}>
                {childrenList &&
                  childrenList.map((child, index) => (
                    <Grid item key={index}>
                      <TextField
                        id={`lastName-${index}`}
                        variant='standard'
                        label='Nom'
                        value={child.lastName}
                        onChange={(event) => onLastNameChange(event, index)}
                      />
                      <TextField
                        id={`firstName-${index}`}
                        variant='standard'
                        label='Prénom'
                        value={child.firstName}
                        onChange={(event) => onFirstNameChange(event, index)}
                      />
                      <TextField
                        id={`age-${index}`}
                        variant='standard'
                        label='Age'
                        value={child.age}
                        type={"number"}
                        onChange={(event) => onAgeChange(event, index)}
                      />
                    </Grid>
                  ))}
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Formulaire;
