import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { get } from 'lodash';
import axiosUtils from '../utils/axiosUtils';
export const hierarchy = createAsyncThunk('lookup/hierarchy', axiosUtils.getData('lookup/hierarchy'));
export const currencies = createAsyncThunk('lookup/currencies', axiosUtils.getData('lookup/currencies'));

const initialState = {
  hierarchy: {},
  currencies: {},
  errors: [],
};
const lookupSlice = createSlice({
  name: 'lookup',
  initialState,
  extraReducers: {
    [hierarchy.fulfilled]: (state, action) => {
      state.hierarchy = action.payload;
    },
    [hierarchy.rejected]: (state, action) => {
      state.hierarchy = [];
      state.errors = JSON.parse(get(action, 'error.message', `[{ msg: 'Something went wrong' }]`));
    },
    [currencies.fulfilled]: (state, action) => {
      state.currencies = action.payload;
    },
    [currencies.rejected]: (state, action) => {
      state.currencies = [];
      state.errors = JSON.parse(get(action, 'error.message', `[{ msg: 'Something went wrong' }]`));
    },
  },
});

const { reducer: lookupReducer } = lookupSlice;
export default lookupReducer;
