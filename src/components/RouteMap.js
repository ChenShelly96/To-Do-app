// src/components/RouteMap.js
import { DirectionsRenderer, GoogleMap } from '@react-google-maps/api';
import React, { useEffect, useState } from 'react';
import { optimizeRoute } from '../utils/routeOptimizer';

const RouteMap = ({ locations }) => {
  const [directions, setDirections] = useState(null);

  useEffect(() => {
    const getOptimizedRoute = async () => {
      const result = await optimizeRoute(locations);
      setDirections(result);
    };

    if (locations.length > 1) {
      getOptimizedRoute();
    }
  }, [locations]);

  return (
    <GoogleMap
      mapContainerStyle={{ height: '400px', width: '100%' }}
      zoom={13}
      center={locations[0] || { lat: 0, lng: 0 }}
    >
      {directions && <DirectionsRenderer directions={directions} />}
    </GoogleMap>
  );
};

export default RouteMap;
