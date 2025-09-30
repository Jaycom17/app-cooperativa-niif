import React, { memo, useState, useCallback, useMemo } from 'react';
import { IoIosArrowDroprightCircle, IoIosArrowDropdownCircle } from "react-icons/io";

import type { JSONObject, JSONFormConfig } from '@/forms/models/FormRender';
import { isObject, humanizeKey, pathToString } from '@/forms/utils/formRender';
import { useSearch, usePagination } from '@/forms/hooks/formRenderHook';
import { Pagination } from '@/forms/components/Pagination';
import { SearchBox } from '@/forms/components/SearchBox';
import { PrimitiveInput } from '@/forms/components/PrimitiveInput';

export const ObjectFieldset: React.FC<{
  obj: JSONObject;
  path: (string | number)[];
  onChange: (newObj: JSONObject, path?: string) => void;
  config?: JSONFormConfig;
  defaultOpen?: boolean;
  canEdit?: boolean;
  maxInitialItems?: number;
  lazyLoadChildren?: boolean;
}> = memo(({ obj, path, onChange, config, defaultOpen, canEdit, maxInitialItems = 50, lazyLoadChildren = false }) => {
  const keys = useMemo(() => Object.keys(obj), [obj]);
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());
  
  // Filtrar keys por búsqueda
  const filteredKeys = useSearch(keys, searchTerm);
  
  // Paginación solo si hay muchos items
  const shouldPaginate = filteredKeys.length > maxInitialItems;
  const pagination = usePagination(filteredKeys, maxInitialItems);
  const displayKeys = shouldPaginate ? pagination.paginatedItems : filteredKeys;

  const toggleSection = useCallback((key: string) => {
    setExpandedSections(prev => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  }, []);

  return (
    <div className="bg-white border rounded-xl p-4 shadow-sm mb-4">
      {/* Mostrar búsqueda solo si hay muchos campos */}
      {keys.length > 10 && (
        <SearchBox
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder={`Buscar en ${keys.length} campos...`}
        />
      )}

      {/* Stats */}
      {(shouldPaginate || searchTerm) && (
        <div className="text-xs text-gray-500 mb-3">
          Mostrando {displayKeys.length} de {filteredKeys.length} campos
          {searchTerm && ` (filtrados de ${keys.length} total)`}
        </div>
      )}

      {displayKeys.map((k) => {
        const val = obj[k];
        const childPath = [...path, k];
        const labelCfg = config?.byPath?.[pathToString(childPath)] ?? config?.byKey?.[k];
        const isExpanded = expandedSections.has(k);

        if (isObject(val)) {
          return (
            <div key={k} className="mb-4">
              <button
                onClick={() => toggleSection(k)}
                className="w-full text-left cursor-pointer text-black bg-gray-100 p-2 rounded font-semibold hover:bg-gray-200 flex items-center justify-between"
              >
                <span>{labelCfg?.label ?? humanizeKey(k)}</span>
                <span className="text-gray-500 text-2xl">
                  {isExpanded ? <IoIosArrowDropdownCircle /> : <IoIosArrowDroprightCircle />}
                </span>
              </button>
              {isExpanded && (
                <div className="mt-3 pl-4 border-l-2 border-gray-200">
                  <ObjectFieldset
                    obj={val}
                    path={childPath}
                    onChange={(newChild, path) =>
                      onChange({ ...obj, [k]: newChild }, path)
                    }
                    config={config}
                    defaultOpen={defaultOpen}
                    canEdit={canEdit}
                    maxInitialItems={maxInitialItems}
                    lazyLoadChildren={lazyLoadChildren}
                  />
                </div>
              )}
            </div>
          );
        }

        return (
          <PrimitiveInput
            key={k}
            value={val}
            path={childPath}
            canEdit={canEdit}
            onChange={(newVal, path) => onChange({ ...obj, [k]: newVal }, path)}
            label={labelCfg?.label}
            cfg={labelCfg}
          />
        );
      })}

      {/* Paginación */}
      {shouldPaginate && (
        <Pagination
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          onPageChange={pagination.goToPage}
          hasNext={pagination.hasNext}
          hasPrev={pagination.hasPrev}
        />
      )}
    </div>
  );
});