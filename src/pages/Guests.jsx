import React from "react";
import Header from "../components/Header";
import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  Container,
  FormControlLabel,
  FormGroup,
  Grid,
  Grow,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import firebaseConfig from "../config/firebase";
import theme from "../core/theme/MuiTheme";
import { oswaldRegular as OswaldR } from "../core/theme/CustomTheme";
import { alexBrushRegular as alexBrush } from "../core/theme/CustomTheme";
import { oswaldLight } from "../core/theme/CustomTheme";
import { Mail } from "@material-ui/icons";
import { makeStyles } from "@mui/styles";
import MainTitle from "../components/MainTitle";
import SubTitle from "../components/SubTitle";
import { Face } from "@mui/icons-material";

const useStyles = makeStyles({
  mailIcon: {
    color: theme.palette.primary.light,
  },
});

const Guests = () => {
  const classes = useStyles();
  const [guests, setGuests] = React.useState([]);
  const [children, setChildren] = React.useState([]);
  const [guestLink, setGuestLink] = React.useState("Tous");
  const [childrenAge, setChildrenAge] = React.useState();

  React.useEffect(() => {
    getGuestsCollection();
    getChildrenCollection();
  }, []);

  const getGuestsCollection = async () => {
    const queryGuestSnapshot = await getDocs(
      collection(getFirestore(firebaseConfig), "guests")
    );

    let array = [];

    queryGuestSnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      array.push(doc.data());
    });
    setGuests(array);
  };

  const getChildrenCollection = async () => {
    const queryChildrenSnapshot = await getDocs(
      collection(getFirestore(firebaseConfig), "childrenGuests")
    );

    let array = [];

    queryChildrenSnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      array.push(doc.data().childrenList);
    });
    setChildren(array);
  };

  return (
    <Container component='main' maxWidth='xl'>
      <header>
        <Header />
      </header>
      <MainTitle
        title={`Les invités présents (${
          guests.filter((guest) =>
            guestLink === "Tous"
              ? guest.responsePresence === "Oui"
              : guest.responsePresence === "Oui" && guest.userLink === guestLink
          ).length
        })`}
      />
      <Stack mb={6} spacing={2}>
        <SubTitle
          title={"A la cérémonie d’engagement"}
          guestCount={
            guests.filter((guest) =>
              guestLink === "Tous"
                ? guest.responsePresence === "Oui" &&
                  guest.engagementCeremony === true
                : guest.responsePresence === "Oui" &&
                  guest.engagementCeremony === true &&
                  guest.userLink === guestLink
            ).length
          }
        />
        <SubTitle
          title={"Au vin d’honneur & Apéritif"}
          guestCount={
            guests.filter((guest) =>
              guestLink === "Tous"
                ? guest.responsePresence === "Oui" &&
                  guest.wineReception === true
                : guest.responsePresence === "Oui" &&
                  guest.wineReception === true &&
                  guest.userLink === guestLink
            ).length
          }
        />
        <SubTitle
          title={"Repas et Fiesta"}
          guestCount={
            guests.filter((guest) =>
              guestLink === "Tous"
                ? guest.responsePresence === "Oui" && guest.meal === true
                : guest.responsePresence === "Oui" &&
                  guest.meal === true &&
                  guest.userLink === guestLink
            ).length
          }
        />
      </Stack>
      <Stack direction='row' justifyContent='center' mb={5}>
        <TextField
          select
          sx={{ width: 300 }}
          variant='standard'
          label='Lien'
          id='guest-link'
          value={guestLink}
          onChange={(event) => setGuestLink(event.target.value)}
        >
          <MenuItem value='Tous'>Tous</MenuItem>
          <MenuItem value='Famille'>Famille</MenuItem>
          <MenuItem value='Ami'>Ami</MenuItem>
        </TextField>
      </Stack>
      <Grid
        sx={{ overflowY: "scroll", height: 630, paddingTop: 2 }}
        container
        mb={10}
        justifyContent={"space-around"}
      >
        {guests
          .filter((guest) =>
            guestLink === "Tous"
              ? guest.responsePresence === "Oui"
              : guest.responsePresence === "Oui" && guest.userLink === guestLink
          )
          .map((guest, index) => (
            <Grow in timeout={index * 500}>
              <Card
                key={index}
                sx={{
                  width: 441,
                  height: 284,
                  backgroundColor: theme.palette.primary.main,
                  boxShadow: "0px 0px 20px" + theme.palette.secondary.main,
                  marginBottom: 5,
                }}
              >
                <CardHeader
                  avatar={
                    <Avatar
                      sx={{
                        width: 80,
                        height: 80,
                        backgroundColor: theme.palette.primary.light,
                        color: theme.palette.secondary.main,
                      }}
                      alt={`${guest.firstName} ${guest.lastName}`}
                      src={guest.photo}
                    />
                  }
                  title={
                    <Typography
                      sx={{
                        fontSize: 18,
                        color: theme.palette.primary.light,
                        fontFamily: OswaldR.fontFamily,
                        fontWeight: OswaldR.fontWeight,
                        fontStyle: OswaldR.fontStyle,
                      }}
                    >
                      {`${guest.firstName} ${guest.lastName}`}
                    </Typography>
                  }
                />
                <CardContent>
                  <Stack direction={"row"} justifyContent={"space-between"}>
                    <Stack>
                      <Stack
                        justifyContent={"flex-start"}
                        direction={"row"}
                        spacing={1}
                        sx={{ paddingRight: 3 }}
                      >
                        <Mail className={classes.mailIcon} fontSize='large' />
                        <Typography
                          sx={{
                            fontSize: 30,
                            fontFamily: alexBrush.fontFamily,
                            fontWeight: alexBrush.fontWeight,
                            fontStyle: alexBrush.fontStyle,
                            color: theme.palette.primary.light,
                          }}
                        >
                          Invité
                        </Typography>
                      </Stack>
                      <Typography
                        sx={{
                          fontSize: 18,
                          fontFamily: oswaldLight.fontFamily,
                          fontWeight: oswaldLight.fontWeight,
                          fontStyle: oswaldLight.fontStyle,
                          color: theme.palette.primary.light,
                        }}
                      >
                        {guest.userLink}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: 18,
                          fontFamily: oswaldLight.fontFamily,
                          fontWeight: oswaldLight.fontWeight,
                          fontStyle: oswaldLight.fontStyle,
                          color: theme.palette.primary.light,
                        }}
                      >
                        {guest.age !== "" &&
                          `${guest.age >= 18 ? "Adulte" : "Enfant"} ${
                            guest.age
                          } ans`}
                      </Typography>
                    </Stack>
                    <Stack alignItems='flex-end'>
                      <FormGroup>
                        <FormControlLabel
                          disabled
                          control={
                            <Checkbox
                              color='default'
                              checked={guest.engagementCeremony}
                            />
                          }
                          label={"Cérémonie d’engagement"}
                        />
                        <FormControlLabel
                          disabled
                          control={
                            <Checkbox
                              color='default'
                              checked={guest.wineReception}
                            />
                          }
                          label={"Vin d’honneur & Apéritif"}
                        />
                        <FormControlLabel
                          disabled
                          control={
                            <Checkbox color='default' checked={guest.meal} />
                          }
                          label={"Repas & Fiesta"}
                        />
                      </FormGroup>
                    </Stack>
                  </Stack>
                </CardContent>
              </Card>
            </Grow>
          ))}
      </Grid>
      <MainTitle
        title={`Les enfants présents (${
          children
            .concat()
            .flat()
            .filter((child) =>
              childrenAge === "Tous"
                ? child.age >= 0
                : childrenAge <= 3
                ? child.age < 3
                : childrenAge >= 3 && childrenAge <= 11
                ? child.age >= 3 && child.age <= 11
                : child.age >= 12 && child.age < 18
            ).length
        })`}
      />
      <Stack direction='row' justifyContent='center' mt={3} mb={5}>
        <TextField
          select
          sx={{ width: 300 }}
          variant='standard'
          label='Âge'
          id='guest-link'
          value={childrenAge}
          onChange={(event) => setChildrenAge(event.target.value)}
        >
          <MenuItem value='Tous'>Tous</MenuItem>
          <MenuItem value={3}>Inférieur à 3 ans</MenuItem>
          <MenuItem value={11}>entre 3 et 11 ans</MenuItem>
          <MenuItem value={17}>Entre 12 et 17 ans</MenuItem>
        </TextField>
      </Stack>
      <Grid
        sx={{ overflowY: "scroll", height: 630, paddingTop: 2 }}
        container
        mb={5}
        mt={2}
        justifyContent={"space-around"}
      >
        {children
          .concat()
          .flat()
          .filter((child) =>
            childrenAge === "Tous"
              ? child.age >= 0
              : childrenAge <= 3
              ? child.age < 3
              : childrenAge >= 3 && childrenAge <= 11
              ? child.age >= 3 && child.age <= 11
              : child.age >= 12 && child.age < 18
          )
          .map((child, index) => (
            <Card
              key={index}
              sx={{
                width: 441,
                height: 284,
                backgroundColor: theme.palette.primary.main,
                boxShadow: "0px 0px 20px" + theme.palette.secondary.main,
                marginBottom: 5,
              }}
            >
              <CardHeader
                avatar={
                  <Face
                    sx={{
                      width: 80,
                      height: 80,
                      backgroundColor: theme.palette.primary.light,
                      color: theme.palette.secondary.main,
                      borderRadius: 20,
                    }}
                  />
                }
                title={
                  <Typography
                    sx={{
                      fontSize: 18,
                      color: theme.palette.primary.light,
                      fontFamily: OswaldR.fontFamily,
                      fontWeight: OswaldR.fontWeight,
                      fontStyle: OswaldR.fontStyle,
                    }}
                  >
                    {`${child.firstName} ${child.lastName}`}
                  </Typography>
                }
              />
              <CardContent>
                <Stack direction={"row"} justifyContent={"center"}>
                  <Stack alignItems='center'>
                    <Stack
                      justifyContent={"flex-start"}
                      direction={"row"}
                      spacing={1}
                    >
                      <Mail className={classes.mailIcon} fontSize='large' />
                      <Typography
                        sx={{
                          fontSize: 30,
                          fontFamily: alexBrush.fontFamily,
                          fontWeight: alexBrush.fontWeight,
                          fontStyle: alexBrush.fontStyle,
                          color: theme.palette.primary.light,
                        }}
                      >
                        Invité
                      </Typography>
                    </Stack>
                    <Typography
                      sx={{
                        fontSize: 18,
                        fontFamily: oswaldLight.fontFamily,
                        fontWeight: oswaldLight.fontWeight,
                        fontStyle: oswaldLight.fontStyle,
                        color: theme.palette.primary.light,
                      }}
                    >
                      {`${child.age >= 18 ? "Adulte" : "Enfant"} ${
                        child.age
                      } ans`}
                    </Typography>
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
          ))}
      </Grid>
    </Container>
  );
};

export default Guests;
