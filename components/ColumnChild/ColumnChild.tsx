import React, { useEffect, useState } from 'react';
import Checkbox from '../Checkbox/Checkbox';
import { BsCheck2, BsFillPencilFill, BsXCircle } from 'react-icons/bs';
import InputTextField from '../InputTextField/InputTextField';

export default function ColumnChild(props) {
  // Init values
  const fieldInfo = props.data;
  const checkAll = props.checkAll;

  // States
  const [checkCurrent, setCheckCurrent] = useState(checkAll);
  const [editMode, setEditMode] = useState(false);
  const [fieldName, setFieldName] = useState(fieldInfo.field);

  // Use effects
  useEffect(() => {
    setCheckCurrent(checkAll);
  }, [checkAll]);

  const actionIcons = !editMode ? (
    <span className="flex">
      <BsXCircle
        className="action-icon"
        onClick={() => props.onDelete(fieldInfo.id)}
      />
      <BsFillPencilFill
        className="action-icon"
        onClick={() => setEditMode(true)}
      />
    </span>
  ) : (
    ''
  );

  const viewOrEditField = editMode ? (
    <div>
      <InputTextField value={fieldName} />
      <BsCheck2 />
    </div>
  ) : (
    <Checkbox
      id={fieldInfo.id}
      checked={checkCurrent}
      label={fieldInfo.field}
    />
  );

  return (
    <li key={fieldInfo.id} className="m-t-10 filter-list">
      {viewOrEditField}
      {actionIcons}
    </li>
  );
}
