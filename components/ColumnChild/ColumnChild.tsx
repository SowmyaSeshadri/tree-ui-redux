import React, { useEffect, useState } from 'react';
import Checkbox from '../Checkbox/Checkbox';
import { BsCheck2, BsFillPencilFill, BsXCircle } from 'react-icons/bs';
import InputTextField from '../InputTextField/InputTextField';
import {
  deleteField,
  editFieldName,
  FieldData,
  setEditMode,
  checkParent,
  checkChild,
} from '../../features/filters/filterSlice';
import { useAppDispatch } from '../../app/hooks';

export default function ColumnChild(props) {
  // Init values
  const fieldInfo: FieldData = props.data;
  const checkAll = fieldInfo.isChecked;
  const editMode = fieldInfo.isInEditMode;

  const dispatch = useAppDispatch();
  const [fieldName, setFieldName] = useState(fieldInfo.field);

  const actionIcons = !editMode ? (
    <span className="flex">
      <BsXCircle
        className="action-icon"
        onClick={() => dispatch(deleteField(fieldInfo.id))}
      />
      <BsFillPencilFill
        onClick={() => dispatch(setEditMode(fieldInfo.id))}
        className="action-icon"
      />
    </span>
  ) : (
    ''
  );

  const handleOnChangeOfChild = (id, checked) => {
    dispatch(checkChild({ id, checked }));
  };

  const viewOrEditField = editMode ? (
    <div>
      <InputTextField
        value={fieldName}
        onChange={(value) => setFieldName(value)}
      />
      <BsCheck2
        onClick={() =>
          dispatch(editFieldName({ id: fieldInfo.id, field: fieldName }))
        }
      />
    </div>
  ) : (
    <Checkbox
      id={fieldInfo.id}
      checked={checkAll}
      label={fieldName}
      onChange={handleOnChangeOfChild}
    />
  );

  if (fieldInfo.isDeleted || !fieldInfo.isVisible) {
    return <React.Fragment></React.Fragment>;
  }
  return (
    <li key={fieldInfo.id} className="m-t-10 filter-list">
      {viewOrEditField}
      {actionIcons}
    </li>
  );
}
