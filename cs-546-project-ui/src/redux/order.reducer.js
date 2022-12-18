import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { get } from 'lodash';
import axiosUtils from '../utils/axiosUtils';

export const createOrders = createAsyncThunk('addOrder', axiosUtils.postData('invoice'));

export const getOrders = createAsyncThunk('getOrder', axiosUtils.getData('invoice'));
export const approveOrders = createAsyncThunk('approve', axiosUtils.postData('invoice/${id}/approve'));
export const completeOrders = createAsyncThunk('completed', axiosUtils.postData('invoice/${id}/approve'));
export const rejectedOrders = createAsyncThunk('reject', axiosUtils.postData('invoice/${id}/approve'));

export const rateOrder = createAsyncThunk('rate', axiosUtils.postData('invoice/${id}/rate'));

const initialState = {
  createOrderStatus: false,
  allOrders: { PENDING: [], APPROVED: [], COMPLETED: [], REJECTED: [] },
  errors: [],
  fetchOrders: true,
};
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
    [approveOrders.fulfilled]: (state, action) => {
      // state.allOrders = action.payload;
      state.fetchOrders = true;
      state.errors = [];
    },
    [approveOrders.rejected]: (state, action) => {
      state.errors = JSON.parse(get(action, 'error.message', `[{ msg: 'Something went wrong' }]`));
      alert(state.errors[0].msg);
    },
    [rejectedOrders.fulfilled]: (state, action) => {
      // state.allOrders = action.payload;
      state.fetchOrders = true;
      state.errors = [];
    },
    [rejectedOrders.rejected]: (state, action) => {
      state.errors = JSON.parse(get(action, 'error.message', `[{ msg: 'Something went wrong' }]`));
      alert(state.errors[0].msg);
    },
    [completeOrders.fulfilled]: (state, action) => {
      // state.allOrders = action.payload;
      state.fetchOrders = true;
      state.errors = [];
    },
    [completeOrders.rejected]: (state, action) => {
      state.errors = JSON.parse(get(action, 'error.message', `[{ msg: 'Something went wrong' }]`));
      alert(state.errors[0].msg);
    },
    [rateOrder.fulfilled]: (state, action) => {
      // state.allOrders = action.payload;
      state.fetchOrders = true;
      state.errors = [];
    },
    [rateOrder.rejected]: (state, action) => {
      state.errors = JSON.parse(get(action, 'error.message', `[{ msg: 'Something went wrong' }]`));
      alert(state.errors[0].msg);
    },
  },
});

export const { setCreateOrderStatus, setErrors } = orderSlice.actions;

const { reducer: ordersReducer } = orderSlice;
export default ordersReducer;
