import React from "react";

interface LoadingProps {
  message?: string;
  fullscreen?: boolean;
}

const Loading: React.FC<LoadingProps> = ({ message = "Cargando...", fullscreen = true }) => {
  return (
    <div
      className={`flex flex-col items-center justify-center 
      ${fullscreen ? "fixed inset-0 bg-white/70 z-50" : "w-full h-full"}`}
    >
      <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-unicoop-blue mb-4"></div>
      <p className="text-xl font-semibold text-unicoop-blue">{message}</p>
    </div>
  );
};

export default Loading;
