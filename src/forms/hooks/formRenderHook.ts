import { useMemo, useState, useCallback } from "react";
import { humanizeKey } from '@/forms/utils/formRender';

export function useSearch(items: string[], searchTerm: string) {
  return useMemo(() => {
    if (!searchTerm.trim()) return items;
    const term = searchTerm.toLowerCase();
    return items.filter(key => 
      humanizeKey(key).toLowerCase().includes(term)
    );
  }, [items, searchTerm]);
}

export function usePagination<T>(items: T[], pageSize: number) {
  const [currentPage, setCurrentPage] = useState(0);
  
  const totalPages = Math.ceil(items.length / pageSize);
  const paginatedItems = useMemo(() => {
    const start = currentPage * pageSize;
    return items.slice(start, start + pageSize);
  }, [items, currentPage, pageSize]);

  const goToPage = useCallback((page: number) => {
    setCurrentPage(Math.max(0, Math.min(page, totalPages - 1)));
  }, [totalPages]);

  return {
    currentPage,
    totalPages,
    paginatedItems,
    goToPage,
    hasNext: currentPage < totalPages - 1,
    hasPrev: currentPage > 0
  };
}