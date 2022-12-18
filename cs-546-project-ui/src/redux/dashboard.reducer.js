import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { get } from 'lodash';
import axiosUtils from '../utils/axiosUtils';
export const sales = createAsyncThunk('sales', axiosUtils.getData('dashboard/sales'));
export const groupBy = createAsyncThunk('groupBy', axiosUtils.getData('dashboard/group'));

const initialState = {
  salesGraph: [],
  groupBy: [[],[]],
  errors: [],
};
const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  extraReducers: {
    [sales.fulfilled]: (state, action) => {
      state.salesGraph = action.payload;
    },
    [sales.rejected]: (state, action) => {
      state.salesGraph = [];
      state.errors = JSON.parse(get(action, 'error.message', `[{ msg: 'Something went wrong' }]`));
    },
    [groupBy.fulfilled]: (state, action) => {
      state.groupBy = action.payload;
    },
    [groupBy.rejected]: (state, action) => {
      state.groupBy = [];
      state.errors = JSON.parse(get(action, 'error.message', `[{ msg: 'Something went wrong' }]`));
    },
  },
});

const { reducer: dashboardReducer } = dashboardSlice;
export default dashboardReducer;
