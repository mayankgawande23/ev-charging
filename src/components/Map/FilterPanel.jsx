import { MenuItem, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { chargerTypes } from "../../utils/constants";
import { updateFilters } from "../../store/stationSlice";

export default function FilterPanel() {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.stations.filters);

  return (
    <div className="grid gap-3 md:grid-cols-[2fr_1fr_1fr]">
      <TextField
        label="Search location or station"
        value={filters.search}
        onChange={(event) => dispatch(updateFilters({ search: event.target.value }))}
      />
      <TextField
        select
        label="Charger Type"
        value={filters.type}
        onChange={(event) => dispatch(updateFilters({ type: event.target.value }))}
      >
        <MenuItem value="All">All</MenuItem>
        {chargerTypes.map((type) => (
          <MenuItem key={type} value={type}>
            {type}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        select
        label="Sort By"
        value={filters.sortBy}
        onChange={(event) => dispatch(updateFilters({ sortBy: event.target.value }))}
      >
        <MenuItem value="nearest">Nearest</MenuItem>
        <MenuItem value="rating">Rating</MenuItem>
        <MenuItem value="price">Price</MenuItem>
        <MenuItem value="availability">Availability</MenuItem>
      </TextField>
    </div>
  );
}
