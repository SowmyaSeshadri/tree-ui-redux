import React, { useState } from 'react';
import { BsCheck2, BsFillPencilFill, BsXCircle } from 'react-icons/bs';
import { FaAngleDown, FaAngleRight } from 'react-icons/fa';
import { useAppDispatch } from '../../app/hooks';
import {
  deleteField,
  editFieldName,
  expandOrCollapseField,
  Field,
  setEditMode,
} from '../../features/filters/filterSlice';
import Checkbox from '../Checkbox/Checkbox';
import InputTextField from '../InputTextField/InputTextField';

export default function ColumnParent(props) {
  const fieldInfo: Field = props.fieldData;
  const expand = fieldInfo.isExpanded;
  const editMode = fieldInfo.data.isInEditMode;

  const dispatch = useAppDispatch();

  const [fieldName, setFieldName] = useState(fieldInfo.data.field);

  const handleExpandOrCollapse = () => {
    let fieldToUpdate = JSON.parse(JSON.stringify(fieldInfo));
    fieldToUpdate.isExpanded = !expand;
    dispatch(expandOrCollapseField(fieldToUpdate));
  };

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
      // onChange={handleOnChangeOfCheckParent}
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

  console.log('Rendering - {}', fieldInfo.data.id);

  if (fieldInfo.data.isDeleted) {
    return '';
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

            {/* <ul className={` ${expand ? 'expand' : 'collapse'}`}>
              {hasChild &&
                fieldInfo.values.map((field) => (
                  <ColumnChild
                    key={field.id}
                    data={field}
                    checkAll={checkAll}
                    onChangeOfChild={handleOnChangeOfChild}
                    onDelete={props.onDelete}
                    onEdit={props.onEdit}
                  />
                ))}
            </ul> */}
          </div>
        </li>
      </ul>
    </div>
  );
}
