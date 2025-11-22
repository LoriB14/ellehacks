import React from 'react';

interface SideNavProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (category: string) => void;
}

const SideNav: React.FC<SideNavProps> = ({ isOpen, onClose, onNavigate }) => {
  const categories = [
    { label: 'Food Banks', id: 'Food' },
    { label: 'Shelters', id: 'Shelter' },
    { label: 'Legal Services', id: 'Legal' },
    { label: 'Health & Harm Reduction', id: 'Health' },
    { label: 'Warming Centres', id: 'Warming' },
    { label: 'Community Centres', id: 'Community' },
  ];

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 transition-opacity"
          onClick={onClose}
        />
      )}
      
      {/* Drawer */}
      <div className={`fixed top-0 left-0 h-full w-64 bg-white z-50 transform transition-transform duration-300 ease-in-out shadow-2xl ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-4 border-b flex justify-between items-center bg-blue-600 text-white">
          <h2 className="font-bold text-lg">CityAssist</h2>
          <button onClick={onClose}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>

        <div className="p-4">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Categories</h3>
          <ul className="space-y-2">
            {categories.map(cat => (
              <li key={cat.id}>
                <button 
                  onClick={() => { onNavigate(cat.id); onClose(); }}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-100 text-slate-700 font-medium transition-colors"
                >
                  {cat.label}
                </button>
              </li>
            ))}
          </ul>

          <div className="mt-8 border-t pt-4">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">My Account (Demo)</h3>
            <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-100 text-slate-700 font-medium transition-colors flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
              My Favorites
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideNav;