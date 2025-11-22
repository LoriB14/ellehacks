import React, { useState, useContext } from "react";
import { DarkModeContext } from "../App";

const InfoHelpPage: React.FC = () => {
  const { darkMode } = useContext(DarkModeContext);
  const [activeSection, setActiveSection] = useState<
    "help" | "about" | "contact" | "faq"
  >("help");

  const helpSections = [
    {
      title: "Finding Resources",
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
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      ),
      content:
        'Use the search bar to find specific services like "food banks", "shelters", or "free clinics". You can also browse by category using the filter buttons.',
    },
    {
      title: "Emergency Help",
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
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
      ),
      content:
        "For immediate help, call 911 for emergencies, 988 for mental health crisis, or 311 for non-emergency city services. Access the crisis support popup anytime from the main menu.",
    },
    {
      title: "Saving Places",
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
      content:
        'Bookmark important resources by clicking the save icon. Your saved places are stored locally and accessible from the "Saved Places" page for quick reference.',
    },
    {
      title: "Community Updates",
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
            d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a2 2 0 01-2-2v-6a2 2 0 012-2h8z"
          />
        </svg>
      ),
      content:
        "Share real-time information about wait times, closures, or availability. Your anonymous updates help others in the community find the help they need.",
    },
  ];

  const faqItems = [
    {
      question: "Is 6ixAssist free to use?",
      answer:
        "Yes, 6ixAssist is completely free. We connect you to free and low-cost resources throughout Toronto.",
    },
    {
      question: "Do I need to create an account?",
      answer:
        "No account required! All features are available immediately. Your saved places are stored locally on your device.",
    },
    {
      question: "How do I save resources?",
      answer:
        "Click the bookmark icon on any resource card to save it. View all saved items in the Saved page.",
    },
    {
      question: "Is my location data private?",
      answer:
        "Yes! Your location is only used to show nearby resources. We never store or share your location data.",
    },
    {
      question: "Can I use 6ixAssist without internet?",
      answer:
        "Limited features work offline. Saved resources remain accessible without internet.",
    },
    {
      question: "Are all services really free?",
      answer:
        "We prioritize free or low-cost options. Check each resource for specific eligibility requirements.",
    },
    {
      question: "How accurate is the location data?",
      answer:
        "We update our resource database regularly and work with local organizations to ensure accuracy. Community updates provide real-time information.",
    },
    {
      question: "What if I can't find what I need?",
      answer:
        "Try different search terms or contact 311 for additional city services. Our AI chat can also suggest alternative resources.",
    },
    {
      question: "How do I report incorrect information?",
      answer:
        "Use the Community page to share updates about closures or changes, or contact us directly through the contact form.",
    },
  ];

  const emergencyContacts = [
    {
      service: "Emergency Services",
      number: "911",
      description: "Life-threatening emergencies, fire, police",
      color: "red",
    },
    {
      service: "Mental Health Crisis",
      number: "988",
      description: "24/7 suicide & crisis lifeline",
      color: "purple",
    },
    {
      service: "City Services",
      number: "311",
      description: "Non-emergency city services and information",
      color: "blue",
    },
    {
      service: "Telehealth Ontario",
      number: "1-866-797-0000",
      description: "24/7 health advice from registered nurses",
      color: "green",
    },
  ];

  const getContactColor = (color: string) => {
    const colors = {
      red: darkMode
        ? "bg-red-900 text-red-300 border-red-800"
        : "bg-red-50 text-red-700 border-red-200",
      purple: darkMode
        ? "bg-purple-900 text-purple-300 border-purple-800"
        : "bg-purple-50 text-purple-700 border-purple-200",
      blue: darkMode
        ? "bg-blue-900 text-blue-300 border-blue-800"
        : "bg-blue-50 text-blue-700 border-blue-200",
      green: darkMode
        ? "bg-green-900 text-green-300 border-green-800"
        : "bg-green-50 text-green-700 border-green-200",
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <div
      className={`h-full overflow-y-auto transition-colors duration-300 ${
        darkMode ? "bg-gray-900" : "bg-gray-50"
      }`}
    >
      {/* Header */}
      <div
        className={`p-6 border-b transition-colors duration-300 ${
          darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
        }`}
      >
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <svg
              className={`w-8 h-8 transition-colors duration-300 ${
                darkMode ? "text-indigo-400" : "text-indigo-600"
              }`}
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
            <h1
              className={`text-3xl font-bold transition-colors duration-300 ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Help & Info
            </h1>
          </div>
          <p
            className={`transition-colors duration-300 ${
              darkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Everything you need to know about using 6ixAssist effectively
          </p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div
        className={`border-b transition-colors duration-300 ${
          darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
        }`}
      >
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex gap-6 overflow-x-auto">
            {[
              { id: "help", label: "How to Use", icon: "❓" },
              { id: "about", label: "About", icon: "ℹ️" },
              { id: "contact", label: "Emergency Contacts", icon: "📞" },
              { id: "faq", label: "FAQ", icon: "💭" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveSection(tab.id as any)}
                className={`py-4 px-2 border-b-2 font-medium transition-all duration-300 ease-out whitespace-nowrap ${
                  activeSection === tab.id
                    ? darkMode
                      ? "border-indigo-400 text-indigo-400"
                      : "border-indigo-500 text-indigo-600"
                    : darkMode
                    ? "border-transparent text-gray-400 hover:text-white hover:border-gray-500"
                    : "border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300"
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto p-6">
        {/* Help Section */}
        {activeSection === "help" && (
          <div className="space-y-6">
            <div
              className={`rounded-2xl p-6 border transition-colors duration-300 ${
                darkMode
                  ? "bg-gray-800 border-gray-700"
                  : "bg-white border-gray-200"
              }`}
            >
              <h2
                className={`text-2xl font-bold mb-4 transition-colors duration-300 ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Getting Started
              </h2>
              <p
                className={`mb-4 transition-colors duration-300 ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                6ixAssist connects you to free resources and services in
                Toronto. Here's how to make the most of it:
              </p>
            </div>

            {helpSections.map((section, index) => (
              <div
                key={index}
                className={`rounded-2xl p-6 border transition-colors duration-300 ${
                  darkMode
                    ? "bg-gray-800 border-gray-700"
                    : "bg-white border-gray-200"
                }`}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`p-3 rounded-xl transition-colors duration-300 ${
                      darkMode
                        ? "bg-indigo-900 text-indigo-300"
                        : "bg-indigo-100 text-indigo-600"
                    }`}
                  >
                    {section.icon}
                  </div>
                  <div>
                    <h3
                      className={`text-xl font-semibold mb-2 transition-colors duration-300 ${
                        darkMode ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {section.title}
                    </h3>
                    <p
                      className={`transition-colors duration-300 ${
                        darkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      {section.content}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* About Section */}
        {activeSection === "about" && (
          <div className="space-y-6">
            <div
              className={`rounded-2xl p-6 border transition-colors duration-300 ${
                darkMode
                  ? "bg-gray-800 border-gray-700"
                  : "bg-white border-gray-200"
              }`}
            >
              <h2
                className={`text-2xl font-bold mb-4 transition-colors duration-300 ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                About 6ixAssist
              </h2>
              <p
                className={`mb-4 transition-colors duration-300 ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                6ixAssist is your comprehensive guide to free and low-cost
                resources in Toronto. Built with community in mind, we help
                connect people to essential services including food banks,
                shelters, healthcare, legal aid, and more.
              </p>
              <p
                className={`mb-4 transition-colors duration-300 ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Our platform combines official city data with real-time
                community updates to provide the most current information about
                resource availability and wait times.
              </p>
            </div>

            <div
              className={`rounded-2xl p-6 border transition-colors duration-300 ${
                darkMode
                  ? "bg-gray-800 border-gray-700"
                  : "bg-white border-gray-200"
              }`}
            >
              <h3
                className={`text-xl font-semibold mb-3 transition-colors duration-300 ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Our Mission
              </h3>
              <p
                className={`transition-colors duration-300 ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                To ensure no one in Toronto goes without knowing where to find
                help. We believe access to information about essential services
                should be free, easy, and available to everyone.
              </p>
            </div>

            <div
              className={`rounded-2xl p-6 border transition-colors duration-300 ${
                darkMode
                  ? "bg-gray-800 border-gray-700"
                  : "bg-white border-gray-200"
              }`}
            >
              <h3
                className={`text-xl font-semibold mb-3 transition-colors duration-300 ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Privacy & Safety
              </h3>
              <p
                className={`transition-colors duration-300 ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                We don't collect personal information or track your searches.
                All data is stored locally on your device. Community updates are
                anonymous and help create a supportive network for everyone.
              </p>
            </div>
          </div>
        )}

        {/* Emergency Contacts */}
        {activeSection === "contact" && (
          <div className="space-y-6">
            <div
              className={`rounded-2xl p-6 border transition-colors duration-300 ${
                darkMode
                  ? "bg-gray-800 border-gray-700"
                  : "bg-white border-gray-200"
              }`}
            >
              <h2
                className={`text-2xl font-bold mb-4 transition-colors duration-300 ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Emergency Contacts
              </h2>
              <p
                className={`mb-6 transition-colors duration-300 ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Keep these important numbers handy. In a crisis, don't hesitate
                to call for help.
              </p>
            </div>

            {emergencyContacts.map((contact, index) => (
              <div
                key={index}
                className={`rounded-2xl p-6 border-2 transition-colors duration-300 ${getContactColor(
                  contact.color
                )}`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold">{contact.service}</h3>
                  <span className="text-2xl font-bold">{contact.number}</span>
                </div>
                <p className="text-sm">{contact.description}</p>
              </div>
            ))}

            <div
              className={`rounded-2xl p-6 border transition-colors duration-300 ${
                darkMode
                  ? "bg-gray-800 border-gray-600"
                  : "bg-yellow-50 border-yellow-200"
              }`}
            >
              <div className="flex items-start gap-3">
                <svg
                  className={`w-6 h-6 flex-shrink-0 mt-1 transition-colors duration-300 ${
                    darkMode ? "text-yellow-400" : "text-yellow-600"
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
                <div>
                  <h4
                    className={`font-semibold mb-1 transition-colors duration-300 ${
                      darkMode ? "text-white" : "text-yellow-800"
                    }`}
                  >
                    Remember
                  </h4>
                  <p
                    className={`text-sm transition-colors duration-300 ${
                      darkMode ? "text-gray-300" : "text-yellow-700"
                    }`}
                  >
                    If you're in immediate danger, call 911. These contacts are
                    available 24/7 and trained to help in crisis situations.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* FAQ Section */}
        {activeSection === "faq" && (
          <div className="space-y-4">
            <div
              className={`rounded-2xl p-6 border transition-colors duration-300 ${
                darkMode
                  ? "bg-gray-800 border-gray-700"
                  : "bg-white border-gray-200"
              }`}
            >
              <h2
                className={`text-2xl font-bold mb-4 transition-colors duration-300 ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Frequently Asked Questions
              </h2>
            </div>

            {faqItems.map((item, index) => (
              <div
                key={index}
                className={`rounded-2xl p-6 border transition-colors duration-300 ${
                  darkMode
                    ? "bg-gray-800 border-gray-700"
                    : "bg-white border-gray-200"
                }`}
              >
                <h3
                  className={`text-lg font-semibold mb-2 transition-colors duration-300 ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  {item.question}
                </h3>
                <p
                  className={`transition-colors duration-300 ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  {item.answer}
                </p>
              </div>
            ))}

            {/* Contact Support Section */}
            <div
              className={`rounded-2xl p-6 border transition-colors duration-300 ${
                darkMode
                  ? "bg-gray-800 border-gray-700"
                  : "bg-white border-gray-200"
              }`}
            >
              <h3
                className={`text-lg font-semibold mb-4 transition-colors duration-300 ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Need More Help?
              </h3>
              <p
                className={`mb-4 transition-colors duration-300 ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Can't find what you're looking for? Get in touch with us or
                access city services.
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href="mailto:support@6ixassist.ca"
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 ease-out active:scale-95 ${
                    darkMode
                      ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                      : "bg-indigo-100 hover:bg-indigo-200 text-indigo-700"
                  }`}
                >
                  📧 Email Support
                </a>
                <a
                  href="tel:311"
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 ease-out active:scale-95 ${
                    darkMode
                      ? "bg-green-700 hover:bg-green-800 text-white"
                      : "bg-green-100 hover:bg-green-200 text-green-700"
                  }`}
                >
                  📞 Call 311
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InfoHelpPage;
