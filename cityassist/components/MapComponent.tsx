import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import { Resource, Coordinate } from '../types';

interface MapComponentProps {
  resources: Resource[];
  center: Coordinate;
  selectedId?: string;
  onSelectResource: (id: string) => void;
}

const MapComponent: React.FC<MapComponentProps> = ({ resources, center, selectedId, onSelectResource }) => {
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

    const map = L.map(mapContainerRef.current).setView([center.lat, center.lng], 13);

    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 20
    }).addTo(map);

    // Custom User Icon
    const userIcon = L.divIcon({
      className: 'custom-div-icon',
      html: "<div style='background-color: #2563eb; width: 16px; height: 16px; border-radius: 50%; border: 3px solid white; box-shadow: 0 0 5px rgba(0,0,0,0.3);'></div>",
      iconSize: [20, 20],
      iconAnchor: [10, 10]
    });

    L.marker([center.lat, center.lng], { icon: userIcon }).addTo(map).bindPopup("You are here");

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

  // Update Center
  useEffect(() => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo([center.lat, center.lng], 13);
      // Update user marker position (assuming the first marker added is user)
      // Simplification for MVP: Just re-rendering logic is complex without React-Leaflet, 
      // so we focus on resource markers updating.
    }
  }, [center]);

  // Update Markers
  useEffect(() => {
    if (!mapInstanceRef.current) return;

    const map = mapInstanceRef.current;

    // Clear existing markers
    Object.values(markersRef.current).forEach((marker) => (marker as L.Marker).remove());
    markersRef.current = {};

    // Add new markers
    resources.forEach(res => {
      const isSelected = res.id === selectedId;
      
      const color = isSelected ? '#f59e0b' : '#ef4444';
      const size = isSelected ? 40 : 30;

      const customIcon = L.divIcon({
        className: 'custom-pin',
        html: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${color}" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-full h-full drop-shadow-md"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>`,
        iconSize: [size, size],
        iconAnchor: [size / 2, size],
        popupAnchor: [0, -size]
      });

      const marker = L.marker([res.lat, res.lng], { icon: customIcon })
        .addTo(map)
        .bindPopup(`<b>${res.name}</b><br/>${res.category}`);
      
      marker.on('click', () => {
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