import React, { useEffect, useRef, useMemo } from "react";
import L from "leaflet";
import { Resource, Coordinate } from "../types";

interface MapComponentProps {
  resources: Resource[];
  center: Coordinate;
  selectedId?: string;
  onSelectResource: (id: string) => void;
}

// Pre-create icons for better performance
const createIcon = (color: string, size: number) =>
  L.divIcon({
    className: "custom-pin",
    html: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${color}" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-full h-full drop-shadow-md"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size],
    popupAnchor: [0, -size],
  });

const DEFAULT_ICON = createIcon("#ef4444", 30);
const SELECTED_ICON = createIcon("#f59e0b", 40);

const USER_ICON = L.divIcon({
  className: "user-location-icon",
  html: `<div class="relative">
    <div class="w-4 h-4 bg-blue-600 rounded-full border-2 border-white shadow-lg animate-pulse"></div>
    <div class="absolute top-0 left-0 w-4 h-4 bg-blue-400 rounded-full animate-ping opacity-75"></div>
  </div>`,
  iconSize: [16, 16],
  iconAnchor: [8, 8],
});

const MapComponent: React.FC<MapComponentProps> = ({
  resources,
  center,
  selectedId,
  onSelectResource,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<{ [id: string]: L.Marker }>({});

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Check if map already exists
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setView([center.lat, center.lng]);
      return;
    }

    const map = L.map(mapContainerRef.current).setView(
      [center.lat, center.lng],
      13
    );

    // Fast-loading tile layer optimized for performance
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>',
      maxZoom: 18,
      minZoom: 10,
      // Performance optimizations
      crossOrigin: true,
      updateWhenIdle: true,
      updateWhenZooming: false,
      keepBuffer: 4,
      // Preload tiles for faster experience
      detectRetina: true,
      // Reduce server load and improve caching
      subdomains: ["a", "b", "c"],
    }).addTo(map);

    // Live user location marker
    const userMarker = L.marker([center.lat, center.lng], { icon: USER_ICON })
      .addTo(map)
      .bindPopup("📍 Your location");

    // Store user marker reference for updates
    (map as any)._userMarker = userMarker;

    mapInstanceRef.current = map;

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // We only want to init once. Updates are handled below.

  // Update Center and User Location
  useEffect(() => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo([center.lat, center.lng], 13);

      // Update user marker position
      const userMarker = (mapInstanceRef.current as any)._userMarker;
      if (userMarker) {
        userMarker.setLatLng([center.lat, center.lng]);
      }
    }
  }, [center]);

  // Update Markers
  useEffect(() => {
    if (!mapInstanceRef.current) return;

    const map = mapInstanceRef.current;

    // Clear existing markers
    Object.values(markersRef.current).forEach((marker) =>
      (marker as L.Marker).remove()
    );
    markersRef.current = {};

    // Add new markers with performance optimization
    resources.forEach((res) => {
      const isSelected = res.id === selectedId;
      const icon = isSelected ? SELECTED_ICON : DEFAULT_ICON;

      const marker = L.marker([res.lat, res.lng], { icon }).addTo(map)
        .bindPopup(`
          <div class="p-2">
            <div class="font-semibold text-sm">${res.name}</div>
            <div class="text-xs text-gray-600">${res.category}</div>
            <div class="text-xs text-gray-500 mt-1">${res.address}</div>
          </div>
        `);

      marker.on("click", () => {
        onSelectResource(res.id);
      });

      if (isSelected) {
        marker.openPopup();
      }

      markersRef.current[res.id] = marker;
    });
  }, [resources, selectedId, onSelectResource]);

  return <div ref={mapContainerRef} className="w-full h-full z-0" />;
};

export default MapComponent;
