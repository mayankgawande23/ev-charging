import { createSlice } from "@reduxjs/toolkit";
import { stations } from "../services/mockData";

const stationSlice = createSlice({
  name: "stations",
  initialState: {
    stations,
    selectedStation: stations[0],
    filters: {
      search: "",
      type: "All",
      sortBy: "nearest",
    },
  },
  reducers: {
    setSelectedStation: (state, action) => {
      state.selectedStation = state.stations.find((station) => station.id === action.payload) ?? null;
    },
    updateFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
  },
});

export const { setSelectedStation, updateFilters } = stationSlice.actions;
export default stationSlice.reducer;
