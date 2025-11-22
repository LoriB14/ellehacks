import React from "react";

interface ChatAnswerProps {
  answer: string;
  suggestedSearches: string[];
  urgency: "low" | "medium" | "high";
  onSearchClick: (query: string) => void;
  onClose: () => void;
}

const ChatAnswer: React.FC<ChatAnswerProps> = ({
  answer,
  suggestedSearches,
  urgency,
  onSearchClick,
  onClose,
}) => {
  const getUrgencyColor = () => {
    switch (urgency) {
      case "high":
        return "border-rose-500 bg-rose-50";
      case "medium":
        return "border-amber-500 bg-amber-50";
      default:
        return "border-indigo-500 bg-indigo-50";
    }
  };

  const getUrgencyIcon = () => {
    if (urgency === "high") {
      return (
        <svg
          className="w-6 h-6 text-rose-600"
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
    }
    return (
      <svg
        className="w-6 h-6 text-indigo-600"
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
    );
  };

  return (
    <div
      className={`border-l-4 rounded-lg p-6 mb-6 shadow-md ${getUrgencyColor()} animate-slideIn`}
    >
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">{getUrgencyIcon()}</div>
        <div className="flex-1">
          <div className="flex items-start justify-between mb-3">
            <h3 className="text-lg font-semibold text-gray-800">
              Quick Answer
            </h3>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 transition-colors"
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

          <p className="text-gray-700 leading-relaxed mb-4 whitespace-pre-line">
            {answer}
          </p>

          <div>
            <p className="text-sm font-medium text-gray-600 mb-2">
              Find nearby resources:
            </p>
            <div className="flex flex-wrap gap-2">
              {suggestedSearches.map((search, index) => (
                <button
                  key={index}
                  onClick={() => onSearchClick(search)}
                  className="px-4 py-2 bg-white hover:bg-gray-50 border-2 border-indigo-200 rounded-lg text-sm font-medium text-indigo-700 transition-all duration-200 ease-out hover:border-indigo-400 hover:shadow-sm active:scale-95"
                >
                  {search}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatAnswer;
