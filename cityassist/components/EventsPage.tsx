import React, { useState } from 'react';

interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  category: 'food' | 'products' | 'services' | 'health' | 'other';
  description: string;
}

const EventsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'today' | 'week' | 'upcoming'>('today');

  const events: Event[] = [
    {
      id: 1,
      title: 'Free Grocery Distribution',
      date: 'Today',
      time: '2:00 PM - 5:00 PM',
      location: 'Community Center, 123 Main St',
      category: 'food',
      description: 'Fresh produce and groceries available for families in need. No ID required.'
    },
    {
      id: 2,
      title: 'Winter Clothing Giveaway',
      date: 'Today',
      time: '10:00 AM - 3:00 PM',
      location: 'St. Mary\'s Church, 588 Adelaide St W',
      category: 'products',
      description: 'Free warm coats, boots, gloves, and winter essentials. All sizes available.'
    },
    {
      id: 3,
      title: 'Free Health Screening',
      date: 'Tomorrow',
      time: '9:00 AM - 12:00 PM',
      location: 'Mobile Clinic, City Park',
      category: 'health',
      description: 'Blood pressure checks, diabetes screening, and basic health consultations.'
    },
    {
      id: 4,
      title: 'Community Meal',
      date: 'This Week',
      time: 'Daily 6:00 PM',
      location: 'Feed it Forward, 2770 Dundas St W',
      category: 'food',
      description: 'Hot meals served every evening. Everyone welcome, no questions asked.'
    },
    {
      id: 5,
      title: 'Free Tax Prep Assistance',
      date: 'This Week',
      time: 'Weekdays 10:00 AM - 4:00 PM',
      location: 'Public Library, 321 Center St',
      category: 'services',
      description: 'Free help with tax filing and financial planning from certified volunteers.'
    },
    {
      id: 6,
      title: 'Furniture & Household Items',
      date: 'Upcoming',
      time: 'March 15, 1:00 PM - 6:00 PM',
      location: 'Donation Center, 555 West Rd',
      category: 'products',
      description: 'Free furniture, kitchenware, and home essentials for those setting up new homes.'
    },
    {
      id: 7,
      title: 'Mobile Food Pantry',
      date: 'Upcoming',
      time: 'March 20, 3:00 PM - 7:00 PM',
      location: 'Downtown Plaza',
      category: 'food',
      description: 'Fresh food, canned goods, and essential supplies. Serving up to 200 families.'
    },
    {
      id: 8,
      title: 'Free Dental Care Day',
      date: 'Upcoming',
      time: 'March 25, 8:00 AM - 2:00 PM',
      location: 'Community Health Center',
      category: 'health',
      description: 'Dental cleanings, checkups, and minor procedures at no cost.'
    }
  ];

  const getCategoryColor = (category: Event['category']) => {
    switch (category) {
      case 'food':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'products':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'services':
        return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'health':
        return 'bg-rose-100 text-rose-700 border-rose-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getCategoryIcon = (category: Event['category']) => {
    switch (category) {
      case 'food':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        );
      case 'products':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
        );
      case 'services':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        );
      case 'health':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        );
      default:
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        );
    }
  };

  const filterEvents = (events: Event[]) => {
    if (activeTab === 'today') {
      return events.filter(e => e.date === 'Today');
    } else if (activeTab === 'week') {
      return events.filter(e => e.date === 'This Week' || e.date === 'Tomorrow' || e.date === 'Today');
    } else {
      return events.filter(e => e.date === 'Upcoming');
    }
  };

  const filteredEvents = filterEvents(events);

  return (
    <div className="h-full overflow-y-auto bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Community Events</h1>
          <p className="text-gray-600">Free resources, services, and support happening near you</p>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex gap-6">
            <button
              onClick={() => setActiveTab('today')}
              className={`py-4 px-2 border-b-2 font-medium transition-all duration-200 ease-out ${
                activeTab === 'today'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
              }`}
            >
              Today
            </button>
            <button
              onClick={() => setActiveTab('week')}
              className={`py-4 px-2 border-b-2 font-medium transition-all duration-200 ease-out ${
                activeTab === 'week'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
              }`}
            >
              This Week
            </button>
            <button
              onClick={() => setActiveTab('upcoming')}
              className={`py-4 px-2 border-b-2 font-medium transition-all duration-200 ease-out ${
                activeTab === 'upcoming'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
              }`}
            >
              Upcoming
            </button>
          </div>
        </div>
      </div>

      {/* Events List */}
      <div className="max-w-4xl mx-auto p-6">
        {filteredEvents.length === 0 ? (
          <div className="text-center py-12">
            <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-1">No events scheduled</h3>
            <p className="text-gray-600">Check back later for upcoming events</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredEvents.map(event => (
              <div
                key={event.id}
                className="bg-white rounded-2xl border-2 border-gray-200 p-6 hover:border-indigo-300 hover:shadow-md transition-all duration-200 ease-out"
              >
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-xl border ${getCategoryColor(event.category)}`}>
                    {getCategoryIcon(event.category)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-xl font-semibold text-gray-900">{event.title}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getCategoryColor(event.category)}`}>
                        {event.category}
                      </span>
                    </div>
                    <div className="space-y-2 mb-3">
                      <div className="flex items-center gap-2 text-gray-600">
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-sm">
                          <span className="font-medium">{event.date}</span> • {event.time}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span className="text-sm">{event.location}</span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">{event.description}</p>
                    <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white rounded-lg font-medium transition-all duration-200 ease-out hover:shadow-sm active:scale-95">
                      Get Directions
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Info Banner */}
      <div className="max-w-4xl mx-auto px-6 pb-6">
        <div className="bg-indigo-50 rounded-xl border border-indigo-200 p-6">
          <div className="flex items-start gap-3">
            <svg className="w-6 h-6 text-indigo-600 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <h4 className="font-semibold text-indigo-900 mb-1">Know of an event?</h4>
              <p className="text-sm text-indigo-800">Help others in your community by sharing upcoming free events, giveaways, and services. Contact us or use the Community page to share updates.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventsPage;
