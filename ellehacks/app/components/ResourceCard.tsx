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
      className={`p-4 rounded-xl border transition-all cursor-pointer mb-3 ${
        isSelected 
          ? 'bg-blue-50 border-blue-500 shadow-md ring-1 ring-blue-500' 
          : 'bg-white border-slate-200 hover:border-blue-300 hover:shadow-sm'
      }`}
    >
      <div className="flex justify-between items-start">
        <h3 className="font-bold text-slate-900">{resource.name}</h3>
        <span className="text-xs font-semibold uppercase tracking-wider bg-slate-100 text-slate-600 px-2 py-1 rounded-full">
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
      </div>

      {isSelected && (
        <a 
          href={`https://www.google.com/maps/dir/?api=1&destination=${resource.lat},${resource.lng}`}
          target="_blank"
          rel="noreferrer"
          className="mt-4 block w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition-colors"
          onClick={(e) => e.stopPropagation()}
        >
          Get Directions
        </a>
      )}
    </div>
  );
};

export default ResourceCard;
