import { estimateRouteEtaMinutes, haversineDistanceKm } from "../utils/helpers";

function toRoutePoint(location) {
  return {
    latitude: location.latitude,
    longitude: location.longitude,
  };
}

export async function getDirections({ from, to }) {
  const fallbackDistance = haversineDistanceKm(toRoutePoint(from), toRoutePoint(to));

  try {
    const response = await fetch(
      `https://router.project-osrm.org/route/v1/driving/${from.longitude},${from.latitude};${to.longitude},${to.latitude}?overview=full&geometries=geojson&steps=true`,
    );

    if (!response.ok) {
      throw new Error("Unable to fetch route.");
    }

    const payload = await response.json();
    const route = payload.routes?.[0];

    if (!route) {
      throw new Error("No route found.");
    }

    return {
      distanceKm: route.distance / 1000,
      durationMinutes: Math.max(5, Math.round(route.duration / 60)),
      geometry: route.geometry.coordinates.map(([longitude, latitude]) => [latitude, longitude]),
      steps:
        route.legs?.[0]?.steps?.slice(0, 4).map((step) => ({
          instruction: step.maneuver?.instruction || `${step.name || "Continue"} for ${(step.distance / 1000).toFixed(1)} km`,
          distanceKm: step.distance / 1000,
        })) || [],
      source: "live",
    };
  } catch {
    return {
      distanceKm: fallbackDistance,
      durationMinutes: estimateRouteEtaMinutes(fallbackDistance),
      geometry: [
        [from.latitude, from.longitude],
        [to.latitude, to.longitude],
      ],
      steps: [
        { instruction: "Start from your current location.", distanceKm: 0 },
        { instruction: "Head toward the charging station using the highlighted route.", distanceKm: fallbackDistance },
        { instruction: "Arrive at your destination.", distanceKm: 0 },
      ],
      source: "fallback",
    };
  }
}
