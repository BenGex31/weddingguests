import React, { useCallback, useState, useRef } from "react";
import reactMapConfig from "../secretMap";
import {
  GoogleMap,
  LoadScript,
  StandaloneSearchBox,
  Marker,
} from "@react-google-maps/api";
import { Grid, Card, CardContent, Typography, Stack } from "@mui/material";
import { oswaldRegular as oswaldR } from "../core/theme/CustomTheme";
import theme from "../core/theme/MuiTheme";

const containerStyle = {
  width: "563px",
  height: "442px",
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
    <Grid container justifyContent='space-between' direction='row'>
      <Stack spacing={2}>
        {hotels &&
          hotels.map((hotel) => (
            <Card key={hotel.place_id}>
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
          ))}
      </Stack>
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
                  placeholder='Customized your placeholder'
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
                    marginLeft: "-60px",
                  }}
                />
              </StandaloneSearchBox>
              <Marker draggable={true} position={center} />
              {hotels &&
                hotels.map((hotel) => (
                  <Marker
                    key={hotel.place_id}
                    draggable
                    position={hotel.geometry.location}
                  />
                ))}
            </>
          </GoogleMap>
        </LoadScript>
      </Grid>
    </Grid>
  );
};

export default Map;
