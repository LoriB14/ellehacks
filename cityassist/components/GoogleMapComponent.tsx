"use client";

import React, { useEffect, useRef, useState } from "react";
import { useLoadScript, GoogleMap, Marker, InfoWindow } from "@react-google-maps/api";
import type { Resource, Coordinate } from "../types";

interface GoogleMapComponentProps {
  resources: Resource[];
  center: Coordinate;
  selectedId?: string;
  onSelectResource: (id: string | undefined) => void;
  query?: string;
  onPlacesFound?: (resources: Resource[], summary: string) => void;
}

const libraries: ("places")[] = ["places"];

export default function GoogleMapComponent({
  resources,
  center,
  selectedId,
  onSelectResource,
  query,
  onPlacesFound,
}: GoogleMapComponentProps) {
  const apiKey = (import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "").toString();
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: apiKey,
    libraries,
  });

  const [mapInstance, setMapInstance] = useState<google.maps.Map | null>(null);
  const [infoOpenId, setInfoOpenId] = useState<string | null>(null);

  useEffect(() => {
    if (loadError) {
      console.error("Google Maps failed to load:", loadError);
    }
  }, [loadError]);

  // Run Places textSearch when query changes
  /*
  useEffect(() => {
    if (!isLoaded || !query || !mapInstance) return;

    const service = new google.maps.places.PlacesService(mapInstance);
    const request: google.maps.places.TextSearchRequest = {
      query,
      location: new google.maps.LatLng(center.lat, center.lng),
      radius: 5000,
    };

    service.textSearch(request, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK && results && results.length > 0) {
        const mapped: Resource[] = results.map((r) => {
          const type = r.types?.[0]?.replace(/_/g, " ") || "place";
          const address = r.formatted_address || r.vicinity || "unknown location";
          return {
            id: r.place_id || r.id || Math.random().toString(36).slice(2, 9),
            name: r.name || "",
            description: `This is a ${type} located at ${address}.`,
            category: (r.types && r.types[0]) || "place",
            lat: r.geometry?.location?.lat() || 0,
            lng: r.geometry?.location?.lng() || 0,
            address: address,
            hours: r.opening_hours?.weekday_text ? r.opening_hours.weekday_text.join("; ") : "Hours not available",
          };
        });

        if (onPlacesFound) {
          onPlacesFound(mapped, `Showing ${mapped.length} places from Google for “${query}”`);
        }
      } else {
        // no results or error — let caller handle fallback
        if (onPlacesFound) onPlacesFound([], `No Google Places results for “${query}”.`);
      }
    });
  }, [isLoaded, query, center, onPlacesFound, mapInstance]);
  */

  if (!isLoaded) return <div className="w-full h-full flex items-center justify-center">Loading map…</div>;

  return (
    <GoogleMap
      onLoad={(map) => setMapInstance(map)}
      mapContainerClassName="w-full h-full"
      mapContainerStyle={{ width: "100%", height: "100%" }}
      // Use defaultCenter so the map is not forcibly re-centered on every render —
      // this allows the user to pan/zoom freely.
      defaultCenter={{ lat: center.lat, lng: center.lng }}
      zoom={13}
      options={{ disableDefaultUI: true, gestureHandling: 'greedy' }}
    >
      {/* user marker */}
      <Marker
        position={{ lat: center.lat, lng: center.lng }}
        icon={{
          path: google.maps.SymbolPath.CIRCLE,
          fillColor: "#2563eb",
          fillOpacity: 1,
          scale: 8,
          strokeWeight: 2,
          strokeColor: "#ffffff",
        }}
      />

      {resources.map((r) => (
        <Marker
          key={r.id}
          position={{ lat: r.lat, lng: r.lng }}
          onClick={() => {
            onSelectResource(r.id);
            setInfoOpenId(r.id);
          }}
        />
      ))}

      {infoOpenId && (() => {
        const r = resources.find((x) => x.id === infoOpenId);
        if (!r) return null;
        return (
          <InfoWindow position={{ lat: r.lat, lng: r.lng }} onCloseClick={() => { setInfoOpenId(null); onSelectResource(undefined); }}>
            <div className="max-w-xs">
              <h3 className="font-bold">{r.name}</h3>
              <p className="text-sm">{r.address}</p>
              <a className="text-blue-600 text-sm" href={`https://www.google.com/maps/dir/?api=1&destination=${r.lat},${r.lng}`} target="_blank" rel="noreferrer">Directions</a>
            </div>
          </InfoWindow>
        );
      })()}

    </GoogleMap>
  );
}
