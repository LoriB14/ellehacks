import React, { useState, useEffect, createContext } from "react";
import { Coordinate } from "./types";
import { DEFAULT_CENTER } from "./constants";
import LandingPage from "./components/LandingPage";
import ResultsPage from "./components/ResultsPage";
import CommunityPage from "./components/CommunityPage";
import SavedPage from "./components/SavedPage";
import SettingsPage from "./components/SettingsPage";
import EventsPage from "./components/EventsPage";
import AnnouncementsPage from "./components/AnnouncementsPage";
import AnnouncementBanner from "./components/AnnouncementBanner";
import SideNav from "./components/SideNav";

export const DarkModeContext = createContext<{
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
}>({
  darkMode: false,
  setDarkMode: () => {},
});

const App: React.FC = () => {
  const [userLocation, setUserLocation] = useState<Coordinate>(DEFAULT_CENTER);
  const [currentPath, setCurrentPath] = useState(window.location.hash);
  const [showLocationPrompt, setShowLocationPrompt] = useState(false);
  const [locationPermission, setLocationPermission] = useState<
    "prompt" | "granted" | "denied"
  >("prompt");
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("darkMode");
    return saved === "true";
  });

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode.toString());
  }, [darkMode]);

  // Check location permission on mount
  useEffect(() => {
    const checkLocationPermission = async () => {
      if ("permissions" in navigator) {
        try {
          const result = await navigator.permissions.query({
            name: "geolocation",
          });
          if (result.state === "prompt") {
            setShowLocationPrompt(true);
          } else if (result.state === "granted") {
            setLocationPermission("granted");
            getUserLocation();
          } else {
            setLocationPermission("denied");
          }
        } catch {
          // Fallback if permissions API not supported
          setShowLocationPrompt(true);
        }
      } else {
        setShowLocationPrompt(true);
      }
    };

    checkLocationPermission();
  }, []);

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          setLocationPermission("granted");
          setShowLocationPrompt(false);
        },
        (error) => {
          console.warn("Geolocation denied or failed:", error);
          setLocationPermission("denied");
          setShowLocationPrompt(false);
        }
      );
    }
  };

  const handleEnableLocation = () => {
    getUserLocation();
  };

  const handleSkipLocation = () => {
    setShowLocationPrompt(false);
    setLocationPermission("denied");
  };

  // Listen for hash changes to handle routing
  useEffect(() => {
    const handleHashChange = () => {
      setCurrentPath(window.location.hash);
    };
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  // Simple routing logic
  const cleanPath = currentPath.replace(/^#/, "");
  const isMap = cleanPath.startsWith("/map");
  const isCommunity = cleanPath.startsWith("/community");
  const isSaved = cleanPath.startsWith("/saved");
  const isSettings = cleanPath.startsWith("/settings");
  const isEvents = cleanPath.startsWith("/events");
  const isAnnouncements = cleanPath.startsWith("/announcements");

  return (
    <DarkModeContext.Provider value={{ darkMode, setDarkMode }}>
      <div
        className={`h-screen w-full font-sans flex transition-colors duration-300 ${
          darkMode ? "bg-gray-900 text-gray-100" : "bg-white text-slate-900"
        }`}
      >
        {/* Location Permission Popup */}
        {showLocationPrompt && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
            <div className="bg-white rounded-3xl p-8 max-w-md w-full">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-indigo-100 rounded-full flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-indigo-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                  Enable your location?
                </h2>
                <p className="text-gray-600 mb-6">
                  We'll show you resources near you. This helps you find help
                  faster.
                </p>
                <div className="space-y-3">
                  <button
                    onClick={handleEnableLocation}
                    className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white rounded-xl font-medium transition-all duration-200 ease-out hover:shadow-md active:scale-95"
                  >
                    Enable location
                  </button>
                  <button
                    onClick={handleSkipLocation}
                    className="w-full py-4 bg-gray-100 hover:bg-gray-200 active:bg-gray-300 text-gray-700 rounded-xl font-medium transition-all duration-200 ease-out active:scale-95"
                  >
                    Skip for now
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Side Navigation */}
        <SideNav currentPath={currentPath} />

        {/* Main Content */}
        <div className="main-content-area flex-1 md:ml-64 overflow-hidden flex flex-col transition-all duration-300 ease-out">
          {/* Announcement Banner */}
          <AnnouncementBanner />

          <div className="flex-1 overflow-hidden">
            {isMap ? (
                <ResultsPage userLocation={userLocation} setUserLocation={setUserLocation} />
              ) : isCommunity ? (
              <CommunityPage />
            ) : isSaved ? (
              <SavedPage />
            ) : isSettings ? (
              <SettingsPage />
            ) : isEvents ? (
              <EventsPage />
            ) : isAnnouncements ? (
              <AnnouncementsPage />
            ) : (
              <LandingPage />
            )}
          </div>
        </div>
      </div>
    </DarkModeContext.Provider>
  );
};

export default App;
