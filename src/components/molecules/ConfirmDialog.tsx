import type { FC, MouseEvent } from "react";

interface ConfirmDialogProps {
  isOpen: boolean;
  title?: string;
  message?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmDialog: FC<ConfirmDialogProps> = ({
  isOpen,
  title = "¿Estás seguro?",
  message = "Esta acción no se puede deshacer.",
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null;

  // 🧠 Si el clic ocurre en el fondo (overlay), cerramos
  const handleOverlayClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onCancel();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={handleOverlayClick}
    >
      <div
        className="bg-primary rounded-2xl shadow-xl p-6 w-[90%] max-w-sm text-center transform transition-all duration-200 scale-100 animate-fadeIn"
      >
        <h2 className="text-xl font-semibold mb-2 text-white">{title}</h2>
        <p className="text-gray-300 mb-5">{message}</p>

        <div className="flex justify-center gap-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-xl bg-gray-700 text-gray-200 hover:bg-gray-500 transition-all"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-xl bg-buttons-list-blue text-white hover:bg-blue-500 transition-all shadow-sm"
          >
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
