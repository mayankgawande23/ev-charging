import { useEffect, useMemo, useRef, useState } from "react";
import { mapConfig } from "../../config/mapConfig";
import { formatDistance } from "../../utils/formatters";
import MapControls from "./MapControls";

export default function LeafletMap({
  stations,
  userLocation,
  selectedStation,
  routeData,
  routeLoading = false,
  onStationSelect,
  onFocusFilters,
}) {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const leafletRef = useRef(null);
  const stationLayerRef = useRef(null);
  const routeLayerRef = useRef(null);
  const userLayerRef = useRef(null);
  const [isMapReady, setIsMapReady] = useState(false);

  const mapStations = useMemo(() => stations || [], [stations]);

  useEffect(() => {
    let cancelled = false;

    async function initializeMap() {
      if (mapRef.current || !mapContainerRef.current) {
        return;
      }

      const leafletModule = await import("leaflet");
      if (cancelled) {
        return;
      }

      const leaflet = leafletModule.default;
      leafletRef.current = leaflet;

      const map = leaflet.map(mapContainerRef.current, {
        zoomControl: false,
        center: mapConfig.defaultCenter,
        zoom: mapConfig.defaultZoom,
      });

      leaflet
        .tileLayer(mapConfig.tileUrl, {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        })
        .addTo(map);

      stationLayerRef.current = leaflet.layerGroup().addTo(map);
      routeLayerRef.current = leaflet.layerGroup().addTo(map);
      userLayerRef.current = leaflet.layerGroup().addTo(map);
      mapRef.current = map;
      setIsMapReady(true);
    }

    initializeMap();

    return () => {
      cancelled = true;
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    const leaflet = leafletRef.current;
    const map = mapRef.current;

    if (!leaflet || !map || !stationLayerRef.current || !userLayerRef.current || !routeLayerRef.current) {
      return;
    }

    stationLayerRef.current.clearLayers();
    userLayerRef.current.clearLayers();
    routeLayerRef.current.clearLayers();

    const boundsPoints = [];

    mapStations.forEach((station) => {
      const circle = leaflet.circleMarker([station.lat, station.lng], {
        radius: selectedStation?.id === station.id ? 12 : 9,
        color: selectedStation?.id === station.id ? "#10B981" : "#3B82F6",
        weight: 3,
        fillColor: selectedStation?.id === station.id ? "#10B981" : "#3B82F6",
        fillOpacity: 0.8,
      });

      circle
        .bindPopup(
          `<div style="min-width: 180px">
            <strong>${station.name}</strong><br />
            <span>${station.address}</span><br />
            <span>${station.availableChargers}/${station.totalChargers} chargers free</span>
          </div>`,
        )
        .on("click", () => onStationSelect?.(station))
        .addTo(stationLayerRef.current);

      boundsPoints.push([station.lat, station.lng]);
    });

    if (userLocation) {
      leaflet
        .circleMarker([userLocation.latitude, userLocation.longitude], {
          radius: 10,
          color: "#F97316",
          weight: 3,
          fillColor: "#F97316",
          fillOpacity: 0.85,
        })
        .bindPopup("Your current location")
        .addTo(userLayerRef.current);

      boundsPoints.push([userLocation.latitude, userLocation.longitude]);
    }

    if (routeData?.geometry?.length) {
      const polyline = leaflet.polyline(routeData.geometry, {
        color: "#10B981",
        weight: 5,
        opacity: 0.9,
      });
      polyline.addTo(routeLayerRef.current);
      boundsPoints.push(...routeData.geometry);
    }

    if (boundsPoints.length > 1) {
      map.fitBounds(boundsPoints, { padding: [32, 32] });
    } else if (selectedStation) {
      map.setView([selectedStation.lat, selectedStation.lng], 13);
    } else if (userLocation) {
      map.setView([userLocation.latitude, userLocation.longitude], 13);
    } else {
      map.setView(mapConfig.defaultCenter, mapConfig.defaultZoom);
    }
  }, [mapStations, onStationSelect, routeData, selectedStation, userLocation]);

  const handleControl = (action) => {
    const map = mapRef.current;
    if (!map) {
      return;
    }

    if (action === "zoomIn") {
      map.zoomIn();
      return;
    }

    if (action === "zoomOut") {
      map.zoomOut();
      return;
    }

    if (action === "recenter") {
      if (userLocation) {
        map.setView([userLocation.latitude, userLocation.longitude], 13);
      } else if (selectedStation) {
        map.setView([selectedStation.lat, selectedStation.lng], 13);
      }
      return;
    }

    if (action === "filters") {
      onFocusFilters?.();
    }
  };

  return (
    <div className="overflow-hidden rounded-[30px] border border-slate-200 bg-slate-950 shadow-soft dark:border-slate-800">
      <div className="flex flex-col gap-4 border-b border-white/10 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.35),transparent_30%),linear-gradient(135deg,#0f172a,#111827)] px-4 py-4 text-white sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="font-display text-xl font-semibold">Live station map</p>
          <p className="text-sm text-slate-300">
            Real EV markers, current location tracking, and route guidance to your selected station.
          </p>
          {selectedStation && (
            <p className="mt-2 text-sm text-emerald-300">
              Focused station: {selectedStation.name} • {formatDistance(selectedStation.distance)}
            </p>
          )}
        </div>
        <MapControls onControl={handleControl} />
      </div>

      <div ref={mapContainerRef} className="min-h-[420px] w-full" />

      <div className="grid gap-3 border-t border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900 md:grid-cols-3">
        <div className="rounded-3xl bg-slate-50 p-4 dark:bg-slate-800">
          <p className="text-sm text-slate-500">Stations in view</p>
          <p className="mt-1 font-display text-2xl font-semibold">{mapStations.length}</p>
        </div>
        <div className="rounded-3xl bg-slate-50 p-4 dark:bg-slate-800">
          <p className="text-sm text-slate-500">Routing status</p>
          <p className="mt-1 font-display text-2xl font-semibold">
            {routeLoading ? "Loading..." : routeData ? "Route ready" : isMapReady ? "Map ready" : "Preparing"}
          </p>
        </div>
        <div className="rounded-3xl bg-slate-50 p-4 dark:bg-slate-800">
          <p className="text-sm text-slate-500">Location mode</p>
          <p className="mt-1 font-display text-2xl font-semibold">{userLocation ? "Live" : "Default city"}</p>
        </div>
      </div>
    </div>
  );
}
