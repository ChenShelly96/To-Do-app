// src/utils/routeOptimizer.js
// Function to optimize the route based on the given locations
export const optimizeRoute = async (locations) => {
  const service = new window.google.maps.DirectionsService();
  const origin = locations[0];
  const destination = locations[locations.length - 1];
  const waypoints = locations.slice(1, -1).map(location => ({ location, stopover: true }));

  // Request the route from Google Directions Service
  const result = await service.route({
    origin,
    destination,
    waypoints,
    travelMode: window.google.maps.TravelMode.DRIVING,
    optimizeWaypoints: true
  });

  return result.routes[0];
};
