export const calculateAvailability = (available, total) => (total ? (available / total) * 100 : 0);

export function haversineDistanceKm(from, to) {
  const earthRadius = 6371;
  const latitudeDelta = ((to.latitude - from.latitude) * Math.PI) / 180;
  const longitudeDelta = ((to.longitude - from.longitude) * Math.PI) / 180;
  const fromLatitude = (from.latitude * Math.PI) / 180;
  const toLatitude = (to.latitude * Math.PI) / 180;

  const chordLength =
    Math.sin(latitudeDelta / 2) * Math.sin(latitudeDelta / 2) +
    Math.sin(longitudeDelta / 2) * Math.sin(longitudeDelta / 2) * Math.cos(fromLatitude) * Math.cos(toLatitude);

  return earthRadius * 2 * Math.atan2(Math.sqrt(chordLength), Math.sqrt(1 - chordLength));
}

export function withStationDistances(stations, location) {
  if (!location) {
    return stations;
  }

  return stations.map((station) => ({
    ...station,
    distance: haversineDistanceKm(location, {
      latitude: station.lat,
      longitude: station.lng,
    }),
  }));
}

export const sortStations = (stations, sortBy) => {
  const list = [...stations];
  switch (sortBy) {
    case "rating":
      return list.sort((a, b) => b.rating - a.rating);
    case "price":
      return list.sort((a, b) => a.priceMin - b.priceMin);
    case "availability":
      return list.sort((a, b) => b.availableChargers - a.availableChargers);
    default:
      return list.sort((a, b) => a.distance - b.distance);
  }
};

export function estimateRouteEtaMinutes(distanceKm) {
  return Math.max(5, Math.round((distanceKm / 32) * 60));
}

export function buildVehicleLabel(vehicle) {
  return `${vehicle.name} (${vehicle.number})`;
}
