import React, { useState } from 'react';
import { BsCheck2, BsFillPencilFill, BsXCircle } from 'react-icons/bs';
import { FaAngleDown, FaAngleRight } from 'react-icons/fa';
import { useAppDispatch } from '../../app/hooks';
import {
  deleteField,
  editFieldName,
  expandOrCollapseField,
  Field,
  checkParent,
  setEditMode,
} from '../../features/filters/filterSlice';
import Checkbox from '../Checkbox/Checkbox';
import ColumnChild from '../ColumnChild/ColumnChild';
import InputTextField from '../InputTextField/InputTextField';
import './columnparent.css';

export default function ColumnParent(props) {
  // Constants
  const fieldInfo: Field = props.fieldData;
  const expand = fieldInfo.isExpanded;
  const editMode = fieldInfo.data.isInEditMode;
  const hasChild = fieldInfo.data.values ? true : false;
  const dispatch = useAppDispatch();
  const [fieldName, setFieldName] = useState(fieldInfo.data.field);

  // Handlers
  const handleExpandOrCollapse = () => {
    let fieldToUpdate = JSON.parse(JSON.stringify(fieldInfo));
    fieldToUpdate.isExpanded = !expand;
    dispatch(expandOrCollapseField(fieldToUpdate));
  };

  // Components
  const expandCollapseIcon = expand ? (
    <FaAngleDown onClick={handleExpandOrCollapse} />
  ) : (
    <FaAngleRight onClick={handleExpandOrCollapse} />
  );

  const viewOrEditField = editMode ? (
    <div>
      <InputTextField
        value={fieldName}
        onChange={(value) => setFieldName(value)}
      />
      <BsCheck2
        onClick={() =>
          dispatch(editFieldName({ id: fieldInfo.data.id, field: fieldName }))
        }
      />
    </div>
  ) : (
    <Checkbox
      id={fieldInfo.data.id}
      onChange={(id, checked) => dispatch(checkParent({ id, checked }))}
      checked={fieldInfo.data.isChecked}
      label={fieldName}
      partialCheck={fieldInfo.data.isPartiallyChecked}
    />
  );

  const actionIcons = !editMode ? (
    <span className="flex">
      <BsXCircle
        className="action-icon"
        onClick={() => dispatch(deleteField(fieldInfo.data.id))}
      />
      <BsFillPencilFill
        className="action-icon"
        onClick={() => dispatch(setEditMode(fieldInfo.data.id))}
      />
    </span>
  ) : (
    ''
  );

  if (fieldInfo.data.isDeleted || !fieldInfo.data.isVisible) {
    return <React.Fragment></React.Fragment>;
  }
  return (
    <div className="parent-field">
      <ul className="parent-field-list">
        <li key={fieldInfo.data.id} className="m-t-10 inline-flex">
          {expandCollapseIcon}

          <div>
            <div className="filter-list">
              {viewOrEditField}
              {actionIcons}
            </div>

            <ul className={` ${expand ? 'expand' : 'collapse'}`}>
              {hasChild &&
                fieldInfo.data.values.map((field) => (
                  <ColumnChild key={field.id} data={field} />
                ))}
            </ul>
          </div>
        </li>
      </ul>
    </div>
  );
}
