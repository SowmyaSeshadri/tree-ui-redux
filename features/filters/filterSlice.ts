import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface FieldData {
  field: string;
  id: string;
  values: FieldData[];
  isChecked: Boolean;
  isPartiallyChecked: Boolean;
  isInEditMode: Boolean;
  isDeleted: Boolean;
  isVisible: Boolean;
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
            isVisible: true,
          },
          {
            id: '123_2',
            field: 'Language',
            values: [],
            isChecked: false,
            isPartiallyChecked: false,
            isInEditMode: false,
            isDeleted: false,
            isVisible: true,
          },
          {
            id: '123_3',
            field: 'Country',
            values: [],
            isChecked: false,
            isPartiallyChecked: false,
            isInEditMode: false,
            isDeleted: false,
            isVisible: true,
          },
        ],
        isChecked: false,
        isPartiallyChecked: false,
        isInEditMode: false,
        isDeleted: false,
        isVisible: true,
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
            isVisible: true,
          },
          {
            id: '234_2',
            field: 'Bought',
            values: [],
            isChecked: false,
            isPartiallyChecked: false,
            isInEditMode: false,
            isDeleted: false,
            isVisible: true,
          },
        ],
        isChecked: false,
        isPartiallyChecked: false,
        isInEditMode: false,
        isDeleted: false,
        isVisible: true,
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
            isVisible: true,
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
            isVisible: true,
          },
        ],
        isChecked: false,
        isPartiallyChecked: false,
        isInEditMode: false,
        isDeleted: false,
        isVisible: true,
      },
      isExpanded: false,
    },
  ],
};

const checkMatch = (value, searchTerm) => {
  return value.toLowerCase().includes(searchTerm?.toLowerCase());
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    searchFilter: (state: Filter, action: PayloadAction<string>) => {
      if (action.payload.length == 0) {
        console.log('Empty search term');
        state.fields = state.fields.map((field) => {
          field.data.isVisible = true;
          field.data.values = field.data.values.map((d) => {
            d.isVisible = true;
            return d;
          });
          return field;
        });

        return state;
      }

      state.fields = state.fields.map((field: Field) => {
        if (!checkMatch(field.data.field, action.payload)) {
          field.data.isVisible = false;
        }

        field.data.values = field.data.values.map((d: FieldData) => {
          if (!checkMatch(d.field, action.payload)) {
            d.isVisible = false;
          }
          return d;
        });
        return field;
      });
      return state;
    },
    reloadFilters: (state) => {
      state.fields = state.fields.map((d) => {
        let fieldData = d.data;
        fieldData.isDeleted = fieldData.isDeleted ? false : fieldData.isDeleted;

        if (fieldData.values.length > 0) {
          fieldData.values = fieldData.values.map((subD) => {
            subD.isDeleted = subD.isDeleted ? false : subD.isDeleted;
            return subD;
          });
        }

        return d;
      });
      return state;
    },
    setEditMode: (state, action: PayloadAction<string>) => {
      state.fields = state.fields.map((d) => {
        let fieldData = d.data;
        fieldData.isInEditMode =
          fieldData.id == action.payload ? true : fieldData.isInEditMode;

        fieldData.values = fieldData.values.map((subD) => {
          subD.isInEditMode =
            subD.id == action.payload ? true : subD.isInEditMode;
          return subD;
        });

        return d;
      });
      return state;
    },
    editFieldName: (
      state,
      action: PayloadAction<{ id: string; field: string }>
    ) => {
      state.fields = state.fields.map((d) => {
        let fieldData = d.data;
        if (fieldData.id == action.payload.id) {
          fieldData.field = action.payload.field;
          fieldData.isInEditMode = false;
        }

        fieldData.values = fieldData.values.map((subD) => {
          if (subD.id == action.payload.id) {
            subD.field = action.payload.field;
            subD.isInEditMode = false;
          }
          return subD;
        });

        return d;
      });
      return state;
    },
    deleteField: (state, action: PayloadAction<string>) => {
      state.fields = state.fields.map((d) => {
        let fieldData = d.data;
        fieldData.isDeleted =
          fieldData.id == action.payload ? true : fieldData.isDeleted;

        fieldData.values = fieldData.values.map((subD) => {
          subD.isDeleted = subD.id == action.payload ? true : subD.isDeleted;
          return subD;
        });

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
  reloadFilters,
  searchFilter,
} = filterSlice.actions;
export default filterSlice.reducer;
