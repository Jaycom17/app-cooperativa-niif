// FormRender.tsx
import React from 'react';
import type { JSONFormProps } from '../models/FormRender';
import { isObject } from '../utils/formRender';
import { ObjectFieldset } from './ObjectFieldset';
import { PrimitiveInput } from './PrimitiveInput';

export const FormRender: React.FC<JSONFormProps> = ({
  value,
  onChange = () => {},
  config,
  defaultOpen = false,
  canEdit = true,
  maxInitialItems = 50,
  lazyLoadChildren = true,
}) => {
  if (isObject(value)) {
    return (
      <div className="bg-gray-50 p-4 rounded-xl shadow-md">
        <ObjectFieldset
          obj={value}
          path={[]}
          onChange={onChange}
          canEdit={canEdit}
          config={config}
          defaultOpen={defaultOpen}
          maxInitialItems={maxInitialItems}
          lazyLoadChildren={lazyLoadChildren}
        />
      </div>
    );
  }

  return <PrimitiveInput value={value} onChange={onChange} path={[]} />;
};