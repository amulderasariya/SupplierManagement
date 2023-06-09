import React, { Fragment, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import './App.css';
import LoginScreen from './features/auth/login';
import RegisterScreen from './features/auth/register';
import AppHeader from './features/appHeader/appHeader';
import { Box, CssBaseline } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import Product from './features/product/product';
import { currencies, hierarchy } from './redux/lookup.reducer';
import Orders from './features/orders/orders';
import Dashboard from './features/dashboard/dashboard';
import Users from './features/users/users';
import ProfileScreen from './features/auth/profile';
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    secondary: {
      main: '#FFF',
    },
  },
});
const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#121212',
    },
    secondary: {
      main: '#FFF',
    },
  },
});
function App() {
  const [theme, setTheme] = useState('Light');
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    if (user) {
      dispatch(hierarchy());
      dispatch(currencies());
    }
  });
  return (
    <ThemeProvider theme={theme === 'Light' ? lightTheme : darkTheme}>
      <CssBaseline />
      <Box maxWidth maxHeight>
        <BrowserRouter>
          {user && <AppHeader setTheme={setTheme} theme={theme} />}
          <Routes>
            <Route exact path="/register" element={<RegisterScreen />}></Route>
            <Route exact path="/login" element={<LoginScreen />}></Route>
            {!user && <Route exact path="*" element={<LoginScreen />}></Route>}
            {user && (
              <Fragment>
                <Route exact path="/login" element={<LoginScreen />}></Route>
                <Route exact path="/" element={<Dashboard />}></Route>
                <Route exact path="/product" element={<Product />}></Route>
                <Route exact path="/orders" element={<Orders />}></Route>
                <Route exact path="/users" element={<Users />}></Route>
                <Route exact path="/profile" element={<ProfileScreen />}></Route>
              </Fragment>
            )}
          </Routes>
        </BrowserRouter>
      </Box>
    </ThemeProvider>
  );
}

export default App;
