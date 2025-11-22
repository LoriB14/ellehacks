import React, { useState, useContext } from "react";
import { DarkModeContext } from "../App";

const SettingsPage: React.FC = () => {
  const [notifications, setNotifications] = useState(true);
  const [locationSharing, setLocationSharing] = useState(true);
  const { darkMode, setDarkMode } = useContext(DarkModeContext);
  const [language, setLanguage] = useState("English");

  return (
    <div
      className={`flex flex-col h-full overflow-y-auto transition-colors duration-300 ${
        darkMode
          ? "bg-gradient-to-b from-gray-800 via-gray-900 to-gray-800"
          : "bg-gradient-to-b from-indigo-50 via-white to-purple-50"
      }`}
    >
      <div className="w-full max-w-3xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h2
            className={`text-3xl font-semibold mb-2 transition-colors duration-300 ${
              darkMode ? "text-gray-100" : "text-gray-800"
            }`}
          >
            Settings
          </h2>
          <p
            className={`transition-colors duration-300 ${
              darkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Manage your preferences and account
          </p>
        </div>

        <div className="space-y-4">
          {/* Privacy Section */}
          <div
            className={`rounded-2xl p-6 border-2 transition-all duration-300 ${
              darkMode
                ? "bg-gray-800 border-gray-700"
                : "bg-white border-indigo-100"
            }`}
          >
            <h3
              className={`text-lg font-semibold mb-4 flex items-center gap-2 transition-colors duration-300 ${
                darkMode ? "text-gray-100" : "text-gray-800"
              }`}
            >
              <svg
                className="w-5 h-5 text-indigo-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
              Privacy & Security
            </h3>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p
                    className={`font-medium transition-colors duration-300 ${
                      darkMode ? "text-gray-200" : "text-gray-800"
                    }`}
                  >
                    Location Sharing
                  </p>
                  <p
                    className={`text-sm transition-colors duration-300 ${
                      darkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    Allow app to access your location
                  </p>
                </div>
                <button
                  onClick={() => setLocationSharing(!locationSharing)}
                  className={`relative w-14 h-7 rounded-full transition-all duration-300 ${
                    locationSharing
                      ? "bg-indigo-500"
                      : darkMode
                      ? "bg-gray-600"
                      : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow-md transition-all duration-300 ${
                      locationSharing ? "translate-x-7" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>

              <div
                className={`border-t pt-4 transition-colors duration-300 ${
                  darkMode ? "border-gray-700" : "border-gray-100"
                }`}
              >
                <button
                  className={`text-sm font-medium transition-all duration-300 ease-out hover:underline ${
                    darkMode
                      ? "text-indigo-400 hover:text-indigo-300"
                      : "text-indigo-700 hover:text-indigo-800"
                  }`}
                >
                  Clear search history
                </button>
              </div>
            </div>
          </div>

          {/* Notifications Section */}
          <div
            className={`rounded-2xl p-6 border-2 transition-all duration-300 ${
              darkMode
                ? "bg-gray-800 border-gray-700"
                : "bg-white border-indigo-100"
            }`}
          >
            <h3
              className={`text-lg font-semibold mb-4 flex items-center gap-2 transition-colors duration-300 ${
                darkMode ? "text-gray-100" : "text-gray-800"
              }`}
            >
              <svg
                className="w-5 h-5 text-indigo-700"
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
              Notifications
            </h3>

            <div className="flex items-center justify-between">
              <div>
                <p
                  className={`font-medium transition-colors duration-300 ${
                    darkMode ? "text-gray-200" : "text-gray-800"
                  }`}
                >
                  Push Notifications
                </p>
                <p
                  className={`text-sm transition-colors duration-300 ${
                    darkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Get updates about nearby resources
                </p>
              </div>
              <button
                onClick={() => setNotifications(!notifications)}
                className={`relative w-14 h-7 rounded-full transition-all duration-300 ${
                  notifications
                    ? "bg-indigo-500"
                    : darkMode
                    ? "bg-gray-600"
                    : "bg-gray-300"
                }`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow-md transition-all duration-300 ${
                    notifications ? "translate-x-7" : "translate-x-0"
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Appearance Section */}
          <div
            className={`rounded-2xl p-6 border-2 transition-all duration-300 ${
              darkMode
                ? "bg-gray-800 border-gray-700"
                : "bg-white border-indigo-100"
            }`}
          >
            <h3
              className={`text-lg font-semibold mb-4 flex items-center gap-2 transition-colors duration-300 ${
                darkMode ? "text-gray-100" : "text-gray-800"
              }`}
            >
              <svg
                className="w-5 h-5 text-indigo-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                />
              </svg>
              Appearance
            </h3>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p
                    className={`font-medium transition-colors duration-300 ${
                      darkMode ? "text-gray-200" : "text-gray-800"
                    }`}
                  >
                    Dark Mode
                  </p>
                  <p
                    className={`text-sm transition-colors duration-300 ${
                      darkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    Reduce eye strain in low light
                  </p>
                </div>
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className={`relative w-14 h-7 rounded-full transition-all duration-300 ${
                    darkMode ? "bg-indigo-500" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow-md transition-all duration-300 ${
                      darkMode ? "translate-x-7" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>

              <div
                className={`border-t pt-4 transition-colors duration-300 ${
                  darkMode ? "border-gray-700" : "border-gray-100"
                }`}
              >
                <label
                  className={`block text-sm font-medium mb-2 transition-colors duration-300 ${
                    darkMode ? "text-gray-200" : "text-gray-800"
                  }`}
                >
                  Language
                </label>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className={`w-full px-4 py-2 border-2 rounded-xl focus:outline-none focus:border-indigo-500 transition-all duration-300 ${
                    darkMode
                      ? "bg-gray-700 border-gray-600 text-gray-200"
                      : "bg-gray-50 border-indigo-200 text-gray-800"
                  }`}
                >
                  <option>English</option>
                  <option>Español</option>
                  <option>Français</option>
                  <option>中文</option>
                </select>
              </div>
            </div>
          </div>

          {/* About Section */}
          <div
            className={`rounded-2xl p-6 border-2 transition-all duration-300 ${
              darkMode
                ? "bg-gray-800 border-gray-700"
                : "bg-white border-indigo-100"
            }`}
          >
            <h3
              className={`text-lg font-semibold mb-4 flex items-center gap-2 transition-colors duration-300 ${
                darkMode ? "text-gray-100" : "text-gray-800"
              }`}
            >
              <svg
                className="w-5 h-5 text-indigo-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              About
            </h3>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span
                  className={`transition-colors duration-300 ${
                    darkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Version
                </span>
                <span
                  className={`font-medium transition-colors duration-300 ${
                    darkMode ? "text-gray-200" : "text-gray-800"
                  }`}
                >
                  1.0.0
                </span>
              </div>
              <div
                className={`border-t pt-3 transition-colors duration-300 ${
                  darkMode ? "border-gray-700" : "border-gray-100"
                }`}
              >
                <button
                  className={`font-medium transition-all duration-300 ease-out hover:underline ${
                    darkMode
                      ? "text-indigo-400 hover:text-indigo-300"
                      : "text-indigo-700 hover:text-indigo-800"
                  }`}
                >
                  Terms of Service
                </button>
              </div>
              <div>
                <button
                  className={`font-medium transition-all duration-300 ease-out hover:underline ${
                    darkMode
                      ? "text-indigo-400 hover:text-indigo-300"
                      : "text-indigo-700 hover:text-indigo-800"
                  }`}
                >
                  Privacy Policy
                </button>
              </div>
              <div>
                <button
                  className={`font-medium transition-all duration-300 ease-out hover:underline ${
                    darkMode
                      ? "text-indigo-400 hover:text-indigo-300"
                      : "text-indigo-700 hover:text-indigo-800"
                  }`}
                >
                  Contact Support
                </button>
              </div>
            </div>
          </div>

          {/* Danger Zone */}
          <div
            className={`rounded-2xl p-6 border-2 transition-all duration-300 ${
              darkMode
                ? "bg-rose-950 border-rose-900"
                : "bg-rose-50 border-rose-200"
            }`}
          >
            <h3
              className={`text-lg font-semibold mb-4 transition-colors duration-300 ${
                darkMode ? "text-rose-300" : "text-rose-900"
              }`}
            >
              Account Actions
            </h3>
            <button className="px-4 py-2 bg-rose-600 hover:bg-rose-700 active:bg-rose-800 text-white rounded-xl font-medium transition-all duration-300 ease-out hover:shadow-md active:scale-95">
              Clear All Data
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
