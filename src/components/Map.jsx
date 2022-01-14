import React, { useCallback, useState, useRef } from "react";
import reactMapConfig from "../secretMap";
import {
  GoogleMap,
  LoadScript,
  StandaloneSearchBox,
  Marker,
} from "@react-google-maps/api";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Rating,
  Stack,
  CardMedia,
  Chip,
  Zoom,
  Tooltip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { oswaldRegular as oswaldR } from "../core/theme/CustomTheme";
import theme from "../core/theme/MuiTheme";
import { Help, Hotel } from "@material-ui/icons";
import Button from "../components/Button";
import beyssacHotel from "../assets/beyssac-hotel.jpeg";

const containerStyle = {
  width: "563px",
  height: "442px",
  borderRadius: 10,
  boxShadow: "0px 0px 20px" + theme.palette.secondary.main,
};

const center = {
  lat: 43.28564,
  lng: 1.56989,
};

const Map = () => {
  const [hotels, setHotels] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const libraries = useState(["places"]);
  const mapRef = useRef(null);
  const onLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  return (
    <Grid sx={{ marginBottom: 5 }} container justifyContent='space-around'>
      <Grid
        sx={{
          height: 640,
          overflowY: "scroll",
        }}
        item
      >
        {hotels && (
          <Typography
            sx={{
              fontFamily: oswaldR.fontFamily,
              fontWeight: oswaldR.fontWeight,
              fontStyle: oswaldR.fontStyle,
              fontSize: 20,
              color: theme.palette.primary.main,
              marginBottom: 3,
            }}
            align='center'
          >
            {hotels.length === 1
              ? `${hotels.length} résultat`
              : `${hotels.length} résultats`}
          </Typography>
        )}
        {hotels ? (
          hotels.map((hotel, index) => (
            <Zoom in timeout={index * 400}>
              <Grid
                sx={{ borderRadius: 10 }}
                key={hotel.place_id}
                alignItems='center'
                item
              >
                <Card
                  sx={{ marginBottom: 3, borderRadius: 10 }}
                  key={hotel.place_id}
                >
                  {
                    <CardMedia
                      component='img'
                      image={
                        hotel.photos === undefined
                          ? "https://www.parisinfo.com/var/otcp/sites/images/media/1.-photos/03.-hebergement-630-x-405/hotel-enseigne-neon-630x405-c-thinkstock/31513-1-fre-FR/Hotel-enseigne-neon-630x405-C-Thinkstock.jpg"
                          : hotel.photos[0].getUrl()
                      }
                      height='140'
                      width='140'
                      alt={hotel.name}
                    />
                  }
                  <CardContent>
                    <Typography
                      sx={{
                        fontFamily: oswaldR.fontFamily,
                        fontWeight: oswaldR.fontWeight,
                        fontStyle: oswaldR.fontStyle,
                        fontSize: 25,
                        color: theme.palette.primary.main,
                      }}
                    >
                      {hotel.name}
                    </Typography>
                    {!hotel.rating || hotel.rating === 0 || (
                      <Stack direction='row' spacing={1}>
                        <Typography
                          sx={{
                            fontFamily: oswaldR.fontFamily,
                            fontWeight: oswaldR.fontWeight,
                            fontStyle: oswaldR.fontStyle,
                            fontSize: 15,
                            color: theme.palette.secondary.main,
                          }}
                        >
                          {hotel.rating}
                        </Typography>
                        <Rating
                          name='rating-hotel'
                          defaultValue={hotel.rating}
                          precision={0.1}
                          readOnly
                        />
                        <Typography
                          sx={{
                            fontFamily: oswaldR.fontFamily,
                            fontWeight: oswaldR.fontWeight,
                            fontStyle: oswaldR.fontStyle,
                            fontSize: 15,
                            color: theme.palette.secondary.main,
                          }}
                        >
                          {hotel.user_ratings_total.length === 1
                            ? `${hotel.user_ratings_total} Vote`
                            : `${hotel.user_ratings_total} Votes`}
                        </Typography>
                      </Stack>
                    )}

                    <Typography
                      sx={{
                        fontFamily: oswaldR.fontFamily,
                        fontWeight: oswaldR.fontWeight,
                        fontStyle: oswaldR.fontStyle,
                        fontSize: 15,
                        color: theme.palette.secondary.main,
                      }}
                    >
                      {hotel.formatted_address}
                    </Typography>
                    {!hotel.business_status || (
                      <Stack mt={1} spacing={1} direction='row'>
                        <Chip
                          label={
                            hotel.opening_hours === undefined
                              ? "Pas d'infos d'ouverture disponible"
                              : hotel.opening_hours.open_now
                              ? "Actuellement Ouvert"
                              : "Actuellement Fermé"
                          }
                          color={
                            hotel.opening_hours === undefined
                              ? "warning"
                              : hotel.opening_hours.open_now
                              ? "success"
                              : "error"
                          }
                        />
                        <Chip
                          label={
                            hotel.business_status !== "OPERATIONAL"
                              ? "Fermé définitivement"
                              : "En activité"
                          }
                          color={
                            hotel.business_status !== "OPERATIONAL"
                              ? "error"
                              : "success"
                          }
                        />
                      </Stack>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            </Zoom>
          ))
        ) : (
          <Stack alignItems={"center"} spacing={3}>
            <Chip
              height={35}
              size='medium'
              label={
                <Typography
                  sx={{
                    fontFamily: oswaldR.fontFamily,
                    fontWeight: oswaldR.fontWeight,
                    fontStyle: oswaldR.fontStyle,
                    fontSize: 20,
                    color: theme.palette.primary.main,
                  }}
                >
                  Trouvez votre hôtel, camping ou gîte autour du domaine de
                  notre mariage
                </Typography>
              }
            />
            <Hotel
              style={{ fontSize: 100, color: theme.palette.primary.main }}
            />
            <img
              style={{
                borderRadius: 10,
              }}
              src={beyssacHotel}
              width={"100%"}
              alt='Domaine du Beyssac'
            />
          </Stack>
        )}
      </Grid>
      <Grid>
        <Grid>
          <Typography
            sx={{
              fontFamily: oswaldR.fontFamily,
              fontWeight: oswaldR.fontWeight,
              fontStyle: oswaldR.fontStyle,
              fontSize: 20,
              color: theme.palette.primary.main,
              marginLeft: 5,
              marginBottom: 3,
            }}
            align='left'
          >
            Lieu:{" "}
            <span
              style={{
                fontFamily: oswaldR.fontFamily,
                fontWeight: oswaldR.fontWeight,
                fontStyle: oswaldR.fontStyle,
                fontSize: 20,
                color: theme.palette.secondary.main,
              }}
            >
              Domaine du Beyssac
            </span>
          </Typography>
          <Typography
            sx={{
              fontFamily: oswaldR.fontFamily,
              fontWeight: oswaldR.fontWeight,
              fontStyle: oswaldR.fontStyle,
              fontSize: 20,
              color: theme.palette.primary.main,
              marginLeft: 5,
              marginBottom: 3,
            }}
            align='left'
          >
            Adresse:{" "}
            <span
              style={{
                fontFamily: oswaldR.fontFamily,
                fontWeight: oswaldR.fontWeight,
                fontStyle: oswaldR.fontStyle,
                fontSize: 20,
                color: theme.palette.secondary.main,
              }}
            >
              900 chemin du Beyssac-Picarrou, 31550 CINTEGABELLE
            </span>
          </Typography>
          <Typography
            sx={{
              fontFamily: oswaldR.fontFamily,
              fontWeight: oswaldR.fontWeight,
              fontStyle: oswaldR.fontStyle,
              fontSize: 20,
              color: theme.palette.primary.main,
              marginLeft: 5,
              marginBottom: 3,
            }}
            align='left'
          >
            Coordonnées GPS:{" "}
            <span
              style={{
                fontFamily: oswaldR.fontFamily,
                fontWeight: oswaldR.fontWeight,
                fontStyle: oswaldR.fontStyle,
                fontSize: 20,
                color: theme.palette.secondary.main,
              }}
            >
              43°17’10.5 N 1°34’10.7 E
            </span>
          </Typography>
          {/*<Stack justifyContent='flex-end'>
            <Tooltip title='Exemple de recherche : hôtels ou gîtes ou camping cintegabelle'>
              <IconButton onClick={() => setOpenDialog(true)}>
                <Help />
              </IconButton>
            </Tooltip>
            </Stack>*/}
          <Dialog
            maxWidth='lg'
            fullWidth
            open={openDialog}
            onClose={() => setOpenDialog(false)}
          >
            <DialogTitle>Recherche hôtels</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Vous cherchez un hôtel, un gîte ou un camping ?
              </DialogContentText>
              <DialogContentText>
                tapez dans la barre de recherche de la carte Google :{" "}
                <em>"hôtels Cintegabelle"</em> ou <em>"gîtes Cintegabelle"</em>{" "}
                ou <em>"camping Cintegabelle"</em>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                variant={"contained"}
                text={"Fermer"}
                onClick={() => setOpenDialog(false)}
                style={{
                  color: theme.palette.primary.light,
                  backgroundColor: theme.palette.primary.main,
                  textTransform: "none",
                }}
              />
            </DialogActions>
          </Dialog>
        </Grid>
        <Grid>
          <LoadScript
            libraries={libraries}
            googleMapsApiKey={reactMapConfig.REACT_APP_MAP_API_KEY}
          >
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={center}
              zoom={12}
            >
              <>
                <StandaloneSearchBox
                  onLoad={onLoad}
                  onPlacesChanged={() => setHotels(mapRef.current.getPlaces())}
                >
                  <input
                    type='text'
                    placeholder='Liste des hôtels'
                    style={{
                      boxSizing: `border-box`,
                      border: `1px solid transparent`,
                      width: `240px`,
                      height: `32px`,
                      padding: `0 12px`,
                      borderRadius: `3px`,
                      boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                      fontSize: `14px`,
                      outline: `none`,
                      textOverflow: `ellipses`,
                      position: "absolute",
                      left: "50%",
                      top: "3%",
                      marginLeft: "-60px",
                    }}
                  />
                </StandaloneSearchBox>
                <Marker
                  animation={"BOUNCE"}
                  position={center}
                  icon={
                    "http://maps.google.com/mapfiles/kml/pushpin/red-pushpin.png"
                  }
                  label='Domaine du Beyssac'
                />
                {hotels &&
                  hotels.map((hotel) => (
                    <Marker
                      animation={"BOUNCE"}
                      key={hotel.place_id}
                      position={hotel.geometry.location}
                      label={hotel.name}
                    />
                  ))}
              </>
            </GoogleMap>
          </LoadScript>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Map;
