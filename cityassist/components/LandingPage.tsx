import React, { useState, useEffect, useContext } from "react";
import { DarkModeContext } from "../App";

interface WeatherData {
  temp: number;
  condition: string;
}

const LandingPage: React.FC = () => {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState<WeatherData>({
    temp: -3,
    condition: "clear",
  });
  const [lowDataMode, setLowDataMode] = useState(false);
  const [location, setLocation] = useState("North York Centre");
  const [showPrompts, setShowPrompts] = useState(false);
  const { darkMode, setDarkMode } = useContext(DarkModeContext);

  const navigate = (path: string) => {
    window.location.hash = path;
  };

  // Get dynamic categories based on weather, time, and day
  const getDynamicCategories = () => {
    const now = new Date();
    const hour = now.getHours();
    const day = now.getDay(); // 0 = Sunday

    const categories = [];

    // Weather-based priorities
    if (weather.temp < 0) {
      categories.push("❄️ Warming Centres");
    }

    // Time-based
    if (hour >= 11 && hour <= 14) {
      categories.push("🍲 Free Meals Today");
    }

    // Always show these
    categories.push("🥫 Food Banks", "🛏️ 24/7 Shelters");

    // Weekday specific
    if (day >= 1 && day <= 5) {
      categories.push("⚖️ Legal Clinics Today");
    }

    return categories.slice(0, 5);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/map?q=${encodeURIComponent(query)}`);
    }
  };

  const handleCategoryClick = (category: string) => {
    const cleanCategory = category.replace(/[🥫🛏️⚖️🩺💵⚙️❄️🍲]/g, "").trim();
    navigate(`/map?q=${encodeURIComponent("Find " + cleanCategory)}`);
  };

  const handleUseLocation = () => {
    navigate(`/map?q=${encodeURIComponent("essential resources nearby")}`);
  };

  const handleCrisisClick = () => {
    navigate(`/map?q=${encodeURIComponent("emergency crisis help")}`);
  };

  // Get personalized prompts based on weather, time, etc.
  const getPersonalizedPrompts = () => {
    const now = new Date();
    const hour = now.getHours();
    const prompts = [];

    // Weather-based prompts
    if (weather.temp < 0) {
      prompts.push("Where can I warm up right now?");
      prompts.push("Find emergency warming centers");
    }

    // Time-based prompts
    if (hour >= 18 || hour < 6) {
      prompts.push("Where can I sleep tonight?");
      prompts.push("24/7 shelters near me");
    } else if (hour >= 11 && hour <= 14) {
      prompts.push("Free lunch near me");
      prompts.push("Where can I get food now?");
    }

    // Always relevant
    prompts.push("I need help finding food");
    prompts.push("Free health clinics");
    prompts.push("Legal aid services");
    prompts.push("Where can I shower?");
    prompts.push("Mental health support");
    prompts.push("I lost my ID, what do I do?");

    return prompts.slice(0, 6);
  };

  const personalizedPrompts = getPersonalizedPrompts();

  const handlePromptClick = (prompt: string) => {
    setQuery(prompt);
    setShowPrompts(false);
    navigate(`/map?q=${encodeURIComponent(prompt)}`);
  };

  const suggestedPrompts = [
    "Where can I sleep tonight?",
    "I need food today",
    "I lost my ID, what can I do?",
    "Where can I get warm?",
    "I need legal help",
    "Where can I shower?",
    "Mental health crisis support",
    "Free meals near me",
  ];

  const quickActions = [
    {
      icon: (
        <svg
          className="w-10 h-10 text-indigo-700"
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
      ),
      label: "Food Support",
      query: "Find food banks and free meals near me",
    },
    {
      icon: (
        <svg
          className="w-10 h-10 text-indigo-700"
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
      ),
      label: "Shelter",
      query: "I need a place to sleep tonight",
    },
    {
      icon: (
        <svg
          className="w-10 h-10 text-indigo-700"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
          />
        </svg>
      ),
      label: "Legal Help",
      query: "Find free legal clinics near me",
    },
    {
      icon: (
        <svg
          className="w-10 h-10 text-indigo-700"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      ),
      label: "Health",
      query: "Find health services and clinics",
    },
    {
      icon: (
        <svg
          className="w-10 h-10 text-indigo-700"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      label: "Benefits",
      query: "Help with money and government benefits",
    },
    {
      icon: (
        <svg
          className="w-10 h-10 text-indigo-700"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z"
          />
        </svg>
      ),
      label: "Stay Warm",
      query: "Find warming centres near me",
    },
  ];

  const handleQuickAction = (actionQuery: string) => {
    navigate(`/map?q=${encodeURIComponent(actionQuery)}`);
  };

  return (
    <div
      className={`flex flex-col h-full overflow-y-auto transition-colors duration-300 ${
        darkMode
          ? "bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900"
          : "bg-gradient-to-b from-indigo-50 via-white to-purple-50"
      }`}
    >
      <div className="w-full max-w-4xl mx-auto px-6 py-12">
        {/* Hero Section - Centered */}
        <div className="mb-12 text-center">
          <h2
            className={`text-5xl md:text-6xl font-semibold mb-4 leading-tight ${
              darkMode ? "text-white" : "text-gray-800"
            }`}
          >
            Find help
            <br />
            near you.
          </h2>
          <p
            className={`text-xl max-w-2xl mx-auto ${
              darkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Free resources for food, shelter, healthcare, and support. No
            barriers. No judgment.
          </p>
        </div>

        {/* Main Search */}
        <div className="mb-16 relative">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setShowPrompts(true)}
              onBlur={() => setTimeout(() => setShowPrompts(false), 200)}
              placeholder="What do you need? (food, shelter, legal help...)"
              className={`w-full px-6 py-5 rounded-2xl border-2 focus:outline-none text-lg placeholder-gray-400 text-center transition-all duration-300 shadow-sm ${
                darkMode
                  ? "bg-gray-800 border-gray-700 focus:border-indigo-500 text-white"
                  : "bg-white border-indigo-200 focus:border-indigo-500 text-gray-800"
              }`}
            />
            <button
              type="submit"
              className="absolute right-2 top-2 bottom-2 px-8 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white rounded-xl font-medium transition-all duration-200 ease-out hover:shadow-md active:scale-95"
            >
              Search
            </button>
          </form>

          {/* Personalized Prompt Suggestions */}
          {showPrompts && (
            <div
              className={`absolute top-full left-0 right-0 mt-2 rounded-2xl shadow-2xl border-2 overflow-hidden z-50 ${
                darkMode
                  ? "bg-gray-800 border-gray-700"
                  : "bg-white border-indigo-100"
              }`}
            >
              <div
                className={`p-3 border-b ${
                  darkMode
                    ? "border-gray-700 bg-gray-750"
                    : "border-indigo-100 bg-indigo-50"
                }`}
              >
                <p
                  className={`text-sm font-medium ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  {weather.temp < 0
                    ? "❄️ Cold weather suggestions"
                    : "💡 Personalized for you"}
                </p>
              </div>
              <div className="max-h-80 overflow-y-auto">
                {personalizedPrompts.map((prompt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handlePromptClick(prompt)}
                    className={`w-full px-4 py-3 text-left transition-all duration-150 ${
                      darkMode
                        ? "hover:bg-gray-700 text-gray-200 border-b border-gray-700"
                        : "hover:bg-indigo-50 text-gray-700 border-b border-gray-100"
                    }`}
                  >
                    <span className="text-indigo-500 mr-2">→</span>
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Quick Access Categories - Centered */}
        <div className="mb-16">
          <h3
            className={`text-2xl font-semibold mb-6 text-center ${
              darkMode ? "text-white" : "text-gray-800"
            }`}
          >
            Quick access
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {quickActions.map((action, idx) => (
              <button
                key={idx}
                onClick={() => handleQuickAction(action.query)}
                className={`flex flex-col items-center justify-center gap-3 p-6 rounded-2xl transition-all duration-200 ease-out border-2 active:scale-95 ${
                  darkMode
                    ? "bg-gray-800 border-gray-700 hover:bg-gray-750 hover:border-indigo-500 hover:shadow-lg"
                    : "bg-white border-indigo-100 hover:bg-indigo-50 hover:border-indigo-300 hover:shadow-md active:bg-indigo-100"
                }`}
              >
                {action.icon}
                <span
                  className={`text-base font-medium text-center ${
                    darkMode ? "text-gray-200" : "text-gray-800"
                  }`}
                >
                  {action.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Emergency Banner - Centered */}
        <div
          className={`rounded-2xl p-8 border-2 max-w-2xl mx-auto ${
            darkMode
              ? "bg-rose-950 border-rose-800"
              : "bg-rose-50 border-rose-200"
          }`}
        >
          <div className="text-center">
            <div
              className={`w-16 h-16 mx-auto mb-3 rounded-full flex items-center justify-center ${
                darkMode ? "bg-rose-900" : "bg-rose-100"
              }`}
            >
              <svg
                className={`w-8 h-8 ${
                  darkMode ? "text-rose-300" : "text-rose-600"
                }`}
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
            </div>
            <h3
              className={`text-xl font-semibold mb-2 ${
                darkMode ? "text-rose-100" : "text-rose-900"
              }`}
            >
              Need immediate help?
            </h3>
            <p
              className={`mb-4 ${darkMode ? "text-rose-300" : "text-rose-700"}`}
            >
              If you're in crisis or need emergency assistance right now.
            </p>
            <button
              onClick={handleCrisisClick}
              className="px-8 py-3 bg-rose-600 hover:bg-rose-700 active:bg-rose-800 text-white rounded-xl font-medium transition-all duration-200 ease-out hover:shadow-md active:scale-95"
            >
              Find emergency resources
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
