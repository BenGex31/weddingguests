import React from "react";
import Header from "../components/Header";
import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import firebaseConfig from "../config/firebase";
import theme from "../core/theme/MuiTheme";
import { oswaldRegular as OswaldR } from "../core/theme/CustomTheme";
import { alexBrushRegular as alexBrush } from "../core/theme/CustomTheme";
import { Mail } from "@material-ui/icons";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  mailIcon: {
    color: theme.palette.primary.light,
  },
});

const Guests = () => {
  const classes = useStyles();
  const [guests, setGuests] = React.useState([]);

  React.useEffect(() => {
    getCollection();
  }, []);

  const getCollection = async () => {
    const querySnapshot = await getDocs(
      collection(getFirestore(firebaseConfig), "guests")
    );

    let array = [];

    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      array.push(doc.data());
    });
    setGuests(array);
  };
  return (
    <Container component='main' maxWidth='xl'>
      <header>
        <Header />
      </header>
      <Grid container justifyContent={"space-around"}>
        {guests.map((guest) => (
          <Card
            sx={{
              width: 441,
              height: 284,
              backgroundColor: theme.palette.primary.main,
              boxShadow: "0px 0px 20px" + theme.palette.secondary.main,
            }}
          >
            <CardHeader
              avatar={
                <Avatar
                  sx={{
                    width: 80,
                    height: 80,
                    backgroundColor: theme.palette.primary.light,
                    color: "#000",
                  }}
                  alt={guest.name}
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
                  {guest.name}
                </Typography>
              }
            />
            <CardContent>
              <Stack>
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
                <Stack></Stack>
              </Stack>
            </CardContent>
          </Card>
        ))}
      </Grid>
    </Container>
  );
};

export default Guests;
