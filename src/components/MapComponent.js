// src/components/MapComponent.js
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import React from 'react';

// Define the style of the map container
const mapContainerStyle = {
  width: '100%',
  height: '400px'
};

// Set a default center for the map
const center = {
  lat: 32.0853,  // Example: Tel Aviv
  lng: 34.7818
};

// The component receives an array of locations as props
const MapComponent = ({ locations }) => {
  return (
    <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={13}
      >
        {locations.map((location, index) => (
          <Marker key={index} position={location} />
        ))}
      </GoogleMap>
    </LoadScript>
  );
}

export default MapComponent;
