import { useMemo } from "react";
import { mapConfig } from "../config/mapConfig";

export function useMap(stations = []) {
  return useMemo(
    () => ({
      center: mapConfig.defaultCenter,
      zoom: mapConfig.defaultZoom,
      markers: stations.map((station) => ({
        id: station.id,
        position: [station.lat, station.lng],
        title: station.name,
      })),
    }),
    [stations],
  );
}
