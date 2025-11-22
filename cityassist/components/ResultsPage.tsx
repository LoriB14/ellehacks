import React, { useState, useEffect, useCallback } from 'react';
import { Resource, Coordinate, AIResponse, UserUpdate } from '../types';
import { STATIC_RESOURCES } from '../constants';
import { searchResourcesWithGemini } from '../services/geminiService';
import { geocodeAddress } from '../services/locationService';
import { getUpdates, addUpdate, getFavorites } from '../services/storageService';
import { searchAreaForResources } from '../services/osmService';
import MapComponent from './MapComponent';
import ResourceCard from './ResourceCard';
import EmergencyBanner from './EmergencyBanner';
import ContributeModal from './ContributeModal';

interface ResultsPageProps {
  userLocation: Coordinate;
  setUserLocation: (coord: Coordinate) => void;
}

const ResultsPage: React.FC<ResultsPageProps> = ({ userLocation, setUserLocation }) => {
  const getQueryFromHash = () => {
    const hash = window.location.hash;
    const qIndex = hash.indexOf('?');
    if (qIndex === -1) return '';
    const search = new URLSearchParams(hash.substring(qIndex));
    return search.get('q') || '';
  };

  const [queryParam, setQueryParam] = useState<string>(getQueryFromHash());
  
  useEffect(() => {
      const handleHashChange = () => setQueryParam(getQueryFromHash());
      window.addEventListener('hashchange', handleHashChange);
      return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigate = (path: string) => {
    window.location.hash = path;
  };

  // State
  const [query, setQuery] = useState<string>(queryParam);
  const [resources, setResources] = useState<Resource[]>(STATIC_RESOURCES);
  const [summary, setSummary] = useState<string>('Showing resources.');
  const [tips, setTips] = useState<string[]>([]);
  const [selectedId, setSelectedId] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const [isMobileMapOpen, setIsMobileMapOpen] = useState<boolean>(false);
  
  // New State Features
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0); // Hack to force re-render on fav/update
  const [mapBounds, setMapBounds] = useState<{north: number, south: number, east: number, west: number} | null>(null);
  const [isDiscovering, setIsDiscovering] = useState(false);

  // Contribute / Edit State
  const [isContributeOpen, setIsContributeOpen] = useState(false);
  const [updateTargetId, setUpdateTargetId] = useState<string | undefined>(undefined);
  const [isEditingLocation, setIsEditingLocation] = useState(false);
  const [newLocationAddress, setNewLocationAddress] = useState('');
  
  const [showEmergencyBanner, setShowEmergencyBanner] = useState(false);

  const isCrisisQuery = (q: string) => {
    const lower = q.toLowerCase();
    return lower.includes('suicide') || lower.includes('kill') || lower.includes('overdose') || lower.includes('emergency') || lower.includes('crisis');
  };

  // Merge static data with LocalStorage updates and favorites
  const getEnrichedResources = (baseResources: Resource[]) => {
    const updates = getUpdates();
    const favs = getFavorites();

    return baseResources.map(res => ({
      ...res,
      lastUpdate: updates[res.id],
      isFavorite: favs.includes(res.id)
    }));
  };

  // 1. Initial Search
  const performSearch = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) return;

    setLoading(true);
    setIsMobileMapOpen(false);
    setShowEmergencyBanner(isCrisisQuery(searchQuery));
    
    try {
      const result: AIResponse = await searchResourcesWithGemini(searchQuery, userLocation.lat, userLocation.lng);
      setResources(getEnrichedResources(result.resources));
      setSummary(result.summary);
      setTips(result.tips || []);
      if (result.resources.length > 0) {
        setSelectedId(result.resources[0].id);
      }
    } catch (err) {
      console.error(err);
      setSummary("Sorry, couldn't reach AI. Showing default resources.");
      setResources(getEnrichedResources(STATIC_RESOURCES));
    } finally {
      setLoading(false);
    }
  }, [userLocation]);

  useEffect(() => {
    if (queryParam) performSearch(queryParam);
    setQuery(queryParam);
  }, [queryParam, performSearch]);

  // Re-enrich resources when favorites/updates change
  useEffect(() => {
    setResources(prev => getEnrichedResources(prev));
  }, [refreshTrigger]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) navigate(`/map?q=${encodeURIComponent(query)}`);
  };
  
  const handleLocationSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!newLocationAddress.trim()) return;
      
      const coords = await geocodeAddress(newLocationAddress);
      if (coords) {
          setUserLocation(coords);
          setIsEditingLocation(false);
          setNewLocationAddress('');
      } else {
          alert("Could not find location.");
      }
  };

  // User Contribution Logic
  const openUpdateModal = (id?: string) => {
    setUpdateTargetId(id);
    setIsContributeOpen(true);
  };

  const handleUpdateSubmit = (id: string, update: UserUpdate) => {
    addUpdate(id, update);
    setRefreshTrigger(prev => prev + 1); // Refresh UI
  };

  // Auto Discovery Logic
  const handleAutoDiscover = async () => {
    if (!mapBounds) return;
    setIsDiscovering(true);
    
    const newPlaces = await searchAreaForResources(mapBounds.north, mapBounds.south, mapBounds.east, mapBounds.west);
    
    // Filter out duplicates based on lat/lng proximity or name roughly
    // Simple dedupe for demo:
    const existingIds = new Set(resources.map(r => r.id));
    const uniqueNew = newPlaces.filter(np => !existingIds.has(np.id));

    if (uniqueNew.length > 0) {
        setResources(prev => [...prev, ...uniqueNew]);
        setSummary(`Discovered ${uniqueNew.length} new places in this area.`);
    } else {
        alert("No new relevant places found in this specific area.");
    }
    setIsDiscovering(false);
  };

  // Filtering
  const displayedResources = showFavoritesOnly 
    ? resources.filter(r => r.isFavorite) 
    : resources;

  return (
    <div className="h-full w-full flex flex-col md:flex-row bg-slate-50 overflow-hidden">
        
      {/* Sidebar */}
      <div className={`flex-1 flex flex-col h-full md:max-w-md lg:max-w-lg bg-white shadow-xl z-10 ${isMobileMapOpen ? 'hidden md:flex' : 'flex'}`}>
        
        {/* Header */}
        <div className="p-4 bg-white border-b sticky top-0 z-20 shadow-sm">
          <div className="flex items-center justify-between mb-4">
             <div className="flex items-center gap-2">
                <button onClick={() => navigate('/')} className="p-2 -ml-2 hover:bg-slate-100 rounded-lg text-slate-500">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                </button>
                <div className="flex flex-col">
                     <h1 className="text-lg font-bold text-slate-900 leading-none">Results</h1>
                </div>
            </div>
            <button 
                onClick={() => openUpdateModal()}
                className="text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full hover:bg-blue-100 flex items-center gap-1"
            >
                + Contribute
            </button>
          </div>

          {/* Prominent Location Changer */}
          <div className="mb-4">
              {!isEditingLocation ? (
                  <button 
                    onClick={() => setIsEditingLocation(true)}
                    className="w-full flex items-center justify-between px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg hover:border-blue-300 transition-colors group"
                  >
                      <div className="flex items-center gap-2 text-sm text-slate-700">
                          <svg className="w-4 h-4 text-slate-400 group-hover:text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                          <span className="truncate max-w-[200px]">Near Current Location</span>
                      </div>
                      <span className="text-xs font-bold text-blue-600">Change</span>
                  </button>
              ) : (
                <form onSubmit={handleLocationSubmit} className="flex gap-2 animate-fade-in">
                    <input 
                        type="text" 
                        placeholder="Enter intersection or city..." 
                        className="flex-1 text-sm p-2 border border-blue-300 rounded-lg bg-white ring-2 ring-blue-50 outline-none"
                        value={newLocationAddress}
                        onChange={e => setNewLocationAddress(e.target.value)}
                        autoFocus
                    />
                    <button type="submit" className="text-sm bg-blue-600 text-white px-3 rounded-lg hover:bg-blue-700">Set</button>
                    <button type="button" onClick={() => setIsEditingLocation(false)} className="text-slate-400">✕</button>
                </form>
              )}
          </div>

          <div className="flex gap-2 items-center">
            <form onSubmit={handleSearchSubmit} className="relative flex-1">
                <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full pl-3 pr-10 py-2 rounded-lg border border-slate-200 bg-slate-50 text-sm focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none"
                />
                <button type="submit" className="absolute right-1 top-1 bottom-1 px-2 text-slate-400 hover:text-blue-600">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                </button>
            </form>
            
            <button 
                onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
                className={`p-2 rounded-lg border transition-colors ${showFavoritesOnly ? 'bg-red-50 border-red-200 text-red-500' : 'bg-white border-slate-200 text-slate-400 hover:text-slate-600'}`}
                title="Show Favorites"
            >
                <svg className="w-5 h-5" fill={showFavoritesOnly ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
            </button>
          </div>
        </div>

        {/* List Content */}
        <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
          {showEmergencyBanner && <EmergencyBanner />}

          {/* AI Summary */}
          {!showFavoritesOnly && summary && (
            <div className="mb-4 bg-blue-50 p-4 rounded-xl border border-blue-100 text-sm text-slate-700">
              <p className="font-semibold text-blue-800 mb-2">AI Summary</p>
              {summary}
              {tips.length > 0 && (
                <ul className="mt-3 space-y-1">
                    {tips.map((tip, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs">
                            <span className="text-blue-400">•</span> {tip}
                        </li>
                    ))}
                </ul>
              )}
            </div>
          )}

          {/* List */}
          {displayedResources.length === 0 ? (
            <div className="text-center py-12 text-slate-400">
              <p>{showFavoritesOnly ? "No favorites saved yet." : "No resources found."}</p>
            </div>
          ) : (
            displayedResources.map(resource => (
              <ResourceCard
                key={resource.id}
                resource={resource}
                isSelected={resource.id === selectedId}
                onClick={() => setSelectedId(resource.id)}
                onUpdateClick={openUpdateModal}
                onRefresh={() => setRefreshTrigger(prev => prev + 1)}
              />
            ))
          )}
        </div>
      </div>

      {/* Map */}
      <div className={`flex-1 relative bg-slate-200 ${isMobileMapOpen ? 'block' : 'hidden md:block'}`}>
        <MapComponent 
          resources={displayedResources}
          center={userLocation}
          selectedId={selectedId}
          onSelectResource={setSelectedId}
          onBoundsChange={setMapBounds}
        />
        
        {/* Auto Discovery Button */}
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-[1000]">
            <button 
                onClick={handleAutoDiscover}
                disabled={isDiscovering}
                className="bg-white/90 backdrop-blur text-slate-800 px-4 py-2 rounded-full shadow-lg font-bold text-xs flex items-center gap-2 hover:bg-white transition-all border border-slate-200"
            >
                {isDiscovering ? (
                    <>Searching area...</>
                ) : (
                    <>
                        <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                        Search this area
                    </>
                )}
            </button>
        </div>

        <div className="md:hidden absolute top-4 left-4 z-[1000]">
          <button onClick={() => setIsMobileMapOpen(false)} className="bg-white p-3 rounded-full shadow-lg text-slate-700">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
          </button>
        </div>
      </div>

      <ContributeModal 
        isOpen={isContributeOpen} 
        onClose={() => setIsContributeOpen(false)} 
        targetResourceId={updateTargetId}
        onSubmitUpdate={handleUpdateSubmit}
      />
    </div>
  );
};

export default ResultsPage;