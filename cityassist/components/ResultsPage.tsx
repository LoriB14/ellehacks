import React, { useState, useEffect, useCallback } from "react";
import { Resource, Coordinate, AIResponse } from "../types";
import { STATIC_RESOURCES } from "../constants";
import { searchResourcesWithGemini } from "../services/geminiService";
import {
  getQuickAnswer,
  generateFallbackAnswer,
} from "../services/chatService";
import GoogleMapComponent from "./GoogleMapComponent";
import ResourceCard from "./ResourceCard";
import EmergencyBanner from "./EmergencyBanner";
import ChatAnswer from "./ChatAnswer";

interface ResultsPageProps {
  userLocation: Coordinate;
  setUserLocation?: (c: Coordinate) => void;
}

const ResultsPage: React.FC<ResultsPageProps> = ({ userLocation, setUserLocation }) => {
  // Manual query parsing from hash
  const getQueryFromHash = () => {
    const hash = window.location.hash;
    const qIndex = hash.indexOf("?");
    if (qIndex === -1) return "";
    const search = new URLSearchParams(hash.substring(qIndex));
    return search.get("q") || "";
  };

  const [queryParam, setQueryParam] = useState<string>(getQueryFromHash());

  // Listen for hash changes to sync queryParam
  useEffect(() => {
    const handleHashChange = () => {
      setQueryParam(getQueryFromHash());
    };
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const navigate = (path: string) => {
    window.location.hash = path;
  };

  const [query, setQuery] = useState<string>(queryParam);
  const [resources, setResources] = useState<Resource[]>(STATIC_RESOURCES);
  const [summary, setSummary] = useState<string>("Showing all resources.");
  const [selectedId, setSelectedId] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const [isMobileMapOpen, setIsMobileMapOpen] = useState<boolean>(false);
  const [chatAnswer, setChatAnswer] = useState<ReturnType<
    typeof getQuickAnswer
  > | null>(null);
  const [showLocationInput, setShowLocationInput] = useState(false);
  const [manualLat, setManualLat] = useState(String(userLocation.lat || ""));
  const [manualLng, setManualLng] = useState(String(userLocation.lng || ""));

  useEffect(() => {
    setManualLat(String(userLocation.lat || ""));
    setManualLng(String(userLocation.lng || ""));
  }, [userLocation]);

  // Detect crisis keywords
  const isCrisisQuery = (q: string) => {
    const lower = q.toLowerCase();
    return (
      lower.includes("suicide") ||
      lower.includes("kill") ||
      lower.includes("died") ||
      lower.includes("overdose") ||
      lower.includes("emergency") ||
      lower.includes("crisis") ||
      lower.includes("help me")
    );
  };

  const [showEmergencyBanner, setShowEmergencyBanner] = useState(false);

  // Sync local state with URL
  useEffect(() => {
    setQuery(queryParam);
    setShowEmergencyBanner(isCrisisQuery(queryParam));

    // Get quick answer for the query
    const answer = getQuickAnswer(queryParam);
    setChatAnswer(answer);
  }, [queryParam]);

  const performSearch = useCallback(
    async (searchQuery: string) => {
      if (!searchQuery.trim()) return;

      setLoading(true);
      setIsMobileMapOpen(false);
      setShowEmergencyBanner(isCrisisQuery(searchQuery));

      // Get quick answer
      const answer = getQuickAnswer(searchQuery);
      setChatAnswer(answer);

      try {
        const result: AIResponse = await searchResourcesWithGemini(
          searchQuery,
          userLocation.lat,
          userLocation.lng
        );
        setResources(result.resources);
        setSummary(result.summary);
        if (result.resources.length > 0) {
          setSelectedId(result.resources[0].id);
        }
      } catch (err) {
        console.error(err);
        setSummary("Sorry, we couldn't process your request right now.");
      } finally {
        setLoading(false);
      }
    },
    [userLocation]
  );

  const handleSuggestedSearch = (suggestedQuery: string) => {
    navigate(`/map?q=${encodeURIComponent(suggestedQuery)}`);
  };

  // Execute search when URL query changes or on mount
  useEffect(() => {
    if (queryParam) {
      performSearch(queryParam);
    }
  }, [queryParam, performSearch]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/map?q=${encodeURIComponent(query)}`);
    }
  };

  const handleChipClick = (category: string) => {
    navigate(`/map?q=${encodeURIComponent("Find " + category)}`);
  };

  const handleBack = () => {
    navigate("/");
  };

  const handlePlacesFound = (placeResources: Resource[], summ: string) => {
    if (placeResources && placeResources.length > 0) {
      setResources(placeResources);
      setSummary(summ);
      setSelectedId(placeResources[0].id);
    } else {
      // no places found — update summary but keep other results
      setSummary(summ);
    }
  };

  const handleSetManualLocation = (e: React.FormEvent) => {
    e.preventDefault();
    const lat = parseFloat(manualLat);
    const lng = parseFloat(manualLng);
    if (!isNaN(lat) && !isNaN(lng)) {
      if (setUserLocation) {
        setUserLocation({ lat, lng });
      }
      setShowLocationInput(false);
    }
  };

  return (
    <div className="h-full w-full flex flex-col md:flex-row bg-white overflow-hidden">
      {/* Sidebar / Main Content Area */}
      <div
        className={`flex-1 flex flex-col h-full md:max-w-md lg:max-w-lg bg-white shadow-xl z-10 ${
          isMobileMapOpen ? "hidden md:flex" : "flex"
        }`}
      >
        {/* Header */}
        <div className="p-4 bg-white border-b sticky top-0 z-20">
          <div className="flex items-center gap-3 mb-4">
            <button
              onClick={handleBack}
              className="p-2 -ml-2 hover:bg-indigo-50 active:bg-indigo-100 rounded-lg text-gray-600 transition-all duration-200 ease-out active:scale-95"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                ></path>
              </svg>
            </button>
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center shadow-sm">
                <span className="text-white text-sm font-bold">6</span>
              </div>
              <h1 className="text-lg font-semibold text-gray-800">
                Resources Near You
              </h1>
            </div>
          </div>

          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for help..."
              className="w-full pl-4 pr-12 py-3 rounded-xl border-2 border-indigo-200 bg-white focus:border-indigo-500 outline-none transition-all duration-300 text-base"
            />
            <button
              type="submit"
              disabled={loading}
              className="absolute right-2 top-2 bottom-2 bg-indigo-500 hover:bg-indigo-700 active:bg-indigo-800 text-white rounded-lg px-4 flex items-center justify-center transition-all duration-200 ease-out disabled:opacity-50 hover:shadow-md active:scale-95"
            >
              {loading ? (
                <svg
                  className="animate-spin h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              ) : (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  ></path>
                </svg>
              )}
            </button>
          </form>

          {/* Manual location setter - in case geolocation is denied */}
          <div className="mt-3 flex items-center gap-3">
            <button
              onClick={() => setShowLocationInput((s) => !s)}
              className="px-3 py-2 rounded-md bg-gray-100 hover:bg-gray-200 text-sm text-gray-700"
            >
              {showLocationInput ? "Hide location" : "Set my location"}
            </button>

            {showLocationInput && (
              <form onSubmit={handleSetManualLocation} className="flex items-center gap-2">
                <input
                  type="text"
                  value={manualLat}
                  onChange={(e) => setManualLat(e.target.value)}
                  placeholder="lat"
                  className="w-24 px-2 py-1 rounded-md border text-sm"
                />
                <input
                  type="text"
                  value={manualLng}
                  onChange={(e) => setManualLng(e.target.value)}
                  placeholder="lng"
                  className="w-24 px-2 py-1 rounded-md border text-sm"
                />
                <button className="px-3 py-1 rounded-md bg-indigo-500 text-white text-sm">Save</button>
              </form>
            )}
          </div>

          {/* Quick Filters */}
          <div className="flex gap-2 mt-3 overflow-x-auto pb-1 no-scrollbar">
            {["Food", "Shelter", "Health", "Legal"].map((cat) => (
              <button
                key={cat}
                onClick={() => handleChipClick(cat)}
                className="whitespace-nowrap px-4 py-2 rounded-full bg-indigo-50 text-indigo-800 text-sm font-medium hover:bg-indigo-100 active:bg-indigo-200 transition-all duration-200 ease-out border border-indigo-200 active:scale-95"
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
          {/* Emergency Banner */}
          {showEmergencyBanner && <EmergencyBanner />}

          {/* Chat Answer */}
          {chatAnswer && (
            <ChatAnswer
              answer={chatAnswer.answer}
              suggestedSearches={chatAnswer.suggestedSearches}
              urgency={chatAnswer.urgency}
              onSearchClick={handleSuggestedSearch}
              onClose={() => setChatAnswer(null)}
            />
          )}

          {/* AI Summary */}
          {summary && (
            <div className="mb-6 bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-100 animate-fade-in">
              <div className="flex items-start gap-3">
                <div className="mt-1 shrink-0">
                  <svg
                    className="w-5 h-5 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-blue-900 mb-1">
                    CityAssist AI
                  </h4>
                  <p className="text-sm text-blue-800 leading-relaxed">
                    {summary}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* List */}
          {resources.length === 0 ? (
            <div className="text-center py-12 text-slate-400">
              <p>No resources found.</p>
            </div>
          ) : (
            resources.map((resource) => (
              <ResourceCard
                key={resource.id}
                resource={resource}
                isSelected={resource.id === selectedId}
                onClick={() => setSelectedId(resource.id)}
              />
            ))
          )}
        </div>
      </div>

      {/* Map Area */}
      <div
        className={`flex-1 relative bg-slate-200 ${
          isMobileMapOpen ? "block" : "hidden md:block"
        }`}
      >
        <GoogleMapComponent
          resources={resources}
          center={userLocation}
          selectedId={selectedId}
          onSelectResource={setSelectedId}
          query={queryParam}
          onPlacesFound={handlePlacesFound}
        />

        {/* Mobile Map Controls */}
        <div className="md:hidden absolute top-4 left-4 z-[1000]">
          <button
            onClick={() => setIsMobileMapOpen(false)}
            className="bg-white p-3 rounded-full shadow-lg text-slate-700"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              ></path>
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Bottom Nav */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t flex justify-around p-3 z-30 pb-safe">
        <button
          onClick={() => setIsMobileMapOpen(false)}
          className={`flex flex-col items-center gap-1 text-xs font-medium ${
            !isMobileMapOpen ? "text-blue-600" : "text-slate-400"
          }`}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 10h16M4 14h16M4 18h16"
            ></path>
          </svg>
          List
        </button>
        <button
          onClick={() => setIsMobileMapOpen(true)}
          className={`flex flex-col items-center gap-1 text-xs font-medium ${
            isMobileMapOpen ? "text-blue-600" : "text-slate-400"
          }`}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
            ></path>
          </svg>
          Map
        </button>
      </div>
    </div>
  );
};

export default ResultsPage;
