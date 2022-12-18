import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { get } from 'lodash';
import axiosUtils from '../utils/axiosUtils';
export const hierarchy = createAsyncThunk('lookup/hierarchy', axiosUtils.getData('lookup/hierarchy'));
export const currencies = createAsyncThunk('lookup/currencies', axiosUtils.getData('lookup/currencies'));
export const country = createAsyncThunk('lookup/country', axiosUtils.getData('lookup/country'));
export const state = createAsyncThunk('lookup/state', axiosUtils.getData('lookup/state'));
export const city = createAsyncThunk('lookup/city', axiosUtils.getData('lookup/city'));

const initialState = {
  hierarchy: {},
  currencies: {},
  errors: [],
  country: [],
  state: [],
  city: [],
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
    [country.fulfilled]: (state, action) => {
      state.country = action.payload;
    },
    [country.rejected]: (state, action) => {
      state.country = [];
      state.errors = JSON.parse(get(action, 'error.message', `[{ msg: 'Something went wrong' }]`));
    },
    [state.fulfilled]: (state, action) => {
      state.state = action.payload;
    },
    [state.rejected]: (state, action) => {
      state.state = [];
      state.errors = JSON.parse(get(action, 'error.message', `[{ msg: 'Something went wrong' }]`));
    },
    [city.fulfilled]: (state, action) => {
      state.city = action.payload;
    },
    [city.rejected]: (state, action) => {
      state.city = [];
      state.errors = JSON.parse(get(action, 'error.message', `[{ msg: 'Something went wrong' }]`));
    },
  },
});

const { reducer: lookupReducer } = lookupSlice;
export default lookupReducer;
