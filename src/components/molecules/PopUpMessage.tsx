import { useEffect } from "react";

interface PopUpMessageProps {
  title: string;
  message: string;
  onClose: () => void;
  type?: "info" | "success" | "warning" | "error";
}

const colors = {
  info: {
    bg: "bg-gray-800",
    text: "text-blue-400",
  },
  success: {
    bg: "bg-gray-800",
    text: "text-green-400",
  },
  warning: {
    bg: "bg-gray-800",
    text: "text-yellow-400",
  },
  error: {
    bg: "bg-gray-800",
    text: "text-red-400",
  },
};

function PopUpMessage({
  title,
  message,
  onClose,
  type = "info",
}: PopUpMessageProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`
        fixed bottom-5 left-5 z-[9999]
        flex items-start sm:items-center gap-3
        p-3 sm:p-4 text-sm rounded-lg shadow-lg
        w-[90%] sm:w-auto max-w-xs sm:max-w-sm
        ${colors[type].bg} ${colors[type].text}
        transform transition-all duration-300 animate-fadeIn
      `}
      role="alert"
    >
      {/* Ícono */}
      <svg
        className="w-5 h-5 sm:w-4 sm:h-4 shrink-0 mt-0.5 sm:mt-0"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
      </svg>

      {/* Texto */}
      <div className="flex-1">
        <span className="block font-semibold leading-tight">{title}</span>
        <span className="block text-xs sm:text-sm break-words">{message}</span>
      </div>

      {/* Botón cerrar */}
      <button
        onClick={onClose}
        className="ml-2 sm:ml-3 text-lg sm:text-xl leading-none hover:text-gray-500 transition"
      >
        ×
      </button>
    </div>
  );
}

export default PopUpMessage;
