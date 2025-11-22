import React from 'react';

const EmergencyBanner: React.FC = () => {
  return (
    <div className="bg-red-50 border-l-4 border-red-600 p-4 mb-4 rounded-r-lg shadow-sm animate-pulse-slow">
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-bold text-red-800 uppercase tracking-wider">
            Immediate Crisis Support
          </h3>
          <div className="mt-2 text-sm text-red-700 grid gap-2 md:grid-cols-2">
            <a href="tel:911" className="flex items-center gap-2 font-bold hover:underline">
              <span>🚨 Call 911</span>
              <span className="font-normal text-xs">(Life threatening emergencies)</span>
            </a>
            <a href="tel:988" className="flex items-center gap-2 font-bold hover:underline">
              <span>📞 Call 988</span>
              <span className="font-normal text-xs">(Suicide Crisis Helpline)</span>
            </a>
            <a href="tel:18665312600" className="flex items-center gap-2 font-bold hover:underline">
              <span>📞 1-866-531-2600</span>
              <span className="font-normal text-xs">(Connex Ontario - Addiction/Mental Health)</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmergencyBanner;