import { useMemo } from "react";
import { useSelector } from "react-redux";
import { sortStations } from "../utils/helpers";

export function useStations() {
  const { stations, filters } = useSelector((state) => state.stations);

  const filteredStations = useMemo(() => {
    const search = filters.search.toLowerCase();
    const matches = stations.filter((station) => {
      const searchable = `${station.name} ${station.address}`.toLowerCase();
      const searchMatch = searchable.includes(search);
      const typeMatch = filters.type === "All" || station.chargerTypes.includes(filters.type);
      return searchMatch && typeMatch;
    });
    return sortStations(matches, filters.sortBy);
  }, [filters, stations]);

  return { stations: filteredStations, filters };
}
