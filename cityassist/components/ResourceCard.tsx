import React from 'react';
import { Resource } from '../types';
import { toggleFavorite } from '../services/storageService';

interface ResourceCardProps {
  resource: Resource;
  isSelected: boolean;
  onClick: () => void;
  onUpdateClick?: (id: string) => void;
  onRefresh?: () => void; // To force re-render on fav toggle
}

const ResourceCard: React.FC<ResourceCardProps> = ({ resource, isSelected, onClick, onUpdateClick, onRefresh }) => {
  
  const handleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(resource.id);
    if (onRefresh) onRefresh();
  };

  const handleUpdate = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onUpdateClick) onUpdateClick(resource.id);
  };

  return (
    <div 
      onClick={onClick}
      className={`p-4 rounded-xl border transition-all cursor-pointer mb-3 relative overflow-hidden bg-white ${
        isSelected 
          ? 'border-blue-500 shadow-md ring-1 ring-blue-500' 
          : 'border-slate-200 hover:border-blue-300 hover:shadow-sm'
      } ${resource.isEmergency ? 'border-l-4 border-l-red-500' : ''}`}
    >
      {/* Favorite Button */}
      <button 
        onClick={handleFavorite}
        className="absolute top-3 right-3 p-1.5 rounded-full hover:bg-slate-100 z-10 transition-colors"
      >
        <svg 
            className={`w-5 h-5 transition-colors ${resource.isFavorite ? 'text-red-500 fill-red-500' : 'text-slate-400'}`} 
            viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none"
        >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      </button>

      {/* Live Status Badge */}
      {resource.lastUpdate && (
         <div className="mb-2 inline-flex items-center gap-1.5 bg-green-50 text-green-700 px-2 py-0.5 rounded text-[10px] font-bold border border-green-100">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
            LIVE UPDATE: {resource.lastUpdate.text}
            <span className="text-green-500/70 font-normal ml-1">
                • {Math.floor((Date.now() - resource.lastUpdate.timestamp) / 60000)}m ago
            </span>
         </div>
      )}

      <div className="flex justify-between items-start pr-8">
        <h3 className={`font-bold ${resource.isEmergency ? 'text-red-700' : 'text-slate-900'}`}>
          {resource.name}
        </h3>
      </div>
      
      <div className="flex flex-wrap gap-2 mt-1 mb-2">
        <span className={`text-xs font-semibold uppercase tracking-wider px-2 py-1 rounded-full ${
          resource.isEmergency ? 'bg-red-100 text-red-700' : 'bg-slate-100 text-slate-600'
        }`}>
          {resource.category}
        </span>
        {resource.source && (
            <span className="text-[10px] bg-slate-50 text-slate-400 px-2 py-1 rounded-full border border-slate-100">
                Src: {resource.source}
            </span>
        )}
      </div>
      
      <p className="text-sm text-slate-600 mt-2 leading-snug">
        {resource.description}
      </p>
      
      <div className="mt-3 flex flex-col gap-1 text-sm text-slate-500">
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          <span>{resource.hours}</span>
        </div>
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
          <span>{resource.address}</span>
        </div>
        {resource.phone && (
          <div className="flex items-center gap-2">
             <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
             <a href={`tel:${resource.phone.replace(/-/g, '')}`} className="hover:text-blue-600 hover:underline" onClick={(e) => e.stopPropagation()}>
               {resource.phone}
             </a>
          </div>
        )}
      </div>

      {isSelected && (
        <div className="mt-4 flex gap-2">
            <button
                onClick={handleUpdate}
                className="flex-1 bg-white border border-blue-200 text-blue-600 hover:bg-blue-50 font-medium py-2 rounded-lg transition-colors text-sm flex items-center justify-center gap-2"
            >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                Update Status
            </button>
            <a 
            href={`https://www.google.com/maps/dir/?api=1&destination=${resource.lat},${resource.lng}`}
            target="_blank"
            rel="noreferrer"
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition-colors shadow-sm text-center text-sm flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
            >
            Directions
            </a>
        </div>
      )}
    </div>
  );
};

export default ResourceCard;