
import React, { useState, useEffect } from 'react';
import { Coordinate } from './types';
import { DEFAULT_CENTER } from './constants';
import LandingPage from './components/LandingPage';
import ResultsPage from './components/ResultsPage';

const App: React.FC = () => {
  const [userLocation, setUserLocation] = useState<Coordinate>(DEFAULT_CENTER);
  const [currentPath, setCurrentPath] = useState(window.location.hash);

  // Initialize location once at app level
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.warn("Geolocation denied or failed:", error);
        }
      );
    }
  }, []);

  // Listen for hash changes to handle routing
  useEffect(() => {
    const handleHashChange = () => {
      setCurrentPath(window.location.hash);
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Simple routing logic:
  // If hash starts with #/map, render ResultsPage. Otherwise LandingPage.
  const cleanPath = currentPath.replace(/^#/, '');
  const isMap = cleanPath.startsWith('/map');

  return (
    <div className="h-screen w-full bg-slate-50 text-slate-900 font-sans">
      {isMap ? (
        <ResultsPage userLocation={userLocation} />
      ) : (
        <LandingPage />
      )}
    </div>
  );
};

export default App;
