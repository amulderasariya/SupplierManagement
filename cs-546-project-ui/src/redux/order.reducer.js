import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { get } from 'lodash';
import axiosUtils from '../utils/axiosUtils';

export const createOrders = createAsyncThunk('addOrder', axiosUtils.postData('orders'));

export const getOrders = createAsyncThunk('getOrder', axiosUtils.getData('orders'));
const initialState = { createOrderStatus: false, allOrders: [], errors: [], fetchOrders: true };
const orderSlice = createSlice({
  name: 'order',
  initialState,

  reducers: {
    setErrors: (state, action) => {
      state.errors = action.payload;
    },
    setCreateOrderStatus: (state, action) => {
      state.createOrderStatus = action.payload;
    },
  },
  extraReducers: {
    [createOrders.fulfilled]: (state) => {
      state.createOrderStatus = true;
      state.fetchOrders = true;
      state.errors = [];
    },
    [createOrders.pending]: (state) => {
      state.createOrderStatus = false;
    },
    [createOrders.rejected]: (state, action) => {
      state.createOrderStatus = false;
      state.errors = JSON.parse(get(action, 'error.message', `[{ msg: 'Something went wrong' }]`));
    },
    [getOrders.fulfilled]: (state, action) => {
      state.allOrders = action.payload;
      state.fetchOrders = false;
      state.errors = [];
    },
    [getOrders.rejected]: (state, action) => {
      state.errors = JSON.parse(get(action, 'error.message', `[{ msg: 'Something went wrong' }]`));
    },
  },
});

export const { setCreateOrderStatus, setErrors } = orderSlice.actions;

const { reducer: ordersReducer } = orderSlice;
export default ordersReducer;
