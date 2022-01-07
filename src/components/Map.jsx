import React, { useCallback, useState, useRef } from "react";
import reactMapConfig from "../secretMap";
import {
  GoogleMap,
  LoadScript,
  StandaloneSearchBox,
  Marker,
} from "@react-google-maps/api";
import { Grid, Card, CardContent, Typography, Fade } from "@mui/material";
import { oswaldRegular as oswaldR } from "../core/theme/CustomTheme";
import theme from "../core/theme/MuiTheme";

const containerStyle = {
  width: "563px",
  height: "442px",
  borderRadius: 10,
};

const center = {
  lat: 43.28564,
  lng: 1.56989,
};

const libraries = ["places", "drawing"];

const Map = () => {
  const [hotels, setHotels] = useState(null);
  const mapRef = useRef(null);
  const onLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  if (hotels) {
    console.log(typeof hotels[0].geometry.location.lat);
  }

  return (
    <Grid
      sx={{ marginBottom: 5 }}
      xs={12}
      container
      justifyContent='space-around'
      direction='row'
    >
      <Grid sx={{ height: 600, overflowY: "scroll" }} item direction='column'>
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
          Hôtels / Campings / Maisons d’hôtes
        </Typography>
        {hotels &&
          hotels.map((hotel, index) => (
            <Fade in timeout={index * 800}>
              <Grid key={index} alignItems='center' item>
                <Card sx={{ marginBottom: 3 }} key={hotel.place_id}>
                  <CardContent>
                    <Typography
                      sx={{
                        fontFamily: oswaldR.fontFamily,
                        fontWeight: oswaldR.fontWeight,
                        fontStyle: oswaldR.fontStyle,
                        fontSize: 30,
                        color: theme.palette.primary.main,
                      }}
                    >
                      {hotel.name}
                    </Typography>
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
                  </CardContent>
                </Card>
              </Grid>
            </Fade>
          ))}
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
        </Grid>
        <Grid>
          <LoadScript
            libraries={libraries}
            googleMapsApiKey={reactMapConfig.REACT_APP_MAP_API_KEY}
          >
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={center}
              zoom={10}
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
