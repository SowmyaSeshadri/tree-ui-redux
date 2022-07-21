import React from 'react';
import './style.css';
import ColumnParent from './components/ColumnParent/ColumnParent';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { Field, Filter, reloadFilters } from './features/filters/filterSlice';
import { FaRedo } from 'react-icons/fa';

export default function App() {
  const fieldInfo: Filter = useAppSelector((state) => state.filter);
  const dispatch = useAppDispatch();
  return (
    <div>
      <span className="refresh" onClick={() => dispatch(reloadFilters())}>
        <FaRedo size="12" />
        <span> Reload </span>
      </span>

      {fieldInfo.fields.map((d: Field) => {
        return <ColumnParent key={d.data.id} fieldData={d} />;
      })}
    </div>
  );
}
