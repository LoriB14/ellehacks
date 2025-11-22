import React, { useState, useEffect } from 'react';

interface Announcement {
  id: string;
  message: string;
  type: 'urgent' | 'info' | 'update';
  link?: string;
}

const AnnouncementBanner: React.FC = () => {
  const [announcement, setAnnouncement] = useState<Announcement | null>(null);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // Check if banner was dismissed in this session
    const dismissed = sessionStorage.getItem('bannerDismissed');
    if (dismissed) {
      setIsDismissed(true);
      return;
    }

    // Latest announcement (in a real app, this would come from an API)
    const latestAnnouncement: Announcement = {
      id: 'nov-22-2025',
      message: '🔥 New warming center opening today at 349 George St - Open 24/7 through winter',
      type: 'urgent',
      link: '#/announcements'
    };

    setAnnouncement(latestAnnouncement);
  }, []);

  const handleDismiss = () => {
    setIsDismissed(true);
    sessionStorage.setItem('bannerDismissed', 'true');
  };

  const handleClick = () => {
    if (announcement?.link) {
      window.location.hash = announcement.link;
    }
  };

  if (!announcement || isDismissed) {
    return null;
  }

  const getTypeStyles = () => {
    switch (announcement.type) {
      case 'urgent':
        return 'bg-indigo-600 hover:bg-indigo-700';
      case 'update':
        return 'bg-violet-600 hover:bg-violet-700';
      default:
        return 'bg-purple-600 hover:bg-purple-700';
    }
  };

  return (
    <div className={`${getTypeStyles()} text-white transition-colors duration-200`}>
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 flex-1">
            <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
            </svg>
            <button 
              onClick={handleClick}
              className="text-left flex-1 hover:underline focus:outline-none"
            >
              <p className="text-sm font-medium">{announcement.message}</p>
            </button>
          </div>
          <button
            onClick={handleDismiss}
            className="flex-shrink-0 p-1 hover:bg-white/20 rounded-lg transition-colors active:scale-95"
            aria-label="Dismiss announcement"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementBanner;
