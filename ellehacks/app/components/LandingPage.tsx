
import React, { useState } from 'react';

const LandingPage: React.FC = () => {
  const [query, setQuery] = useState('');

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
    // Navigate to map with a generic "nearby" intent
    navigate(`/map?q=${encodeURIComponent('essential resources nearby')}`);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full px-4 bg-gradient-to-b from-white to-blue-50">
      <div className="w-full max-w-md text-center space-y-8">
        
        {/* Hero Section */}
        <div className="space-y-2">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl mb-4 shadow-lg shadow-blue-200">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
          </div>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">CityAssist</h1>
          <p className="text-lg text-slate-600">Find free or low-cost essential resources in Toronto instantly.</p>
        </div>

        {/* Search Box */}
        <form onSubmit={handleSearch} className="w-full relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          </div>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="What do you need today? (e.g. Food Bank)"
            className="w-full pl-11 pr-4 py-4 rounded-xl border border-slate-200 bg-white shadow-sm focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all text-lg"
          />
        </form>

        {/* Action Buttons */}
        <div className="w-full">
          <button 
            onClick={handleUseLocation}
            className="w-full py-3 px-4 bg-white border border-slate-200 text-slate-700 font-medium rounded-xl hover:bg-slate-50 hover:border-slate-300 transition-colors flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            Use my current location
          </button>
        </div>

        {/* Categories */}
        <div className="space-y-3">
          <p className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Quick Access</p>
          <div className="flex flex-wrap justify-center gap-2">
            {['Food Bank', 'Shelter', 'Legal Help', 'Health', 'Warming Center', 'Free Meals'].map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryClick(cat)}
                className="px-4 py-2 bg-white border border-slate-200 rounded-full text-slate-600 text-sm font-medium hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-all shadow-sm"
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

      </div>
      
      <div className="absolute bottom-6 text-slate-400 text-xs">
        CityAssist MVP • Toronto
      </div>
    </div>
  );
};

export default LandingPage;
