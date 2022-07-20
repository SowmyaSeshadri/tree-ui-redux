import React from 'react';
import './style.css';
import ColumnParent from './components/ColumnParent/ColumnParent';
import { useAppSelector } from './app/hooks';
import { Field, Filter } from './features/filters/filterSlice';

export default function App() {
  const fieldInfo: Filter = useAppSelector((state) => state.filter);
  return (
    <div>
      {fieldInfo.fields.map((d: Field) => {
        return <ColumnParent key={d.data.id} fieldData={d} />;
      })}
    </div>
  );
}
