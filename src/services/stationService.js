import { stations } from "./mockData";

export const stationService = {
  getStations: async () => Promise.resolve(stations),
  getStationById: async (id) => Promise.resolve(stations.find((station) => station.id === id)),
};
