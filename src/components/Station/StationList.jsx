import StationCard from "./StationCard";

export default function StationList({ stations, onBookNow, onOpenDirections, onSelect }) {
  return (
    <div className="space-y-4">
      {stations.map((station) => (
        <StationCard
          key={station.id}
          station={station}
          onBookNow={onBookNow}
          onOpenDirections={onOpenDirections}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}
