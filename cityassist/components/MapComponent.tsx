import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import { Resource, Coordinate } from '../types';

interface MapComponentProps {
  resources: Resource[];
  center: Coordinate;
  selectedId?: string;
  onSelectResource: (id: string) => void;
  onBoundsChange?: (bounds: { north: number, south: number, east: number, west: number }) => void;
}

const MapComponent: React.FC<MapComponentProps> = React.memo(({ resources, center, selectedId, onSelectResource, onBoundsChange }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<{ [id: string]: L.Marker }>({});
  const lastCenterRef = useRef<Coordinate>(center);

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapInstanceRef.current) return;

    const map = L.map(mapContainerRef.current, {
        zoomControl: false,
        attributionControl: false
    }).setView([center.lat, center.lng], 13);

    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      subdomains: 'abcd',
      maxZoom: 20
    }).addTo(map);

    L.control.zoom({ position: 'bottomright' }).addTo(map);

    // User Marker
    const userIcon = L.divIcon({
      className: 'custom-div-icon',
      html: "<div style='background-color: #2563eb; width: 16px; height: 16px; border-radius: 50%; border: 3px solid white; box-shadow: 0 0 5px rgba(0,0,0,0.3);'></div>",
      iconSize: [20, 20],
      iconAnchor: [10, 10]
    });
    L.marker([center.lat, center.lng], { icon: userIcon }).addTo(map).bindPopup("You are here");

    // Event Listeners for Auto-Discovery
    if (onBoundsChange) {
        map.on('moveend', () => {
            const b = map.getBounds();
            onBoundsChange({
                north: b.getNorth(),
                south: b.getSouth(),
                east: b.getEast(),
                west: b.getWest()
            });
        });
    }

    mapInstanceRef.current = map;

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); 

  // Update Center
  useEffect(() => {
    if (!mapInstanceRef.current) return;
    
    const dist = Math.sqrt(
        Math.pow(center.lat - lastCenterRef.current.lat, 2) + 
        Math.pow(center.lng - lastCenterRef.current.lng, 2)
    );

    if (dist > 0.0001) {
        mapInstanceRef.current.setView([center.lat, center.lng], 13);
        lastCenterRef.current = center;
    }
  }, [center.lat, center.lng]);

  // Update Markers
  useEffect(() => {
    if (!mapInstanceRef.current) return;
    const map = mapInstanceRef.current;

    Object.values(markersRef.current).forEach((marker) => (marker as L.Marker).remove());
    markersRef.current = {};

    resources.forEach(res => {
      const isSelected = res.id === selectedId;
      // Discovered resources are Purple. Emergency Red. Selected Amber. Default Blue.
      let color = '#3b82f6';
      if (res.isEmergency) color = '#ef4444';
      else if (res.category === 'discovered') color = '#a855f7';
      if (isSelected) color = '#f59e0b';

      const zIndex = isSelected ? 1000 : 1;
      const size = isSelected ? 40 : 30;

      const customIcon = L.divIcon({
        className: 'custom-pin',
        html: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${color}" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-full h-full drop-shadow-md"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>`,
        iconSize: [size, size],
        iconAnchor: [size / 2, size],
        popupAnchor: [0, -size]
      });

      const marker = L.marker([res.lat, res.lng], { icon: customIcon, zIndexOffset: zIndex })
        .addTo(map)
        .bindPopup(`<b>${res.name}</b><br/>${res.category}`);
      
      marker.on('click', () => {
        onSelectResource(res.id);
      });

      if (isSelected) marker.openPopup();
      markersRef.current[res.id] = marker;
    });
  }, [resources, selectedId, onSelectResource]);

  return <div ref={mapContainerRef} className="w-full h-full z-0" />;
});

export default MapComponent;