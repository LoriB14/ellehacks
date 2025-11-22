import React, { useState, useEffect } from "react";
import {
  fetchTorontoNews,
  NewsAnnouncement,
} from "../services/torontoDataService";

const AnnouncementsPage: React.FC = () => {
  const [filter, setFilter] = useState<"all" | "active">("active");
  const [announcements, setAnnouncements] = useState<NewsAnnouncement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadNews = async () => {
      try {
        const news = await fetchTorontoNews();
        setAnnouncements(news);
      } catch (error) {
        console.error("Failed to load announcements:", error);
      } finally {
        setLoading(false);
      }
    };

    loadNews();
  }, []);

  const getTypeColor = (type: NewsAnnouncement["type"]) => {
    switch (type) {
      case "urgent":
        return "bg-rose-100 text-rose-700 border-rose-200";
      case "update":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "new-resource":
        return "bg-green-100 text-green-700 border-green-200";
      case "policy":
        return "bg-purple-100 text-purple-700 border-purple-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getTypeIcon = (type: NewsAnnouncement["type"]) => {
    switch (type) {
      case "urgent":
        return (
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        );
      case "update":
        return (
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
        );
      case "new-resource":
        return (
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
        );
      case "policy":
        return (
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        );
      default:
        return null;
    }
  };

  const filteredAnnouncements = announcements.filter((announcement) => {
    if (filter === "active")
      return (
        announcement.priority === "urgent" || announcement.priority === "high"
      );
    return true;
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="h-full overflow-y-auto bg-gray-50">
        <div className="max-w-4xl mx-auto p-6 flex items-center justify-center min-h-screen">
          <div className="animate-pulse text-indigo-600 font-medium">
            Loading announcements...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <svg
              className="w-8 h-8 text-indigo-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
              />
            </svg>
            <h1 className="text-3xl font-bold text-gray-900">Announcements</h1>
          </div>
          <p className="text-gray-600">
            Stay updated on important changes, new resources, and community
            alerts
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex gap-6">
            <button
              onClick={() => setFilter("active")}
              className={`py-4 px-2 border-b-2 font-medium transition-all duration-200 ease-out ${
                filter === "active"
                  ? "border-indigo-500 text-indigo-600"
                  : "border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300"
              }`}
            >
              Active (
              {
                announcements.filter(
                  (a) => a.priority === "urgent" || a.priority === "high"
                ).length
              }
              )
            </button>
            <button
              onClick={() => setFilter("all")}
              className={`py-4 px-2 border-b-2 font-medium transition-all duration-200 ease-out ${
                filter === "all"
                  ? "border-indigo-500 text-indigo-600"
                  : "border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300"
              }`}
            >
              All ({announcements.length})
            </button>
          </div>
        </div>
      </div>

      {/* Announcements List */}
      <div className="max-w-4xl mx-auto p-6">
        {filteredAnnouncements.length === 0 ? (
          <div className="text-center py-12">
            <svg
              className="w-16 h-16 text-gray-400 mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
              />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-1">
              No announcements
            </h3>
            <p className="text-gray-600">Check back later for updates</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredAnnouncements.map((announcement) => (
              <div
                key={announcement.id}
                className="bg-white rounded-2xl border-2 border-gray-200 hover:border-indigo-300 p-6 transition-all duration-200 ease-out hover:shadow-md"
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`p-3 rounded-xl border ${getTypeColor(
                      announcement.type
                    )}`}
                  >
                    {getTypeIcon(announcement.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-1">
                          {announcement.title}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {formatDate(announcement.date)}
                        </p>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium capitalize border ${getTypeColor(
                          announcement.type
                        )}`}
                      >
                        {announcement.type.replace("-", " ")}
                      </span>
                    </div>
                    <p className="text-gray-700 leading-relaxed">
                      {announcement.message}
                    </p>
                    {announcement.source && (
                      <p className="text-xs text-gray-500 mt-2">
                        Source: {announcement.source}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Info Section */}
      <div className="max-w-4xl mx-auto px-6 pb-6">
        <div className="bg-indigo-50 rounded-xl border border-indigo-200 p-6">
          <div className="flex items-start gap-3">
            <svg
              className="w-6 h-6 text-indigo-600 flex-shrink-0 mt-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
            <div>
              <h4 className="font-semibold text-indigo-900 mb-1">
                Stay Informed
              </h4>
              <p className="text-sm text-indigo-800">
                Important announcements are also displayed in the banner at the
                top of the page. Enable notifications in Settings to get alerts
                for urgent updates.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementsPage;
