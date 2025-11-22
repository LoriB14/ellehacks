import React, { useState, useEffect, useContext } from "react";
import { Resource } from "../types";
import { DarkModeContext } from "../App";

const SavedPage: React.FC = () => {
  const { darkMode } = useContext(DarkModeContext);
  const [savedResources, setSavedResources] = useState<Resource[]>([]);

  useEffect(() => {
    const loadSavedResources = () => {
      const saved = localStorage.getItem("savedResources");
      if (saved) {
        setSavedResources(JSON.parse(saved));
      }
    };
    loadSavedResources();

    // Listen for storage changes
    const handleStorageChange = () => loadSavedResources();
    window.addEventListener("storage", handleStorageChange);
    // Also listen for custom event for same-tab updates
    window.addEventListener("savedResourcesChanged", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("savedResourcesChanged", handleStorageChange);
    };
  }, []);

  const handleUnsave = (resourceId: string) => {
    const saved = localStorage.getItem("savedResources");
    if (!saved) return;

    const savedList: Resource[] = JSON.parse(saved);
    const updated = savedList.filter((r) => r.id !== resourceId);
    localStorage.setItem("savedResources", JSON.stringify(updated));
    setSavedResources(updated);

    // Trigger custom event for other components
    window.dispatchEvent(new Event("savedResourcesChanged"));
  };

  const getCategoryIcon = (category: string) => {
    if (category.toLowerCase().includes("food")) {
      return (
        <svg
          className={`w-10 h-10 transition-colors duration-300 ${
            darkMode ? "text-indigo-400" : "text-indigo-700"
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      );
    }
    if (
      category.toLowerCase().includes("shelter") ||
      category.toLowerCase().includes("housing")
    ) {
      return (
        <svg
          className={`w-10 h-10 transition-colors duration-300 ${
            darkMode ? "text-indigo-400" : "text-indigo-700"
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </svg>
      );
    }
    return (
      <svg
        className={`w-10 h-10 transition-colors duration-300 ${
          darkMode ? "text-indigo-400" : "text-indigo-700"
        }`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    );
  };

  return (
    <div className={`flex flex-col h-full overflow-y-auto transition-colors duration-300 ${
      darkMode 
        ? "bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900" 
        : "bg-gradient-to-b from-indigo-50 via-white to-purple-50"
    }`}>
      <div className="w-full max-w-3xl mx-auto px-6 py-8">
        <div className="mb-6">
          <h2 className={`text-3xl font-semibold mb-2 transition-colors duration-300 ${
            darkMode ? "text-gray-100" : "text-gray-800"
          }`}>
            Your Saved Places
          </h2>
          <p className={`transition-colors duration-300 ${
            darkMode ? "text-gray-400" : "text-gray-600"
          }`}>
            Quick access to the resources you use most
          </p>
        </div>

        {savedResources.length > 0 ? (
          <div className="space-y-4">
            {savedResources.map((resource) => (
              <div
                key={resource.id}
                className={`rounded-2xl p-6 transition-all duration-300 ease-out border-2 hover:shadow-md ${
                  darkMode
                    ? "bg-gray-800 border-gray-700 hover:bg-gray-750 hover:border-indigo-500"
                    : "bg-white border-indigo-100 hover:bg-indigo-50 hover:border-indigo-300"
                }`}
              >
                <div className="flex items-start gap-4">
                  {getCategoryIcon(resource.category)}
                  <div className="flex-1">
                    <h3 className={`text-lg font-semibold mb-1 transition-colors duration-300 ${
                      darkMode ? "text-gray-100" : "text-gray-800"
                    }`}>
                      {resource.name}
                    </h3>
                    <p className={`text-sm mb-2 transition-colors duration-300 ${
                      darkMode ? "text-indigo-400" : "text-gray-600"
                    }`}>
                      {resource.category}
                    </p>
                    <p className={`text-sm mb-2 transition-colors duration-300 ${
                      darkMode ? "text-gray-400" : "text-gray-500"
                    }`}>
                      {resource.address}
                    </p>
                    {resource.hours && (
                      <p className={`text-xs transition-colors duration-300 ${
                        darkMode ? "text-gray-500" : "text-gray-500"
                      }`}>{resource.hours}</p>
                    )}
                  </div>
                  <button
                    onClick={() => handleUnsave(resource.id)}
                    className={`hover:scale-110 transition-all duration-300 ease-out active:scale-95 ${
                      darkMode ? "text-yellow-400" : "text-amber-500"
                    }`}
                    title="Remove from saved"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className={`w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center transition-colors duration-300 ${
              darkMode ? "bg-gray-700" : "bg-gray-100"
            }`}>
              <svg
                className={`w-10 h-10 transition-colors duration-300 ${
                  darkMode ? "text-gray-400" : "text-gray-400"
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                />
              </svg>
            </div>
            <h2 className={`text-2xl font-semibold mb-3 transition-colors duration-300 ${
              darkMode ? "text-gray-200" : "text-gray-800"
            }`}>
              No saved places yet
            </h2>
            <p className={`mb-6 transition-colors duration-300 ${
              darkMode ? "text-gray-400" : "text-gray-600"
            }`}>
              Save places you visit often for quick access
            </p>
            <button
              onClick={() => (window.location.hash = "/")}
              className="px-6 py-3 bg-indigo-500 hover:bg-indigo-700 active:bg-indigo-800 text-white rounded-xl font-medium transition-all duration-300 ease-out hover:shadow-md active:scale-95"
            >
              Browse 6ixAssist
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedPage;
