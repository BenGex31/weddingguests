import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import reactMapConfig from "../secretMap";

const containerStyle = {
  width: "563px",
  height: "442px",
};

const center = {
  lat: 43.28564,
  lng: 1.56989,
};

const Map = () => {
  return (
    <LoadScript
      libraries={["places"]}
      googleMapsApiKey={reactMapConfig.REACT_APP_MAP_API_KEY}
    >
      <GoogleMap
        id='weddingHotels'
        mapContainerStyle={containerStyle}
        center={center}
        zoom={14}
      >
        <Marker draggable position={center} />
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;
