import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { get } from 'lodash';
import axiosUtils from '../utils/axiosUtils';
const user = JSON.parse(localStorage.getItem('user'));

export const register = createAsyncThunk('auth/register', axiosUtils.postData('auth/register'));

export const login = createAsyncThunk('auth/login', axiosUtils.postData('auth/login'));

export const logout = createAsyncThunk('auth/logout', axiosUtils.getData('auth/logout'));
export const userInfo = createAsyncThunk('auth/user', axiosUtils.getData('auth/user'));

export const getSuppliers = createAsyncThunk('auth/users/SUPPLIERS', axiosUtils.getData('auth/users/SUPPLIERS'));
export const getOwners = createAsyncThunk('auth/users/OWNER', axiosUtils.getData('auth/users/OWNER'));

export const registerAndFetchUser = (data) => async (dispatch, getState) => {
  await dispatch(register(data));
  let state = getState();
  return state.auth.isLoggedIn && dispatch(userInfo(data));
};
export const loginAndFetchUser = (data) => async (dispatch, getState) => {
  await dispatch(login(data));
  let state = getState();
  return state.auth.isLoggedIn && dispatch(userInfo(data));
};

const initialState = { isLoggedIn: !!user, user: user || null, loading: false, errors: [], suppliers: [], owners: [] };

const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: {
    [register.fulfilled]: (state) => {
      state.isLoggedIn = true;
      state.errors = [];
    },
    [register.rejected]: (state, action) => {
      state.isLoggedIn = false;
      state.errors = JSON.parse(get(action, 'error.message', `[{ msg: 'Something went wrong' }]`));
    },
    [login.fulfilled]: (state) => {
      state.isLoggedIn = true;
      state.errors = [];
    },
    [login.rejected]: (state, action) => {
      state.isLoggedIn = false;
      state.errors = JSON.parse(get(action, 'error.message', `[{ msg: 'Something went wrong' }]`));
    },
    [logout.fulfilled]: (state) => {
      state.isLoggedIn = false;
      state.user = null;
      state.errors = [];
      localStorage.setItem('user', JSON.stringify(null));
    },
    [logout.rejected]: (state, action) => {
      state.isLoggedIn = false;
      state.errors = get(action, 'error', [{ msg: 'Something went wrong' }]);
    },
    [userInfo.rejected]: (state, action) => {
      state.isLoggedIn = false;
      state.user = null;
      state.errors = get(action, 'error', [{ msg: 'Something went wrong' }]);
      localStorage.setItem('user', JSON.stringify(null));
    },
    [userInfo.fulfilled]: (state, action) => {
      state.isLoggedIn = false;
      state.user = action.payload;
      state.errors = [];
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
    [getSuppliers.fulfilled]: (state, action) => {
      state.suppliers = action.payload;
    },
    [getSuppliers.rejected]: (state, action) => {
      state.suppliers = [];
      state.errors = get(action, 'error', [{ msg: 'Something went wrong' }]);
    },
    [getOwners.fulfilled]: (state, action) => {
      state.owners = action.payload;
    },
    [getOwners.rejected]: (state, action) => {
      state.owners = [];
      state.errors = get(action, 'error', [{ msg: 'Something went wrong' }]);
    },
  },
});

const { reducer: authReducer } = authSlice;
export default authReducer;
