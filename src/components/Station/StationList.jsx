import StationCard from "./StationCard";

export default function StationList({ stations }) {
  return (
    <div className="space-y-4">
      {stations.map((station) => (
        <StationCard key={station.id} station={station} />
      ))}
    </div>
  );
}
