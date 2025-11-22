import React from 'react';
import { Resource } from '../types';

interface ResourceCardProps {
  resource: Resource;
  isSelected: boolean;
  onClick: () => void;
}

const ResourceCard: React.FC<ResourceCardProps> = ({ resource, isSelected, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className={`p-4 rounded-xl border transition-all cursor-pointer mb-3 relative overflow-hidden ${
        isSelected 
          ? 'bg-blue-50 border-blue-500 shadow-md ring-1 ring-blue-500' 
          : 'bg-white border-slate-200 hover:border-blue-300 hover:shadow-sm'
      } ${resource.isEmergency ? 'border-l-4 border-l-red-500' : ''}`}
    >
      {/* Source Badge (Open Data) */}
      {resource.source && (
        <div className="absolute top-0 right-0 bg-slate-100 text-slate-500 text-[10px] px-2 py-0.5 rounded-bl-lg">
          Source: {resource.source}
        </div>
      )}

      <div className="flex justify-between items-start pr-6">
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
      </div>
      
      <p className="text-sm text-slate-600 mt-2 leading-snug">
        {resource.description}
      </p>
      
      <div className="mt-3 flex flex-col gap-1 text-sm text-slate-500">
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          <span>{resource.hours}</span>
        </div>
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
          <span>{resource.address}</span>
        </div>
        {resource.phone && (
          <div className="flex items-center gap-2">
             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
             <a href={`tel:${resource.phone.replace(/-/g, '')}`} className="hover:text-blue-600 hover:underline" onClick={(e) => e.stopPropagation()}>
               {resource.phone}
             </a>
          </div>
        )}
      </div>

      {isSelected && (
        <a 
          href={`https://www.google.com/maps/dir/?api=1&destination=${resource.lat},${resource.lng}`}
          target="_blank"
          rel="noreferrer"
          className="mt-4 block w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition-colors shadow-sm"
          onClick={(e) => e.stopPropagation()}
        >
          Get Directions
        </a>
      )}
    </div>
  );
};

export default ResourceCard;