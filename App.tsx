import React from 'react';
import './style.css';
import ColumnParent from './components/ColumnParent/ColumnParent';
import { useAppDispatch, useAppSelector } from './app/hooks';
import {
  Field,
  Filter,
  reloadFilters,
  searchFilter,
} from './features/filters/filterSlice';
import { FaRedo } from 'react-icons/fa';
import Search from './components/Search/Search';

export default function App() {
  const fieldInfo: Filter = useAppSelector((state) => state.filter);
  const dispatch = useAppDispatch();
  return (
    <div>
      <Search onSearch={(val) => dispatch(searchFilter(val))} />

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
