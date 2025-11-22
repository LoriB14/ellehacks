import React, { useState, useContext } from "react";
import { DarkModeContext } from "../App";

interface SideNavProps {
  currentPath: string;
}

const SideNav: React.FC<SideNavProps> = ({ currentPath }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showHelpPopup, setShowHelpPopup] = useState(false);
  const { darkMode } = useContext(DarkModeContext);

  // Update body margin when collapsed state changes
  React.useEffect(() => {
    const updateMargin = () => {
      const mainContent = document.querySelector(
        ".main-content-area"
      ) as HTMLElement;
      if (mainContent && window.innerWidth >= 768) {
        mainContent.style.marginLeft = isCollapsed ? "5rem" : "16rem";
      }
    };
    updateMargin();
  }, [isCollapsed]);

  const navigate = (path: string) => {
    window.location.hash = path;
    setIsOpen(false);
  };

  const isActive = (path: string) => {
    const cleanPath = currentPath.replace(/^#/, "");
    if (path === "/") {
      return cleanPath === "" || cleanPath === "/";
    }
    return cleanPath.startsWith(path);
  };

  const navItems = [
    {
      name: "Home",
      icon: (
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
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </svg>
      ),
      path: "/",
    },
    {
      name: "6ixAssist Map",
      icon: (
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
            d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
          />
        </svg>
      ),
      path: "/map",
    },
    {
      name: "Events",
      icon: (
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
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      ),
      path: "/events",
    },
    {
      name: "Announcements",
      icon: (
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
            d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
          />
        </svg>
      ),
      path: "/announcements",
    },
    {
      name: "Community",
      icon: (
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
            d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
          />
        </svg>
      ),
      path: "/community",
    },
    {
      name: "Saved Places",
      icon: (
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
            d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
          />
        </svg>
      ),
      path: "/saved",
    },
  ];

  const extraItems = [
    {
      name: "Settings",
      icon: (
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
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      ),
      action: () => navigate("/settings"),
    },
    {
      name: "Help & Support",
      icon: (
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
            d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      action: () => navigate("/help"),
    },
  ];

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed top-4 left-4 z-50 md:hidden p-2 rounded-xl shadow-lg border-2 transition-all duration-300 ease-out active:scale-95 ${
          darkMode
            ? "bg-gray-800 border-gray-700 hover:bg-gray-700 active:bg-gray-600"
            : "bg-white border-indigo-200 hover:bg-indigo-50 active:bg-indigo-100"
        }`}
      >
        <svg
          className={`w-6 h-6 transition-colors duration-300 ${
            darkMode ? "text-gray-200" : "text-gray-700"
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h16"
          ></path>
        </svg>
      </button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
        />
      )}

      {/* Side Navigation */}
      <nav
        className={`fixed top-0 left-0 h-full border-r-2 shadow-xl z-40 transition-all duration-300 ease-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 ${isCollapsed ? "w-20" : "w-64"} ${
          darkMode
            ? "bg-gray-900 border-gray-700"
            : "bg-white border-indigo-200"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div
            className={`p-6 border-b transition-colors duration-300 ${
              darkMode ? "border-gray-700" : "border-indigo-100"
            }`}
          >
            {!isCollapsed ? (
              <div className="flex items-center justify-between">
                <button
                  onClick={() => navigate("/")}
                  className="flex items-center gap-3"
                >
                  <div className="w-10 h-10 flex items-center justify-center shadow-sm flex-shrink-0 transition-all duration-300 ease-out overflow-hidden rounded-xl bg-white">
                    <img
                      src="/logo.png"
                      alt="6ixAssist logo"
                      className="w-8 h-8 object-contain"
                    />
                  </div>
                  <div className="text-left">
                    <h1
                      className={`text-xl font-semibold transition-colors duration-300 ${
                        darkMode ? "text-gray-100" : "text-gray-800"
                      }`}
                    >
                      6ixAssist
                    </h1>
                    <p
                      className={`text-xs transition-colors duration-300 ${
                        darkMode ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      Find help near you
                    </p>
                  </div>
                </button>
                <button
                  onClick={() => setIsCollapsed(!isCollapsed)}
                  className={`hidden md:block p-2 rounded-lg transition-all duration-300 flex-shrink-0 ${
                    darkMode ? "hover:bg-gray-800" : "hover:bg-indigo-50"
                  }`}
                >
                  <svg
                    className={`w-5 h-5 transition-colors duration-300 ${
                      darkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
                    />
                  </svg>
                </button>
              </div>
            ) : (
              <div>
                <button
                  onClick={() => navigate("/")}
                  className="flex items-center justify-center w-full transition-all duration-200 ease-out hover:opacity-80 active:scale-95"
                >
                  <div className="w-12 h-12 flex items-center justify-center shadow-sm flex-shrink-0 transition-all duration-300 ease-out overflow-hidden rounded-xl bg-white">
                    <img
                      src="/logo.png"
                      alt="6ixAssist logo"
                      className="w-10 h-10 object-contain"
                    />
                  </div>
                </button>
                <button
                  onClick={() => setIsCollapsed(!isCollapsed)}
                  className={`hidden md:block w-full mt-3 p-2 rounded-lg transition-all duration-300 ${
                    darkMode ? "hover:bg-gray-800" : "hover:bg-indigo-50"
                  }`}
                >
                  <svg
                    className={`w-5 h-5 mx-auto rotate-180 transition-colors duration-300 ${
                      darkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
                    />
                  </svg>
                </button>
              </div>
            )}
          </div>

          {/* Main Navigation */}
          <div className="flex-1 overflow-y-auto py-4">
            <div className="px-3 space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className={`w-full flex items-center ${
                    isCollapsed ? "justify-center" : "gap-3"
                  } px-4 py-3 rounded-xl font-medium transition-all duration-300 ease-out active:scale-95 ${
                    isActive(item.path)
                      ? darkMode
                        ? "bg-indigo-900 text-indigo-300 shadow-sm"
                        : "bg-indigo-100 text-indigo-700 shadow-sm"
                      : darkMode
                      ? "text-gray-300 hover:bg-gray-800 hover:text-gray-100"
                      : "text-gray-600 hover:bg-indigo-50 hover:text-gray-800"
                  }`}
                  title={isCollapsed ? item.name : undefined}
                >
                  <span
                    className={`transition-colors duration-300 ${
                      isActive(item.path)
                        ? darkMode
                          ? "text-indigo-400"
                          : "text-indigo-600"
                        : darkMode
                        ? "text-gray-400"
                        : "text-gray-500"
                    }`}
                  >
                    {item.icon}
                  </span>
                  {!isCollapsed && <span>{item.name}</span>}
                </button>
              ))}
            </div>

            {/* Divider */}
            <div className="my-4 px-6">
              <div
                className={`border-t transition-colors duration-300 ${
                  darkMode ? "border-gray-700" : "border-indigo-100"
                }`}
              ></div>
            </div>

            {/* Extra Items */}
            <div className="px-3 space-y-1">
              {extraItems.map((item) => (
                <button
                  key={item.name}
                  onClick={item.action}
                  className={`w-full flex items-center ${
                    isCollapsed ? "justify-center" : "gap-3"
                  } px-4 py-3 rounded-xl font-medium transition-all duration-300 ease-out active:scale-95 ${
                    darkMode
                      ? "text-gray-300 hover:bg-gray-800 hover:text-gray-100"
                      : "text-gray-600 hover:bg-indigo-50 hover:text-gray-800"
                  }`}
                  title={isCollapsed ? item.name : undefined}
                >
                  <span
                    className={`transition-colors duration-300 ${
                      darkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    {item.icon}
                  </span>
                  {!isCollapsed && <span>{item.name}</span>}
                </button>
              ))}
            </div>
          </div>

          {/* Footer */}
          {!isCollapsed && (
            <div
              className={`p-6 border-t transition-colors duration-300 ${
                darkMode ? "border-gray-700" : "border-indigo-100"
              }`}
            >
              <div
                className={`rounded-xl p-4 border transition-all duration-300 ${
                  darkMode
                    ? "bg-rose-950 border-rose-900"
                    : "bg-rose-50 border-rose-200"
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <svg
                    className={`w-5 h-5 transition-colors duration-300 ${
                      darkMode ? "text-rose-400" : "text-rose-600"
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
                  <p
                    className={`text-xs font-semibold transition-colors duration-300 ${
                      darkMode ? "text-rose-300" : "text-rose-900"
                    }`}
                  >
                    Need urgent help?
                  </p>
                </div>
                <p
                  className={`text-xs mb-2 transition-colors duration-300 ${
                    darkMode ? "text-rose-400" : "text-rose-700"
                  }`}
                >
                  Crisis support available 24/7
                </p>
                <button
                  onClick={() => setShowHelpPopup(true)}
                  className="w-full py-2 bg-rose-600 hover:bg-rose-700 active:bg-rose-800 text-white rounded-lg text-sm font-medium transition-all duration-300 ease-out hover:shadow-md active:scale-95"
                >
                  Get Help Now
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Help Popup */}
      {showHelpPopup && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div
            className={`rounded-2xl p-6 max-w-md w-full shadow-2xl transition-colors duration-300 ${
              darkMode ? "bg-gray-800" : "bg-white"
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <h3
                className={`text-xl font-bold transition-colors duration-300 ${
                  darkMode ? "text-gray-100" : "text-gray-900"
                }`}
              >
                Crisis Support
              </h3>
              <button
                onClick={() => setShowHelpPopup(false)}
                className={`p-2 rounded-lg transition-all duration-300 ${
                  darkMode
                    ? "hover:bg-gray-700 text-gray-400"
                    : "hover:bg-gray-100 text-gray-600"
                }`}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="space-y-3">
              <a
                href="tel:911"
                className={`block p-4 rounded-xl border-2 transition-all duration-300 ${
                  darkMode
                    ? "bg-gray-700 border-red-500 hover:bg-gray-600"
                    : "bg-red-50 border-red-200 hover:bg-red-100"
                }`}
              >
                <div
                  className={`text-2xl font-bold transition-colors duration-300 ${
                    darkMode ? "text-red-400" : "text-red-600"
                  }`}
                >
                  911
                </div>
                <div
                  className={`text-sm mt-1 transition-colors duration-300 ${
                    darkMode ? "text-gray-300" : "text-red-700"
                  }`}
                >
                  Emergency Services
                </div>
              </a>

              <a
                href="tel:988"
                className={`block p-4 rounded-xl border-2 transition-all duration-300 ${
                  darkMode
                    ? "bg-gray-700 border-red-500 hover:bg-gray-600"
                    : "bg-red-50 border-red-200 hover:bg-red-100"
                }`}
              >
                <div
                  className={`text-2xl font-bold transition-colors duration-300 ${
                    darkMode ? "text-red-400" : "text-red-600"
                  }`}
                >
                  988
                </div>
                <div
                  className={`text-sm mt-1 transition-colors duration-300 ${
                    darkMode ? "text-gray-300" : "text-red-700"
                  }`}
                >
                  Suicide Crisis Helpline
                </div>
              </a>

              <a
                href="tel:311"
                className={`block p-4 rounded-xl border-2 transition-all duration-300 ${
                  darkMode
                    ? "bg-gray-700 border-indigo-500 hover:bg-gray-600"
                    : "bg-indigo-50 border-indigo-200 hover:bg-indigo-100"
                }`}
              >
                <div
                  className={`text-2xl font-bold transition-colors duration-300 ${
                    darkMode ? "text-indigo-400" : "text-indigo-600"
                  }`}
                >
                  311
                </div>
                <div
                  className={`text-sm mt-1 transition-colors duration-300 ${
                    darkMode ? "text-gray-300" : "text-indigo-700"
                  }`}
                >
                  City Services & Resources
                </div>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SideNav;
