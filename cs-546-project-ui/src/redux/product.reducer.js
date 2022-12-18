import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { get } from 'lodash';
import axiosUtils from '../utils/axiosUtils';

export const createProducts = createAsyncThunk('addProduct', axiosUtils.postData('products'));

export const getProducts = createAsyncThunk('getProduct', axiosUtils.getData('products'));
const initialState = { createProductStatus: false, allProducts: [], errors: [], fetchProducts: true };
const productSlice = createSlice({
  name: 'product',
  initialState,

  reducers: {
    setErrors: (state, action) => {
      state.errors = action.payload;
    },
    setCreateProductStatus: (state, action) => {
      state.createProductStatus = action.payload;
    },
  },
  extraReducers: {
    [createProducts.fulfilled]: (state) => {
      state.createProductStatus = true;
      state.fetchProducts = true;
      state.errors = [];
    },
    [createProducts.pending]: (state) => {
      state.createProductStatus = false;
    },
    [createProducts.rejected]: (state, action) => {
      state.createProductStatus = false;
      state.errors = JSON.parse(get(action, 'error.message', `[{ msg: 'Something went wrong' }]`));
    },
    [getProducts.pending]: (state) => {
      state.fetchProducts = true;
    },
    [getProducts.fulfilled]: (state, action) => {
      state.allProducts = action.payload;
      state.fetchProducts = false;
      state.errors = [];
    },
    [getProducts.rejected]: (state, action) => {
      state.errors = JSON.parse(get(action, 'error.message', `[{ msg: 'Something went wrong' }]`));
    },
  },
});

export const { setCreateProductStatus, setErrors } = productSlice.actions;

const { reducer: productsReducer } = productSlice;
export default productsReducer;
