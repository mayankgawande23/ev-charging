export const calculateAvailability = (available, total) => (total ? (available / total) * 100 : 0);

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
