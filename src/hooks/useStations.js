import { useMemo } from "react";
import { useSelector } from "react-redux";
import { sortStations, withStationDistances } from "../utils/helpers";

export function useStations(location = null) {
  const { stations, filters } = useSelector((state) => state.stations);

  const filteredStations = useMemo(() => {
    const stationsWithDistance = withStationDistances(stations, location);
    const search = filters.search.toLowerCase();
    const matches = stationsWithDistance.filter((station) => {
      const searchable = `${station.name} ${station.address}`.toLowerCase();
      const searchMatch = searchable.includes(search);
      const typeMatch = filters.type === "All" || station.chargerTypes.includes(filters.type);
      return searchMatch && typeMatch;
    });
    return sortStations(matches, filters.sortBy);
  }, [filters, location, stations]);

  return { stations: filteredStations, filters };
}
