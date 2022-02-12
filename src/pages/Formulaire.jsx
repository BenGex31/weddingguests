import React, { useState, useContext } from "react";
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
  Zoom,
  Stack,
} from "@mui/material";
import Button from "../components/Button";
import MainTitle from "../components/MainTitle";
import imgForm from "../assets/IMG-20210523-WA0003.jpg";
import theme from "../core/theme/MuiTheme";
import { oswaldLight as oswaldFontLight } from "../core/theme/CustomTheme";
import { AddReaction, PersonRemove, Send } from "@mui/icons-material";
import { makeStyles } from "@mui/styles";
import { AuthContext } from "../components/Auth";
import firebaseConfig from "../config/firebase";
import {
  getFirestore,
  doc,
  updateDoc,
  setDoc,
  getDoc,
} from "firebase/firestore";
import CustomizedSnackbars from "../components/CustomizedSnackbars";

const useStyles = makeStyles(() => ({
  formChild: {
    backgroundColor: theme.palette.secondary.light,
    borderRadius: 10,
    padding: 5,
    boxShadow: "0px 0px 20px" + theme.palette.secondary.main,
    margin: 10,
  },
  subContainer: {
    marginBottom: 30,
  },
}));

const Formulaire = () => {
  const { currentUser } = useContext(AuthContext);
  const classes = useStyles();
  const [user, setUser] = useState({
    responsePresence: "",
    firstName: "",
    lastName: "",
    isAllergy: "",
    responseAllergy: "",
    engagementCeremony: false,
    wineReception: false,
    meal: false,
    responseChildren: "",
    age: "",
    userLink: "",
    photo: currentUser.photoURL,
  });
  const [childrenList, setChildrenList] = useState([]);
  const [isGuestDb, setIsGuestDb] = useState(false);
  const [isChildrenDb, setisChildrenDb] = useState(false);
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [messageSnackBar, setMessageSnackBar] = useState("");
  const [severitySnackBar, setSeveritySnackBar] = useState("success");

  React.useEffect(() => {
    getDocUser();
    // eslint-disable-next-line
  }, []);

  const getDocUser = async () => {
    const guestsRef = doc(
      getFirestore(firebaseConfig),
      "guests",
      currentUser.uid
    );
    const childrenRef = doc(
      getFirestore(firebaseConfig),
      "childrenGuests",
      currentUser.uid
    );
    const guestsSnap = await getDoc(guestsRef);
    const childrenSnap = await getDoc(childrenRef);

    if (guestsSnap.exists()) {
      //console.log("Document data:", docSnap.data());
      setUser(guestsSnap.data());
      setIsGuestDb(true);
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
    if (childrenSnap.exists()) {
      console.log("Document data:", childrenSnap.data());
      setChildrenList(childrenSnap.data().childrenList);
      setisChildrenDb(true);
    } else {
      setChildrenList([]);
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  };

  const onLastNameChange = (event, index) => {
    let array = [...childrenList];
    array[index].lastName = event.target.value.trimEnd();
    setChildrenList(array);
  };

  const onFirstNameChange = (event, index) => {
    let array = [...childrenList];
    array[index].firstName = event.target.value.trimEnd();
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

  const onChildIsAllergyChange = (event, index) => {
    let array = [...childrenList];
    array[index].isAllergy = event.target.value;
    setChildrenList(array);
  };

  const onChildAllergiesChange = (event, index) => {
    let array = [...childrenList];
    array[index].allergies = event.target.value;
    setChildrenList(array);
  };

  const onDeleteChildClick = (item) => {
    let array = [...childrenList];
    let indexToSearch = array.findIndex((child) => child.id === item.id);
    array.splice(indexToSearch, 1);
    setChildrenList(array);
  };

  const onSubmitForm = async () => {
    try {
      const guestRef = doc(
        getFirestore(firebaseConfig),
        "guests",
        currentUser.uid
      );
      const childrenRef = doc(
        getFirestore(firebaseConfig),
        "childrenGuests",
        currentUser.uid
      );
      if (isGuestDb) {
        await updateDoc(guestRef, user);
        setOpenSnackBar(true);
        setMessageSnackBar("Vos informations ont bien été mises à jour !");
        setSeveritySnackBar("success");
      } else {
        await setDoc(guestRef, user);
        setOpenSnackBar(true);
        setMessageSnackBar("Vos informations ont bien été enregistrées !");
        setSeveritySnackBar("success");
      }
      if (isChildrenDb) {
        await updateDoc(childrenRef, { childrenList: childrenList });
        setMessageSnackBar("Vos informations ont bien été mises à jour !");
        setSeveritySnackBar("success");
      } else {
        await setDoc(childrenRef, { childrenList: childrenList });
        setMessageSnackBar("Vos informations ont bien été enregistrées !");
        setSeveritySnackBar("success");
      }
    } catch (error) {
      console.log(error);
      setMessageSnackBar("Un problème est survenu avec la base de données");
      setSeveritySnackBar("error");
    }
  };

  const handleSnackBarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackBar(false);
  };

  return (
    <Container component='main' maxWidth='xl'>
      <header>
        <Header />
      </header>
      <MainTitle title='Nous avons besoin de certaines informations' />
      <Grid mt={5} container>
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
              "& .MuiTextField-root": { m: 1, width: "30ch" },
            }}
            noValidate
            autoComplete='off'
          >
            <Stack direction='column' spacing={3}>
              <Stack
                justifyContent='space-around'
                direction='row'
                alignItems='center'
              >
                <TextField
                  required
                  id='presence'
                  select
                  fullWidth
                  variant='standard'
                  label='Votre présence ?'
                  sx={{
                    fontFamily: oswaldFontLight.fontFamily,
                    fontWeight: oswaldFontLight.fontWeight,
                    fontStyle: oswaldFontLight.fontStyle,
                  }}
                  value={user.responsePresence}
                  onChange={(event) =>
                    setUser({ ...user, responsePresence: event.target.value })
                  }
                >
                  <MenuItem value={"Ne sais pas"}>Ne sais pas</MenuItem>
                  <MenuItem value={"Oui"}>Oui</MenuItem>
                  <MenuItem value={"Non"}>Non</MenuItem>
                </TextField>
                <TextField
                  id={`age-adult`}
                  variant='standard'
                  label='Âge'
                  value={user.age}
                  type={"number"}
                  onChange={(event) =>
                    setUser({
                      ...user,
                      age:
                        parseInt(event.target.value) < 0
                          ? 0
                          : isNaN(parseInt(event.target.value))
                          ? ""
                          : parseInt(event.target.value),
                    })
                  }
                />
              </Stack>
              <Stack justifyContent='space-around' direction='row'>
                <TextField
                  required
                  id='firstName'
                  variant='standard'
                  label='Prénom'
                  value={user.firstName}
                  onChange={(event) =>
                    setUser({ ...user, firstName: event.target.value })
                  }
                />
                <TextField
                  required
                  id='lastName'
                  variant='standard'
                  label='Nom'
                  value={user.lastName}
                  onChange={(event) =>
                    setUser({ ...user, lastName: event.target.value })
                  }
                />
              </Stack>
              <Stack alignItems='center'>
                <TextField
                  id='user-link'
                  required
                  select
                  variant='standard'
                  label='Votre lien avec les mariés'
                  value={user.userLink}
                  onChange={(event) =>
                    setUser({ ...user, userLink: event.target.value })
                  }
                >
                  <MenuItem value={"Ami"}>Ami</MenuItem>
                  <MenuItem value={"Famille"}>Famille</MenuItem>
                </TextField>
              </Stack>
              <Stack alignItems='center'>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={user.engagementCeremony}
                        onChange={(event) =>
                          setUser({
                            ...user,
                            engagementCeremony: event.target.checked,
                          })
                        }
                      />
                    }
                    label='A la cérémonie d’engagement'
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={user.wineReception}
                        onChange={(event) =>
                          setUser({
                            ...user,
                            wineReception: event.target.checked,
                          })
                        }
                      />
                    }
                    label='Au vin d’honneur et Apéritif'
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={user.meal}
                        onChange={(event) =>
                          setUser({ ...user, meal: event.target.checked })
                        }
                      />
                    }
                    label='Repas et Fiesta'
                  />
                </FormGroup>
              </Stack>
              <Stack justifyContent='space-around' direction='row'>
                <TextField
                  id='allergy'
                  select
                  variant='standard'
                  label='Des allergies ?'
                  value={user.responseAllergy}
                  onChange={(event) =>
                    setUser({ ...user, responseAllergy: event.target.value })
                  }
                >
                  <MenuItem value={"Aucune"}>Aucune</MenuItem>
                  <MenuItem value={"Oui"}>Oui</MenuItem>
                </TextField>
                {user.responseAllergy === "Oui" && (
                  <TextField
                    id='allergies'
                    variant='standard'
                    label='Lesquelles ?'
                    value={user.isAllergy}
                    onChange={(event) =>
                      setUser({ ...user, isAllergy: event.target.value })
                    }
                  />
                )}
              </Stack>
              <Stack
                justifyContent='space-around'
                direction='row'
                alignItems='center'
              >
                <TextField
                  required
                  id='children'
                  select
                  variant='standard'
                  label='Avec des enfants ?'
                  value={user.responseChildren}
                  onChange={(event) =>
                    setUser({ ...user, responseChildren: event.target.value })
                  }
                >
                  <MenuItem value={"Ne sait pas"}>Ne sais pas</MenuItem>
                  <MenuItem value={"Oui"}>Oui</MenuItem>
                  <MenuItem value={"Non"}>Non</MenuItem>
                </TextField>
                {user.responseChildren === "Oui" && (
                  <Button
                    text={"Ajouter un enfant"}
                    variant={"contained"}
                    startIcon={<AddReaction />}
                    size={"small"}
                    style={{
                      height: 35,
                      backgroundColor: theme.palette.primary.main,
                      color: theme.palette.primary.light,
                      textTransform: "none",
                    }}
                    onClick={() =>
                      setChildrenList((childrenList) => [
                        ...childrenList,
                        {
                          id: Date.now(),
                          firstName: "",
                          lastName: "",
                          age: "",
                          isAllergy: "",
                          allergies: "",
                        },
                      ])
                    }
                  />
                )}
              </Stack>
            </Stack>
            <Grid
              className={classes.subContainer}
              container
              justifyContent={"space-evenly"}
            >
              {user.responsePresence === "Oui" &&
                childrenList !== undefined &&
                childrenList.map((child, index) => (
                  <Zoom key={index} in>
                    <div className={classes.formChild} key={index}>
                      <Grid item xs={12}>
                        <TextField
                          id={`lastName-${index}`}
                          variant='standard'
                          label='Nom'
                          value={child.lastName}
                          onChange={(event) => onLastNameChange(event, index)}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          id={`firstName-${index}`}
                          variant='standard'
                          label='Prénom'
                          value={child.firstName}
                          onChange={(event) => onFirstNameChange(event, index)}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          id={`age-${index}`}
                          variant='standard'
                          label='Age'
                          value={child.age}
                          type={"number"}
                          onChange={(event) => onAgeChange(event, index)}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          id={`childIsAllergy-${index}`}
                          select
                          variant='standard'
                          label='Des allergies ?'
                          value={child.isAllergy}
                          onChange={(event) =>
                            onChildIsAllergyChange(event, index)
                          }
                        >
                          <MenuItem value={"Aucune"}>Aucune</MenuItem>
                          <MenuItem value={"Oui"}>Oui</MenuItem>
                        </TextField>
                      </Grid>
                      <Grid item xs={12}>
                        {child.isAllergy === "Oui" && (
                          <TextField
                            id={`childAllergies-${index}`}
                            variant='standard'
                            label='Lesquelles ?'
                            value={child.allergies}
                            onChange={(event) =>
                              onChildAllergiesChange(event, index)
                            }
                          />
                        )}
                      </Grid>
                      <Grid container justifyContent={"flex-end"}>
                        <Button
                          text={"Supprimer enfant"}
                          variant={"contained"}
                          startIcon={<PersonRemove />}
                          size={"small"}
                          style={{
                            height: 35,
                            backgroundColor: theme.palette.primary.main,
                            color: theme.palette.primary.light,
                            marginTop: 10,
                            textTransform: "none",
                          }}
                          onClick={() => onDeleteChildClick(child)}
                        />
                      </Grid>
                    </div>
                  </Zoom>
                ))}
              <Grid mt={5} container justifyContent='flex-end'>
                <Button
                  disabled={user.responsePresence === ""}
                  text={"Envoyer"}
                  variant={"contained"}
                  endIcon={<Send />}
                  size={"small"}
                  style={{
                    height: 35,
                    backgroundColor: theme.palette.primary.main,
                    color: theme.palette.primary.light,
                    marginTop: 10,
                    textTransform: "none",
                  }}
                  onClick={onSubmitForm}
                />
                <CustomizedSnackbars
                  open={openSnackBar}
                  handleClose={handleSnackBarClose}
                  text={messageSnackBar}
                  severity={severitySnackBar}
                  autoHideDuration={4000}
                />
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Formulaire;
