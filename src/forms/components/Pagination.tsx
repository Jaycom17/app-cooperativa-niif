import React, { memo } from 'react';

export const Pagination: React.FC<{
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  hasNext: boolean;
  hasPrev: boolean;
}> = memo(({ currentPage, totalPages, onPageChange, hasNext, hasPrev }) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded-lg mt-2">
      <div className="text-sm text-gray-600">
        Página {currentPage + 1} de {totalPages}
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={!hasPrev}
          className="px-2 py-1 text-xs bg-white border rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
        >
          Anterior
        </button>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={!hasNext}
          className="px-2 py-1 text-xs bg-white border rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
});