import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface FieldData {
  field: string;
  id: string;
  values: FieldData[];
  isChecked: Boolean;
  isPartiallyChecked: Boolean;
  isInEditMode: Boolean;
  isDeleted: Boolean;
}

export interface Field {
  data: FieldData;
  isExpanded: Boolean;
}

export interface Filter {
  fields: Field[];
}

const initialState: Filter = {
  fields: [
    {
      data: {
        field: 'Participants',
        id: '123',
        values: [
          {
            id: '123_1',
            field: 'Name',
            values: [],
            isChecked: false,
            isPartiallyChecked: false,
            isInEditMode: false,
            isDeleted: false,
          },
          {
            id: '123_2',
            field: 'Language',
            values: [],
            isChecked: false,
            isPartiallyChecked: false,
            isInEditMode: false,
            isDeleted: false,
          },
          {
            id: '123_3',
            field: 'Country',
            values: [],
            isChecked: false,
            isPartiallyChecked: false,
            isInEditMode: false,
            isDeleted: false,
          },
        ],
        isChecked: false,
        isPartiallyChecked: false,
        isInEditMode: false,
        isDeleted: false,
      },
      isExpanded: false,
    },
    {
      data: {
        field: 'Game of Choice',
        id: '234',
        values: [
          {
            id: '234_1',
            field: 'Game name',
            values: [],
            isChecked: false,
            isPartiallyChecked: false,
            isInEditMode: false,
            isDeleted: false,
          },
          {
            id: '234_2',
            field: 'Bought',
            values: [],
            isChecked: false,
            isPartiallyChecked: false,
            isInEditMode: false,
            isDeleted: false,
          },
        ],
        isChecked: false,
        isPartiallyChecked: false,
        isInEditMode: false,
        isDeleted: false,
      },
      isExpanded: false,
    },
    {
      data: {
        field: 'Performance',
        id: '567',
        values: [
          {
            id: '567_1',
            field: 'Bank balance',
            values: [],
            isChecked: false,
            isPartiallyChecked: false,
            isInEditMode: false,
            isDeleted: false,
          },
          {
            id: '567_2',
            field: 'Extra info 1',
            values: [],
            isChecked: false,
            isPartiallyChecked: false,
            isInEditMode: false,
            isDeleted: false,
          },
        ],
        isChecked: false,
        isPartiallyChecked: false,
        isInEditMode: false,
        isDeleted: false,
      },
      isExpanded: false,
    },
  ],
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setEditMode: (state, action: PayloadAction<string>) => {
      state.fields = state.fields.map((d) => {
        if (d.data.id == action.payload) {
          d.data.isInEditMode = true;
        }
        return d;
      });
    },
    editFieldName: (
      state,
      action: PayloadAction<{ id: string; field: string }>
    ) => {
      state.fields = state.fields.map((d) => {
        if (d.data.id == action.payload.id) {
          d.data.field = action.payload.field;
          d.data.isInEditMode = false;
        }
        return d;
      });
      return state;
    },
    deleteField: (state, action: PayloadAction<string>) => {
      state.fields = state.fields.map((d) => {
        if (d.data.id == action.payload) {
          d.data.isDeleted = true;
        }
        return d;
      });
      return state;
    },
    expandOrCollapseField: (state, action: PayloadAction<Field>) => {
      state.fields = state.fields.map((d) =>
        action.payload.data?.id == d.data.id ? action.payload : d
      );
      return state;
    },
  },
});

export const {
  editFieldName,
  deleteField,
  expandOrCollapseField,
  setEditMode,
} = filterSlice.actions;
export default filterSlice.reducer;