import React, { useState } from 'react';
import SideNav from './SideNav';
import { Coordinate } from '../types';

interface LandingPageProps {
  locationStatus: 'idle' | 'locating' | 'found' | 'error';
  setUserLocation: (coord: Coordinate) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ locationStatus, setUserLocation }) => {
  const [query, setQuery] = useState('');
  const [isSideNavOpen, setIsSideNavOpen] = useState(false);

  const navigate = (path: string) => {
    window.location.hash = path;
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/map?q=${encodeURIComponent(query)}`);
    }
  };

  const handleCategoryClick = (category: string) => {
    navigate(`/map?q=${encodeURIComponent('Find ' + category)}`);
  };

  const handleUseLocation = () => {
    navigate(`/map?q=${encodeURIComponent('essential resources nearby')}`);
  };

  return (
    <div className="h-full bg-slate-50 relative overflow-hidden flex flex-col">
      {/* Side Nav */}
      <SideNav 
        isOpen={isSideNavOpen} 
        onClose={() => setIsSideNavOpen(false)} 
        onNavigate={handleCategoryClick}
      />

      {/* Header / Nav Bar */}
      <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center z-20">
        <button 
          onClick={() => setIsSideNavOpen(true)}
          className="p-2 bg-white/80 backdrop-blur-md rounded-lg shadow-sm hover:bg-white"
        >
          <svg className="w-6 h-6 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
        </button>
        <div className="font-bold text-slate-900 tracking-tight">CityAssist</div>
        <div className="w-10"></div> {/* Spacer for balance */}
      </div>

      {/* Hero Banner */}
      <div className="w-full h-48 bg-gradient-to-r from-blue-600 to-indigo-600 relative overflow-hidden flex items-center justify-center pt-10 px-4">
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="relative z-10 text-center text-white">
          <h2 className="text-2xl font-bold mb-1">Winter Readiness</h2>
          <p className="text-sm text-blue-100 mb-3">Warming centers are now open across Toronto.</p>
          <button 
            onClick={() => handleCategoryClick('Warming Center')}
            className="px-4 py-1.5 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full text-xs font-bold border border-white/40 transition-colors"
          >
            Find Warmth →
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center px-4 -mt-6 z-10">
        
        {/* Search Card */}
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 space-y-6">
          <div className="text-center">
            <h1 className="text-2xl font-extrabold text-slate-900">Find Help, Fast.</h1>
            <p className="text-slate-500">Free food, shelter, and legal aid nearby.</p>
          </div>

          <form onSubmit={handleSearch} className="relative group">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="What do you need? (e.g. Legal)"
              className="w-full pl-4 pr-4 py-4 rounded-xl border border-slate-200 bg-slate-50 shadow-inner focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all text-lg"
            />
            <button type="submit" className="absolute right-2 top-2 bottom-2 bg-blue-600 text-white p-2.5 rounded-lg shadow-sm hover:bg-blue-700 transition-all">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </button>
          </form>

          <button 
            onClick={handleUseLocation}
            className="w-full py-3 bg-blue-50 text-blue-600 font-bold rounded-xl hover:bg-blue-100 transition-colors flex items-center justify-center gap-2"
          >
             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
             Use My Location
          </button>
        </div>

        {/* Quick Categories */}
        <div className="w-full max-w-md mt-8">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 px-1">Quick Access</h3>
            <div className="grid grid-cols-3 gap-3">
                {[
                    { label: 'Food', icon: '🍎' },
                    { label: 'Shelter', icon: '🏠' },
                    { label: 'Legal', icon: '⚖️' },
                    { label: 'Health', icon: '🩺' },
                    { label: 'Crisis', icon: '🚨' },
                    { label: 'Meals', icon: '🍲' },
                ].map(cat => (
                    <button
                        key={cat.label}
                        onClick={() => handleCategoryClick(cat.label)}
                        className="flex flex-col items-center justify-center p-3 bg-white border border-slate-200 rounded-xl hover:border-blue-300 hover:shadow-md transition-all gap-1"
                    >
                        <span className="text-2xl">{cat.icon}</span>
                        <span className="text-xs font-medium text-slate-600">{cat.label}</span>
                    </button>
                ))}
            </div>
        </div>

      </div>
    </div>
  );
};

export default LandingPage;